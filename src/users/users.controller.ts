import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // CREATE
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  // UPDATE
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.update(
      Number(id),
      createUserDto,
    );
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}