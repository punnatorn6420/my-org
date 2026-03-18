import { Injectable } from '@nestjs/common';
import { Prisma, type PageLayout, type PublishedPage, type SectionInstance } from '@prisma/client';
import {
  defaultSectionProps,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
  HOME_PAGE_SLUG,
} from '@my-org/ui/section/content-models';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureHomePageSeed(pageSlug = HOME_PAGE_SLUG) {
    await this.prisma.pageLayout.upsert({
      where: { pageSlug },
      update: {},
      create: {
        pageSlug,
        draftSections: HOME_SECTION_KEYS.map((sectionKey) => ({ sectionKey })),
      },
    });

    await Promise.all(
      HOME_SECTION_KEYS.map((sectionKey) =>
        this.prisma.sectionInstance.upsert({
          where: { pageSlug_sectionKey: { pageSlug, sectionKey } },
          update: {},
          create: {
            pageSlug,
            sectionKey,
            draftProps: defaultSectionProps[sectionKey],
            publishedProps: defaultSectionProps[sectionKey],
          },
        }),
      ),
    );
  }

  async getSectionEntries(pageSlug = HOME_PAGE_SLUG) {
    await this.ensureHomePageSeed(pageSlug);

    const entries = await this.prisma.sectionInstance.findMany({
      where: { pageSlug },
      orderBy: { updatedAt: 'desc' },
    });

    return {
      pageSlug,
      entries: entries.map((entry) => this.toSectionEntryDto(entry)),
    };
  }

  async updateSectionDraft(pageSlug: string, sectionKey: HomeSectionKey, draftProps: AnySectionProps) {
    const updated = await this.prisma.sectionInstance.upsert({
      where: { pageSlug_sectionKey: { pageSlug, sectionKey } },
      update: {
        draftProps: draftProps as Prisma.InputJsonValue,
      },
      create: {
        pageSlug,
        sectionKey,
        draftProps: draftProps as Prisma.InputJsonValue,
        publishedProps: defaultSectionProps[sectionKey],
      },
    });

    return this.toSectionEntryDto(updated);
  }

  async getDraftLayout(pageSlug = HOME_PAGE_SLUG) {
    await this.ensureHomePageSeed(pageSlug);
    const layout = await this.prisma.pageLayout.findUniqueOrThrow({ where: { pageSlug } });
    return this.toLayoutDto(layout);
  }

  async updateDraftLayout(pageSlug: string, draftSections: Array<{ sectionKey: HomeSectionKey }>) {
    const layout = await this.prisma.pageLayout.upsert({
      where: { pageSlug },
      update: {
        draftSections: draftSections as Prisma.InputJsonValue,
      },
      create: {
        pageSlug,
        draftSections: draftSections as Prisma.InputJsonValue,
      },
    });
    return this.toLayoutDto(layout);
  }

  async publishPage(pageSlug = HOME_PAGE_SLUG) {
    await this.ensureHomePageSeed(pageSlug);

    const layout = await this.prisma.pageLayout.findUniqueOrThrow({ where: { pageSlug } });
    const draftSections = layout.draftSections as Array<{ sectionKey: HomeSectionKey }>;

    const sectionMap = new Map<HomeSectionKey, SectionInstance>();
    const instances = await this.prisma.sectionInstance.findMany({ where: { pageSlug } });
    instances.forEach((entry) => sectionMap.set(entry.sectionKey as HomeSectionKey, entry));

    for (const section of draftSections) {
      const instance = sectionMap.get(section.sectionKey);
      if (!instance) continue;
      await this.prisma.sectionInstance.update({
        where: { id: instance.id },
        data: { publishedProps: instance.draftProps },
      });
    }

    const publishedSections = draftSections.map((section) => {
      const instance = sectionMap.get(section.sectionKey);
      return {
        sectionKey: section.sectionKey,
        props: (instance?.draftProps ?? defaultSectionProps[section.sectionKey]) as AnySectionProps,
      };
    });

    const snapshot = {
      pageSlug,
      sections: publishedSections,
      publishedAt: new Date().toISOString(),
    };

    const publishedPage = await this.prisma.publishedPage.upsert({
      where: { pageSlug },
      update: {
        snapshot: snapshot as Prisma.InputJsonValue,
        publishedAt: new Date(snapshot.publishedAt),
      },
      create: {
        pageSlug,
        snapshot: snapshot as Prisma.InputJsonValue,
        publishedAt: new Date(snapshot.publishedAt),
      },
    });

    return this.toPublishedDto(publishedPage);
  }

  async getPublishedPage(pageSlug = HOME_PAGE_SLUG) {
    const published = await this.prisma.publishedPage.findUnique({ where: { pageSlug } });
    if (!published) {
      return this.publishPage(pageSlug);
    }
    return this.toPublishedDto(published);
  }

  private toSectionEntryDto(entry: SectionInstance) {
    return {
      id: entry.id,
      pageSlug: entry.pageSlug,
      sectionKey: entry.sectionKey,
      draftProps: entry.draftProps,
      publishedProps: entry.publishedProps,
      updatedAt: entry.updatedAt.toISOString(),
    };
  }

  private toLayoutDto(layout: PageLayout) {
    return {
      id: layout.id,
      pageSlug: layout.pageSlug,
      draftSections: layout.draftSections,
      updatedAt: layout.updatedAt.toISOString(),
    };
  }

  private toPublishedDto(published: PublishedPage) {
    return {
      id: published.id,
      pageSlug: published.pageSlug,
      snapshot: published.snapshot,
      publishedAt: published.publishedAt.toISOString(),
      updatedAt: published.updatedAt.toISOString(),
    };
  }
}
