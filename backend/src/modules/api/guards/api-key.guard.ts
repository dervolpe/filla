import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/api-key.entity';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        @InjectRepository(ApiKey)
        private readonly apiKeyRepo: Repository<ApiKey>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const rawKey = request.headers['x-api-key'] as string;

        if (!rawKey) {
            throw new UnauthorizedException('Header X-API-Key obrigatório.');
        }

        const apiKey = await this.apiKeyRepo.findOne({ where: { chave: rawKey, ativo: true } });

        if (!apiKey) {
            throw new UnauthorizedException('API Key inválida ou revogada.');
        }

        // Verifica permissão exigida pela rota (definida via metadata 'permission')
        const requiredPermission: string = Reflect.getMetadata('permission', context.getHandler());
        if (requiredPermission && apiKey.permissoes) {
            const hasPermission =
                apiKey.permissoes.includes('admin:full') ||
                apiKey.permissoes.includes(requiredPermission);
            if (!hasPermission) {
                throw new ForbiddenException(`Permissão '${requiredPermission}' necessária.`);
            }
        }

        // Injeta companyId e apiKey no request para uso nos controllers
        request.companyId = apiKey.companyId;
        request.apiKey = apiKey;

        // Atualiza ultimo_uso_em de forma assíncrona (não bloqueia a requisição)
        this.apiKeyRepo.update(apiKey.id, { ultimoUsoEm: new Date() }).catch(() => { });

        return true;
    }
}
