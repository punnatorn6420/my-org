import { Button, SectionShell } from '@my-org/ui';
import { PromoBannerSectionProps } from '../types';

export function PromoBannerSection({ title, description, imageUrl, ctaText, ctaLink }: PromoBannerSectionProps) {
  return (
    <SectionShell className="overflow-hidden p-0">
      <div className="relative">
        <img src={imageUrl} alt={title} className="h-52 w-full object-cover" />
        <div className="absolute inset-0 bg-black/45 p-6 text-white">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mb-3 max-w-xl text-sm">{description}</p>
          <a href={ctaLink}><Button variant="outline">{ctaText}</Button></a>
        </div>
      </div>
    </SectionShell>
  );
}
