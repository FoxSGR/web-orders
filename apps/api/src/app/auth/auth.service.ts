import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePasswords } from './auth';
import { IUser, UserService } from '../user';

/**
 * Authentication service.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Checks if the user exists and the password is correct.
   * @param email
   * @param pass
   */
  async validateUser(email: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const result = await comparePasswords(pass, user.password);
    return result ? user : null;
  }

  /**
   * Authenticates a user and returns a token.
   * @param email
   * @param password
   */
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
