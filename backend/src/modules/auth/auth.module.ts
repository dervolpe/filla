import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Usuario } from '../admin/entities/usuario.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'FillaSuperSecretKey2026',
            signOptions: { expiresIn: '12h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
