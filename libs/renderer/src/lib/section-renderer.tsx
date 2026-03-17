import { SectionInstance } from '@my-org/schema';
import { sectionRegistry } from '@my-org/sections';

export function SectionRenderer({ section }: { section?: SectionInstance }) {
  if (!section) {
    return <div className="rounded-md border border-dashed p-4 text-sm text-slate-500">No section assigned</div>;
  }

  const Component = sectionRegistry[section.type];
  if (!Component) {
    return <div className="rounded-md border border-dashed p-4 text-sm text-red-500">Unknown section type: {section.type}</div>;
  }

  return <Component {...section.props} />;
}
