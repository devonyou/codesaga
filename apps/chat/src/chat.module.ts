import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from '../common/config/validation.schema';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClients } from '../common/grpc/clients';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ChatRoomDocument,
    ChatRoomSchema,
} from './adapter/mongoose/document/chat.room.document';
import {
    ChatMessageDocument,
    ChatMessageSchema,
} from './adapter/mongoose/document/chat.message.document';
import { ChatController } from './adapter/application/chat.controller';
import { FindManyRoomsUsecase } from './usecase/find.many.rooms.usecase';
import { ChatDatabasePort } from './port/chat.database.port';
import { ChatModelAdapter } from './adapter/mongoose/chat.model.adapter';
import { FindOrCreateChatRoomUsecase } from './usecase/find.or.create.room.usecase';
import { UserGrpcAdapter } from './adapter/grpc/user.grpc.adapter';
import { CreateMessageUsecase } from './usecase/create.message.usecase';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: validationSchema,
        }),

        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [...grpcClients],
        }),

        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('DB_URL'),
            }),
        }),

        MongooseModule.forFeature([
            { name: ChatRoomDocument.name, schema: ChatRoomSchema },
            { name: ChatMessageDocument.name, schema: ChatMessageSchema },
        ]),

        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                config: {
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    password: configService.get<string>('REDIS_PASSWORD'),
                },
            }),
        }),

        HttpModule,
    ],
    controllers: [ChatController],
    providers: [
        FindManyRoomsUsecase,
        FindOrCreateChatRoomUsecase,
        CreateMessageUsecase,
        {
            provide: ChatDatabasePort,
            useClass: ChatModelAdapter,
        },
        {
            provide: UserGrpcAdapter,
            useClass: UserGrpcAdapter,
        },
    ],
})
export class ChatModule {}
