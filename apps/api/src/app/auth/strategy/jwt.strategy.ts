import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { environment } from '../../../environments/environment';

import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.auth.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
