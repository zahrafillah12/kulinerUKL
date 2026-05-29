import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        nama: createCategoryDto.nama,
      },
    });
  }

  // GET ALL
  findAll() {
    return this.prisma.category.findMany();
  }

  // GET BY ID
  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  // UPDATE
  update(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.prisma.category.update({
      where: { id },

      data: {
        nama: createCategoryDto.nama,
      },
    });
  }

  // DELETE
  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}