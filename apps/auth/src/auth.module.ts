import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './adapter/application/controller/auth.controller';
import validationSchema from '../common/config/validation.schema';
import { TypeormAdapter } from './adapter/typeorm/typeorm.adapter';
import { UserEntity } from './adapter/typeorm/entity/user.entity';
import { FindOrCreateUserUsecase } from './usecase/findorcreate.user.usecase';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                url: configService.get<string>('DB_URL'),
                autoLoadEntities: true,
                synchronize: true,
                logging: true,
                entities: [UserEntity],
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController],
    providers: [
        FindOrCreateUserUsecase,
        { provide: 'DatabaseOutPort', useClass: TypeormAdapter },
    ],
})
export class AuthModule {}
