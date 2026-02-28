import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { Servico } from './entities/servico.entity';
import { Usuario } from './entities/usuario.entity';
import { Guiche } from './entities/guiche.entity';
import { PainelConfig } from './entities/painel-config.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Atendimento } from '../atendimento/entities/atendimento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Departamento, Servico, Usuario, Guiche, Atendimento, PainelConfig])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
