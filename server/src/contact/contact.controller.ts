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
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiGetContactsDocs } from './docs/getContact.docs';
import { ApiGetContactByIdDocs } from './docs/getContactById.docs';
import { ApiCreateContactDocs } from './docs/postContact.docs';
import { ApiUpdateContactDocs } from './docs/updateContact.docs';
import { ApiDeleteContactDocs } from './docs/deleteContact.docs';
import { SWAGGER_BEARER_AUTH_NAME } from 'src/swagger/swagger.constants';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiGetContactsDocs()
  getAll(@Request() req: IRequestAuth) {
    return this.contactService.getAllContactsByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiGetContactByIdDocs()
  getOne(@Param('id', ParseIntPipe) id: number, @Request() req: IRequestAuth) {
    return this.contactService.getContactById(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiCreateContactDocs()
  create(@Request() req: IRequestAuth, @Body() body: CreateContactDto) {
    return this.contactService.createContact(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiUpdateContactDocs()
  editContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContactDto,
    @Request() req: IRequestAuth,
  ) {
    return this.contactService.updateContact(id, req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth(SWAGGER_BEARER_AUTH_NAME)
  @ApiDeleteContactDocs()
  deleteContact(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: IRequestAuth,
  ) {
    return this.contactService.deleteContact(id, req.user.userId);
  }
}
