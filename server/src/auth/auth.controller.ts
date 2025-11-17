import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IRequestAuth } from './request-auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRegisterDocs } from './docs/register.docs';
import { ApiLoginDocs } from './docs/login.docs';
import { ApiProfileDocs } from './docs/profile.docs';
import { SWAGGER_BEARER_AUTH_NAME } from 'src/swagger/swagger.constants';

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
  async login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.authService.login(req.user as UserEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiProfileDocs()
  async getProfile(@Request() req: IRequestAuth) {
    return await this.userService.getUserById(req.user.userId);
  }
}
