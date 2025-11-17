import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john123',
    description: 'Unique username for login',
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
    description:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Password123!',
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
