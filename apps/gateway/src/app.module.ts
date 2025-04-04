import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import validationSchema from '../common/config/validation.schema';
import { grpcClients } from '../common/grpc/clients';

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

        AuthModule,
    ],
})
export class AppModule {}
