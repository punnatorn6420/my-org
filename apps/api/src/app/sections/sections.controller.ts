import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SectionInstance, SectionType } from '@my-org/schema';
import { SectionsService } from './sections.service';

@Controller('admin/sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Get()
  list() {
    return this.sectionsService.list();
  }

  @Post()
  create(@Body() body: { type: SectionType; name?: string }) {
    return this.sectionsService.create(body);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.sectionsService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<SectionInstance>) {
    return this.sectionsService.update(id, body);
  }
}
