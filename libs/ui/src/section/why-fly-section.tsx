import type { ComponentType } from 'react';
import { Check, Globe2, ShieldCheck } from 'lucide-react';

import type { WhyFlySectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Card } from '../components/ui/card';

const iconMap: Record<WhyFlySectionProps['points'][number]['icon'], ComponentType<{ className?: string }>> = {
  check: Check,
  'shield-check': ShieldCheck,
  globe: Globe2,
};

export function WhyFlySection(props: WhyFlySectionProps = defaultSectionProps['why-fly-section']) {
  return (
    <section className="bg-slate-100 py-14">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">{props.title}</h2>
          <ul className="mt-8 space-y-6">
            {props.points.map((point) => {
              const Icon = iconMap[point.icon];
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
              src={props.imageUrl}
              alt={props.imageAlt}
              className="h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/20 via-[#0f172a]/50 to-[#020617]/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-full border border-cyan-200/25 bg-black/20 px-5 py-2 text-lg font-medium tracking-wide text-cyan-100">
                {props.badgeText}
              </p>
            </div>
          </AspectRatio>
        </Card>
      </div>
    </section>
  );
}
