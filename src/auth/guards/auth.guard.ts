import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest<TUser = { username: string }>(
    _: Request,
    user: TUser,
    info: { name: string; message: string },
  ) {
    if (info) {
      if (info.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          'Sessão de login expirada. Por favor, faça login novamente.',
        );
      }

      if (info.message === 'invalid signature') {
        throw new UnauthorizedException('Assinatura do token inválida.');
      }

      if (info.message === 'No auth token') {
        throw new UnauthorizedException(
          'Nenhum token de autenticação fornecido.',
        );
      }

      if (info.message === 'jwt malformed') {
        throw new UnauthorizedException('Token de autenticação inválido.');
      }
    }
    return user;
  }
}
