import { Injectable } from '@nestjs/common';
import { UserDomain } from '../../domain/user.domain';
import { UserProfileDomain } from '../../domain/user.profile.domain';
import { TokenType, UserTokenDomain } from '../../domain/user.token.domain';

@Injectable()
export abstract class UserRepositoryPort {
    abstract findUserById(userId: string): Promise<UserDomain>;

    abstract createUser(user: UserDomain): UserDomain | Promise<UserDomain>;

    abstract findUserByProviderId(id: string): UserDomain | Promise<UserDomain>;

    abstract createUserProfile(
        userProfile: UserProfileDomain,
    ): Promise<UserProfileDomain>;

    abstract createUserToken(
        userId: string,
        refreshToken: string,
        tokenType: TokenType,
    ): Promise<UserTokenDomain>;

    abstract findUserTokenByToken(
        rawToken: string,
        userId: string,
        tokenType: TokenType,
    ): Promise<UserTokenDomain>;
}
