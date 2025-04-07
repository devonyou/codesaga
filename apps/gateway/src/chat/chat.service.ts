import { ChatMicroService } from '@app/common';
import { CHAT_SERVICE_NAME } from '@app/common/grpc/proto/chat';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';
import { CreateChatDto } from './dto/create.chat.dto';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class ChatService implements OnModuleInit {
    private clients = new Map<string, Socket>();
    private chatService: ChatMicroService.ChatServiceClient;
    private redis: Redis;

    constructor(
        @Inject(CHAT_SERVICE_NAME)
        private readonly chatMicroService: ClientGrpc,
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getOrThrow();
    }

    onModuleInit() {
        this.chatService = this.chatMicroService.getService(CHAT_SERVICE_NAME);
    }

    registerClient(userId: string, client: Socket) {
        // const key = `${userId}_${client.id}`;
        this.clients.set(userId, client);
    }

    removeClient(userId: string, client: Socket) {
        // const key = `${userId}_${client.id}`;
        this.clients.delete(userId);
    }

    async joinRoom(userId: string, client: any) {
        const stream = this.chatService.findManyRooms({
            userId,
        });
        const resp = await lastValueFrom(stream);
        if (resp.rooms) {
            resp.rooms.forEach(room => {
                client.join(room.id);
                this.subscribeToRoomMessages(room.id, userId);
            });
        }
    }

    async findOrCreateChatRoom(userId: string, roomId: string) {
        const stream = await this.chatService.findOrCreateChatRoom({
            userId,
            roomId,
        });
        const resp = await lastValueFrom(stream);
        return resp.room;
    }

    async createMessage(userId: string, dto: CreateChatDto) {
        try {
            const { message, roomId } = dto;
            const chatRoom = await this.findOrCreateChatRoom(userId, roomId);
            const stream = this.chatService.createMessage({
                userId,
                message,
                roomId: chatRoom.id,
            });
            await lastValueFrom(stream);
        } catch (err) {
            console.log(err);
        }
    }

    private subscribeToRoomMessages(roomId: string, userId: string) {
        this.redis.subscribe(`chat:${roomId}`, (err, count) => {
            if (err) {
                console.error(`Redis 구독 실패: ${err.message}`);
                return;
            }
            console.log(
                `Redis 구독 성공: 채팅방 ${roomId} (총 ${count}개 채널 구독)`,
            );
        });

        this.redis.on('message', (channel, message) => {
            if (channel === `chat:${roomId}`) {
                const client = this.clients.get(userId);
                client.emit('new-message', message);
            }
        });
    }
}
