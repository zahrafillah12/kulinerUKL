import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
  ) {}

  // CREATE - hanya ADMIN
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  // UPLOAD FILE - hanya ADMIN
  @Post('upload')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/recipes';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return {
      message: 'Upload berhasil',
      filename: file.filename,
      path: `${baseUrl}/uploads/recipes/${file.filename}`,
    };
  }

  // GET ALL - semua bisa akses
  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  // GET BY ID - semua bisa akses
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(Number(id));
  }

  // UPDATE - hanya ADMIN
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: CreateRecipeDto,
  ) {
    return this.recipesService.update(Number(id), updateRecipeDto);
  }

  // DELETE - hanya ADMIN
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(Number(id));
  }
}