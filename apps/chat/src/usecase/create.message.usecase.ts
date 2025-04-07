import { Injectable } from '@nestjs/common';
import { ChatDatabasePort } from '../port/chat.database.port';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CreateMessageUsecase {
    private redis: Redis;

    constructor(
        private readonly chatDatabasePort: ChatDatabasePort,
        private readonly redisService: RedisService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.redis = this.redisService.getOrThrow();
    }

    async execute(userId: string, message: string, roomId: string) {
        const ai_url = this.configService.get<string>('AI_URL');
        const ai_model = this.configService.get<string>('AI_MODEL');

        const stream = this.httpService.post(
            ai_url,
            {
                model: ai_model,
                prompt: message,
                max_tokens: 10,
                stream: true,
            },
            {
                responseType: 'stream',
            },
        );
        const response = await firstValueFrom(stream);

        for await (const chunk of response.data) {
            const message = JSON.parse(chunk.toString());
            if (message.response) {
                // console.log(message.response, userId, roomId);
                this.redis.publish(`chat:${roomId}`, message.response);
            }
        }
    }
}
