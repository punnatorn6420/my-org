import { HomePagePayload } from '@my-org/schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function fetchPublishedHomePage(): Promise<HomePagePayload> {
  const response = await fetch(`${API_URL}/pages/home`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch published home page');
  }
  return response.json();
}
