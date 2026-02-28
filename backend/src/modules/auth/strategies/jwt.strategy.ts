import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'FillaSuperSecretKey2026',
        });
    }

    async validate(payload: any) {
        // This payload will be injected into request.user for endpoints that use JwtAuthGuard
        return {
            userId: payload.sub,
            email: payload.email,
            companyId: payload.companyId,
            role: payload.role
        };
    }
}
