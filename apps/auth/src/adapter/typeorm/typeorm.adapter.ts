import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDomain } from '../../domain/user.domain';
import { UserEntity } from './entity/user.entity';
import { UserEntityMapper } from './mapper/user.entity.mapper';
import { DatabaseOutPort } from '../../port/out/database.out.port';

export class TypeormAdapter implements DatabaseOutPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findUserByProviderId(providerId: string): Promise<UserDomain> {
        const user = await this.userRepository.findOneBy({ providerId });
        if (user) return new UserEntityMapper(user).toDomain();
        else return null;
    }

    async createUser(user: UserDomain): Promise<UserDomain> {
        return await this.userRepository.save(user);
    }
}
