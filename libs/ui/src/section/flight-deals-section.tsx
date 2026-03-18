import type { FlightDealsSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export function FlightDealsSection(
  props: FlightDealsSectionProps = defaultSectionProps['flight-deals-section'],
) {
  const deals = Array.isArray(props?.deals)
    ? props.deals
    : defaultSectionProps['flight-deals-section'].deals;

  return (
    <section className="bg-slate-100 py-12 md:py-14">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900">
          {props.title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {props.deals.map((deal) => (
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
                  asChild
                  variant="outline"
                  className="w-full border-slate-300 bg-white"
                >
                  <a href={deal.buttonHref}>{deal.buttonText}</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
