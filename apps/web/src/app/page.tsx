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
  try {
    const response = await fetch(`${API_URL}/public/pages/${HOME_PAGE_SLUG}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `Failed to load published home page. status=${response.status}`,
      );
      return {
        pageSlug: HOME_PAGE_SLUG,
        sections: [],
        publishedAt: new Date(0).toISOString(),
      };
    }

    const payload = await response.json();
    return payload.snapshot as PublishedPageSnapshot;
  } catch (error) {
    console.error('Failed to load published home page.', error);
    return {
      pageSlug: HOME_PAGE_SLUG,
      sections: [],
      publishedAt: new Date(0).toISOString(),
    };
  }
}

export default async function Index() {
  const published = await getPublishedHomePage();
  return <NokAirHomepagePreview sections={published.sections} />;
}
