import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { beforeEach, describe, it } from 'node:test';

describe('RecipesController', () => {
  let controller: RecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
  });

  it('should be defined', () => {
    exports(controller).toBeDefined();
  });
});
