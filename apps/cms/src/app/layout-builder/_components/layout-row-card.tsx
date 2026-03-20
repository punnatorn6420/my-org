'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../../libs/ui/src/components/ui/card';
import { Button } from '../../../../../../libs/ui/src/components/ui/button';
import type {
  LayoutRow,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';
import { getRowSpanTotal } from '../_lib/layout-editor-model';
import { LayoutColumnSlot } from './layout-column-slot';

interface LayoutRowCardProps {
  row: LayoutRow;
  rowIndex: number;
  sectionOptions: SectionInstanceOption[];
  sectionLookup: Map<string, SectionInstanceOption>;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onAddColumn: () => void;
  onRemoveColumn: (columnId: string) => void;
  onUpdateColumnSpan: (columnId: string, span: number) => void;
  onAssignSection: (columnId: string, sectionId: string | undefined) => void;
}

export function LayoutRowCard({
  row,
  rowIndex,
  sectionOptions,
  sectionLookup,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onAddColumn,
  onRemoveColumn,
  onUpdateColumnSpan,
  onAssignSection,
}: LayoutRowCardProps) {
  const total = getRowSpanTotal(row);

  return (
    <Card className="border-border/80">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Row {rowIndex + 1}</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onMoveUp}>
            Up
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMoveDown}
          >
            Down
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDuplicate}
          >
            Duplicate
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-12 gap-3 rounded-lg border border-dashed border-border p-3">
          {row.columns.map((column) => (
            <div
              key={column.id}
              style={{
                gridColumn: `span ${column.span} / span ${column.span}`,
              }}
            >
              <LayoutColumnSlot
                column={column}
                options={sectionOptions}
                assignedLabel={
                  column.sectionInstanceId
                    ? sectionLookup.get(column.sectionInstanceId)?.label
                    : undefined
                }
                canRemove={row.columns.length > 1}
                onRemove={() => onRemoveColumn(column.id)}
                onUpdateSpan={(span) => onUpdateColumnSpan(column.id, span)}
                onAssignSection={(sectionId) =>
                  onAssignSection(column.id, sectionId)
                }
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Current total span: {total}/12
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onAddColumn}
          >
            Add column
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
