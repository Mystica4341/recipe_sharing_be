export interface RecipeProperties {
  id?: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTimeMinutes: number;
  servings: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Recipe {
  private readonly _id: string;
  private _title: string;
  private _description: string;
  private _ingredients: string[];
  private _instructions: string[];
  private _cookingTimeMinutes: number;
  private _servings: number;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: RecipeProperties) {
    this.validate(props);
    this._id = props.id ?? crypto.randomUUID();
    this._title = props.title.trim();
    this._description = props.description.trim();
    this._ingredients = [...props.ingredients];
    this._instructions = [...props.instructions];
    this._cookingTimeMinutes = props.cookingTimeMinutes;
    this._servings = props.servings;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  private validate(props: RecipeProperties): void {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Recipe title cannot be empty');
    }
    if (props.cookingTimeMinutes < 0) {
      throw new Error('Cooking time cannot be negative');
    }
    if (props.servings <= 0) {
      throw new Error('Servings must be greater than zero');
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get ingredients(): string[] {
    return [...this._ingredients];
  }

  get instructions(): string[] {
    return [...this._instructions];
  }

  get cookingTimeMinutes(): number {
    return this._cookingTimeMinutes;
  }

  get servings(): number {
    return this._servings;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Domain behavior / Business logic
  updateDetails(params: Partial<Omit<RecipeProperties, 'id' | 'createdAt'>>): void {
    if (params.title !== undefined) {
      if (params.title.trim().length === 0) {
        throw new Error('Recipe title cannot be empty');
      }
      this._title = params.title.trim();
    }
    if (params.description !== undefined) {
      this._description = params.description.trim();
    }
    if (params.ingredients !== undefined) {
      this._ingredients = [...params.ingredients];
    }
    if (params.instructions !== undefined) {
      this._instructions = [...params.instructions];
    }
    if (params.cookingTimeMinutes !== undefined) {
      if (params.cookingTimeMinutes < 0) {
        throw new Error('Cooking time cannot be negative');
      }
      this._cookingTimeMinutes = params.cookingTimeMinutes;
    }
    if (params.servings !== undefined) {
      if (params.servings <= 0) {
        throw new Error('Servings must be greater than zero');
      }
      this._servings = params.servings;
    }
    this._updatedAt = new Date();
  }
}
