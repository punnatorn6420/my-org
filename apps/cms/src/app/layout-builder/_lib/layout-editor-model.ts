import {
  HOME_PAGE_SLUG,
  type HomeSectionKey,
} from '../../../../../../libs/ui/src/section/content-models';

export const GRID_COLUMNS = 6;
export const DEFAULT_GRID_ROWS = 8;
export const GRID_CELL_HEIGHT = 88;
export const LAYOUT_STORAGE_KEY = 'cms.home-layout-draft.v2';
export const DEFAULT_PAGE_SLUG = HOME_PAGE_SLUG;

export interface SectionInstanceOption {
  id: string;
  sectionKey: HomeSectionKey;
  label: string;
  draftProps?: unknown;
}

export interface LayoutBlock {
  id: string;
  sectionInstanceId?: string;
  sectionKey?: HomeSectionKey;
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
}

export interface LayoutCanvasState {
  columns: number;
  rows: number;
  blocks: LayoutBlock[];
}

export interface GridPosition {
  colStart: number;
  rowStart: number;
}

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

export function createBlockFromSection(
  section: Pick<SectionInstanceOption, 'id' | 'sectionKey'>,
  position: GridPosition,
): LayoutBlock {
  return {
    id: createId('block'),
    sectionInstanceId: section.id,
    sectionKey: section.sectionKey,
    colStart: position.colStart,
    rowStart: position.rowStart,
    colSpan: section.sectionKey === 'hero-booking' ? 3 : 2,
    rowSpan: section.sectionKey === 'hero-booking' ? 2 : 1,
  };
}

export function gridPositionFromPointer(
  pointerX: number,
  pointerY: number,
  gridRect: DOMRect,
  columns: number,
): GridPosition {
  const columnWidth = gridRect.width / columns;
  const colStart = Math.max(
    1,
    Math.min(columns, Math.floor((pointerX - gridRect.left) / columnWidth) + 1),
  );

  const rowStart = Math.max(
    1,
    Math.floor((pointerY - gridRect.top) / GRID_CELL_HEIGHT) + 1,
  );

  return { colStart, rowStart };
}

function rangesOverlap(
  startA: number,
  spanA: number,
  startB: number,
  spanB: number,
) {
  const endA = startA + spanA - 1;
  const endB = startB + spanB - 1;
  return startA <= endB && startB <= endA;
}

export function isOverlapping(a: LayoutBlock, b: LayoutBlock) {
  const colOverlap = rangesOverlap(
    a.colStart,
    a.colSpan,
    b.colStart,
    b.colSpan,
  );
  const rowOverlap = rangesOverlap(
    a.rowStart,
    a.rowSpan,
    b.rowStart,
    b.rowSpan,
  );
  return colOverlap && rowOverlap;
}

export function canPlaceBlock(
  candidate: LayoutBlock,
  blocks: LayoutBlock[],
  columns: number,
  ignoreBlockId?: string,
) {
  if (candidate.colStart < 1 || candidate.rowStart < 1) return false;
  if (candidate.colStart + candidate.colSpan - 1 > columns) return false;

  return !blocks.some((block) => {
    if (ignoreBlockId && block.id === ignoreBlockId) return false;
    return isOverlapping(candidate, block);
  });
}

export function moveBlock(
  blocks: LayoutBlock[],
  blockId: string,
  position: GridPosition,
  columns: number,
) {
  const current = blocks.find((block) => block.id === blockId);
  if (!current) return { blocks, isValid: false };

  const candidate: LayoutBlock = {
    ...current,
    colStart: position.colStart,
    rowStart: position.rowStart,
  };

  if (!canPlaceBlock(candidate, blocks, columns, blockId)) {
    return { blocks, isValid: false };
  }

  return {
    isValid: true,
    blocks: blocks.map((block) => (block.id === blockId ? candidate : block)),
  };
}

export function getRequiredRows(
  blocks: LayoutBlock[],
  minRows = DEFAULT_GRID_ROWS,
) {
  const maxBlockRow = blocks.reduce(
    (max, block) => Math.max(max, block.rowStart + block.rowSpan - 1),
    0,
  );
  return Math.max(minRows, maxBlockRow + 1);
}

export function normalizeApiLayout(payload: unknown): LayoutCanvasState {
  const data = payload as
    | {
        draftLayout?: Partial<LayoutCanvasState>;
        draftRows?: Array<{
          columns?: Array<{ span?: number; sectionInstanceId?: string }>;
        }>;
      }
    | undefined;

  if (data?.draftLayout?.blocks?.length) {
    const columns = Number.isFinite(data.draftLayout.columns)
      ? Number(data.draftLayout.columns)
      : GRID_COLUMNS;

    const blocks = data.draftLayout.blocks.map((block, index) => ({
      id: block.id ?? createId(`block-${index}`),
      sectionInstanceId: block.sectionInstanceId,
      sectionKey: block.sectionKey,
      colStart: Number(block.colStart ?? 1),
      colSpan: Number(block.colSpan ?? 2),
      rowStart: Number(block.rowStart ?? 1),
      rowSpan: Number(block.rowSpan ?? 1),
    }));

    return {
      columns,
      rows: getRequiredRows(blocks),
      blocks,
    };
  }

  // Backward-compat mapper from row/column model.
  if (data?.draftRows?.length) {
    const blocks = data.draftRows.flatMap((row, rowIndex) => {
      let nextCol = 1;
      return (row.columns ?? []).map((column, colIndex) => {
        const safeSpan = Math.max(
          1,
          Math.min(GRID_COLUMNS, Math.round((column.span ?? 12) / 2)),
        );
        const block: LayoutBlock = {
          id: createId(`legacy-${rowIndex}-${colIndex}`),
          sectionInstanceId: column.sectionInstanceId,
          colStart: nextCol,
          colSpan: safeSpan,
          rowStart: rowIndex + 1,
          rowSpan: 1,
        };
        nextCol += safeSpan;
        return block;
      });
    });

    return { columns: GRID_COLUMNS, rows: getRequiredRows(blocks), blocks };
  }

  return { columns: GRID_COLUMNS, rows: DEFAULT_GRID_ROWS, blocks: [] };
}
