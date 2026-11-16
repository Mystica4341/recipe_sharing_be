import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RecipeModule } from './modules/recipes/recipe.module.js';

@Module({
  imports: [RecipeModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
