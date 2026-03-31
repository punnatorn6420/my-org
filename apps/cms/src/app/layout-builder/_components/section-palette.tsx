'use client';

import { Badge } from '../../../../../../libs/ui/src/components/ui/badge';
import type { SectionInstanceOption } from '../_lib/layout-editor-model';

interface SectionPaletteProps {
  sections: SectionInstanceOption[];
  onDragSection: (section: SectionInstanceOption) => void;
}

export function SectionPalette({
  sections,
  onDragSection,
}: SectionPaletteProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4">
      <h2 className="text-sm font-semibold">Section Palette</h2>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            draggable
            onDragStart={() => onDragSection(section)}
            className="w-full rounded-lg border bg-card p-3 text-left transition hover:border-primary"
          >
            <p className="text-sm font-semibold">{section.label}</p>
            <Badge variant="secondary" className="mt-2">
              {section.sectionKey}
            </Badge>
          </button>
        ))}
      </div>
    </section>
  );
}
