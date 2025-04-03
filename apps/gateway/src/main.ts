import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class Server {
    private logger = new Logger('SERVER');
    private configService: ConfigService;
    private HTTP_HOST: string;
    private HTTP_PORT: number;

    constructor(private app: NestExpressApplication) {
        this.app = app;
        this.init();
    }

    private init() {
        this.configService = this.app.get<ConfigService>(ConfigService);
        this.HTTP_HOST = this.configService.get<string>('HTTP_HOST');
        this.HTTP_PORT = this.configService.get<number>('HTTP_PORT');

        this.setupSwagger();
    }

    async start() {
        await this.app.listen(this.HTTP_PORT, '0.0.0.0');
    }

    private setupSwagger() {
        try {
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
        } catch (error) {
            this.logger.error(error);
        }
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
        new Logger(process.env.NODE_ENV).error(`🆘 Server error ${error}`);
    });
