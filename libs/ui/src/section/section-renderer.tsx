import type { AnySectionProps, HomeSectionKey, SectionPropsMap } from './content-models';
import { FlightDealsSection } from './flight-deals-section';
import { FooterSection } from './footer-section';
import { HeaderSection } from './header-section';
import { HeroBookingSection } from './hero-booking-section';
import { PopularDestinationsSection } from './popular-destinations-section';
import { PromoLinksSection } from './promo-links-section';
import { QuickActionSection } from './quick-action-section';
import { TravelSimpleSection } from './travel-simple-section';
import { WhyFlySection } from './why-fly-section';

export interface SectionRendererProps<K extends HomeSectionKey = HomeSectionKey> {
  sectionKey: K;
  props: SectionPropsMap[K];
}

export function SectionRenderer({ sectionKey, props }: SectionRendererProps) {
  switch (sectionKey) {
    case 'header-section':
      return <HeaderSection {...(props as SectionPropsMap['header-section'])} />;
    case 'hero-booking-section':
      return <HeroBookingSection {...(props as SectionPropsMap['hero-booking-section'])} />;
    case 'quick-action-section':
      return <QuickActionSection {...(props as SectionPropsMap['quick-action-section'])} />;
    case 'promo-links-section':
      return <PromoLinksSection {...(props as SectionPropsMap['promo-links-section'])} />;
    case 'popular-destinations-section':
      return <PopularDestinationsSection {...(props as SectionPropsMap['popular-destinations-section'])} />;
    case 'flight-deals-section':
      return <FlightDealsSection {...(props as SectionPropsMap['flight-deals-section'])} />;
    case 'why-fly-section':
      return <WhyFlySection {...(props as SectionPropsMap['why-fly-section'])} />;
    case 'travel-simple-section':
      return <TravelSimpleSection {...(props as SectionPropsMap['travel-simple-section'])} />;
    case 'footer-section':
      return <FooterSection {...(props as SectionPropsMap['footer-section'])} />;
    default:
      return null;
  }
}

export interface RenderableSection {
  sectionKey: HomeSectionKey;
  props: AnySectionProps;
}
