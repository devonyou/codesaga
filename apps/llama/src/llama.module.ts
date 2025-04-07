import { Module } from '@nestjs/common';
import { LLaMAController } from './adapter/applicatoin/controller/llama.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from '../common/config/validation.schema';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClients } from '../common/grpc/clients';
import { MongooseModule } from '@nestjs/mongoose';
import {
    LlamaRequestDocument,
    LlamaRequestSchema,
} from './adapter/mongoose/document/llama.request.document';
import { CreateLLamaRequestUsecase } from './usecase/create.llama.request.usecase';
import { HttpModule } from '@nestjs/axios';
import { LlamaDatabasePort } from './port/llama.database.port';
import { LlamaModelAdapter } from './adapter/mongoose/llama.model.adapter';
import { LlamaAiPort } from './port/llama.ai.port';
import { LlamaAiAxiosAdapter } from './adapter/http/llama.ai.axios.adapter';
import { CodesagaTransportPort } from './port/codesaga.transport.port';
import { CodesagaGrpcAdapter } from './adapter/grpc/codesaga.grpc.adapter';
import { UserTransportPort } from './port/user.transport.port';
import { UserGrpcAdapter } from './adapter/grpc/user.grpc.adapter';

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
            {
                name: LlamaRequestDocument.name,
                schema: LlamaRequestSchema,
            },
        ]),
        HttpModule,
    ],
    controllers: [LLaMAController],
    providers: [
        CreateLLamaRequestUsecase,
        {
            provide: LlamaDatabasePort,
            useClass: LlamaModelAdapter,
        },
        {
            provide: LlamaAiPort,
            useClass: LlamaAiAxiosAdapter,
        },
        {
            provide: CodesagaTransportPort,
            useClass: CodesagaGrpcAdapter,
        },
        {
            provide: UserTransportPort,
            useClass: UserGrpcAdapter,
        },
    ],
})
export class LlamaModule {}
