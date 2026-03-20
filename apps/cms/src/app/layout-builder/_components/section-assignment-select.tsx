'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@my-org/ui/components/ui/select';
import type { SectionInstanceOption } from '../_lib/layout-editor-model';

interface SectionAssignmentSelectProps {
  value?: string;
  options: SectionInstanceOption[];
  onValueChange: (value: string | undefined) => void;
}

export function SectionAssignmentSelect({
  value,
  options,
  onValueChange,
}: SectionAssignmentSelectProps) {
  return (
    <Select
      value={value ?? '__none'}
      onValueChange={(next) => onValueChange(next === '__none' ? undefined : next)}
    >
      <SelectTrigger className="h-8">
        <SelectValue placeholder="Assign section" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__none">No section assigned</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
