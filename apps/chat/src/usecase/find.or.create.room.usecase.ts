import { Inject } from '@nestjs/common';
import { UserGrpcAdapter } from '../adapter/grpc/user.grpc.adapter';
import { ChatRoomDomain } from '../domain/chat.room.domain';
import { ChatDatabasePort } from '../port/chat.database.port';
import { UserTransportPort } from '../port/user.transport.port';

export class FindOrCreateChatRoomUsecase {
    constructor(
        private readonly chatdDatabasePort: ChatDatabasePort,
        @Inject(UserGrpcAdapter)
        private readonly userTransportPort: UserTransportPort,
    ) {}

    async execute(userId: string, roomId: string): Promise<ChatRoomDomain> {
        const user = await this.userTransportPort.findUserById(userId);
        return this.chatdDatabasePort.findOrCreateChatRoom(user, roomId);
    }
}
