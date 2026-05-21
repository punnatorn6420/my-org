import {
  HOME_PAGE_SLUG,
  NokAirHomepagePreview,
  type PublishedPageSnapshot,
} from '@my-org/ui';

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:3000/api';

async function getPublishedHomePage(): Promise<PublishedPageSnapshot> {
  const response = await fetch(`${API_URL}/public/pages/${HOME_PAGE_SLUG}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load published home page.');
  }

  const payload = await response.json();
  return payload.snapshot as PublishedPageSnapshot;
}

export default async function Index() {
  const published = await getPublishedHomePage();
  return <NokAirHomepagePreview sections={published.sections} />;
}
