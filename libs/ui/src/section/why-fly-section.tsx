import type { ComponentType } from 'react';
import { Check, Globe2, ShieldCheck } from 'lucide-react';

import { AspectRatio } from '../components/ui/aspect-ratio';
import { Card } from '../components/ui/card';

interface ValuePoint {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const valuePoints: ValuePoint[] = [
  {
    title: 'Premium On-board Experience',
    description: 'Spacious seating and a curated menu tailored for every palate.',
    icon: Check,
  },
  {
    title: 'Reliability & Punctuality',
    description: 'Industry-leading on-time performance ensures your trip stays on plan.',
    icon: ShieldCheck,
  },
  {
    title: 'Vast Network',
    description: 'Connecting major cities and hidden gems across Southeast Asia with ease.',
    icon: Globe2,
  },
];

export function WhyFlySection() {
  return (
    <section className="bg-slate-100 py-14">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Why Fly with Nok Air?</h2>
          <ul className="mt-8 space-y-6">
            {valuePoints.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="flex gap-4">
                  <span className="mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{point.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{point.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Card className="rounded-2xl border border-slate-800/60 bg-slate-950 py-0 shadow-xl">
          <AspectRatio ratio={1 / 1}>
            <img
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=1200&q=80"
              alt="Premium in-flight quality service"
              className="h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/20 via-[#0f172a]/50 to-[#020617]/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-full border border-cyan-200/25 bg-black/20 px-5 py-2 text-lg font-medium tracking-wide text-cyan-100">
                Quality Service
              </p>
            </div>
          </AspectRatio>
        </Card>
      </div>
    </section>
  );
}
