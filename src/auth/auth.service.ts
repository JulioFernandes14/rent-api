import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string): LoginResponseDto {
    if (username !== 'MASTER' || !this.validatePassword(password)) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }
    const payload = { username: 'MASTER' };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validatePassword(password: string): boolean {
    const today = new Date();
    const validPassword = `rent${String(today.getHours()).padStart(2, '0') + String(today.getMinutes()).padStart(2, '0')}${String(today.getHours() * 2).padStart(2, '0')}`;
    return password === validPassword;
  }
}
