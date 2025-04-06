import { UserProfileDomain } from 'apps/auth/src/domain/user.profile.domain';
import { UserProfileEntity } from '../entity/user.profile.entity';

export class UserProfileEntityMapper {
    constructor(private readonly userProfileEntity: UserProfileEntity) {}

    toDomain(): UserProfileDomain {
        return new UserProfileDomain({
            ...this.userProfileEntity,
            userId: this.userProfileEntity.user.id,
        });
    }
}
