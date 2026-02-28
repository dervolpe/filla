import { Controller, Post, Get, Body, Param, HttpCode } from '@nestjs/common';
import { AtendimentoService } from './atendimento.service';

@Controller('atendimento')
export class AtendimentoController {
    constructor(private readonly atendimentoService: AtendimentoService) { }

    @Post('chamar')
    @HttpCode(200)
    async chamarProximo(@Body() body: { companyId: string; guiche: string }) {
        return this.atendimentoService.chamarProximo(body.companyId, body.guiche);
    }

    @Post('rechamar')
    @HttpCode(204)
    async rechamarSenha(@Body() body: { companyId: string; senha: string; guiche: string }) {
        await this.atendimentoService.rechamarSenha(body.companyId, body.senha, body.guiche);
    }

    @Post('iniciar')
    @HttpCode(200)
    async iniciarAtendimento(@Body() body: { companyId: string; atendimentoId: string }) {
        return this.atendimentoService.iniciarAtendimento(body.companyId, body.atendimentoId);
    }

    @Post('finalizar')
    @HttpCode(200)
    async finalizarAtendimento(@Body() body: { companyId: string; atendimentoId: string }) {
        return this.atendimentoService.finalizarAtendimento(body.companyId, body.atendimentoId);
    }

    @Post('cancelar')
    @HttpCode(200)
    async cancelarAtendimento(@Body() body: { companyId: string; atendimentoId: string }) {
        return this.atendimentoService.cancelarAtendimento(body.companyId, body.atendimentoId);
    }

    @Get('fila/:companyId')
    async listarFilaEspera(@Param('companyId') companyId: string) {
        return this.atendimentoService.listarFilaEspera(companyId);
    }
}
