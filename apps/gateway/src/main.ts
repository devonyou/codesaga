import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
    ClassSerializerInterceptor,
    Logger,
    ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { HttpExceptionFilter } from '../common/filter/http.exception.filter';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/guard/auth.guard';
import { ThrottleInterceptor } from '../common/interceptor/throttle.interceptor';
import { RedisService } from '@liaoliaots/nestjs-redis';

class Server {
    private configService: ConfigService;
    private HTTP_PORT: number;

    constructor(private app: NestExpressApplication) {
        this.app = app;
        this.init();
    }

    private init() {
        this.configService = this.app.get<ConfigService>(ConfigService);
        this.HTTP_PORT = this.configService.get<number>('HTTP_PORT');

        this.setupSwagger();
        this.setupGlobalInterceptor();
        this.setupGlobalFilter();
        this.setupGlobalGuard();
        this.setupGlobalPipe();
    }

    async start() {
        await this.app.listen(this.HTTP_PORT, '0.0.0.0');
    }

    private setupSwagger() {
        const config = new DocumentBuilder()
            .setTitle(this.configService.get<string>('SWAGGER_TITLE'))
            .setDescription(
                this.configService.get<string>('SWAGGER_DESCRIPTION'),
            )
            .setVersion(this.configService.get<string>('SWAGGER_VERSION'))
            .build();

        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup(
            this.configService.get<string>('SWAGGER_PATH'),
            this.app,
            document,
        );
    }

    private setupGlobalInterceptor() {
        this.app.useGlobalInterceptors(
            new ClassSerializerInterceptor(this.app.get(Reflector)),
        );
        this.app.useGlobalInterceptors(new GrpcToHttpInterceptor());
        this.app.useGlobalInterceptors(
            new ThrottleInterceptor(this.app.get(RedisService)),
        );
    }

    private setupGlobalGuard() {
        this.app.useGlobalGuards(
            new AuthGuard(this.app.get(AuthService), this.app.get(Reflector)),
        );
    }

    private setupGlobalFilter() {
        this.app.useGlobalFilters(new HttpExceptionFilter());
    }

    private setupGlobalPipe() {
        this.app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: false,
            }),
        );
    }
}

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const server = new Server(app);
    await server.start();
}

bootstrap()
    .then(() => {
        if (process.env.NODE_ENV === 'production') {
            process.send('ready');
        }

        new Logger(process.env.NODE_ENV).log(
            `✅ Server on http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`,
        );
    })
    .catch(error => {
        new Logger(process.env.NODE_ENV).error(`❌ Server error ${error}`);
    });
