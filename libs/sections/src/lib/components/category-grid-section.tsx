import { Card, CardDescription, CardTitle, SectionShell } from '@my-org/ui';
import { CategoryGridSectionProps } from '../types';

export function CategoryGridSection({ title, items }: CategoryGridSectionProps) {
  return (
    <SectionShell title={title}>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
