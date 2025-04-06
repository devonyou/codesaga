import { InjectRepository } from '@nestjs/typeorm';
import { UserDomain } from '../../domain/user.domain';
import { UserProfileDomain } from '../../domain/user.profile.domain';
import { UserRepositoryPort } from '../../port/out/user.repository.port';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './entity/user.profile.entity';
import { UserEntityMapper } from './mapper/user.entity.mapper';
import { UserProfileEntityMapper } from './mapper/user.profile.entity.mapper';
import { TokenType, UserTokenDomain } from '../../domain/user.token.domain';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { UserTokenEntity } from './entity/user.token.entity';
import { UserTokenEntityMapper } from './mapper/user.token.entity.mapper';

export class UserRepositoryAdapter implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserProfileEntity)
        private readonly userProfileRepository: Repository<UserProfileEntity>,
        @InjectRepository(UserTokenEntity)
        private readonly userTokenRepository: Repository<UserTokenEntity>,
    ) {}

    async findUserById(userId: string): Promise<UserDomain> {
        const result = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['userProfile'],
        });
        if (result) return new UserEntityMapper(result).toDomain();
        else return null;
    }

    async findUserByProviderId(providerId: string): Promise<UserDomain> {
        const result = await this.userRepository.findOne({
            where: { providerId: providerId },
            relations: ['userProfile'],
            // loadEagerRelations: true,
        });
        if (result) return new UserEntityMapper(result).toDomain();
        else return null;
    }

    async createUser(user: UserDomain): Promise<UserDomain> {
        const result = await this.userRepository.save(user);
        return new UserEntityMapper(result).toDomain();
    }

    async createUserProfile(
        userProfile: UserProfileDomain,
    ): Promise<UserProfileDomain> {
        const result = await this.userProfileRepository.save({
            ...userProfile,
            user: {
                id: userProfile.userId,
            },
        });

        const newUserProfile = await this.userProfileRepository.findOne({
            where: { id: result.id },
            relations: ['user'],
        });

        const mapper = new UserProfileEntityMapper(newUserProfile);
        return mapper.toDomain();
    }

    async createUserToken(
        userId: string,
        refreshToken: string,
        tokenType: TokenType,
    ): Promise<UserTokenDomain> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) throw new GrpcNotFoundException('User Not Found');

        const result = await this.userTokenRepository.save({
            token: refreshToken,
            type: tokenType,
            user: {
                id: userId,
            },
        });

        return new UserTokenEntityMapper(result).toDomain();
    }

    async findUserTokenByToken(
        rawToken: string,
        userId: string,
        tokenType: TokenType,
    ): Promise<UserTokenDomain> {
        const result = await this.userTokenRepository.findOne({
            where: {
                token: rawToken,
                user: {
                    id: userId,
                },
                type: tokenType,
            },
            relations: ['user'],
        });
        if (result) return new UserTokenEntityMapper(result).toDomain();
        else return null;
    }
}
