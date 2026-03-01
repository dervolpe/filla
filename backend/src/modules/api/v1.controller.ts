import {
    Controller, Get, Post, Body, Param, Query,
    UseGuards, Req
} from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key.guard';
import { TriagemService } from '../triagem/triagem.service';
import { AtendimentoService } from '../atendimento/atendimento.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Atendimento, AtendimentoStatus } from '../atendimento/entities/atendimento.entity';
import { Servico } from '../admin/entities/servico.entity';
import { Local } from '../admin/entities/local.entity';
import { Repository } from 'typeorm';

@UseGuards(ApiKeyGuard)
@Controller('v1')
export class V1Controller {
    constructor(
        private readonly triagemService: TriagemService,
        private readonly atendimentoService: AtendimentoService,
        @InjectRepository(Atendimento) private readonly atendimentoRepo: Repository<Atendimento>,
        @InjectRepository(Servico) private readonly servicoRepo: Repository<Servico>,
        @InjectRepository(Local) private readonly localRepo: Repository<Local>,
    ) { }

    // ─── Locais ──────────────────────────────────────────────
    /**
     * GET /v1/locais
     * Lista todas as unidades/locais da empresa
     */
    @Get('locais')
    async listarLocais(@Req() req) {
        return this.localRepo.find({ where: { companyId: req.companyId, ativo: true } });
    }

    /**
     * GET /v1/locais/:localId/servicos
     * Serviços habilitados em um local específico
     */
    @Get('locais/:localId/servicos')
    async servicosDoLocal(@Param('localId') localId: string, @Req() req) {
        return this.triagemService.listarServicosDisponiveis(req.companyId, localId);
    }

    // ─── Senhas / Triagem ─────────────────────────────────────
    /**
     * POST /v1/senhas
     * Body: { servicoId, prioridade?, localId? }
     * Gera uma nova senha na fila
     */
    @Post('senhas')
    async gerarSenha(@Body() body: { servicoId: string; prioridade?: string; localId?: string }, @Req() req) {
        return this.triagemService.gerarSenha(
            req.companyId,
            body.servicoId,
            body.prioridade || 'NORMAL',
            body.localId,
        );
    }

    /**
     * GET /v1/senhas/:id
     * Consulta o status de uma senha específica
     */
    @Get('senhas/:id')
    async consultarSenha(@Param('id') id: string, @Req() req) {
        const atendimento = await this.atendimentoRepo.findOne({
            where: { id, companyId: req.companyId }
        });
        if (!atendimento) return { error: 'Senha não encontrada.' };
        return atendimento;
    }

    // ─── Fila ─────────────────────────────────────────────────
    /**
     * GET /v1/fila?localId=&servicoId=
     * Lista senhas em espera com filtros opcionais
     */
    @Get('fila')
    async listarFila(@Query('localId') localId: string, @Query('servicoId') servicoId: string, @Req() req) {
        const where: any = { companyId: req.companyId, status: AtendimentoStatus.EM_ESPERA };
        if (localId) where.localId = localId;
        if (servicoId) where.servicoId = servicoId;
        return this.atendimentoRepo.find({ where, order: { prioridade: 'DESC', dataChegada: 'ASC' } });
    }

    /**
     * GET /v1/fila/status?localId=
     * Resumo da fila: total aguardando, última chamada, tempo médio estimado
     */
    @Get('fila/status')
    async statusFila(@Query('localId') localId: string, @Req() req) {
        const where: any = { companyId: req.companyId, status: AtendimentoStatus.EM_ESPERA };
        if (localId) where.localId = localId;

        const emEspera = await this.atendimentoRepo.count({ where });

        const ultimaChamada = await this.atendimentoRepo.findOne({
            where: { companyId: req.companyId, status: AtendimentoStatus.CHAMADO },
            order: { dataChamada: 'DESC' },
        });

        return {
            emEspera,
            ultimaChamada: ultimaChamada?.senha || null,
            tempoMedioEstimadoMin: emEspera * 5, // estimativa simples: 5min por pessoa
        };
    }

    // ─── Atendimento ─────────────────────────────────────────
    /**
     * POST /v1/atendimento/chamar
     * Body: { guicheNumero }
     * Chama a próxima senha da fila
     */
    @Post('atendimento/chamar')
    async chamarProximo(@Body() body: { guicheNumero: string }, @Req() req) {
        return this.atendimentoService.chamarProximo(req.companyId, body.guicheNumero);
    }

    /**
     * POST /v1/atendimento/rechamar
     * Body: { senha, guicheNumero }
     */
    @Post('atendimento/rechamar')
    async rechamar(@Body() body: { senha: string; guicheNumero: string }, @Req() req) {
        await this.atendimentoService.rechamarSenha(req.companyId, body.senha, body.guicheNumero);
        return { ok: true };
    }

    /**
     * POST /v1/atendimento/:id/iniciar
     */
    @Post('atendimento/:id/iniciar')
    async iniciar(@Param('id') id: string, @Req() req) {
        return this.atendimentoService.iniciarAtendimento(req.companyId, id);
    }

    /**
     * POST /v1/atendimento/:id/finalizar
     */
    @Post('atendimento/:id/finalizar')
    async finalizar(@Param('id') id: string, @Req() req) {
        return this.atendimentoService.finalizarAtendimento(req.companyId, id);
    }

    /**
     * POST /v1/atendimento/:id/cancelar
     */
    @Post('atendimento/:id/cancelar')
    async cancelar(@Param('id') id: string, @Req() req) {
        return this.atendimentoService.cancelarAtendimento(req.companyId, id);
    }
}
