import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Atendimento } from '../entities/atendimento.entity';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: '/fila',
})
export class AtendimentoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(AtendimentoGateway.name);

    handleConnection(client: Socket) {
        this.logger.log(`Cliente conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Cliente desconectado: ${client.id}`);
    }

    /**
     * Monitor clients and Operators will join a specific company room
     * to guarantee Multi-Tenancy segregation over WebSockets
     */
    @SubscribeMessage('joinCompanyRoom')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { companyId: string },
    ) {
        const room = `company_${payload.companyId}`;
        client.join(room);
        this.logger.log(`Cliente ${client.id} entrou na sala ${room}`);
        return { event: 'joined', room };
    }

    /**
     * Permite que clientes entrem na sala de um local específico.
     * Usado pelo Monitor e Atendente quando localId está presente na URL.
     */
    @SubscribeMessage('joinLocalRoom')
    handleJoinLocalRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { localId: string },
    ) {
        const room = `local_${payload.localId}`;
        client.join(room);
        this.logger.log(`Cliente ${client.id} entrou na sala ${room}`);
        return { event: 'joined', room };
    }

    /**
     * Internal Method to be used by the AtendimentoService.
     * Dispatches the called ticket event uniquely isolated by CompanyID.
     * Also emits to the local room if the ticket has a localId.
     */
    emitirSenhaChamada(companyId: string, atendimento: Partial<Atendimento>, guiche: string) {
        const payload = { ...atendimento, guiche };

        // Emite para sala da empresa (todos os monitors)
        this.server.to(`company_${companyId}`).emit('senhaChamada', payload);

        // Emite também para sala do local (monitor filtrado por local)
        if ((atendimento as any).localId) {
            this.server.to(`local_${(atendimento as any).localId}`).emit('senhaChamada', payload);
        }

        this.logger.log(`Senha chamada emitida: ${atendimento.senha} (company: ${companyId}, local: ${(atendimento as any).localId || 'n/a'})`);
    }
}
