import { describe, it, expect, beforeEach } from 'vitest';
import { RecipeService } from './recipe.service.js';
import { InMemoryRecipeRepository } from '../adapters/out/persistence/in-memory-recipe.repository.js';
import { RecipeNotFoundException } from '../domain/exceptions/recipe-not-found.exception.js';

describe('RecipeService (Application Layer)', () => {
  let service: RecipeService;
  let repository: InMemoryRecipeRepository;

  beforeEach(() => {
    repository = new InMemoryRecipeRepository();
    service = new RecipeService(repository);
  });

  it('should create a new recipe successfully', async () => {
    const recipe = await service.execute({
      title: 'Phở Bò',
      description: 'Món phở truyền thống',
      ingredients: ['Thịt bò', 'Bánh phở', 'Nước dùng'],
      instructions: ['Hầm xương', 'Trần bánh phở', 'Thưởng thức'],
      cookingTimeMinutes: 60,
      servings: 4,
    });

    expect(recipe.id).toBeDefined();
    expect(recipe.title).toBe('Phở Bò');
    expect(recipe.cookingTimeMinutes).toBe(60);

    const saved = await repository.findById(recipe.id);
    expect(saved).toEqual(recipe);
  });

  it('should throw RecipeNotFoundException when recipe does not exist', async () => {
    await expect(service.getById('non-existent-id')).rejects.toThrow(RecipeNotFoundException);
  });
});
