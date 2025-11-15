import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { IRequestAuth } from 'src/auth/request-auth';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAll(@Request() req: IRequestAuth) {
    return this.contactService.getAllContactsByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: IRequestAuth,
  ) {
    return this.contactService.getContactById(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  create(
    @Request() req: IRequestAuth,
    @Body() body: CreateContactDto,
  ) {
    return this.contactService.createContact(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  editContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateContactDto,
    @Request() req: IRequestAuth,
  ) {
    return this.contactService.updateContact(id, req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteContact(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: IRequestAuth,
  ) {
    return this.contactService.deleteContact(id, req.user.userId);
  }
}
