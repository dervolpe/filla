import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum RoleTipo {
    ADMIN = 'ADMIN',
    ATENDENTE = 'ATENDENTE',
    GERENTE = 'GERENTE'
}

@Entity('usuarios')
@Index(['companyId'])
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    @Column({ type: 'varchar', length: 150 })
    nome: string;

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    senhaHash: string;

    @Column({
        type: 'enum',
        enum: RoleTipo,
        default: RoleTipo.ATENDENTE,
    })
    role: RoleTipo;

    @Column({ name: 'departamentos_ids', type: 'simple-array', nullable: true })
    departamentosIds: string[];

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
