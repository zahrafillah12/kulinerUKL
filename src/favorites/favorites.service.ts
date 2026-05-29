import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(createFavoriteDto: CreateFavoriteDto) {
    return this.prisma.favorite.create({
      data: {
        userId: createFavoriteDto.userId,

        recipeId: createFavoriteDto.recipeId,
      },
    });
  }

  // GET ALL
  findAll() {
    return this.prisma.favorite.findMany({
      include: {
        user: true,
        recipe: true,
      },
    });
  }

  // DELETE
  remove(id: number) {
    return this.prisma.favorite.delete({
      where: { id },
    });
  }
}