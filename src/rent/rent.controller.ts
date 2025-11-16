import { Controller, Get, Post, Body, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateRentDto } from './dto/create-rent.dto';
import { RentEntity } from './entities/rent.entity';
import { RentService } from './rent.service';
import { CreateRentResponseDto } from './dto/create-rent-response.dto';
import { ListRentResponseDto } from './dto/list-rent-response.dto';
import { RentItemEntity } from './entities/rent-item.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('rents')
@Controller('rents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RentController {
  constructor(private readonly rentService: RentService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todas as locações' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Data inicial (yyyy-mm-dd)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Data final (yyyy-mm-dd)' })
  @ApiResponse({ status: 200, description: 'Lista de locações retornada com sucesso', type: [ListRentResponseDto] })
  async findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<
    (RentEntity & {
      totalValue: number;
      items: (RentItemEntity & { valueAdjusted: number })[];
    })[]
  > {
    return this.rentService.findAll(startDate, endDate);
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
  
  @Get('total')
  @ApiOperation({ summary: 'Retornar a quantidade total de aluguéis armazenados na base' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Data inicial (yyyy-mm-dd)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Data final (yyyy-mm-dd)' })
  @ApiResponse({ status: 200, description: 'Quantidade de aluguéis retornado com sucesso'})
  async countRents(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<{ total: number }> {
    return await this.rentService.countRents(startDate, endDate);
  }
  
  @Get('total-value')
  @ApiOperation({ summary: 'Retornar a quantidade total de aluguéis armazenados na base' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Data inicial (yyyy-mm-dd)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Data final (yyyy-mm-dd)' })
  @ApiResponse({ status: 200, description: 'Quantidade de aluguéis retornado com sucesso'})
  async countTotalValue(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<{ totalValue: number }> {
    return await this.rentService.countTotalValue(startDate, endDate);
  }
}
