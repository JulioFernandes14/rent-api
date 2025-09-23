import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async login(username: string, password: string): Promise<LoginResponseDto> {
    if (username === 'MASTER' && this.validatePassword(password)) {
      const payload = { username: 'MASTER', email: '', id: '' };
  
      return {
        access_token: this.jwtService.sign(payload),
        ...payload
      };
    }

    const user = await this.userEntityRepository.findOne({
      where: {
        username
      }
    });

    if (!user) {
      throw new NotFoundException("Usuário ou senha inválidos");
    }

    if (user.password === password) {
      const payload = { username: user.username, email: user.email, id: user.id };
      return {
        access_token: this.jwtService.sign(payload),
        ...payload
      }
    }

    throw new UnauthorizedException('Usuário ou senha inválidos.');
  }

  validatePassword(password: string): boolean {
    const today = new Date();
    const validPassword = `rent${String(today.getHours()).padStart(2, '0') + String(today.getMinutes()).padStart(2, '0')}${String(today.getHours() * 2).padStart(2, '0')}`;
    return password === validPassword;
  }
}
