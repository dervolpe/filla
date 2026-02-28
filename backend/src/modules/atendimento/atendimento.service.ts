import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { Atendimento, AtendimentoStatus } from './entities/atendimento.entity';
import { Guiche } from '../admin/entities/guiche.entity';
import { AtendimentoGateway } from './gateways/atendimento.gateway';

@Injectable()
export class AtendimentoService {
    constructor(
        @InjectRepository(Atendimento)
        private readonly atendimentoRepo: Repository<Atendimento>,
        @InjectRepository(Guiche)
        private readonly guicheRepo: Repository<Guiche>,
        private readonly atendimentoGateway: AtendimentoGateway,
    ) { }

    // --- Métodos de Guichê ---

    async listarGuichesDisponiveis(companyId: string): Promise<Guiche[]> {
        return this.guicheRepo.find({
            where: { companyId, ativo: true, atendenteAtualId: IsNull() },
            order: { numero: 'ASC' }
        });
    }

    async vincularGuiche(companyId: string, guicheId: string, atendenteId: string): Promise<Guiche> {
        const guiche = await this.guicheRepo.findOne({ where: { id: guicheId, companyId } });

        if (!guiche) throw new NotFoundException('Guichê não encontrado.');
        if (guiche.atendenteAtualId && guiche.atendenteAtualId !== atendenteId) {
            throw new BadRequestException('Este guichê já está sendo utilizado por outro atendente.');
        }

        guiche.atendenteAtualId = atendenteId;
        return this.guicheRepo.save(guiche);
    }

    async desvincularGuiche(companyId: string, guicheId: string, atendenteId: string): Promise<Guiche> {
        const guiche = await this.guicheRepo.findOne({ where: { id: guicheId, companyId } });

        if (!guiche) throw new NotFoundException('Guichê não encontrado.');
        if (guiche.atendenteAtualId !== atendenteId) {
            throw new BadRequestException('Você não pode liberar um guichê que não é seu.');
        }

        guiche.atendenteAtualId = null;
        return this.guicheRepo.save(guiche);
    }

    // --- Métodos de Fila ---

    /**
     * Retrieves the next ticket in the queue and marks it as "CHAMADO".
     * Emits the WebSocket event to the TV Monitor.
     */
    async chamarProximo(companyId: string, guicheNumero: string): Promise<Atendimento> {
        const proximoNaFila = await this.atendimentoRepo.findOne({
            where: { companyId, status: AtendimentoStatus.EM_ESPERA },
            order: { prioridade: 'DESC', dataChegada: 'ASC' },
        });

        if (!proximoNaFila) {
            throw new NotFoundException('A fila está vazia para esta empresa.');
        }

        proximoNaFila.status = AtendimentoStatus.CHAMADO;
        proximoNaFila.dataChamada = new Date();
        await this.atendimentoRepo.save(proximoNaFila);
        this.atendimentoGateway.emitirSenhaChamada(companyId, proximoNaFila, guicheNumero);

        return proximoNaFila;
    }

    async rechamarSenha(companyId: string, senha: string, guicheNumero: string): Promise<void> {
        const atendimento = await this.atendimentoRepo.findOne({
            where: { companyId, senha, status: AtendimentoStatus.CHAMADO }
        });

        if (!atendimento) {
            throw new BadRequestException('Esta senha não está em estado de chamada no momento.');
        }

        this.atendimentoGateway.emitirSenhaChamada(companyId, atendimento, guicheNumero);
    }

    async iniciarAtendimento(companyId: string, id: string): Promise<Atendimento> {
        const atendimento = await this.atendimentoRepo.findOne({
            where: { id, companyId, status: AtendimentoStatus.CHAMADO }
        });

        if (!atendimento) {
            throw new BadRequestException('Atendimento não encontrado ou não está no status CHAMADO.');
        }

        atendimento.status = AtendimentoStatus.EM_ATENDIMENTO;
        atendimento.dataInicioAtendimento = new Date();
        await this.atendimentoRepo.save(atendimento);

        // Notify TV monitors if necessary to clear from "Calling" focus
        return atendimento;
    }

    async finalizarAtendimento(companyId: string, id: string): Promise<Atendimento> {
        const atendimento = await this.atendimentoRepo.findOne({
            where: { id, companyId, status: AtendimentoStatus.EM_ATENDIMENTO }
        });

        if (!atendimento) {
            throw new BadRequestException('Atendimento não encontrado ou não está EM ATENDIMENTO.');
        }

        atendimento.status = AtendimentoStatus.ENCERRADO;
        atendimento.dataEncerramento = new Date();
        return this.atendimentoRepo.save(atendimento);
    }

    async cancelarAtendimento(companyId: string, id: string): Promise<Atendimento> {
        const atendimento = await this.atendimentoRepo.findOne({
            where: { id, companyId, status: In([AtendimentoStatus.CHAMADO, AtendimentoStatus.EM_ATENDIMENTO]) }
        });

        if (!atendimento) {
            throw new BadRequestException('Atendimento não pode ser cancelado no estado atual.');
        }

        atendimento.status = AtendimentoStatus.NAO_COMPARECEU;
        atendimento.dataEncerramento = new Date();
        return this.atendimentoRepo.save(atendimento);
    }

    async listarFilaEspera(companyId: string): Promise<Atendimento[]> {
        return this.atendimentoRepo.find({
            where: { companyId, status: AtendimentoStatus.EM_ESPERA },
            order: { prioridade: 'DESC', dataChegada: 'ASC' }
        });
    }
}
