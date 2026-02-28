import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface MidiaItem {
    url: string;
    titulo: string;
    tipo: 'image' | 'video';
}

@Entity('painel_config')
export class PainelConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'company_id' })
    companyId: string;

    // MySQL doesn't allow DEFAULT on JSON/BLOB columns — nullable:true, default handled in service
    @Column({ type: 'json', nullable: true })
    midias: MidiaItem[];

    @Column({ name: 'cidade_nome', default: 'São Paulo' })
    cidadeNome: string;

    @Column({ name: 'cidade_lat', type: 'float', default: -23.5505 })
    cidadeLat: number;

    @Column({ name: 'cidade_lon', type: 'float', default: -46.6333 })
    cidadeLon: number;

    @Column({ name: 'dados_financeiros', default: false })
    dadosFinanceiros: boolean;
}
