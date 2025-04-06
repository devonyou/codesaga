import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_profile')
export class UserProfileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    avartarUrl: string;

    @OneToOne(() => UserEntity, user => user.userProfile)
    @JoinColumn()
    user: UserEntity;
}
