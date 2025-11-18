import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ContactEntity } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContactsByUser(userId: number): Promise<ContactEntity[]> {
    return this.prisma.contact.findMany({
      where: { userId },
    });
  }

  async getContactById(
    contactId: number,
    userId: number,
  ): Promise<ContactEntity> {
    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId, userId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async createContact(
    userId: number,
    body: CreateContactDto,
  ): Promise<ContactEntity> {
    return this.prisma.contact.create({
      data: {
        ...body,
        userId,
      },
    });
  }

  async updateContact(
    contactId: number,
    userId: number,
    body: UpdateContactDto,
  ): Promise<ContactEntity> {
    await this.getContactById(contactId, userId);

    return this.prisma.contact.update({
      where: { id: contactId },
      data: {
        ...body,
      },
    });
  }

  async deleteContact(
    contactId: number,
    userId: number,
  ): Promise<ContactEntity> {
    await this.getContactById(contactId, userId);

    return this.prisma.contact.delete({
      where: { id: contactId },
    });
  }
}
