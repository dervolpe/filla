import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

export enum AtendimentoStatus {
    EM_ESPERA = 'EM_ESPERA',
    CHAMADO = 'CHAMADO',
    EM_ATENDIMENTO = 'EM_ATENDIMENTO',
    ENCERRADO = 'ENCERRADO',
    CANCELADO = 'CANCELADO',
    NAO_COMPARECEU = 'NAO_COMPARECEU'
}

export enum PrioridadeTipo {
    NORMAL = 'NORMAL',
    PREFERENCIAL = 'PREFERENCIAL',
    URGENCIA = 'URGENCIA'
}

@Entity('atendimentos')
@Index(['companyId', 'status']) // Index for efficiently querying the current queue per company
export class Atendimento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // MULTI-TENANCY: Shared Database strategy by segregating via company_id
    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    // Ticket identifier. E.g., 'A001', 'P005'
    @Column({ type: 'varchar', length: 20 })
    senha: string;

    @Column({
        type: 'enum',
        enum: PrioridadeTipo,
        default: PrioridadeTipo.NORMAL,
    })
    prioridade: PrioridadeTipo;

    @Column({
        type: 'enum',
        enum: AtendimentoStatus,
        default: AtendimentoStatus.EM_ESPERA,
    })
    status: AtendimentoStatus;

    // Timestamps to evaluate SLAs, metrics, and business rules
    @CreateDateColumn({ name: 'data_chegada' })
    dataChegada: Date;

    @Column({ name: 'data_chamada', type: 'timestamp', nullable: true })
    dataChamada: Date;

    @Column({ name: 'data_inicio_atendimento', type: 'timestamp', nullable: true })
    dataInicioAtendimento: Date;

    @Column({ name: 'data_encerramento', type: 'timestamp', nullable: true })
    dataEncerramento: Date;

    // Relationships (Foreign keys represented as string UUIDs for modularity)
    @Column({ name: 'servico_id', type: 'uuid' })
    servicoId: string;

    @Column({ name: 'departamento_id', type: 'uuid', nullable: true })
    departamentoId: string;

    @Column({ name: 'local_id', type: 'uuid', nullable: true })
    localId: string;

    @Column({ name: 'atendente_id', type: 'uuid', nullable: true })
    atendenteId: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
