import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validateionSchema from './common/config/validateion.schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: validateionSchema,
        }),
    ],
    controllers: [],
})
export class AppModule {}
