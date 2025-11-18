import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import {
  getAccessCookieOptions,
  getRefreshCookieOptions,
} from './cookie-options';

export interface IPayloadLogin {
  sub: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(body: LoginDto) {
    const user = await this.userService.findOneUser(body.username);
    if (!user) return null;
    const match = await bcrypt.compare(body.password, user.password ?? '');
    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity, res: Response) {
    const payload: IPayloadLogin = {
      username: user.username,
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION') || '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
    });

    res.cookie(
      'refresh_token',
      refreshToken,
      getRefreshCookieOptions(this.configService),
    );
    res.cookie(
      'access_token',
      accessToken,
      getAccessCookieOptions(this.configService),
    );

    return { user };
  }

  async refresh(req: Request, res: Response) {
    const cookies = req.cookies as Record<string, unknown> | undefined;
    const token =
      typeof cookies?.refresh_token === 'string'
        ? cookies.refresh_token
        : undefined;
    if (!token) throw new UnauthorizedException('Missing refresh token');

    const payload = await this.jwtService.verifyAsync<IPayloadLogin>(token, {
      secret: this.configService.get('SECRET_KEY'),
    });

    const newAccess = await this.jwtService.signAsync(
      { sub: payload.sub, username: payload.username },
      { expiresIn: this.configService.get('JWT_EXPIRATION') || '15m' },
    );

    const newRefresh = await this.jwtService.signAsync(
      { sub: payload.sub, username: payload.username },
      { expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d' },
    );

    res.cookie(
      'refresh_token',
      newRefresh,
      getRefreshCookieOptions(this.configService),
    );
    res.cookie(
      'access_token',
      newAccess,
      getAccessCookieOptions(this.configService),
    );

    return { message: 'token refreshed' };
  }

  logout(res: Response) {
    res.clearCookie(
      'refresh_token',
      getRefreshCookieOptions(this.configService),
    );
    res.clearCookie('access_token', getAccessCookieOptions(this.configService));
    return { message: 'Logged out successfully' };
  }
}
