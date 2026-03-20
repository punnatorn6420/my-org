import type { Viewport } from 'next';
import {
  defaultSectionProps,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
  SectionRenderer,
} from '@my-org/ui';

interface PreviewPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function isHomeSectionKey(value: string | null): value is HomeSectionKey {
  if (!value) {
    return false;
  }

  return HOME_SECTION_KEYS.includes(value as HomeSectionKey);
}

function getSearchValue(
  value: string | string[] | undefined,
): string | null {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

function parsePositiveNumber(value: string | null, fallback: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}

function parseDraft(raw: string | null): AnySectionProps | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AnySectionProps;
  } catch {
    return null;
  }
}

export async function generateViewport({
  searchParams,
}: PreviewPageProps): Promise<Viewport> {
  const params = await searchParams;
  const width = parsePositiveNumber(getSearchValue(params.width), 1440);

  return {
    width,
    initialScale: 1,
    maximumScale: 1,
  };
}

export default async function PreviewSectionPage({
  searchParams,
}: PreviewPageProps) {
  const params = await searchParams;

  const sectionFromQuery = getSearchValue(params.section);
  const sectionKey = isHomeSectionKey(sectionFromQuery)
    ? sectionFromQuery
    : HOME_SECTION_KEYS[0];

  const width = parsePositiveNumber(getSearchValue(params.width), 1440);
  const height = parsePositiveNumber(getSearchValue(params.height), 900);
  const parsedDraft = parseDraft(getSearchValue(params.draft));
  const props = parsedDraft ?? defaultSectionProps[sectionKey];

  return (
    <main
      style={{
        width: `${width}px`,
        minHeight: `${height}px`,
        margin: 0,
        overflowX: 'hidden',
      }}
    >
      <SectionRenderer sectionKey={sectionKey} props={props} />
    </main>
  );
}
