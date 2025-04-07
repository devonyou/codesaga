import { AuthMicroService, LlamaMicroService } from '@app/common';
import { AUTH_SERVICE_NAME } from '@app/common/grpc/proto/auth';
import { LLAMA_SERVICE_NAME } from '@app/common/grpc/proto/llama';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClients: ClientsProviderAsyncOptions[] = [
    {
        name: AUTH_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
                package: AuthMicroService.protobufPackage,
                url: `${configService.get<string>('AUTH_GRPC_HOST')}:${configService.get<number>('AUTH_GRPC_PORT')}`,
                protoPath: join(process.cwd(), 'proto', 'auth.proto'),
            },
        }),
    },
    {
        name: LLAMA_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
                package: LlamaMicroService.protobufPackage,
                url: `${configService.get<string>('LLAMA_GRPC_HOST')}:${configService.get<number>('LLAMA_GRPC_PORT')}`,
                protoPath: join(process.cwd(), 'proto', 'llama.proto'),
            },
        }),
    },
];
