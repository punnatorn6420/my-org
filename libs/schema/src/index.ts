export type SectionType =
  | 'hero'
  | 'search_flight'
  | 'promo_banner'
  | 'category_grid'
  | 'popular_services';

export type RowTemplate = '12' | '6-6' | '4-4-4';

export interface SectionDefinition {
  type: SectionType;
  label: string;
  defaultProps: Record<string, unknown>;
}

export interface SectionInstance {
  id: string;
  type: SectionType;
  name: string;
  props: Record<string, unknown>;
  status: 'draft' | 'published';
}

export interface LayoutColumn {
  id: string;
  span: number;
  sectionInstanceId?: string;
}

export interface LayoutRow {
  id: string;
  template: RowTemplate;
  columns: LayoutColumn[];
}

export interface PageLayout {
  id: string;
  slug: 'home';
  rows: LayoutRow[];
}

export interface HomePagePayload {
  layout: PageLayout;
  sections: SectionInstance[];
}

export const SECTION_DEFINITIONS: SectionDefinition[] = [
  {
    type: 'hero',
    label: 'Hero',
    defaultProps: {
      title: 'Build your perfect journey',
      subtitle: 'Plan smarter trips with Page Composer',
      imageUrl:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80',
      ctaText: 'Start now',
      ctaLink: '#',
    },
  },
  {
    type: 'search_flight',
    label: 'Search Flight',
    defaultProps: {
      heading: 'Find a flight in seconds',
      subheading: 'Compare routes and prices quickly',
    },
  },
  {
    type: 'promo_banner',
    label: 'Promo Banner',
    defaultProps: {
      title: 'Spring Deal 20% Off',
      description: 'Limited-time offer for selected destinations.',
      imageUrl:
        'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1600&q=80',
      ctaText: 'View offers',
      ctaLink: '#',
    },
  },
  {
    type: 'category_grid',
    label: 'Category Grid',
    defaultProps: {
      title: 'Browse categories',
      items: [
        { title: 'Flights', description: 'Domestic and international deals' },
        { title: 'Hotels', description: 'Curated stays for every budget' },
        { title: 'Tours', description: 'Guided trips and local experiences' },
      ],
    },
  },
  {
    type: 'popular_services',
    label: 'Popular Services',
    defaultProps: {
      title: 'Popular services',
      items: [
        { title: 'Airport transfer', description: 'Reliable rides from airport' },
        { title: 'Travel insurance', description: 'Coverage for peace of mind' },
      ],
    },
  },
];

export const rowTemplateToSpans: Record<RowTemplate, number[]> = {
  '12': [12],
  '6-6': [6, 6],
  '4-4-4': [4, 4, 4],
};
