import { ApiProperty } from '@nestjs/swagger';

export class CreateRentItemResponseDto {
  @ApiProperty({ example: '1bf4b98b-0b25-41ae-835a-0a2c77ec44bf' })
  id: string;

  @ApiProperty({ example: 'Kit louça 1' })
  name: string;

  @ApiProperty({ example: 5 })
  quantity: number;

  @ApiProperty({ example: 25 })
  value: number;
}

export class CreateRentResponseDto {
  @ApiProperty({ example: '246e8dd9-f075-49a2-83b8-b9d5f1a99e6a' })
  id: string;

  @ApiProperty({ example: '2025-08-31T21:24:50.906Z' })
  createdAt: Date;

  @ApiProperty({ type: [CreateRentItemResponseDto] })
  items: CreateRentItemResponseDto[];
}
