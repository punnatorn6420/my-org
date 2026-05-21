import { ArrowUpRight } from 'lucide-react';

import type { PromoLinksSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { AspectRatio } from '../components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export function PromoLinksSection(
  props: PromoLinksSectionProps = defaultSectionProps['promo-links-section'],
) {
  const items = Array.isArray(props?.items)
    ? props.items
    : defaultSectionProps['promo-links-section'].items;

  return (
    <section className="bg-slate-100 py-8 md:py-12">
      <div className="mx-auto grid max-w-[1200px] gap-5 px-4 md:grid-cols-3 md:px-6">
        {items.map((promo) => (
          <Card
            key={promo.title}
            className="border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardHeader className="p-0">
              <AspectRatio ratio={16 / 10}>
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              <CardTitle className="text-lg">{promo.title}</CardTitle>
              <p className="text-sm text-slate-600">{promo.description}</p>
              <a
                href={promo.linkHref}
                className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
              >
                {promo.linkLabel}
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
