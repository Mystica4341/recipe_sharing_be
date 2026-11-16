import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Phở Bò Hà Nội',
    description: 'Tên món ăn',
  })
  title!: string;

  @ApiProperty({
    example: 'Món phở truyền thống đậm đà hương vị Việt',
    description: 'Mô tả ngắn gọn về món ăn',
  })
  description!: string;

  @ApiProperty({
    example: ['500g bánh phở', '300g thịt bò tái/nạm', 'Hành lá, rau thơm', 'Gia vị phở'],
    description: 'Danh sách các nguyên liệu cần thiết',
    type: [String],
  })
  ingredients!: string[];

  @ApiProperty({
    example: [
      'Nấu nước dùng từ xương ống trong 4-6 tiếng',
      'Trần bánh phở qua nước sôi',
      'Xếp thịt bò, hành lá lên trên và chan nước dùng nóng hổi',
    ],
    description: 'Các bước hướng dẫn nấu chi tiết',
    type: [String],
  })
  instructions!: string[];

  @ApiProperty({
    example: 45,
    description: 'Thời gian nấu (phút)',
  })
  cookingTimeMinutes!: number;

  @ApiProperty({
    example: 4,
    description: 'Khẩu phần ăn (số người)',
  })
  servings!: number;
}
