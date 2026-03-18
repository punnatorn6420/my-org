import { Controller, Get, Param } from '@nestjs/common';
import { CmsService } from '../cms/cms.service';

@Controller('public')
export class PublicController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('pages/:pageSlug')
  getPublishedPage(@Param('pageSlug') pageSlug: string) {
    return this.cmsService.getPublishedPage(pageSlug);
  }
}
