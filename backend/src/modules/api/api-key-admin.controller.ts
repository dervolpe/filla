import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

const MOCK_COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';

@Controller('admin/api-keys')
export class ApiKeyAdminController {
    constructor(private readonly apiKeyService: ApiKeyService) { }

    @Get()
    async listar() {
        return this.apiKeyService.listarChaves(MOCK_COMPANY_ID);
    }

    @Post()
    async criar(@Body() body: { nome: string; permissoes?: string[] }) {
        const result = await this.apiKeyService.criarChave(
            MOCK_COMPANY_ID,
            body.nome,
            body.permissoes || ['fila:read', 'fila:write'],
        );
        return {
            message: 'Chave criada. Guarde-a pois não será exibida novamente.',
            chave: result.chaveRaw,   // Exibida UMA vez
            apiKey: result.apiKey,
        };
    }

    @Delete(':id/revogar')
    async revogar(@Param('id') id: string) {
        await this.apiKeyService.revogarChave(MOCK_COMPANY_ID, id);
        return { ok: true, message: 'Chave revogada.' };
    }

    @Post(':id/reativar')
    async reativar(@Param('id') id: string) {
        await this.apiKeyService.reativarChave(MOCK_COMPANY_ID, id);
        return { ok: true, message: 'Chave reativada.' };
    }
}
