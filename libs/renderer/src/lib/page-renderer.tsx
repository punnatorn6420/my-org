import { PageLayout, SectionInstance } from '@my-org/schema';
import { RowRenderer } from './row-renderer';

export function PageRenderer({ layout, sections }: { layout?: PageLayout; sections: SectionInstance[]; }) {
  if (!layout) {
    return <p className="text-sm text-slate-500">No page layout available.</p>;
  }

  const sectionsById = Object.fromEntries(sections.map((section) => [section.id, section]));

  return (
    <div className="space-y-4">
      {layout.rows.map((row) => (
        <RowRenderer key={row.id} row={row} sectionsById={sectionsById} />
      ))}
    </div>
  );
}
