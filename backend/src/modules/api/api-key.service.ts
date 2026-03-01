import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './entities/api-key.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
    constructor(
        @InjectRepository(ApiKey)
        private readonly apiKeyRepo: Repository<ApiKey>,
    ) { }

    /** Gera uma nova API Key para a empresa */
    async criarChave(companyId: string, nome: string, permissoes: string[]): Promise<{ apiKey: ApiKey; chaveRaw: string }> {
        // Gera chave legível: filla_<32 chars hex>
        const chaveRaw = `filla_${randomBytes(16).toString('hex')}`;

        const apiKey = this.apiKeyRepo.create({
            companyId,
            nome,
            chave: chaveRaw,    // Armazenamos plain text — é a credencial do client
            permissoes: permissoes?.length ? permissoes : ['fila:read', 'fila:write'],
        });

        const saved = await this.apiKeyRepo.save(apiKey);

        // Retorna tanto o objeto quanto a chave raw (exibida UMA VEZ para o usuário)
        return { apiKey: saved, chaveRaw };
    }

    async listarChaves(companyId: string): Promise<ApiKey[]> {
        const chaves = await this.apiKeyRepo.find({ where: { companyId } });
        // Mascara a chave para exibição: filla_abc...xyz
        return chaves.map(k => ({
            ...k,
            chave: `${k.chave.substring(0, 10)}...${k.chave.substring(k.chave.length - 4)}`
        })) as ApiKey[];
    }

    async revogarChave(companyId: string, id: string): Promise<void> {
        await this.apiKeyRepo.update({ id, companyId }, { ativo: false });
    }

    async reativarChave(companyId: string, id: string): Promise<void> {
        await this.apiKeyRepo.update({ id, companyId }, { ativo: true });
    }
}
