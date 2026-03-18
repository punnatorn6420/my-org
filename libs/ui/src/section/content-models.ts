export const HOME_PAGE_SLUG = 'home';

export const HOME_SECTION_KEYS = [
  'header-section',
  'hero-booking-section',
  'quick-action-section',
  'promo-links-section',
  'popular-destinations-section',
  'flight-deals-section',
  'why-fly-section',
  'travel-simple-section',
  'footer-section',
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_KEYS)[number];

export interface HeaderSectionProps {
  logoText: string;
  logoHref: string;
  menuItems: Array<{ label: string; href: string }>;
  languageLabel: string;
  languageOptions: string[];
  signInText: string;
}

export interface FooterSectionProps {
  logoText: string;
  companyText: string;
  footerGroups: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  socialLinks: Array<{ platform: 'facebook' | 'instagram' | 'twitter'; href: string }>;
  copyrightText: string;
  allianceText: string;
}

export interface HeroBookingSectionProps {
  eyebrowText: string;
  title: string;
  subtitle: string;
  heroImageUrl: string;
  bookingTitle: string;
  bookingDescription: string;
  tabLabels: Array<{ value: 'round-trip' | 'one-way' | 'multi-city'; label: string }>;
  searchFields: {
    fromLabel: string;
    fromDefault: string;
    toLabel: string;
    toDefault: string;
    dateLabel: string;
    datePlaceholder: string;
    passengerLabel: string;
    passengerOptions: Array<{ value: string; label: string }>;
    searchButtonText: string;
  };
}

export interface QuickActionSectionProps {
  items: Array<{ icon: 'circle-check' | 'timer' | 'briefcase' | 'shield-check'; title: string; subtitle: string; href: string }>;
}

export interface PromoLinksSectionProps {
  items: Array<{ title: string; description: string; linkLabel: string; linkHref: string; imageUrl: string }>;
}

export interface PopularDestinationsSectionProps {
  title: string;
  subtitle: string;
  destinations: Array<{ city: string; tag: string; imageUrl: string }>;
}

export interface FlightDealsSectionProps {
  title: string;
  deals: Array<{ from: string; to: string; price: string; buttonText: string; buttonHref: string }>;
}

export interface WhyFlySectionProps {
  title: string;
  points: Array<{ icon: 'check' | 'shield-check' | 'globe'; title: string; description: string }>;
  imageUrl: string;
  imageAlt: string;
  badgeText: string;
}

export interface TravelSimpleSectionProps {
  title: string;
  description: string;
  appButtons: Array<{ platform: 'apple' | 'google-play'; label: string; href: string }>;
}

export type SectionPropsMap = {
  'header-section': HeaderSectionProps;
  'footer-section': FooterSectionProps;
  'hero-booking-section': HeroBookingSectionProps;
  'quick-action-section': QuickActionSectionProps;
  'promo-links-section': PromoLinksSectionProps;
  'popular-destinations-section': PopularDestinationsSectionProps;
  'flight-deals-section': FlightDealsSectionProps;
  'why-fly-section': WhyFlySectionProps;
  'travel-simple-section': TravelSimpleSectionProps;
};

export type AnySectionProps = SectionPropsMap[HomeSectionKey];

export interface SectionLayoutItem {
  sectionKey: HomeSectionKey;
}

