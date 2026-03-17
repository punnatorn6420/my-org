import { Button, SectionShell } from '@my-org/ui';
import { HeroSectionProps } from '../types';

export function HeroSection({ title, subtitle, imageUrl, ctaText, ctaLink }: HeroSectionProps) {
  return (
    <SectionShell className="overflow-hidden p-0">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 p-6">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="text-slate-600">{subtitle}</p>
          <a href={ctaLink}><Button>{ctaText}</Button></a>
        </div>
        <img src={imageUrl} alt={title} className="h-full min-h-48 w-full object-cover" />
      </div>
    </SectionShell>
  );
}
