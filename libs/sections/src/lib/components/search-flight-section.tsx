import { Button, Input, SectionShell } from '@my-org/ui';
import { SearchFlightSectionProps } from '../types';

export function SearchFlightSection({ heading, subheading }: SearchFlightSectionProps) {
  return (
    <SectionShell>
      <h2 className="text-2xl font-semibold">{heading}</h2>
      {subheading ? <p className="mb-4 text-slate-600">{subheading}</p> : null}
      <div className="grid gap-2 md:grid-cols-4">
        <Input placeholder="From" />
        <Input placeholder="To" />
        <Input placeholder="Departure" />
        <Button>Search</Button>
      </div>
    </SectionShell>
  );
}
