import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Atendimento, AtendimentoStatus, PrioridadeTipo } from '../atendimento/entities/atendimento.entity';
import { AtendimentoGateway } from '../atendimento/gateways/atendimento.gateway';
import { Servico } from '../admin/entities/servico.entity';

@Injectable()
export class TriagemService {
    constructor(
        @InjectRepository(Atendimento)
        private readonly atendimentoRepository: Repository<Atendimento>,
        @InjectRepository(Servico)
        private readonly servicoRepository: Repository<Servico>,
        private readonly gateway: AtendimentoGateway
    ) { }

    async gerarSenha(companyId: string, servicoId: string, prioridadeRaw: string): Promise<Atendimento> {

        if (!servicoId) {
            throw new BadRequestException('ID do Serviço é obrigatório.');
        }

        const servico = await this.servicoRepository.findOne({ where: { id: servicoId, companyId, ativo: true } });
        if (!servico) {
            throw new BadRequestException('Serviço inválido ou inativo.');
        }

        // Normaliza prioridade para ENUM
        const prioridade = (prioridadeRaw || 'NORMAL').toUpperCase() as PrioridadeTipo;

        // Prefixo da senha (N = normal, P = preferencial, U = urgência)
        let prefix = 'N';
        if (prioridade === 'PREFERENCIAL') prefix = 'P';
        if (prioridade === 'URGENCIA') prefix = 'U';

        // Pega as senhas geradas HOJE para a mesma empresa e mesmo tipo
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const last = await this.atendimentoRepository.createQueryBuilder('a')
            .where('a.company_id = :companyId', { companyId })
            .andWhere('a.prioridade = :prioridade', { prioridade })
            // Somente as de hoje para que zere a fila no dia seguinte
            .andWhere('a.data_chegada >= :startOfDay', { startOfDay })
            .andWhere('a.data_chegada <= :endOfDay', { endOfDay })
            // Exclui as que foram zeradas pelo admin, para reiniciar a contagem
            .andWhere('a.status != :cancelado', { cancelado: 'CANCELADO' })
            .orderBy('a.data_chegada', 'DESC')
            .getOne();

        let nextNumber = 1;
        if (last && last.senha) {
            // Extrair numero. Ex: "P005" -> 5
            const numPart = last.senha.replace(/\D/g, '');
            if (numPart) {
                nextNumber = parseInt(numPart, 10) + 1;
            }
        }

        // Formata algo como P001, N024, etc.
        const senhaFormatada = `${prefix}${String(nextNumber).padStart(3, '0')}`;

        // Cria e Envia pro BD
        const novoAtendimento = new Atendimento();
        novoAtendimento.companyId = companyId;
        novoAtendimento.senha = senhaFormatada;
        novoAtendimento.status = AtendimentoStatus.EM_ESPERA;
        novoAtendimento.prioridade = prioridade;

        novoAtendimento.servicoId = servico.id;
        novoAtendimento.departamentoId = servico.departamentoId;

        const salvo = await this.atendimentoRepository.save(novoAtendimento);

        // Opcional: Emite um evento para a tela do Atendente para o contador de "X Aguardando" atualizar Real-time
        this.gateway.server.to(`company_${companyId}`).emit('senhaGerada', salvo);

        return salvo;
    }
}
