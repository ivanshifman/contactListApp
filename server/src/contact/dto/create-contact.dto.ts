import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: 'Name must contain only letters' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, {
    message: 'Lastname must contain only letters',
  })
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{7,15}$/, { message: 'Phone must contain only numbers' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @MinLength(4)
  address: string;
}
