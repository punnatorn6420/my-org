import { LayoutRow, SectionInstance } from '@my-org/schema';
import { SectionRenderer } from './section-renderer';

export function RowRenderer({ row, sectionsById }: { row: LayoutRow; sectionsById: Record<string, SectionInstance>; }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
      {row.columns.map((column) => (
        <div key={column.id} style={{ gridColumn: `span ${column.span} / span ${column.span}` }}>
          <SectionRenderer section={column.sectionInstanceId ? sectionsById[column.sectionInstanceId] : undefined} />
        </div>
      ))}
    </div>
  );
}
