import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    maxLength: 50,
    minLength: 2,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: 'Name must contain only letters' })
  name: string;

  @ApiProperty({
    example: 'john123',
    description: 'Unique username for the user',
    maxLength: 50,
    minLength: 4,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description:
      'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
  })
  password: string;
}
