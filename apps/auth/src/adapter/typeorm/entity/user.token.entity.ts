import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { TokenType } from 'apps/auth/src/domain/user.token.domain';

@Entity('user_token')
export class UserTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column({
        enum: TokenType,
        type: 'enum',
        nullable: false,
    })
    type: TokenType;

    @ManyToOne(() => UserEntity, user => user.tokens)
    user: UserEntity;
}
