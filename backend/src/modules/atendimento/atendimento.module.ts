import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atendimento } from './entities/atendimento.entity';
import { Guiche } from '../admin/entities/guiche.entity';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoController } from './atendimento.controller';
import { AtendimentoGateway } from './gateways/atendimento.gateway';
import { GuicheController } from './guiche.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Atendimento, Guiche])],
    controllers: [AtendimentoController, GuicheController],
    providers: [AtendimentoService, AtendimentoGateway],
    exports: [AtendimentoService, AtendimentoGateway],
})
export class AtendimentoModule { }
