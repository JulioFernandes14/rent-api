import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentItemEntity } from "./rent-item.entity";

@Entity('rents')
export class RentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name:'created_at', nullable: false })
    createdAt: Date;

    @OneToMany(() => RentItemEntity, item => item.rent, { cascade: true })
    items: RentItemEntity[];
}