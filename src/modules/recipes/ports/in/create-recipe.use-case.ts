import { Recipe } from '../../domain/entities/recipe.entity.js';

export interface CreateRecipeCommand {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTimeMinutes: number;
  servings: number;
}

export const CREATE_RECIPE_USE_CASE = Symbol('CREATE_RECIPE_USE_CASE');

export interface CreateRecipeUseCase {
  execute(command: CreateRecipeCommand): Promise<Recipe>;
}
