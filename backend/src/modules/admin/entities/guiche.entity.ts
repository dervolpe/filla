import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('guiches')
export class Guiche {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    @Column({ type: 'varchar', length: 10 })
    numero: string;

    @Column({ default: true })
    ativo: boolean;

    @Column({ name: 'atendente_atual_id', type: 'uuid', nullable: true })
    atendenteAtualId: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
