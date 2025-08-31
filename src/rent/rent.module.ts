import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { RentItemEntity } from './entities/rent-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity, RentItemEntity])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
