import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from '@/request.interface';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async handleHttp(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = await this.authService.getUserFromRequest(request)
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }

  async handleWs(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const user = await this.authService.getUserFromToken(client.handshake.headers['authorization'] || null);
    if (!user) {
      return false;
    }
    client.user = user;
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    switch (context.getType()) {
      case 'http':
        return this.handleHttp(context);
      case 'ws':
        return this.handleWs(context);
      default:
        return false;
    }
  }
}
