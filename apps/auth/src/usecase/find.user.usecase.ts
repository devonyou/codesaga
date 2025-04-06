import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../port/out/user.repository.port';
import { UserDomain } from '../domain/user.domain';

@Injectable()
export class FindUserUsecase {
    constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

    async execute(userId: string): Promise<UserDomain> {
        const user = await this.userRepositoryPort.findUserById(userId);
        return user;
    }
}
