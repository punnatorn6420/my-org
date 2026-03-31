'use client';

import { cn } from '../../../../../../libs/ui/src/lib/utils';
import type {
  LayoutBlock,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';

interface GridBlockProps {
  block: LayoutBlock;
  section?: SectionInstanceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragBlock: (blockId: string) => void;
}

export function GridBlock({
  block,
  section,
  isSelected,
  onSelect,
  onDragBlock,
}: GridBlockProps) {
  return (
    <button
      type="button"
      draggable
      onDragStart={() => onDragBlock(block.id)}
      onClick={() => onSelect(block.id)}
      className={cn(
        'rounded-lg border bg-primary/10 p-2 text-left text-xs shadow-sm',
        isSelected && 'border-primary ring-1 ring-primary',
      )}
      style={{
        gridColumn: `${block.colStart} / span ${block.colSpan}`,
        gridRow: `${block.rowStart} / span ${block.rowSpan}`,
      }}
    >
      <p className="font-semibold">
        {section?.label ?? block.sectionKey ?? 'Section'}
      </p>
      <p className="text-muted-foreground">
        c{block.colStart}:{block.colSpan} · r{block.rowStart}:{block.rowSpan}
      </p>
    </button>
  );
}
