import { Card, CardDescription, CardTitle, SectionShell } from '@my-org/ui';
import { PopularServicesSectionProps } from '../types';

export function PopularServicesSection({ title, items }: PopularServicesSectionProps) {
  return (
    <SectionShell title={title}>
      <div className="grid gap-3 md:grid-cols-2">
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
