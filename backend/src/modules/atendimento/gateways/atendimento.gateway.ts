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
     * Internal Method to be used by the AtendimentoService.
     * Dispatches the called ticket event uniquely isolated by CompanyID.
     */
    emitirSenhaChamada(companyId: string, atendimento: Partial<Atendimento>, guiche: string) {
        const room = `company_${companyId}`;

        const payload = { ...atendimento, guiche };
        this.server.to(room).emit('senhaChamada', payload);

        this.logger.log(`Senha chamada emitida para a sala ${room}: ${atendimento.senha}`);
    }
}
