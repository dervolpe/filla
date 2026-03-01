import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('locais')
@Index(['companyId'])
export class Local {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descricao: string;

    /** IDs dos serviços habilitados neste local (subconjunto dos serviços da empresa) */
    @Column({ name: 'servicos_ids', type: 'json', nullable: true })
    servicosIds: string[];

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
