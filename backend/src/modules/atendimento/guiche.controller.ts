import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';

@Controller('guiche')
export class GuicheController {
    constructor(private readonly atendimentoService: AtendimentoService) { }

    @Get('disponiveis/:companyId')
    async listarDisponiveis(@Param('companyId') companyId: string) {
        return this.atendimentoService.listarGuichesDisponiveis(companyId);
    }

    @Post('vincular')
    async vincular(@Body() body: { companyId: string; guicheId: string; atendenteId: string }) {
        return this.atendimentoService.vincularGuiche(body.companyId, body.guicheId, body.atendenteId);
    }

    @Post('desvincular')
    async desvincular(@Body() body: { companyId: string; guicheId: string; atendenteId: string }) {
        return this.atendimentoService.desvincularGuiche(body.companyId, body.guicheId, body.atendenteId);
    }
}
