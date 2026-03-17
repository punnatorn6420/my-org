import { AspectRatio } from '../components/ui/aspect-ratio';
import { Card } from '../components/ui/card';

interface Destination {
  city: string;
  tag: string;
  imageUrl: string;
}

const destinations: Destination[] = [
  {
    city: 'Phuket',
    tag: 'Island Bliss',
    imageUrl:
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80',
  },
  {
    city: 'Chiang Rai',
    tag: 'Northern Heritage',
    imageUrl:
      'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=900&q=80',
  },
  {
    city: 'Ho Chi Minh',
    tag: 'City Life',
    imageUrl:
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
  },
  {
    city: 'Bangkok',
    tag: 'Metropolis',
    imageUrl:
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80',
  },
];

export function PopularDestinationsSection() {
  return (
    <section className="bg-white py-12 md:py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Popular Destinations
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The most sought-after spots across Thailand and beyond.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Card
              key={destination.city}
              className="group relative overflow-hidden rounded-xl py-0"
            >
              <AspectRatio ratio={4 / 5}>
                <img
                  src={destination.imageUrl}
                  alt={destination.city}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/80">
                    {destination.tag}
                  </p>
                  <p className="text-3xl font-semibold leading-none">
                    {destination.city}
                  </p>
                </div>
              </AspectRatio>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
