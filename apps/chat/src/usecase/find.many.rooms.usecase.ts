import { Injectable } from '@nestjs/common';
import { ChatDatabasePort } from '../port/chat.database.port';

@Injectable()
export class FindManyRoomsUsecase {
    constructor(private readonly chatdDatabasePort: ChatDatabasePort) {}

    execute(userId: string) {
        return this.chatdDatabasePort.findManyRooms(userId);
    }
}
