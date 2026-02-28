import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('departamentos')
@Index(['companyId'])
export class Departamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    @Column({ type: 'varchar', length: 100 })
    nome: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descricao: string;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
