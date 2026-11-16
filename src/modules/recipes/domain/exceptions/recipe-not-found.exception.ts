export class RecipeNotFoundException extends Error {
  constructor(recipeId: string) {
    super(`Recipe with id '${recipeId}' was not found.`);
    this.name = 'RecipeNotFoundException';
  }
}
