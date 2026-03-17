import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

interface Deal {
  from: string;
  to: string;
  price: string;
}

const deals: Deal[] = [
  { from: 'Bangkok', to: 'Phuket', price: 'THB 890' },
  { from: 'Bangkok', to: 'Chiang Mai', price: 'THB 1,050' },
  { from: 'Bangkok', to: 'Singapore', price: 'THB 2,490' },
  { from: 'Chiang Mai', to: 'Bangkok', price: 'THB 1,120' },
];

export function FlightDealsSection() {
  return (
    <section className="bg-slate-100 py-12 md:py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          Exclusive Flight Deals
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <Card
              key={`${deal.from}-${deal.to}`}
              className="overflow-hidden border border-slate-200 bg-white py-0 shadow-sm"
            >
              <div className="h-1 w-full bg-yellow-400" />
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>From {deal.from}</span>
                  <span>To {deal.to}</span>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">
                    One way starting from
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {deal.price}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-slate-300 bg-white"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
