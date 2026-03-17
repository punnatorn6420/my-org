import { Module } from '@nestjs/common';
import { HomePageController } from './pages/home-page.controller';
import { HomePageService } from './pages/home-page.service';
import { SectionsController } from './sections/sections.controller';
import { SectionsService } from './sections/sections.service';

@Module({
  imports: [],
  controllers: [SectionsController, HomePageController],
  providers: [SectionsService, HomePageService],
})
export class AppModule {}
