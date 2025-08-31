import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateRentDto } from './dto/create-rent.dto';
import { RentEntity } from './entities/rent.entity';
import { RentService } from './rent.service';
import { CreateRentResponseDto } from './dto/create-rent-response.dto';
import { ListRentResponseDto } from './dto/list-rent-response.dto';
import { RentItemEntity } from './entities/rent-item.entity';

@ApiTags('rents')
@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todas as locações' })
  @ApiResponse({ status: 200, description: 'Lista de locações retornada com sucesso', type: [ListRentResponseDto] })
  async findAll(): Promise<
    (RentEntity & {
      totalValue: number;
      items: (RentItemEntity & { valueAdjusted: number })[];
    })[]
  > {
    return this.rentService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova locação com itens' })
  @ApiResponse({ status: 201, description: 'Locação criada com sucesso', type: CreateRentResponseDto })
  async create(@Body() dto: CreateRentDto): Promise<RentEntity> {
    return this.rentService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma locação pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'UUID da locação' })
  @ApiResponse({ status: 200, description: 'Locação removida com sucesso' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.rentService.remove(id);
  }
}
