import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Atendimento, AtendimentoStatus, PrioridadeTipo } from '../atendimento/entities/atendimento.entity';
import { AtendimentoGateway } from '../atendimento/gateways/atendimento.gateway';
import { Servico } from '../admin/entities/servico.entity';
import { Local } from '../admin/entities/local.entity';

@Injectable()
export class TriagemService {
    constructor(
        @InjectRepository(Atendimento)
        private readonly atendimentoRepository: Repository<Atendimento>,
        @InjectRepository(Servico)
        private readonly servicoRepository: Repository<Servico>,
        @InjectRepository(Local)
        private readonly localRepository: Repository<Local>,
        private readonly gateway: AtendimentoGateway
    ) { }

    /**
     * Busca os serviços disponíveis para um local específico.
     * Se localId for informado, retorna apenas os serviços habilitados no local.
     * Caso contrário, retorna todos os serviços ativos da empresa.
     */
    async listarServicosDisponiveis(companyId: string, localId?: string): Promise<Servico[]> {
        if (localId) {
            const local = await this.localRepository.findOne({ where: { id: localId, companyId, ativo: true } });
            if (!local || !local.servicosIds?.length) return [];
            return this.servicoRepository.find({
                where: { companyId, ativo: true, id: In(local.servicosIds) }
            });
        }
        return this.servicoRepository.find({ where: { companyId, ativo: true } });
    }

    async gerarSenha(companyId: string, servicoId: string, prioridadeRaw: string, localId?: string): Promise<Atendimento> {

        if (!servicoId) {
            throw new BadRequestException('ID do Serviço é obrigatório.');
        }

        // Valida serviço existe na empresa
        const servico = await this.servicoRepository.findOne({ where: { id: servicoId, companyId, ativo: true } });
        if (!servico) {
            throw new BadRequestException('Serviço inválido ou inativo.');
        }

        // Se localId fornecido, valida que o serviço pertence ao local
        if (localId) {
            const local = await this.localRepository.findOne({ where: { id: localId, companyId, ativo: true } });
            if (local && local.servicosIds?.length && !local.servicosIds.includes(servicoId)) {
                throw new BadRequestException('Serviço não habilitado neste local.');
            }
        }

        // Normaliza prioridade para ENUM
        const prioridade = (prioridadeRaw || 'NORMAL').toUpperCase() as PrioridadeTipo;

        // Prefixo da senha
        let prefix = 'N';
        if (prioridade === 'PREFERENCIAL') prefix = 'P';
        if (prioridade === 'URGENCIA') prefix = 'U';

        // Pega as senhas geradas HOJE para o mesmo escopo (local ou empresa)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const qb = this.atendimentoRepository.createQueryBuilder('a')
            .where('a.company_id = :companyId', { companyId })
            .andWhere('a.prioridade = :prioridade', { prioridade })
            .andWhere('a.data_chegada >= :startOfDay', { startOfDay })
            .andWhere('a.data_chegada <= :endOfDay', { endOfDay })
            .andWhere('a.status != :cancelado', { cancelado: 'CANCELADO' });

        // Senha incrementa por local quando localId fornecido
        if (localId) {
            qb.andWhere('a.local_id = :localId', { localId });
        }

        const last = await qb.orderBy('a.data_chegada', 'DESC').getOne();

        let nextNumber = 1;
        if (last?.senha) {
            const numPart = last.senha.replace(/\D/g, '');
            if (numPart) nextNumber = parseInt(numPart, 10) + 1;
        }

        const senhaFormatada = `${prefix}${String(nextNumber).padStart(3, '0')}`;

        const novoAtendimento = new Atendimento();
        novoAtendimento.companyId = companyId;
        novoAtendimento.senha = senhaFormatada;
        novoAtendimento.status = AtendimentoStatus.EM_ESPERA;
        novoAtendimento.prioridade = prioridade;
        novoAtendimento.servicoId = servico.id;
        novoAtendimento.departamentoId = servico.departamentoId;
        if (localId) novoAtendimento.localId = localId;

        const salvo = await this.atendimentoRepository.save(novoAtendimento);

        // Emite para sala da empresa E para sala do local (se houver)
        this.gateway.server.to(`company_${companyId}`).emit('senhaGerada', salvo);
        if (localId) {
            this.gateway.server.to(`local_${localId}`).emit('senhaGerada', salvo);
        }

        return salvo;
    }
}
