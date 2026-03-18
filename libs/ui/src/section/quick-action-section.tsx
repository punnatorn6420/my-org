import type { ComponentType } from 'react';
import { Briefcase, CircleCheck, ShieldCheck, Timer } from 'lucide-react';

import type { QuickActionSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { Card, CardContent } from '../components/ui/card';

const iconMap: Record<QuickActionSectionProps['items'][number]['icon'], ComponentType<{ className?: string }>> = {
  'circle-check': CircleCheck,
  timer: Timer,
  briefcase: Briefcase,
  'shield-check': ShieldCheck,
};

export function QuickActionSection(props: QuickActionSectionProps = defaultSectionProps['quick-action-section']) {
  const items = Array.isArray(props?.items) ? props.items : defaultSectionProps['quick-action-section'].items;

  return (
    <section className="bg-slate-100 py-8">
      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Card key={`${item.title}-${item.subtitle}`} className="border border-slate-200 bg-white py-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-slate-100 p-2 text-slate-500">
                  <Icon className="size-4" />
                </span>
                <a href={item.href}>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
