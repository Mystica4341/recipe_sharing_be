import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { RecipeService } from '../../../application/recipe.service.js';
import { CreateRecipeDto } from './dto/create-recipe.dto.js';
import { RecipeResponseDto } from './dto/recipe-response.dto.js';
import { RecipeNotFoundException } from '../../../domain/exceptions/recipe-not-found.exception.js';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo công thức món ăn mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Công thức đã được tạo thành công.',
    type: RecipeResponseDto,
  })
  async create(@Body() dto: CreateRecipeDto): Promise<RecipeResponseDto> {
    const created = await this.recipeService.execute(dto);
    return RecipeResponseDto.fromDomain(created);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả các công thức món ăn' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách các công thức.',
    type: [RecipeResponseDto],
  })
  async findAll(): Promise<RecipeResponseDto[]> {
    const recipes = await this.recipeService.getAll();
    return recipes.map((recipe) => RecipeResponseDto.fromDomain(recipe));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết một công thức theo ID' })
  @ApiParam({ name: 'id', description: 'Mã ID của công thức', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin chi tiết công thức.',
    type: RecipeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công thức với ID được cung cấp.',
  })
  async findOne(@Param('id') id: string): Promise<RecipeResponseDto> {
    try {
      const recipe = await this.recipeService.getById(id);
      return RecipeResponseDto.fromDomain(recipe);
    } catch (error) {
      if (error instanceof RecipeNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
