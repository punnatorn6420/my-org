import { ArrowUpRight } from 'lucide-react';

import { AspectRatio } from '../components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

interface PromoLink {
  title: string;
  description: string;
  linkLabel: string;
  imageUrl: string;
}

const promoLinks: PromoLink[] = [
  {
    title: 'Special Fares',
    description:
      'Unbeatable prices on domestic and international routes. Book now and save big.',
    linkLabel: 'Learn More',
    imageUrl:
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Travel Add-ons',
    description:
      'Customize your journey with seat selection, premium meals, and lounge access.',
    linkLabel: 'Explore Add-ons',
    imageUrl:
      'https://images.unsplash.com/photo-1581458442855-09955ecf6f5a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Nok Fan Club',
    description:
      'Join our loyalty program to earn points and enjoy priority privileges.',
    linkLabel: 'Join Now',
    imageUrl:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
  },
];

export function PromoLinksSection() {
  return (
    <section className="bg-slate-100 py-8 md:py-12">
      <div className="mx-auto grid max-w-[1200px] gap-5 px-4 md:grid-cols-3 md:px-6">
        {promoLinks.map((promo) => (
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
                href="#"
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
