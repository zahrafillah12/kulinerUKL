import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { beforeEach, describe, it } from 'node:test';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    exports(service).toBeDefined();
  });
});
