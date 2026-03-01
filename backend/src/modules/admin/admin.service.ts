import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';
import { Servico } from './entities/servico.entity';
import { Usuario } from './entities/usuario.entity';
import { Guiche } from './entities/guiche.entity';
import { PainelConfig } from './entities/painel-config.entity';
import { Local } from './entities/local.entity';
import { Atendimento, AtendimentoStatus } from '../atendimento/entities/atendimento.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Departamento)
        private deptoRepo: Repository<Departamento>,
        @InjectRepository(Servico)
        private servicoRepo: Repository<Servico>,
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
        @InjectRepository(Guiche)
        private guicheRepo: Repository<Guiche>,
        @InjectRepository(Atendimento)
        private atendimentoRepo: Repository<Atendimento>,
        @InjectRepository(PainelConfig)
        private painelConfigRepo: Repository<PainelConfig>,
        @InjectRepository(Local)
        private localRepo: Repository<Local>
    ) { }

    // ─── LOCAIS CRUD ───────────────────────────────────────────
    async listarLocais(companyId: string): Promise<Local[]> {
        return this.localRepo.find({ where: { companyId, ativo: true } });
    }

    async criarLocal(companyId: string, data: Partial<Local>): Promise<Local> {
        return this.localRepo.save(this.localRepo.create({ ...data, companyId }));
    }

    async atualizarLocal(companyId: string, id: string, data: Partial<Local>): Promise<Local | null> {
        await this.localRepo.update({ id, companyId }, data);
        return this.localRepo.findOne({ where: { id, companyId } });
    }

    async excluirLocal(companyId: string, id: string): Promise<void> {
        await this.localRepo.update({ id, companyId }, { ativo: false });
    }

    async obterPainelConfig(companyId: string): Promise<PainelConfig> {
        let config = await this.painelConfigRepo.findOne({ where: { companyId } });
        if (!config) {
            config = this.painelConfigRepo.create({
                companyId,
                midias: [],
                cidadeNome: 'São Paulo',
                cidadeLat: -23.5505,
                cidadeLon: -46.6333,
                dadosFinanceiros: false,
            });
            await this.painelConfigRepo.save(config);
        }
        return config;
    }

    async salvarPainelConfig(companyId: string, data: Partial<PainelConfig>): Promise<PainelConfig> {
        let config = await this.painelConfigRepo.findOne({ where: { companyId } });
        if (!config) {
            config = this.painelConfigRepo.create({ companyId });
        }
        Object.assign(config, data);
        return this.painelConfigRepo.save(config);
    }

    async obterEstatisticas(companyId: string) {
        // Today bounds
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // 1. Total de tickets emitidos hoje
        const totalHoje = await this.atendimentoRepo.createQueryBuilder('a')
            .where('a.company_id = :companyId', { companyId })
            .andWhere('a.data_chegada >= :startOfDay', { startOfDay })
            .andWhere('a.data_chegada <= :endOfDay', { endOfDay })
            .getCount();

        // 2. Aguardando agora
        const aguardando = await this.atendimentoRepo.count({
            where: { companyId, status: 'EM_ESPERA' as any }
        });

        // 3. Status agrupados (Para gráficos)
        const porStatusRaw = await this.atendimentoRepo.createQueryBuilder('a')
            .select('a.status', 'status')
            .addSelect('COUNT(a.id)', 'total')
            .where('a.company_id = :companyId', { companyId })
            .andWhere('a.data_chegada >= :startOfDay', { startOfDay })
            .andWhere('a.data_chegada <= :endOfDay', { endOfDay })
            .groupBy('a.status')
            .getRawMany();

        const chartStatus = {
            labels: porStatusRaw.map(i => i.status),
            data: porStatusRaw.map(i => parseInt(i.total, 10))
        };

        return {
            totais: { hoje: totalHoje, fila: aguardando },
            graficoStatus: chartStatus
        };
    }

    async resetarSenhas(companyId: string) {
        // Today bounds
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Apaga TODOS os atendimentos de hoje para que a contagem reinicie do N001
        // Isso inclui encerrados, em espera, chamados, etc.
        await this.atendimentoRepo.createQueryBuilder()
            .delete()
            .from(Atendimento)
            .where('company_id = :companyId', { companyId })
            .andWhere('data_chegada >= :startOfDay', { startOfDay })
            .andWhere('data_chegada <= :endOfDay', { endOfDay })
            .execute();

        return { message: "Senhas zeradas! A próxima senha será N001." };
    }

    async listarDepartamentos(companyId: string): Promise<Departamento[]> {
        return this.deptoRepo.find({ where: { companyId, ativo: true } });
    }

    async listarServicos(companyId: string): Promise<Servico[]> {
        return this.servicoRepo.find({ where: { companyId, ativo: true } });
    }

    async listarUsuarios(companyId: string): Promise<Usuario[]> {
        return this.usuarioRepo.find({ where: { companyId, ativo: true } });
    }

    async listarGuiches(companyId: string): Promise<Guiche[]> {
        return this.guicheRepo.find({ where: { companyId, ativo: true }, order: { numero: 'ASC' } });
    }

    // Métodos mockados para Seed Inicial caso o banco esteja vazio na Demo
    async criarDadosDemo(companyId: string) {
        const count = await this.deptoRepo.count({ where: { companyId } });
        if (count === 0) {
            const depto = await this.deptoRepo.save(this.deptoRepo.create({
                companyId,
                nome: 'Atendimento Geral',
                descricao: 'Guichês principais de atendimento ao público'
            }));

            await this.servicoRepo.save(this.servicoRepo.create({
                companyId,
                departamentoId: depto.id,
                nome: 'Triagem / Recepção',
                descricao: 'Emissão de Senhas e Informações Rápidas'
            }));

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash('admin123', salt);

            await this.usuarioRepo.save(this.usuarioRepo.create({
                companyId,
                nome: 'Admin Teste',
                email: 'admin@fila.com',
                senhaHash: hash,
                departamentosIds: [depto.id],
                role: 'ADMIN' as any
            }));

            // Cria 3 Guichês padrão
            await this.guicheRepo.save([
                this.guicheRepo.create({ companyId, numero: '01' }),
                this.guicheRepo.create({ companyId, numero: '02' }),
                this.guicheRepo.create({ companyId, numero: '03' }),
            ]);

            return { message: "Dados Demo Criados com Sucesso!" };
        }
        return { message: "Dados já existiam." };
    }

    async criarDepartamento(companyId: string, data: Partial<Departamento>): Promise<Departamento> {
        return this.deptoRepo.save(this.deptoRepo.create({ ...data, companyId }));
    }

    async atualizarDepartamento(companyId: string, id: string, data: Partial<Departamento>): Promise<Departamento | null> {
        await this.deptoRepo.update({ id, companyId }, data);
        return this.deptoRepo.findOne({ where: { id, companyId } });
    }

    async excluirDepartamento(companyId: string, id: string): Promise<void> {
        await this.deptoRepo.update({ id, companyId }, { ativo: false });
    }

    async criarServico(companyId: string, data: Partial<Servico>): Promise<Servico> {
        return this.servicoRepo.save(this.servicoRepo.create({ ...data, companyId }));
    }

    async atualizarServico(companyId: string, id: string, data: Partial<Servico>): Promise<Servico | null> {
        await this.servicoRepo.update({ id, companyId }, data);
        return this.servicoRepo.findOne({ where: { id, companyId } });
    }

    async excluirServico(companyId: string, id: string): Promise<void> {
        await this.servicoRepo.update({ id, companyId }, { ativo: false });
    }

    async criarUsuario(companyId: string, data: Partial<Usuario>): Promise<Usuario> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(data.senhaHash || 'filla2026', salt);
        return this.usuarioRepo.save(this.usuarioRepo.create({ ...data, companyId, senhaHash: hash }));
    }

    async atualizarUsuario(companyId: string, id: string, data: Partial<Usuario>): Promise<Usuario | null> {
        if (data.senhaHash) {
            const salt = await bcrypt.genSalt();
            data.senhaHash = await bcrypt.hash(data.senhaHash, salt);
        }
        await this.usuarioRepo.update({ id, companyId }, data);
        return this.usuarioRepo.findOne({ where: { id, companyId } });
    }

    async excluirUsuario(companyId: string, id: string): Promise<void> {
        await this.usuarioRepo.update({ id, companyId }, { ativo: false });
    }

    async criarGuiche(companyId: string, data: Partial<Guiche>): Promise<Guiche> {
        return this.guicheRepo.save(this.guicheRepo.create({ ...data, companyId }));
    }

    async atualizarGuiche(companyId: string, id: string, data: Partial<Guiche>): Promise<Guiche | null> {
        await this.guicheRepo.update({ id, companyId }, data);
        return this.guicheRepo.findOne({ where: { id, companyId } });
    }

    async excluirGuiche(companyId: string, id: string): Promise<void> {
        await this.guicheRepo.update({ id, companyId }, { ativo: false });
    }
}
