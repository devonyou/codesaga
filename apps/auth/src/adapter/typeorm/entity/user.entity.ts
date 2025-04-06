import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { UserProfileEntity } from './user.profile.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'apps/auth/src/domain/user.domain';
import { UserTokenEntity } from './user.token.entity';

@Entity('user')
@Unique(['providerId'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: Role.USER,
        type: 'enum',
        enum: Role,
        nullable: false,
    })
    role: Role;

    @Column()
    provider: string;

    @Column()
    providerId: string;

    @Column()
    nodeId: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;

    @VersionColumn()
    @Exclude()
    version: number;

    @OneToOne(() => UserProfileEntity, userProfile => userProfile.user)
    userProfile: UserProfileEntity;

    @OneToMany(() => UserTokenEntity, token => token.user)
    tokens: UserTokenEntity[];
}
