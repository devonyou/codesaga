import { ChatRoomDomain } from '../domain/chat.room.domain';
import { UserDomain } from '../domain/user.domain';

export abstract class ChatDatabasePort {
    abstract findManyRooms(userId: string): Promise<ChatRoomDomain[]>;

    abstract findOrCreateChatRoom(
        userId: UserDomain,
        roomId: string,
    ): Promise<ChatRoomDomain>;
}
