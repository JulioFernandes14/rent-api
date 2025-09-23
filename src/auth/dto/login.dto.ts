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
  @ApiProperty({
    description: 'Token JWT de acesso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'MASTER',
  })
  username: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'master@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Identificador único do usuário',
    example: 'a3f8e8c0-1d12-4c9e-92c9-b3c1b65e1a9f',
  })
  id: string;
}
