import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from '../common/config/validation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CodesagaController } from './adapter/application/controller/codesaga.controller';
import { CreateCodesagaUsecase } from './usecase/create.codesaga.usecase';
import { CodesagaDatabasePort } from './port/codesaga.database.port';
import { CodesagaModelAdapter } from './adapter/mongoose/codesaga.model.adapter';
import {
    CodesagaRequestDocument,
    CodesagaRequestSchema,
} from './adapter/mongoose/document/codesaga.request.document';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClients } from '../common/grpc/clients';
import { UserTransportPort } from './port/user.transport.port';
import { UserGrpcAdapter } from './adapter/grpc/user.grpc.adapter';
import { LlamaGrpcAdapter } from './adapter/grpc/llama.grpc.adapter';
import { LlamaTransportPort } from './port/llama.transport.port';
import { FindCodesagaUsecase } from './usecase/find.codesaga.usecase';
import { UpdateCodesagaUsecase } from './usecase/update.codesaga.usecase';

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
                name: CodesagaRequestDocument.name,
                schema: CodesagaRequestSchema,
            },
        ]),
    ],
    controllers: [CodesagaController],
    providers: [
        CreateCodesagaUsecase,
        UpdateCodesagaUsecase,
        FindCodesagaUsecase,
        { provide: CodesagaDatabasePort, useClass: CodesagaModelAdapter },
        { provide: UserTransportPort, useClass: UserGrpcAdapter },
        { provide: LlamaTransportPort, useClass: LlamaGrpcAdapter },
    ],
})
export class CodesagaModule {}
