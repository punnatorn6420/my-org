import type { PopularDestinationsSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Card } from '../components/ui/card';

export function PopularDestinationsSection(
  props: PopularDestinationsSectionProps = defaultSectionProps['popular-destinations-section'],
) {
  return (
    <section className="bg-white py-12 md:py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{props.title}</h2>
        <p className="mt-2 text-sm text-slate-500">{props.subtitle}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {props.destinations.map((destination) => (
            <Card key={destination.city} className="group relative overflow-hidden rounded-xl py-0">
              <AspectRatio ratio={4 / 5}>
                <img
                  src={destination.imageUrl}
                  alt={destination.city}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/80">{destination.tag}</p>
                  <p className="text-3xl font-semibold leading-none">{destination.city}</p>
                </div>
              </AspectRatio>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
