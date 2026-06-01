import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
  ) {}

  // CREATE
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  // UPLOAD FILE
  @Post('upload')
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
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9);
          cb(
            null,
            uniqueSuffix + extname(file.originalname),
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          !file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)
        ) {
          return cb(
            new Error('Hanya file gambar yang diizinkan!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const baseUrl =
      process.env.BASE_URL || 'http://localhost:3000';
    return {
      message: 'Upload berhasil',
      filename: file.filename,
      path: `${baseUrl}/uploads/recipes/${file.filename}`,
    };
  }

  // GET ALL
  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(Number(id));
  }

  // UPDATE
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: CreateRecipeDto,
  ) {
    return this.recipesService.update(
      Number(id),
      updateRecipeDto,
    );
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(Number(id));
  }
}