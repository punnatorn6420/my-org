'use client';

import { SectionRenderer } from '../../../../../../libs/ui/src/section/section-renderer';
import type {
  LayoutBlock,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';

interface PreviewPanelProps {
  blocks: LayoutBlock[];
  sectionLookup: Map<string, SectionInstanceOption>;
}

export function PreviewPanel({ blocks, sectionLookup }: PreviewPanelProps) {
  const ordered = [...blocks].sort(
    (a, b) => a.rowStart - b.rowStart || a.colStart - b.colStart,
  );

  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold">Preview</h2>
      <div className="space-y-4">
        {ordered.map((block) => {
          const section = block.sectionInstanceId
            ? sectionLookup.get(block.sectionInstanceId)
            : undefined;

          if (!section?.draftProps) {
            return (
              <div
                key={block.id}
                className="rounded-md border p-2 text-xs text-muted-foreground"
              >
                {section?.label ?? block.sectionKey ?? 'Unassigned section'}
              </div>
            );
          }

          return (
            <div key={block.id} className="overflow-hidden rounded-md border">
              <SectionRenderer
                sectionKey={section.sectionKey}
                props={section.draftProps as never}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
