import { UserDomain } from 'apps/auth/src/domain/user.domain';
import { UserEntity } from '../entity/user.entity';
import { UserProfileDomain } from 'apps/auth/src/domain/user.profile.domain';

export class UserEntityMapper {
    constructor(private readonly userEntity: UserEntity) {}

    toDomain(): UserDomain {
        const user = new UserDomain({
            ...this.userEntity,
        });

        if (this.userEntity.id) {
            user.setId(this.userEntity.id);
        }

        if (this.userEntity.userProfile) {
            const userProfile = new UserProfileDomain({
                ...this.userEntity.userProfile,
                userId: this.userEntity.id,
            });
            user.setUserProfile(userProfile);
        }

        return user;
    }
}
