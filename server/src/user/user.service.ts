import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUser(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
  }

  async createUser(body: CreateUserDto): Promise<UserEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const exists = await tx.user.findFirst({
        where: {
          username: {
            equals: body.username,
            mode: 'insensitive',
          },
        },
      });

      if (exists) {
        throw new BadRequestException('Username already exists');
      }

      const bcryptTyped = bcrypt as {
        genSalt: () => Promise<string>;
        hash: (data: string, salt: string) => Promise<string>;
      };
      const salt = await bcryptTyped.genSalt();
      const hash = await bcryptTyped.hash(body.password, salt);

      const newUser = await tx.user.create({
        data: {
          name: body.name,
          username: body.username,
          password: hash,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      return result;
    });
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        contacts: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
