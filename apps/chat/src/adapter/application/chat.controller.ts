import { ChatMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { FindManyRoomsUsecase } from '../../usecase/find.many.rooms.usecase';
import { FindOrCreateChatRoomUsecase } from '../../usecase/find.or.create.room.usecase';
import { Metadata } from '@grpc/grpc-js';
import { CreateMessageUsecase } from '../../usecase/create.message.usecase';

@Controller()
@ChatMicroService.ChatServiceControllerMethods()
export class ChatController implements ChatMicroService.ChatServiceController {
    constructor(
        private readonly findManyRoomsUsecase: FindManyRoomsUsecase,
        private readonly findOrCreateChatRoomUsecase: FindOrCreateChatRoomUsecase,
        private readonly createMessageUsecase: CreateMessageUsecase,
    ) {}

    async findManyRooms(
        request: ChatMicroService.FindManyRoomsRequest,
    ): Promise<ChatMicroService.FindManyRoomsResponse> {
        return {
            rooms: await this.findManyRoomsUsecase.execute(request.userId),
        };
    }

    async findOrCreateChatRoom(
        request: ChatMicroService.FindOrCreateChatRoomRequest,
    ): Promise<ChatMicroService.FindOrCreateChatRoomResponse> {
        return {
            room: await this.findOrCreateChatRoomUsecase.execute(
                request.userId,
                request.roomId,
            ),
        };
    }

    async createMessage(
        request: ChatMicroService.CreateMessageRequest,
    ): Promise<ChatMicroService.CreateMessageResponse> {
        const { userId, message, roomId } = request;
        await this.createMessageUsecase.execute(userId, message, roomId);
        return null;
    }
}
