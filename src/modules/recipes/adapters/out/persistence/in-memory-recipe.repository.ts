import { Injectable } from '@nestjs/common';
import { RecipeRepositoryPort } from '../../../ports/out/recipe-repository.port.js';
import { Recipe } from '../../../domain/entities/recipe.entity.js';

@Injectable()
export class InMemoryRecipeRepository implements RecipeRepositoryPort {
  private readonly recipes: Map<string, Recipe> = new Map();

  async save(recipe: Recipe): Promise<Recipe> {
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  async findById(id: string): Promise<Recipe | null> {
    const recipe = this.recipes.get(id);
    return recipe ?? null;
  }

  async findAll(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async delete(id: string): Promise<boolean> {
    return this.recipes.delete(id);
  }
}
