import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './entities/api-key.entity';
import { ApiKeyService } from './api-key.service';
import { ApiKeyAdminController } from './api-key-admin.controller';
import { ApiKeyGuard } from './guards/api-key.guard';
import { V1Controller } from './v1.controller';

// Imports das dependências que o V1Controller usa
import { Atendimento } from '../atendimento/entities/atendimento.entity';
import { Servico } from '../admin/entities/servico.entity';
import { Local } from '../admin/entities/local.entity';
import { TriagemModule } from '../triagem/triagem.module';
import { AtendimentoModule } from '../atendimento/atendimento.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ApiKey, Atendimento, Servico, Local]),
        TriagemModule,
        AtendimentoModule,
    ],
    controllers: [ApiKeyAdminController, V1Controller],
    providers: [ApiKeyService, ApiKeyGuard],
    exports: [ApiKeyService, ApiKeyGuard],
})
export class ApiModule { }
