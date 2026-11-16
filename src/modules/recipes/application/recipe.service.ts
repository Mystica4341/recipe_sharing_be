import { Inject, Injectable } from '@nestjs/common';
import { CreateRecipeCommand, CreateRecipeUseCase } from '../ports/in/create-recipe.use-case.js';
import { GetRecipeUseCase } from '../ports/in/get-recipe.use-case.js';
import { RECIPE_REPOSITORY_PORT, type RecipeRepositoryPort } from '../ports/out/recipe-repository.port.js';
import { Recipe } from '../domain/entities/recipe.entity.js';
import { RecipeNotFoundException } from '../domain/exceptions/recipe-not-found.exception.js';

@Injectable()
export class RecipeService implements CreateRecipeUseCase, GetRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY_PORT)
    private readonly recipeRepository: RecipeRepositoryPort,
  ) {}

  async execute(command: CreateRecipeCommand): Promise<Recipe> {
    const recipe = new Recipe({
      title: command.title,
      description: command.description,
      ingredients: command.ingredients,
      instructions: command.instructions,
      cookingTimeMinutes: command.cookingTimeMinutes,
      servings: command.servings,
    });

    return await this.recipeRepository.save(recipe);
  }

  async getById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      throw new RecipeNotFoundException(id);
    }
    return recipe;
  }

  async getAll(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll();
  }
}
