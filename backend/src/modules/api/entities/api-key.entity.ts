import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('api_keys')
@Index(['chave'], { unique: true })
@Index(['companyId'])
export class ApiKey {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id', type: 'uuid' })
    companyId: string;

    /** Nome descritivo para identificar a chave */
    @Column({ type: 'varchar', length: 100 })
    nome: string;

    /** Chave pública (prefixo filla_ + 32 chars random) — armazenada em plain text pois é a "senha" do client */
    @Column({ type: 'varchar', length: 100, unique: true })
    chave: string;

    /**
     * Permissões concedidas a esta chave.
     * Valores possíveis: fila:read, fila:write, atendimento:write, admin:full
     */
    @Column({ type: 'json', nullable: true })
    permissoes: string[];

    @Column({ default: true })
    ativo: boolean;

    @Column({ name: 'ultimo_uso_em', type: 'timestamp', nullable: true })
    ultimoUsoEm: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
