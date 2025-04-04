import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

@Entity()
@Unique(['providerId'])
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column()
    providerId: string;

    @Column()
    name: string;

    @Column()
    nodeId: string;

    @Column()
    avartarUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version: number;
}
