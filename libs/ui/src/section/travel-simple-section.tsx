import { Apple, Play } from 'lucide-react';

import type { TravelSimpleSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { Button } from '../components/ui/button';

export function TravelSimpleSection(
  props: TravelSimpleSectionProps = defaultSectionProps['travel-simple-section'],
) {
  return (
    <section className="bg-[#101114] py-16 text-white">
      <div className="mx-auto flex max-w-[780px] flex-col items-center px-4 text-center md:px-6">
        <h2 className="text-4xl font-semibold tracking-tight">{props.title}</h2>
        <p className="mt-3 text-sm text-slate-300 md:text-base">{props.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {props.appButtons.map((button) => (
            <Button
              key={button.label}
              asChild
              variant="outline"
              className={button.platform === 'apple' ? 'h-10 border-white/20 bg-white text-black hover:bg-white/90' : 'h-10 border-white/30 bg-transparent text-white hover:bg-white/10'}
            >
              <a href={button.href}>
                {button.platform === 'apple' ? <Apple className="size-4" /> : <Play className="size-4" />}
                {button.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
