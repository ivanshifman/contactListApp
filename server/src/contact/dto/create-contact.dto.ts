import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  address: string;
}
