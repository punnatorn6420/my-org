import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { PageLayout } from '@my-org/schema';
import { HomePageService } from './home-page.service';

@Controller()
export class HomePageController {
  constructor(private readonly homePageService: HomePageService) {}

  @Get('admin/pages/home/layout')
  getHomeLayout() {
    return this.homePageService.getDraftLayout();
  }

  @Put('admin/pages/home/layout')
  updateHomeLayout(@Body() layout: PageLayout) {
    return this.homePageService.saveDraftLayout(layout);
  }

  @Post('admin/pages/home/publish')
  publishHomePage() {
    return this.homePageService.publish();
  }

  @Get('pages/home')
  getPublishedHomePage() {
    return this.homePageService.getPublishedHomePage();
  }
}
