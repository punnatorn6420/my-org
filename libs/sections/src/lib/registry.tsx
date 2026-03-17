import { SectionType } from '@my-org/schema';
import { ComponentType } from 'react';
import { CategoryGridSection } from './components/category-grid-section';
import { HeroSection } from './components/hero-section';
import { PopularServicesSection } from './components/popular-services-section';
import { PromoBannerSection } from './components/promo-banner-section';
import { SearchFlightSection } from './components/search-flight-section';

export const sectionRegistry: Record<SectionType, ComponentType<any>> = {
  hero: HeroSection,
  search_flight: SearchFlightSection,
  promo_banner: PromoBannerSection,
  category_grid: CategoryGridSection,
  popular_services: PopularServicesSection,
};
