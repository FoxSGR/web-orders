import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    if (context.getArgByIndex(0).route.path === '/api/auth/login') {
      return true;
    }

    return super.canActivate(context);
  }
}
