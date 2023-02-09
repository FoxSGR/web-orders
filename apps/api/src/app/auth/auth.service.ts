import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePasswords } from './auth';
import { IUser, UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const result = await comparePasswords(pass, user.password);
    return result ? user : null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { user: user.id };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
