import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TriagemService } from './triagem.service';
import { TriagemController } from './triagem.controller';
import { Atendimento } from '../atendimento/entities/atendimento.entity';
import { AtendimentoModule } from '../atendimento/atendimento.module';

import { Servico } from '../admin/entities/servico.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Atendimento, Servico]),
        AtendimentoModule // Para podermos emitir o websocket após a triagem, caso necessário
    ],
    controllers: [TriagemController],
    providers: [TriagemService],
})
export class TriagemModule { }
