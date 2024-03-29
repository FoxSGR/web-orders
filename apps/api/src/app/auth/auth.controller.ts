import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';

import { IAuthResponse, IUserDTO } from '@web-orders/api-interfaces';
import { JwtAuthGuard, LocalAuthGuard } from './guard';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { UserMapper } from '../user';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userMapper: UserMapper,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<IAuthResponse> {
    const data = await this.authService.login(dto.email, dto.password);
    return {
      token: data.token,
      user: this.userMapper.entityToResponse(data.user) as IUserDTO,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userMapper.entityToResponse(req.user);
  }
}
