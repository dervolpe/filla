import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('servicos')
@Index(['companyId'])
@Index(['departamentoId'])
export class Servico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    @Column({ name: 'departamento_id', type: 'uuid' })
    departamentoId: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descricao: string;

    // SLA (Tempo médio de atendimento tolerado em minutos)
    @Column({ name: 'sla_minutos', type: 'int', default: 15 })
    slaMinutos: number;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
