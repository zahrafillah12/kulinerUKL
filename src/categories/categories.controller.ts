import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

import { CreateCategoryDto } from './dto/create-category.dto';

import { JwtAuthGuard } from '../auth/jwt.strategy';

import { RolesGuard } from '../auth/roles.guard';

import { Roles } from '../auth/roles.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  // ADMIN ONLY
  @Post()
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.create(
      createCategoryDto,
    );
  }

  // SEMUA USER BISA LIHAT
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // SEMUA USER BISA LIHAT
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(
      Number(id),
    );
  }

  // ADMIN ONLY
  @Put(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.update(
      Number(id),
      createCategoryDto,
    );
  }

  // ADMIN ONLY
  @Delete(':id')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(
      Number(id),
    );
  }
}