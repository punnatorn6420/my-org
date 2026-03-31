'use client';

import { Button } from '../../../../../../libs/ui/src/components/ui/button';
import type {
  LayoutBlock,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';

interface InspectorPanelProps {
  selectedBlock?: LayoutBlock;
  selectedSection?: SectionInstanceOption;
  onDelete: (blockId: string) => void;
}

export function InspectorPanel({
  selectedBlock,
  selectedSection,
  onDelete,
}: InspectorPanelProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold">Inspector</h2>
      {!selectedBlock ? (
        <p className="text-sm text-muted-foreground">
          Select a block to inspect it.
        </p>
      ) : (
        <>
          <dl className="space-y-1 text-sm">
            <div>
              <dt className="text-muted-foreground">Section</dt>
              <dd className="font-medium">
                {selectedSection?.label ?? selectedBlock.sectionKey ?? '-'}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Column</dt>
              <dd>{selectedBlock.colStart}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Column Span</dt>
              <dd>{selectedBlock.colSpan}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Row</dt>
              <dd>{selectedBlock.rowStart}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Row Span</dt>
              <dd>{selectedBlock.rowSpan}</dd>
            </div>
          </dl>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(selectedBlock.id)}
          >
            Delete block
          </Button>
        </>
      )}
    </section>
  );
}
