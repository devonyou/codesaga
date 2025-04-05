import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import validationSchema from '../common/config/validation.schema';
import { grpcClients } from '../common/grpc/clients';
import { HttpLoggerMiddleware } from '../common/middleware/http.logger.middelware';
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

        AuthModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes('*');
    }
}
