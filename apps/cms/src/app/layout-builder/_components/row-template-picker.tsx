'use client';

import { Button } from '@my-org/ui/components/ui/button';
import { Input } from '@my-org/ui/components/ui/input';
import { Label } from '@my-org/ui/components/ui/label';
import { useMemo, useState } from 'react';
import { ROW_TEMPLATES } from '../_lib/layout-editor-model';

interface RowTemplatePickerProps {
  onPickTemplate: (spans: number[]) => void;
}

export function RowTemplatePicker({ onPickTemplate }: RowTemplatePickerProps) {
  const [custom, setCustom] = useState('4,8');

  const parsedCustom = useMemo(() => {
    const spans = custom
      .split(',')
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item) && item > 0);

    return {
      spans,
      total: spans.reduce((sum, span) => sum + span, 0),
    };
  }, [custom]);

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Add row</h2>
        <p className="text-xs text-muted-foreground">
          Pick a template or enter custom spans (e.g. 2,5,5).
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {ROW_TEMPLATES.map((template) => (
          <Button
            key={template.id}
            type="button"
            variant="outline"
            onClick={() => onPickTemplate(template.spans)}
            className="justify-start"
          >
            {template.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="w-full space-y-1 sm:max-w-xs">
          <Label htmlFor="custom-spans">Custom spans</Label>
          <Input
            id="custom-spans"
            value={custom}
            onChange={(event) => setCustom(event.target.value)}
            placeholder="3,3,6"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          disabled={!parsedCustom.spans.length || parsedCustom.total > 12}
          onClick={() => onPickTemplate(parsedCustom.spans)}
        >
          Add custom row
        </Button>
        <p className="text-xs text-muted-foreground">Total: {parsedCustom.total}/12</p>
      </div>
    </div>
  );
}
