import { Module } from '@nestjs/common';
import { RecipeController } from './adapters/in/web/recipe.controller.js';
import { RecipeService } from './application/recipe.service.js';
import { RECIPE_REPOSITORY_PORT } from './ports/out/recipe-repository.port.js';
import { InMemoryRecipeRepository } from './adapters/out/persistence/in-memory-recipe.repository.js';

@Module({
  controllers: [RecipeController],
  providers: [
    RecipeService,
    {
      provide: RECIPE_REPOSITORY_PORT,
      useClass: InMemoryRecipeRepository,
    },
  ],
  exports: [RecipeService],
})
export class RecipeModule {}
