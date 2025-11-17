import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactEntity } from 'src/contact/contact.entity';

export class UserEntity {
  id: number;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'johndoe123',
    type: String,
  })
  username: string;

  @ApiProperty({
    description: 'Hashed password of the user',
    example: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
    type: String,
  })
  password?: string;

  @ApiProperty({
    description: 'Date when the user was created',
    example: '2023-01-01T00:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'User contacts (if included)',
    type: Array,
    isArray: true,
  })
  contacts?: ContactEntity[];
}
