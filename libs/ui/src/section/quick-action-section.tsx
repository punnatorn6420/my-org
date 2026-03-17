import type { ComponentType } from 'react';
import { Briefcase, CircleCheck, ShieldCheck, Timer } from 'lucide-react';

import { Card, CardContent } from '../components/ui/card';

interface QuickAction {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
}

const quickActions: QuickAction[] = [
  { title: 'Check-in', subtitle: 'Quick & easy', icon: CircleCheck },
  { title: 'Flight Status', subtitle: 'Real-time updates', icon: Timer },
  { title: 'Baggage', subtitle: 'Add extra weight', icon: Briefcase },
  { title: 'Nok Smile Plus', subtitle: 'Member benefits', icon: ShieldCheck },
];

export function QuickActionSection() {
  return (
    <section className="bg-slate-100 py-8">
      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {quickActions.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border border-slate-200 bg-white py-0 shadow-sm"
            >
              <CardContent className="flex items-center gap-3 p-4">
                <span className="rounded-full bg-slate-100 p-2 text-slate-500">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
