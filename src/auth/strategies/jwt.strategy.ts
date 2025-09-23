import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {
    const jwtSecret = 'rent@2025';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    } satisfies StrategyOptions);
  }

  async validate(payload: { id: string, username: string }): Promise<any> {

    if (payload.username === 'MASTER') {
      return {
        username: 'MASTER',
      };
    }

    const user = await this.userEntityRepository.findOne({
      where: {
        id: payload.id,
      }
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não está validado.');
    }

    return user;
  }
}
