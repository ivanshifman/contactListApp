import { UserEntity } from '../user/user.entity';

export class ContactEntity {
  id!: number;
  name!: string;
  lastname!: string;
  email!: string | null;
  phone!: string | null;
  address!: string;
  userId!: number;
  user?: UserEntity;
  createdAt!: Date;
}