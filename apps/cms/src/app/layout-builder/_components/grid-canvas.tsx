'use client';

import { cn } from '../../../../../../libs/ui/src/lib/utils';
import type {
  GridPosition,
  LayoutBlock,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';
import { GRID_CELL_HEIGHT } from '../_lib/layout-editor-model';
import { GridBlock } from './grid-block';

interface GridCanvasProps {
  columns: number;
  rows: number;
  blocks: LayoutBlock[];
  sectionLookup: Map<string, SectionInstanceOption>;
  selectedBlockId?: string;
  onSelectBlock: (id: string) => void;
  onDragBlock: (blockId: string) => void;
  onCanvasDragOver: (position: GridPosition) => void;
  onCanvasDrop: (position: GridPosition) => void;
  onCanvasDragLeave: () => void;
  dropPreview?:
    | (GridPosition & { colSpan: number; rowSpan: number; isValid: boolean })
    | null;
}

export function GridCanvas({
  columns,
  rows,
  blocks,
  sectionLookup,
  selectedBlockId,
  onSelectBlock,
  onDragBlock,
  onCanvasDragOver,
  onCanvasDrop,
  onCanvasDragLeave,
  dropPreview,
}: GridCanvasProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold">Grid Canvas ({columns} columns)</h2>
      <div
        className={cn('relative rounded-lg border bg-muted/20 p-2')}
        onDragOver={(event) => {
          event.preventDefault();
          const rect = event.currentTarget.getBoundingClientRect();
          const colStart = Math.max(
            1,
            Math.min(
              columns,
              Math.floor(((event.clientX - rect.left) / rect.width) * columns) +
                1,
            ),
          );
          const rowStart = Math.max(
            1,
            Math.floor((event.clientY - rect.top) / GRID_CELL_HEIGHT) + 1,
          );
          onCanvasDragOver({ colStart, rowStart });
        }}
        onDrop={(event) => {
          event.preventDefault();
          if (!dropPreview) return;
          onCanvasDrop({
            colStart: dropPreview.colStart,
            rowStart: dropPreview.rowStart,
          });
        }}
        onDragLeave={onCanvasDragLeave}
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, ${GRID_CELL_HEIGHT}px)`,
          }}
        >
          {Array.from({ length: columns * rows }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-md border border-dashed border-border/70"
            />
          ))}
          {blocks.map((block) => (
            <GridBlock
              key={block.id}
              block={block}
              section={
                block.sectionInstanceId
                  ? sectionLookup.get(block.sectionInstanceId)
                  : undefined
              }
              isSelected={selectedBlockId === block.id}
              onSelect={onSelectBlock}
              onDragBlock={onDragBlock}
            />
          ))}
          {dropPreview ? (
            <div
              className={cn(
                'pointer-events-none rounded-lg border-2 border-dashed',
                dropPreview.isValid
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-red-500 bg-red-500/20',
              )}
              style={{
                gridColumn: `${dropPreview.colStart} / span ${dropPreview.colSpan}`,
                gridRow: `${dropPreview.rowStart} / span ${dropPreview.rowSpan}`,
              }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
