import { Injectable } from '@nestjs/common';
import { HomePagePayload, PageLayout, rowTemplateToSpans } from '@my-org/schema';
import { createId } from '@my-org/utils';
import { SectionsService } from '../sections/sections.service';

@Injectable()
export class HomePageService {
  private draftLayout: PageLayout = {
    id: 'home_layout',
    slug: 'home',
    rows: [],
  };

  private publishedSnapshot: HomePagePayload = {
    layout: this.draftLayout,
    sections: [],
  };

  constructor(private readonly sectionsService: SectionsService) {}

  getDraftLayout() {
    return this.draftLayout;
  }

  saveDraftLayout(layout: PageLayout) {
    this.draftLayout = {
      ...layout,
      slug: 'home',
      rows: layout.rows.map((row) => ({
        ...row,
        columns: row.columns.length
          ? row.columns
          : rowTemplateToSpans[row.template].map((span) => ({
              id: createId('col'),
              span,
            })),
      })),
    };

    return this.draftLayout;
  }

  publish() {
    this.publishedSnapshot = {
      layout: structuredClone(this.draftLayout),
      sections: structuredClone(this.sectionsService.list()),
    };

    return { ok: true, publishedAt: new Date().toISOString() };
  }

  getPublishedHomePage() {
    return this.publishedSnapshot;
  }
}
