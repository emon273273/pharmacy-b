// src/common/guards/platform-admin.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PlatformAdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // First run JWT validation
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or missing token');
    }
    // Check if the role is SUPER_ADMIN (platform admin)
    if (user.role !== 'SUPER_ADMIN') {
      throw new UnauthorizedException('Platform admin access only');
    }
    return user;
  }
}
