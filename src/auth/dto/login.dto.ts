import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Senha dinâmica', example: 'abc' })
  @IsString()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'Token JWT de acesso', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' })
  access_token: string;
}
