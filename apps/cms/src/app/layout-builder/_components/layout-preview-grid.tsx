'use client';

import { SectionRenderer } from '@my-org/ui/section/section-renderer';
import type {
  LayoutRow,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';

interface LayoutPreviewGridProps {
  rows: LayoutRow[];
  sectionLookup: Map<string, SectionInstanceOption>;
}

export function LayoutPreviewGrid({
  rows,
  sectionLookup,
}: LayoutPreviewGridProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <div>
        <h2 className="text-sm font-semibold">Live preview</h2>
        <p className="text-xs text-muted-foreground">
          Preview reflects the same row/column structure that will be saved.
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((row, rowIndex) => (
          <div
            key={row.id}
            className="grid grid-cols-12 gap-2 rounded-md border border-dashed border-border bg-background/70 p-2"
          >
            {row.columns.map((column) => {
              const section = column.sectionInstanceId
                ? sectionLookup.get(column.sectionInstanceId)
                : null;

              return (
                <div
                  key={column.id}
                  style={{ gridColumn: `span ${column.span} / span ${column.span}` }}
                  className="rounded border border-border bg-muted/30 p-2"
                >
                  <p className="text-xs font-medium">R{rowIndex + 1} • Span {column.span}</p>
                  {section?.draftProps ? (
                    <div className="mt-2 max-h-80 overflow-auto rounded border border-border bg-white">
                      <SectionRenderer
                        sectionKey={section.sectionKey}
                        props={section.draftProps}
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {section?.label ?? 'Unassigned section placeholder'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
