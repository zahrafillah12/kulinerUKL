import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // GET ALL
  findAll() {
    return this.prisma.user.findMany();
  }

  // GET BY ID
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // UPDATE
  update(id: number, createUserDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: createUserDto,
    });
  }

  // DELETE
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}