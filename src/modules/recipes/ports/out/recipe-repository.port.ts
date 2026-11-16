import { Recipe } from '../../domain/entities/recipe.entity.js';

export const RECIPE_REPOSITORY_PORT = Symbol('RECIPE_REPOSITORY_PORT');

export interface RecipeRepositoryPort {
  save(recipe: Recipe): Promise<Recipe>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  delete(id: string): Promise<boolean>;
}
