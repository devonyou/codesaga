import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validateionSchema from './common/config/validateion.schema';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: validateionSchema,
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
