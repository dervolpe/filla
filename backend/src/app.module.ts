import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Atendimento } from './modules/atendimento/entities/atendimento.entity';
// Importação do Gateway e Modulo de atendimento
import { AtendimentoModule } from './modules/atendimento/atendimento.module';
import { TriagemModule } from './modules/triagem/triagem.module';
import { AdminModule } from './modules/admin/admin.module';
import { Departamento } from './modules/admin/entities/departamento.entity';
import { Servico } from './modules/admin/entities/servico.entity';
import { Usuario } from './modules/admin/entities/usuario.entity';
import { Guiche } from './modules/admin/entities/guiche.entity';
import { AuthModule } from './modules/auth/auth.module';
import { PainelConfig } from './modules/admin/entities/painel-config.entity';
import { Local } from './modules/admin/entities/local.entity';
import { ApiModule } from './modules/api/api.module';
import { ApiKey } from './modules/api/entities/api-key.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '162.241.203.236',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'previd39_filla_saas',
      password: process.env.DB_PASS || 'T0l3r@nc1@',
      database: process.env.DB_NAME || 'previd39_filla_saas',
      entities: [Atendimento, Departamento, Servico, Usuario, Guiche, PainelConfig, Local, ApiKey],
      synchronize: true, // Auto-create tables on Dev. (Turn off for Prod!)
    }),
    AtendimentoModule,
    TriagemModule,
    AdminModule,
    AuthModule,
    ApiModule,  // API pública com autenticação por API Key
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
