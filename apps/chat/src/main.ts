import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ChatModule } from './chat.module';

async function bootstrap() {
    const app = await NestFactory.create(ChatModule);
    const configService = app.get(ConfigService);
    const GRPC_HOST = configService.get<string>('GRPC_HOST');
    const GRPC_PORT = configService.get<number>('GRPC_PORT');

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            url: `${GRPC_HOST}:${GRPC_PORT}`,
            package: 'chat',
            protoPath: join(process.cwd(), 'proto', 'chat.proto'),
        },
    });

    await app.init();
    await app.startAllMicroservices();
}
bootstrap();
