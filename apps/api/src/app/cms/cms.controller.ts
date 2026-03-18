import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import type {
  AnySectionProps,
  HomeSectionKey,
} from '@my-org/ui/section/content-models';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('sections/:pageSlug')
  getSections(@Param('pageSlug') pageSlug: string) {
    return this.cmsService.getSectionEntries(pageSlug);
  }

  @Put('sections/:pageSlug/:sectionKey')
  updateSectionDraft(
    @Param('pageSlug') pageSlug: string,
    @Param('sectionKey') sectionKey: HomeSectionKey,
    @Body() body: { draftProps: AnySectionProps },
  ) {
    return this.cmsService.updateSectionDraft(
      pageSlug,
      sectionKey,
      body.draftProps,
    );
  }

  @Get('layout/:pageSlug')
  getLayout(@Param('pageSlug') pageSlug: string) {
    return this.cmsService.getDraftLayout(pageSlug);
  }

  @Patch('layout/:pageSlug')
  updateLayout(
    @Param('pageSlug') pageSlug: string,
    @Body() body: { draftSections: Array<{ sectionKey: HomeSectionKey }> },
  ) {
    return this.cmsService.updateDraftLayout(pageSlug, body.draftSections);
  }

  @Post('publish/:pageSlug')
  publishPage(@Param('pageSlug') pageSlug: string) {
    return this.cmsService.publishPage(pageSlug);
  }
}
