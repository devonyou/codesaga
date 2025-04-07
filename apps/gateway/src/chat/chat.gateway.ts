import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { CreateChatDto } from './dto/create.chat.dto';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/dto/jwt.payload';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly authService: AuthService,
        private readonly chatService: ChatService,
    ) {}

    async handleConnection(client: any, ...args: any[]) {
        try {
            const rawToken: string = client?.handshake?.headers?.authorization;
            const [_, jwtToken] = rawToken.split(' ');
            const user = await this.authService.verifyToken(jwtToken, false);

            client.data.user = user as JwtPayload;

            this.chatService.registerClient(user.sub, client);
            await this.chatService.joinRoom(user.sub, client);
        } catch (err) {
            client.disconnect();
        }
    }

    handleDisconnect(client: any) {
        const user = client?.data?.user;
        if (user?.sub) this.chatService.removeClient(user.id, client);
    }

    @SubscribeMessage('codesaga')
    async handleMessage(
        @MessageBody() dto: CreateChatDto,
        @ConnectedSocket() client: Socket,
    ) {
        const { sub } = client?.data?.user as JwtPayload;
        return await this.chatService.createMessage(sub, dto);
    }
}
