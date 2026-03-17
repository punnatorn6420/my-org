import { HomePagePayload, PageLayout } from '@my-org/schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export interface PublishedHomePageResult {
  payload: HomePagePayload;
  error?: string;
}

function createEmptyHomePayload(): HomePagePayload {
  const layout: PageLayout = {
    id: 'home_layout',
    slug: 'home',
    rows: [],
  };

  return {
    layout,
    sections: [],
  };
}

export async function fetchPublishedHomePage(): Promise<PublishedHomePageResult> {
  try {
    const response = await fetch(`${API_URL}/pages/home`, { cache: 'no-store' });
    if (!response.ok) {
      return {
        payload: createEmptyHomePayload(),
        error: `Failed to fetch published home page (${response.status})`,
      };
    }

    const payload = (await response.json()) as HomePagePayload;
    return { payload };
  } catch {
    return {
      payload: createEmptyHomePayload(),
      error: 'Cannot connect to API. Please ensure api is running on http://localhost:3333.',
    };
  }
}