export const defaultSectionProps: SectionPropsMap = {
  'header-section': {
    logoText: 'NOK AIR',
    logoHref: '#',
    menuItems: [
      { label: 'Flights', href: '#' },
      { label: 'Travel Info', href: '#' },
      { label: 'Promotions', href: '#' },
      { label: 'Check-in', href: '#' },
      { label: 'Manage', href: '#' },
    ],
    languageLabel: 'EN',
    languageOptions: ['EN', 'TH'],
    signInText: 'Sign In',
  },
  'footer-section': {
    logoText: 'NOK AIR',
    companyText:
      'Nok Air is a premium international airline based in Bangkok, Thailand. We are dedicated to providing the highest standards of safety and service.',
    footerGroups: [
      {
        title: 'About Nok Air',
        links: [
          { label: 'Our Story', href: '#' },
          { label: 'Newsroom', href: '#' },
          { label: 'Sustainability', href: '#' },
          { label: 'Investor Relations', href: '#' },
          { label: 'Careers', href: '#' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '#' },
          { label: 'Contact Us', href: '#' },
          { label: 'Refund Request', href: '#' },
          { label: 'Baggage Info', href: '#' },
          { label: 'Flight Disruptions', href: '#' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Terms of Use', href: '#' },
          { label: 'Privacy Policy', href: '#' },
          { label: 'Conditions of Carriage', href: '#' },
          { label: 'Cookie Policy', href: '#' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'facebook', href: '#' },
      { platform: 'instagram', href: '#' },
      { platform: 'twitter', href: '#' },
    ],
    copyrightText: '© 2026 Nok Airlines Public Company Limited. All rights reserved.',
    allianceText: 'Official Member of Premium Alliance',
  },
  'hero-booking-section': {
    eyebrowText: 'Premium Travel',
    title: 'Fly With Smiles Across Asia',
    subtitle:
      'Experience premium service and comfort on every journey with thoughtfully curated routes and hospitality.',
    heroImageUrl:
      'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1800&q=80',
    bookingTitle: 'Book your next flight',
    bookingDescription: 'Select your itinerary and travel details to get the best fares.',
    tabLabels: [
      { value: 'round-trip', label: 'Round Trip' },
      { value: 'one-way', label: 'One Way' },
      { value: 'multi-city', label: 'Multi-city' },
    ],
    searchFields: {
      fromLabel: 'From',
      fromDefault: 'Bangkok (BKK)',
      toLabel: 'To',
      toDefault: 'Chiang Mai (CNX)',
      dateLabel: 'Dates',
      datePlaceholder: 'Pick a date',
      passengerLabel: 'Passengers',
      passengerOptions: [
        { value: '1-adult', label: '1 Adult, Economy' },
        { value: '2-adult', label: '2 Adults, Economy' },
        { value: 'family', label: '2 Adults, 1 Child' },
      ],
      searchButtonText: 'Search',
    },
  },
  'quick-action-section': {
    items: [
      { icon: 'circle-check', title: 'Check-in', subtitle: 'Quick & easy', href: '#' },
      { icon: 'timer', title: 'Flight Status', subtitle: 'Real-time updates', href: '#' },
      { icon: 'briefcase', title: 'Baggage', subtitle: 'Add extra weight', href: '#' },
      { icon: 'shield-check', title: 'Nok Smile Plus', subtitle: 'Member benefits', href: '#' },
    ],
  },
  'promo-links-section': {
    items: [
      {
        title: 'Special Fares',
        description: 'Unbeatable prices on domestic and international routes. Book now and save big.',
        linkLabel: 'Learn More',
        linkHref: '#',
        imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Travel Add-ons',
        description: 'Customize your journey with seat selection, premium meals, and lounge access.',
        linkLabel: 'Explore Add-ons',
        linkHref: '#',
        imageUrl: 'https://images.unsplash.com/photo-1581458442855-09955ecf6f5a?auto=format&fit=crop&w=900&q=80',
      },
      {
        title: 'Nok Fan Club',
        description: 'Join our loyalty program to earn points and enjoy priority privileges.',
        linkLabel: 'Join Now',
        linkHref: '#',
        imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'popular-destinations-section': {
    title: 'Popular Destinations',
    subtitle: 'The most sought-after spots across Thailand and beyond.',
    destinations: [
      {
        city: 'Phuket',
        tag: 'Island Bliss',
        imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80',
      },
      {
        city: 'Chiang Rai',
        tag: 'Northern Heritage',
        imageUrl: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?auto=format&fit=crop&w=900&q=80',
      },
      {
        city: 'Ho Chi Minh',
        tag: 'City Life',
        imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=900&q=80',
      },
      {
        city: 'Bangkok',
        tag: 'Metropolis',
        imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  'flight-deals-section': {
    title: 'Exclusive Flight Deals',
    deals: [
      { from: 'Bangkok', to: 'Phuket', price: 'THB 890', buttonText: 'Book Now', buttonHref: '#' },
      { from: 'Bangkok', to: 'Chiang Mai', price: 'THB 1,050', buttonText: 'Book Now', buttonHref: '#' },
      { from: 'Bangkok', to: 'Singapore', price: 'THB 2,490', buttonText: 'Book Now', buttonHref: '#' },
      { from: 'Chiang Mai', to: 'Bangkok', price: 'THB 1,120', buttonText: 'Book Now', buttonHref: '#' },
    ],
  },
  'why-fly-section': {
    title: 'Why Fly with Nok Air?',
    points: [
      {
        title: 'Premium On-board Experience',
        description: 'Spacious seating and a curated menu tailored for every palate.',
        icon: 'check',
      },
      {
        title: 'Reliability & Punctuality',
        description: 'Industry-leading on-time performance ensures your trip stays on plan.',
        icon: 'shield-check',
      },
      {
        title: 'Vast Network',
        description: 'Connecting major cities and hidden gems across Southeast Asia with ease.',
        icon: 'globe',
      },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Premium in-flight quality service',
    badgeText: 'Quality Service',
  },
  'travel-simple-section': {
    title: 'Travel Made Simple',
    description:
      'Download the Nok Air mobile app for seamless booking, digital boarding passes, and exclusive app-only rewards.',
    appButtons: [
      { platform: 'apple', label: 'App Store', href: '#' },
      { platform: 'google-play', label: 'Google Play', href: '#' },
    ],
  },
};

export interface PageLayout {
  pageSlug: string;
  sections: SectionLayoutItem[];
}

export interface PublishedPageSnapshot {
  pageSlug: string;
  sections: Array<{ sectionKey: HomeSectionKey; props: AnySectionProps }>;
  publishedAt: string;
}
