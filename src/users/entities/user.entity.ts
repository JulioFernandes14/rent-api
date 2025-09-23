import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name:'username', nullable: false, unique: true })
    username: string;

    @Column({ name:'email', nullable: false, unique: true })
    email: string;

    @Column({ name:'password', nullable: false })
    password: string;

    @Column({ name:'created_at', nullable: false })
    createdAt: Date;
}