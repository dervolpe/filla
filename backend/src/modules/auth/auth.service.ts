import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../admin/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepo: Repository<Usuario>,
        private readonly jwtService: JwtService,
    ) { }

    async login(email: string, senhaPlano: string) {
        const usuario = await this.usuarioRepo.findOne({ where: { email, ativo: true } });

        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas ou usuário inativo.');
        }

        const isPasswordValid = await bcrypt.compare(senhaPlano, usuario.senhaHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        const payload = {
            email: usuario.email,
            sub: usuario.id,
            companyId: usuario.companyId,
            role: usuario.role
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
                companyId: usuario.companyId,
                departamentosIds: usuario.departamentosIds
            }
        };
    }
}
