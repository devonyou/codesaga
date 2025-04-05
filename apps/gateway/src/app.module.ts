import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import validationSchema from '../common/config/validation.schema';
import { grpcClients } from '../common/grpc/clients';
import { HttpLoggerMiddleware } from '../common/middleware/http.logger.middelware';

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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}
