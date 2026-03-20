'use client';

import { SectionRenderer } from '../../../../../../libs/ui/src/section/section-renderer';
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
    <div>
      <div>
        <h2 className="text-sm font-semibold">Live preview</h2>
      </div>
      <div className="space-y-3 rounded-xl border border-border bg-card p-4">
        <div>
          {rows.map((row, rowIndex) => (
            <div key={row.id} className="grid grid-cols-12">
              {row.columns.map((column) => {
                const section = column.sectionInstanceId
                  ? sectionLookup.get(column.sectionInstanceId)
                  : null;

                return (
                  <div
                    key={column.id}
                    style={{
                      gridColumn: `span ${column.span} / span ${column.span}`,
                    }}
                  >
                    {section?.draftProps ? (
                      <div className="overflow-auto">
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
    </div>
  );
}
