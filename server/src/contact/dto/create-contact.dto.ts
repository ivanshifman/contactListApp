import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the contact. Only letters allowed.',
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
    example: 'Doe',
    description: 'Last name of the contact. Only letters allowed.',
    maxLength: 50,
    minLength: 2,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
    message: 'Lastname must contain only letters',
  })
  lastname: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Valid email of the contact.',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456789',
    description:
      'Phone number of the contact. Must contain only numbers. Min 7, max 15 digits.',
    minLength: 7,
    maxLength: 15,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{7,15}$/, { message: 'Phone must contain only numbers' })
  phone: string;

  @ApiProperty({
    example: '1234 Main Street',
    description: 'Full address of the contact.',
    maxLength: 250,
    minLength: 4,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @MinLength(4)
  address: string;
}
