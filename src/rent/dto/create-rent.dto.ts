import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, Min, ValidateNested } from 'class-validator';

export class CreateRentItemDto {
  @ApiProperty({ example: 'Cadeira de plástico' })
  @IsNotEmpty({ message: 'O nome do item é obrigatório' })
  name: string;

  @ApiProperty({ example: 10 })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade mínima é 1' })
  quantity: number;

  @ApiProperty({ example: 25 })
  @IsInt({ message: 'O valor deve ser um número inteiro' })
  @Min(0, { message: 'O valor não pode ser negativo' })
  value: number;
}

export class CreateRentDto {
  @ApiProperty({
    type: [CreateRentItemDto],
    description: 'Lista de itens da locação',
  })
  @IsArray({ message: 'Itens deve ser um array' })
  @ValidateNested({ each: true })
  @Type(() => CreateRentItemDto)
  items: CreateRentItemDto[];
}