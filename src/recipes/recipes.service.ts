import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(createRecipeDto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        namaMakanan:
          createRecipeDto.namaMakanan,

        daerahAsal:
          createRecipeDto.daerahAsal,

        gambar:
          createRecipeDto.gambar,

        deskripsi:
          createRecipeDto.deskripsi,

        bahan:
          createRecipeDto.bahan,

        langkahPembuatan:
          createRecipeDto.langkahPembuatan,

        durasi:
          createRecipeDto.durasi,

        porsi:
          createRecipeDto.porsi,

        userId:
          createRecipeDto.userId,

        kategoriId:
          createRecipeDto.kategoriId,
      },
    });
  }

  // GET ALL
  findAll() {
    return this.prisma.recipe.findMany({
      include: {
        user: true,
        category: true,
      },
    });
  }

  // GET BY ID
  findOne(id: number) {
    return this.prisma.recipe.findUnique({
      where: { id },

      include: {
        user: true,
        category: true,
      },
    });
  }

  // UPDATE
  update(
    id: number,
    createRecipeDto: CreateRecipeDto,
  ) {
    return this.prisma.recipe.update({
      where: { id },

      data: {
        namaMakanan:
          createRecipeDto.namaMakanan,

        daerahAsal:
          createRecipeDto.daerahAsal,

        gambar:
          createRecipeDto.gambar,

        deskripsi:
          createRecipeDto.deskripsi,

        bahan:
          createRecipeDto.bahan,

        langkahPembuatan:
          createRecipeDto.langkahPembuatan,

        durasi:
          createRecipeDto.durasi,

        porsi:
          createRecipeDto.porsi,

        userId:
          createRecipeDto.userId,

        kategoriId:
          createRecipeDto.kategoriId,
      },
    });
  }

  // DELETE
  remove(id: number) {
    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}