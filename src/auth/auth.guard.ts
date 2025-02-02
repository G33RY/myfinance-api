import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { AuthRequest } from '../request.interface';
import { JWTPayload } from './auth.dto';
import { UserRepository } from '../repository/user.repository';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async getUser(token: string|null): Promise<User | null> {
    if(!token) {
      return null;
    }
    if(token.includes(" "))  {
      token = token.split(" ")[1];
    }

    try {
      const payload = this.jwtService.verify<JWTPayload>(token);
      if (!payload) {
        return null;
      }
      return await this.authService.verifyJWTPayload(payload);
    } catch {
      return null;
    }
  }


  async handleHttp(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const user = await this.getUser(request.headers['authorization'] || null);
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }

  async handleWs(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const user = await this.getUser(client.handshake.headers['authorization'] || null);
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
