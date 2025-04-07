import { InjectModel } from '@nestjs/mongoose';
import { ChatDatabasePort } from '../../port/chat.database.port';
import { ChatRoomDocument } from './document/chat.room.document';
import { Model } from 'mongoose';
import { ChatMessageDocument } from './document/chat.message.document';
import { ChatRoomDomain } from '../../domain/chat.room.domain';
import { UserDomain } from '../../domain/user.domain';

export class ChatModelAdapter implements ChatDatabasePort {
    constructor(
        @InjectModel(ChatRoomDocument.name)
        private readonly chatRoomModel: Model<ChatRoomDocument>,
        @InjectModel(ChatMessageDocument.name)
        private readonly chatMessageModel: Model<ChatMessageDocument>,
    ) {}

    async findManyRooms(userId: string): Promise<ChatRoomDomain[]> {
        const chatRooms = await this.chatRoomModel.find({
            'user.id': userId,
        });

        return chatRooms.map(chatRoom => {
            const chatRoomDomain = new ChatRoomDomain(chatRoom.user);
            chatRoomDomain.setId(chatRoom._id.toString());
            return chatRoomDomain;
        });
    }

    async findChatRoom(roomId: string): Promise<ChatRoomDomain> {
        const result = await this.chatRoomModel.findById(roomId);
        const chatRoom = new ChatRoomDomain(result.user);
        chatRoom.setId(result._id.toString());
        return chatRoom;
    }

    async findOrCreateChatRoom(
        user: UserDomain,
        roomId: string,
    ): Promise<ChatRoomDomain> {
        if (roomId) {
            return await this.findChatRoom(roomId);
        } else {
            const result = await this.chatRoomModel.create({ user: user });
            return await this.findChatRoom(result._id.toString());
        }
    }
}
