import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TriagemService } from './triagem.service';

const MOCK_COMPANY_ID = 'e2b102b4-3a55-4abc-8e54-526279fcc4b9';

@Controller('triagem')
export class TriagemController {
    constructor(private readonly triagemService: TriagemService) { }

    /** Lista os serviços disponíveis para um local (ou todos se localId omitido) */
    @Get('servicos')
    async listarServicos(@Query('localId') localId?: string) {
        return this.triagemService.listarServicosDisponiveis(MOCK_COMPANY_ID, localId);
    }

    /** Gera uma nova senha na fila */
    @Post('gerar')
    async gerarSenha(@Body() body: { companyId?: string; servicoId: string; prioridade: string; localId?: string }) {
        const companyId = body.companyId || MOCK_COMPANY_ID;
        return this.triagemService.gerarSenha(companyId, body.servicoId, body.prioridade, body.localId);
    }
}
