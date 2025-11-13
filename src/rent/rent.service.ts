import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { CreateRentDto } from './dto/create-rent.dto';
import { RentItemEntity } from './entities/rent-item.entity';
import { RentEntity } from './entities/rent.entity';

@Injectable()
export class RentService {
    constructor(
        @InjectRepository(RentEntity)
        private readonly rentRepo: Repository<RentEntity>,

        @InjectRepository(RentItemEntity)
        private readonly rentItemRepo: Repository<RentItemEntity>,
    ) { }

    async create(dto: CreateRentDto): Promise<RentEntity> {
        const names = dto.items.map(item => item.name.toLowerCase().trim());
        const duplicates = names.filter((name, idx) => names.indexOf(name) !== idx);

        if (duplicates.length > 0) {
            throw new BadRequestException('Não é possível vincular mais de um produto com o mesmo nome em um aluguel');
        }

        const rent = this.rentRepo.create({
            createdAt: new Date(),
            items: dto.items.map(item =>
                this.rentItemRepo.create({
                    name: item.name,
                    quantity: item.quantity,
                    value: item.value,
                }),
            ),
        });

        return await this.rentRepo.save(rent);
    }

    async findAll(startDate?: string, endDate?: string): Promise<
        (RentEntity & {
            totalValue: number;
            items: (RentItemEntity & { valueAdjusted: number })[];
        })[]
    > {
        const where: Record<string, any> = {};

        const isValidDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

        if (startDate) {
            if (!isValidDate(startDate)) {
                throw new BadRequestException('startDate deve estar no formato yyyy-mm-dd');
            }
        }

        if (endDate) {
            if (!isValidDate(endDate)) {
                throw new BadRequestException('endDate deve estar no formato yyyy-mm-dd');
            }
        }

        const start = startDate ? new Date(`${startDate}T00:00:00`) : undefined;
        const end = endDate ? new Date(`${endDate}T23:59:59.999`) : undefined;

        if (start && end) {
            where.createdAt = Between(start, end);
        } else if (start) {
            where.createdAt = MoreThanOrEqual(start);
        } else if (end) {
            where.createdAt = LessThanOrEqual(end);
        }

        const rents = await this.rentRepo.find({
            where,
            relations: ['items'],
            order: { createdAt: 'DESC' },
        });

        return rents.map(rent => {
            const itemsWithAdjustedValue = rent.items.map(item => ({
                ...item,
                valueAdjusted: item.value / 1000,
            }));

            const totalValue =
                rent.items.reduce((acc, item) => acc + item.value * item.quantity, 0) /
                1000;

            return {
                ...rent,
                items: itemsWithAdjustedValue,
                totalValue,
            };
        });
    }



    async findOne(id: string): Promise<RentEntity> {
        const rent = await this.rentRepo.findOne({
            where: { id },
            relations: ['items'],
        });

        if (!rent) {
            throw new BadRequestException(`Rent com id ${id} não encontrada`);
        }

        return rent;
    }

    async remove(id: string): Promise<void> {
        const rent = await this.findOne(id);
        await this.rentRepo.remove(rent);
    }

    async countRents(): Promise<{total: number}> {
        const total = await this.rentRepo.count();
        return { total }
    }

    async countTotalValue(): Promise<{totalValue: number}> {
        const rentItems = await this.rentItemRepo.find();
        const total = rentItems.reduce((total, item) => total += item.quantity * item.value, 0);
        return { totalValue: total / 1000 };
    }
}
