import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

export interface IPayloadLogin {
  sub: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
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

  async login(user: UserEntity) {
    const payload: IPayloadLogin = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      user,
      access_token: token,
    };
  }
}
