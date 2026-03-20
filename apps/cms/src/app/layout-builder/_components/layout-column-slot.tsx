'use client';

import { Badge } from '@my-org/ui/components/ui/badge';
import { Button } from '@my-org/ui/components/ui/button';
import { Input } from '@my-org/ui/components/ui/input';
import type {
  LayoutColumn,
  SectionInstanceOption,
} from '../_lib/layout-editor-model';
import { SectionAssignmentSelect } from './section-assignment-select';

interface LayoutColumnSlotProps {
  column: LayoutColumn;
  options: SectionInstanceOption[];
  assignedLabel?: string;
  canRemove: boolean;
  onUpdateSpan: (span: number) => void;
  onAssignSection: (sectionId: string | undefined) => void;
  onRemove: () => void;
}

export function LayoutColumnSlot({
  column,
  options,
  assignedLabel,
  canRemove,
  onUpdateSpan,
  onAssignSection,
  onRemove,
}: LayoutColumnSlotProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">Span {column.span}</Badge>
        {canRemove ? (
          <Button type="button" size="sm" variant="outline" onClick={onRemove}>
            Remove
          </Button>
        ) : null}
      </div>

      <label className="space-y-1 text-xs text-muted-foreground">
        Span (1-12)
        <Input
          type="number"
          min={1}
          max={12}
          value={column.span}
          onChange={(event) => onUpdateSpan(Number(event.target.value))}
          className="h-8"
        />
      </label>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Section assignment</p>
        <SectionAssignmentSelect
          value={column.sectionInstanceId}
          options={options}
          onValueChange={onAssignSection}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {assignedLabel ? `Assigned: ${assignedLabel}` : 'No section assigned'}
      </p>
    </div>
  );
}
