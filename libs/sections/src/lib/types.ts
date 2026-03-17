export interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export interface SearchFlightSectionProps {
  heading: string;
  subheading?: string;
}

export interface PromoBannerSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export interface GridItem {
  title: string;
  description: string;
}

export interface CategoryGridSectionProps {
  title: string;
  items: GridItem[];
}

export interface PopularServicesSectionProps {
  title: string;
  items: GridItem[];
}
