import {Body,Controller,Delete,Get,Param,Post,Put,UploadedFile,UseInterceptors,} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly recipesService: RecipesService,
  ) {}

  // CREATE
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(
      createRecipeDto,
    );
  }
@Post('upload')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',

      filename: (req, file, callback) => {
        const uniqueName =
          Date.now() + extname(file.originalname);

        callback(null, uniqueName);
      },
    }),
  }),
)
uploadFile(
  @UploadedFile() file: Express.Multer.File,
) {
  return {
    message: 'Upload berhasil',

    filename: file.filename,

    path:
      'http://localhost:3000/uploads/recipes/' +
      file.filename,
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