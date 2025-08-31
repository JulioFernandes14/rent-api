import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentEntity } from "./rent.entity";

@Entity('rent_item')
export class RentItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, type: 'int' })
    quantity: number;

    @Column({ nullable: false, type: 'int' })
    value: number;

    @ManyToOne(() => RentEntity, rent => rent.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rent_id' })
    rent: RentEntity;
}