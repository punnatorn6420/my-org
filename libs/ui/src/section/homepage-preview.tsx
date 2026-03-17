import { FlightDealsSection } from './flight-deals-section';
import { FooterSection } from './footer-section';
import { HeaderSection } from './header-section';
import { HeroBookingSection } from './hero-booking-section';
import { PopularDestinationsSection } from './popular-destinations-section';
import { PromoLinksSection } from './promo-links-section';
import { QuickActionSection } from './quick-action-section';
import { TravelSimpleSection } from './travel-simple-section';
import { WhyFlySection } from './why-fly-section';

// Preview-only composition. Replace mock data with API data in each section as needed.
export function NokAirHomepagePreview() {
  return (
    <main>
      <HeaderSection />
      <HeroBookingSection />
      <QuickActionSection />
      <PromoLinksSection />
      <PopularDestinationsSection />
      <FlightDealsSection />
      <WhyFlySection />
      <TravelSimpleSection />
      <FooterSection />
    </main>
  );
}
