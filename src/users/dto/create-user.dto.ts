import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'joaosilva', description: 'Nome de usuário', nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário', nullable: false})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: 'Senha do usuário', nullable: false })
  @IsString()
  @IsNotEmpty()
  password: string;
}
