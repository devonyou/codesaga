import { UserDomain } from 'apps/auth/src/domain/user.domain';
import { UserEntity } from '../entity/user.entity';

export class UserEntityMapper {
    constructor(private readonly userEntity: UserEntity) {}

    toDomain(): UserDomain {
        const user = new UserDomain({
            provider: this.userEntity.provider,
            providerId: this.userEntity.providerId,
            name: this.userEntity.name,
            nodeId: this.userEntity.nodeId,
            avartarUrl: this.userEntity.avartarUrl,
        });
        user.setId(this.userEntity.id);

        return user;
    }
}
