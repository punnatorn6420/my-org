import { Injectable } from '@nestjs/common';
import {
  defaultSectionProps,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
  HOME_PAGE_SLUG,
} from '@my-org/ui/section/content-models';
import { PrismaService } from '../prisma/prisma.service';

type SectionInstanceRecord = Awaited<
  ReturnType<PrismaService['sectionInstance']['findFirstOrThrow']>
>;

type PageLayoutRecord = Awaited<
  ReturnType<PrismaService['pageLayout']['findUniqueOrThrow']>
>;

type PublishedPageRecord = Awaited<
  ReturnType<PrismaService['publishedPage']['findUniqueOrThrow']>
>;

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  private asJson(value: unknown): any {
    return value;
  }

  async ensureHomePageSeed(pageSlug = HOME_PAGE_SLUG) {
    await this.prisma.pageLayout.upsert({
      where: { pageSlug },
      update: {},
      create: {
        pageSlug,
        draftSections: this.asJson(
          HOME_SECTION_KEYS.map((sectionKey) => ({ sectionKey })),
        ),
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
            draftProps: this.asJson(defaultSectionProps[sectionKey]),
            publishedProps: this.asJson(defaultSectionProps[sectionKey]),
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

  async updateSectionDraft(
    pageSlug: string,
    sectionKey: HomeSectionKey,
    draftProps: AnySectionProps,
  ) {
    const updated = await this.prisma.sectionInstance.upsert({
      where: { pageSlug_sectionKey: { pageSlug, sectionKey } },
      update: {
        draftProps: this.asJson(draftProps),
      },
      create: {
        pageSlug,
        sectionKey,
        draftProps: this.asJson(draftProps),
        publishedProps: this.asJson(defaultSectionProps[sectionKey]),
      },
    });

    return this.toSectionEntryDto(updated);
  }

  async getDraftLayout(pageSlug = HOME_PAGE_SLUG) {
    await this.ensureHomePageSeed(pageSlug);

    const layout = await this.prisma.pageLayout.findUniqueOrThrow({
      where: { pageSlug },
    });

    return this.toLayoutDto(layout);
  }

  async updateDraftLayout(
    pageSlug: string,
    draftSections: Array<{ sectionKey: HomeSectionKey }>,
  ) {
    const layout = await this.prisma.pageLayout.upsert({
      where: { pageSlug },
      update: {
        draftSections: this.asJson(draftSections),
      },
      create: {
        pageSlug,
        draftSections: this.asJson(draftSections),
      },
    });

    return this.toLayoutDto(layout);
  }

  async publishPage(pageSlug = HOME_PAGE_SLUG) {
    await this.ensureHomePageSeed(pageSlug);

    const layout = await this.prisma.pageLayout.findUniqueOrThrow({
      where: { pageSlug },
    });

    const draftSections = layout.draftSections as Array<{
      sectionKey: HomeSectionKey;
    }>;

    const sectionMap = new Map<HomeSectionKey, SectionInstanceRecord>();
    const instances = await this.prisma.sectionInstance.findMany({
      where: { pageSlug },
    });

    instances.forEach((entry) =>
      sectionMap.set(entry.sectionKey as HomeSectionKey, entry),
    );

    for (const section of draftSections) {
      const instance = sectionMap.get(section.sectionKey);
      if (!instance) continue;

      await this.prisma.sectionInstance.update({
        where: { id: instance.id },
        data: {
          publishedProps: instance.draftProps as any,
        },
      });
    }

    const publishedSections = draftSections.map((section) => {
      const instance = sectionMap.get(section.sectionKey);

      return {
        sectionKey: section.sectionKey,
        props: (instance?.draftProps ??
          defaultSectionProps[section.sectionKey]) as AnySectionProps,
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
        snapshot: this.asJson(snapshot),
        publishedAt: new Date(snapshot.publishedAt),
      },
      create: {
        pageSlug,
        snapshot: this.asJson(snapshot),
        publishedAt: new Date(snapshot.publishedAt),
      },
    });

    return this.toPublishedDto(publishedPage);
  }

  async getPublishedPage(pageSlug = HOME_PAGE_SLUG) {
    const published = await this.prisma.publishedPage.findUnique({
      where: { pageSlug },
    });

    if (!published) {
      return this.publishPage(pageSlug);
    }

    return this.toPublishedDto(published);
  }

  private toSectionEntryDto(entry: SectionInstanceRecord) {
    return {
      id: entry.id,
      pageSlug: entry.pageSlug,
      sectionKey: entry.sectionKey,
      draftProps: entry.draftProps,
      publishedProps: entry.publishedProps,
      updatedAt: entry.updatedAt.toISOString(),
    };
  }

  private toLayoutDto(layout: PageLayoutRecord) {
    return {
      id: layout.id,
      pageSlug: layout.pageSlug,
      draftSections: layout.draftSections,
      updatedAt: layout.updatedAt.toISOString(),
    };
  }

  private toPublishedDto(published: PublishedPageRecord) {
    return {
      id: published.id,
      pageSlug: published.pageSlug,
      snapshot: published.snapshot,
      publishedAt: published.publishedAt.toISOString(),
      updatedAt: published.updatedAt.toISOString(),
    };
  }
}
