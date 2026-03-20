import { HOME_PAGE_SLUG, type HomeSectionKey } from '@my-org/ui/section/content-models';

export const GRID_COLUMNS = 12;
export const LAYOUT_STORAGE_KEY = 'cms.home-layout-draft.v1';
export const DEFAULT_PAGE_SLUG = HOME_PAGE_SLUG;

export interface SectionInstanceOption {
  id: string;
  sectionKey: HomeSectionKey;
  label: string;
}

export interface LayoutColumn {
  id: string;
  span: number;
  sectionInstanceId?: string;
}

export interface LayoutRow {
  id: string;
  columns: LayoutColumn[];
}

export interface HomeLayoutDraft {
  pageSlug: string;
  rows: LayoutRow[];
  updatedAt?: string;
}

export interface RowTemplate {
  id: string;
  label: string;
  spans: number[];
}

export const ROW_TEMPLATES: RowTemplate[] = [
  { id: 'full', label: '12', spans: [12] },
  { id: 'half-half', label: '6-6', spans: [6, 6] },
  { id: 'thirds', label: '4-4-4', spans: [4, 4, 4] },
  { id: 'sidebar-main', label: '3-9', spans: [3, 9] },
  { id: 'mixed-three', label: '3-3-6', spans: [3, 3, 6] },
];

export function formatSectionLabel(sectionKey: string) {
  return sectionKey
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createRowFromSpans(spans: number[]): LayoutRow {
  return {
    id: createId('row'),
    columns: spans.map((span) => ({
      id: createId('col'),
      span,
    })),
  };
}

export function getRowSpanTotal(row: LayoutRow) {
  return row.columns.reduce((total, column) => total + column.span, 0);
}

export function validateRows(rows: LayoutRow[]): string[] {
  const errors: string[] = [];

  if (!rows.length) {
    errors.push('Add at least one row before saving.');
  }

  rows.forEach((row, rowIndex) => {
    const total = getRowSpanTotal(row);

    if (total > GRID_COLUMNS) {
      errors.push(`Row ${rowIndex + 1} exceeds 12 columns (${total}/12).`);
    }

    if (total <= 0) {
      errors.push(`Row ${rowIndex + 1} must contain at least one column.`);
    }

    row.columns.forEach((column, columnIndex) => {
      if (column.span < 1 || column.span > GRID_COLUMNS) {
        errors.push(
          `Row ${rowIndex + 1}, column ${columnIndex + 1} has invalid span ${column.span}.`,
        );
      }
    });
  });

  return errors;
}

export function normalizeApiLayout(
  payload: unknown,
  sectionOptions: SectionInstanceOption[],
): LayoutRow[] {
  const data = payload as
    | {
        draftRows?: Array<{
          id?: string;
          columns?: Array<{
            id?: string;
            span?: number;
            sectionInstanceId?: string;
          }>;
        }>;
        draftSections?: Array<{ sectionKey?: HomeSectionKey }>;
      }
    | undefined;

  if (data?.draftRows?.length) {
    return data.draftRows.map((row) => ({
      id: row.id ?? createId('row'),
      columns: (row.columns ?? []).map((column) => ({
        id: column.id ?? createId('col'),
        span: Number.isFinite(column.span) ? Number(column.span) : 12,
        sectionInstanceId: column.sectionInstanceId,
      })),
    }));
  }

  if (data?.draftSections?.length) {
    return data.draftSections.map((section) => {
      const option = sectionOptions.find(
        (item) => item.sectionKey === section.sectionKey,
      );

      return {
        id: createId('row'),
        columns: [
          {
            id: createId('col'),
            span: 12,
            sectionInstanceId: option?.id,
          },
        ],
      };
    });
  }

  return [createRowFromSpans([12])];
}
