import { Recipe } from '../../domain/entities/recipe.entity.js';

export const GET_RECIPE_USE_CASE = Symbol('GET_RECIPE_USE_CASE');

export interface GetRecipeUseCase {
  getById(id: string): Promise<Recipe>;
  getAll(): Promise<Recipe[]>;
}
