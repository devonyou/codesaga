import { UserTokenDomain } from 'apps/auth/src/domain/user.token.domain';
import { UserTokenEntity } from '../entity/user.token.entity';

export class UserTokenEntityMapper {
    constructor(private readonly userTokenEntity: UserTokenEntity) {}
    toDomain(): UserTokenDomain {
        return new UserTokenDomain({
            token: this.userTokenEntity.token,
            type: this.userTokenEntity.type,
            userId: this.userTokenEntity.user.id,
        });
    }
}
