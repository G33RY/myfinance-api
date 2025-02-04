import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { User } from '@/auth/entities/user.entity';
import { JWTPayload } from '@/auth/dto/jwt.dto';
import { REQUEST } from '@nestjs/core';
import { AuthRequest } from '@/request.interface';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

  private user: User | null = null;

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(REQUEST) private request: Request,
  ) {

  }



  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { access_token: this.jwtService.sign(this.createJWTPayload(user)) };
  }

  createJWTPayload(user: User): JWTPayload {
    return {
      sub: user.id,
      iss: this.configService.get<string>('JWT_ISSUER', 'myfinance-api'),
      aud: this.configService.get<string>('JWT_AUDIENCE', 'myfinance-frontend'),
      iat: Date.now(),
      exp:
        Date.now() +
        1000 *
          60 *
          60 *
          this.configService.get<number>('JWT_EXPIRATION_HOURS', 1),
    };
  }

  async verifyJWTPayload(payload: JWTPayload): Promise<User | null> {
    if (
      !payload.exp ||
      !payload.iat ||
      !payload.sub ||
      !payload.iss ||
      !payload.aud
    ) {
      return null;
    }
    if (payload.iat > Date.now() || payload.exp < Date.now()) {
      return null;
    }
    if (
      payload.iss !==
      this.configService.get<string>('JWT_ISSUER', 'myfinance-api')
    ) {
      return null;
    }
    if (
      payload.aud !==
      this.configService.get<string>('JWT_AUDIENCE', 'myfinance-frontend')
    ) {
      return null;
    }

    return await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
    });
  }

  async getUserFromToken(token: string|null): Promise<User | null> {
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
      return await this.verifyJWTPayload(payload);
    } catch {
      return null;
    }
  }

  async getUserFromRequest(request: Request|AuthRequest): Promise<User | null> {
    return this.getUserFromToken(request.headers['authorization'] || null);
  }

  async getCurrentUser(): Promise<User | null> {
    if(!this.user) {
      this.user = await this.getUserFromRequest(this.request);
    }
    return this.user;
  }

  async getCurrentUserOrFail(): Promise<User> {
    const user = await this.getCurrentUser();
    if(!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

}
