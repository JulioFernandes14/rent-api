import { ApiProperty } from '@nestjs/swagger';

export class ListRentItemDto {
  @ApiProperty({ type: String, description: 'ID do item' })
  id: string;

  @ApiProperty({ type: String, description: 'Nome do item' })
  name: string;

  @ApiProperty({ type: Number, description: 'Quantidade do item' })
  quantity: number;

  @ApiProperty({ type: Number, description: 'Valor do item em centavos' })
  value: number;
}

export class ListRentResponseDto {
  @ApiProperty({ type: String, description: 'ID do aluguel' })
  id: string;

  @ApiProperty({ type: String, format: 'date-time', description: 'Data de criação do aluguel' })
  createdAt: string;

  @ApiProperty({ type: [ListRentItemDto], description: 'Itens do aluguel' })
  items: ListRentItemDto[];

  @ApiProperty({ type: Number, description: 'Valor total do aluguel em reais' })
  totalValue: number;
}
