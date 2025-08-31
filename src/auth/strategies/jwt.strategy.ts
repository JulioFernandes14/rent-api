import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = 'rent@2025';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    } satisfies StrategyOptions);
  }

  async validate(payload: { username: string }): Promise<any> {
    if (payload.username !== 'MASTER') {
      throw new UnauthorizedException('Usuário não autorizado.');
    }

    return {
      username: 'MASTER',
    };
  }
}
