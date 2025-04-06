import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './adapter/application/controller/auth.controller';
import validationSchema from '../common/config/validation.schema';
import { UserEntity } from './adapter/typeorm/entity/user.entity';
import { FindOrCreateUserUsecase } from './usecase/findorcreate.user.usecase';
import { IssueTokenUsecase } from './usecase/issue.token.usecase';
import { JwtTokenAdapter } from './adapter/jwt/jwt.token.adapter';
import { JwtService } from '@nestjs/jwt';
import { VerifyTokenUsecase } from './usecase/verify.token.usecase';
import { UserProfileEntity } from './adapter/typeorm/entity/user.profile.entity';
import { UserRepositoryAdapter } from './adapter/typeorm/user.repository.adapter';
import { TokenOutPort } from './port/out/token.out.port';
import { UserRepositoryPort } from './port/out/user.repository.port';
import { UserTokenEntity } from './adapter/typeorm/entity/user.token.entity';
import { FindUserUsecase } from './usecase/find.user.usecase';

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
                logging: false,
                entities: [UserEntity, UserProfileEntity, UserTokenEntity],
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            UserEntity,
            UserProfileEntity,
            UserTokenEntity,
        ]),
    ],
    controllers: [AuthController],
    providers: [
        JwtService,
        FindOrCreateUserUsecase,
        IssueTokenUsecase,
        VerifyTokenUsecase,
        FindUserUsecase,
        { provide: TokenOutPort, useClass: JwtTokenAdapter },
        { provide: UserRepositoryPort, useClass: UserRepositoryAdapter },
    ],
})
export class AuthModule {}
