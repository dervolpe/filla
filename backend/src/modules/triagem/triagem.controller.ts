import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { TriagemService } from './triagem.service';

class GerarSenhaDto {
    companyId: string;
    servicoId: string;
    prioridade: 'NORMAL' | 'PREFERENCIAL' | 'URGENCIA';
}

@Controller('triagem')
export class TriagemController {
    constructor(private readonly triagemService: TriagemService) { }

    @Post('gerar')
    async gerarSenha(
        @Body() body: GerarSenhaDto,
    ) {
        return this.triagemService.gerarSenha(body.companyId, body.servicoId, body.prioridade);
    }
}
