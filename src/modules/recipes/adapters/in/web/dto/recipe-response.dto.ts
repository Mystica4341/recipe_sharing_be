import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '../../../../domain/entities/recipe.entity.js';

export class RecipeResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Mã định danh duy nhất của công thức',
  })
  id: string;

  @ApiProperty({
    example: 'Phở Bò Hà Nội',
    description: 'Tên món ăn',
  })
  title: string;

  @ApiProperty({
    example: 'Món phở truyền thống đậm đà hương vị Việt',
    description: 'Mô tả ngắn gọn về món ăn',
  })
  description: string;

  @ApiProperty({
    example: ['500g bánh phở', '300g thịt bò', 'Hành lá, rau thơm'],
    description: 'Danh sách các nguyên liệu',
    type: [String],
  })
  ingredients: string[];

  @ApiProperty({
    example: ['Nấu nước dùng', 'Trần bánh phở', 'Thưởng thức'],
    description: 'Các bước nấu',
    type: [String],
  })
  instructions: string[];

  @ApiProperty({
    example: 45,
    description: 'Thời gian nấu (phút)',
  })
  cookingTimeMinutes: number;

  @ApiProperty({
    example: 4,
    description: 'Khẩu phần ăn (người)',
  })
  servings: number;

  @ApiProperty({
    example: '2026-11-13T10:00:00.000Z',
    description: 'Thời điểm tạo',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-11-13T10:00:00.000Z',
    description: 'Thời điểm cập nhật gần nhất',
  })
  updatedAt: string;

  constructor(recipe: Recipe) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.cookingTimeMinutes = recipe.cookingTimeMinutes;
    this.servings = recipe.servings;
    this.createdAt = recipe.createdAt.toISOString();
    this.updatedAt = recipe.updatedAt.toISOString();
  }

  static fromDomain(recipe: Recipe): RecipeResponseDto {
    return new RecipeResponseDto(recipe);
  }
}
