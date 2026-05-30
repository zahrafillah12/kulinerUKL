import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.prisma.user.create({
      data: {
        nama: createUserDto.nama,
        email: createUserDto.email,
        password: hashedPassword,
      },
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
  async update(
    id: number,
    createUserDto: CreateUserDto,
  ) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.prisma.user.update({
      where: { id },
      data: {
        nama: createUserDto.nama,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  // DELETE
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}