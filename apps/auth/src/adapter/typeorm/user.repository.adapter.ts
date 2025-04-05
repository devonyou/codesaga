import { InjectRepository } from '@nestjs/typeorm';
import { UserDomain } from '../../domain/user.domain';
import { UserProfileDomain } from '../../domain/user.profile.domain';
import { UserRepositoryPort } from '../../port/out/user.repository.port';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserProfileEntity } from './entity/user.profile.entity';
import { UserEntityMapper } from './mapper/user.entity.mapper';
import { UserProfileEntityMapper } from './mapper/user.profile.entity.mapper';

export class UserRepositoryAdapter implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserProfileEntity)
        private readonly userProfileRepository: Repository<UserProfileEntity>,
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
}
