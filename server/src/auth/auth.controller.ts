import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IRequestAuth } from './request-auth';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { ApiRegisterDocs } from './docs/register.docs';
import { ApiLoginDocs } from './docs/login.docs';
import { ApiProfileDocs } from './docs/profile.docs';
import { UserEntity } from '../user/user.entity';
import { ApiLogoutDocs } from './docs/logout.docs';
import { ApiRefreshDocs } from './docs/refresh.docs';
import { SWAGGER_ACCESS_COOKIE_NAME } from '../swagger/swagger.constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @ApiRegisterDocs()
  async register(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiLoginDocs()
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(req.user as UserEntity, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth(SWAGGER_ACCESS_COOKIE_NAME)
  @ApiRefreshDocs()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth(SWAGGER_ACCESS_COOKIE_NAME)
  @ApiLogoutDocs()
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiCookieAuth(SWAGGER_ACCESS_COOKIE_NAME)
  @ApiProfileDocs()
  async getProfile(@Req() req: IRequestAuth) {
    return await this.userService.getUserById(req.user.userId);
  }
}
