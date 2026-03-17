import { PageLayout, SectionInstance, SectionType } from '@my-org/schema';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export async function getSections(): Promise<SectionInstance[]> {
  const response = await fetch(`${API_URL}/admin/sections`, { cache: 'no-store' });
  return response.json();
}

export async function createSection(type: SectionType) {
  const response = await fetch(`${API_URL}/admin/sections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type }),
  });
  return response.json();
}

export async function getSection(id: string): Promise<SectionInstance> {
  const response = await fetch(`${API_URL}/admin/sections/${id}`, { cache: 'no-store' });
  return response.json();
}

export async function updateSection(id: string, body: Partial<SectionInstance>) {
  const response = await fetch(`${API_URL}/admin/sections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function getHomeLayout(): Promise<PageLayout> {
  const response = await fetch(`${API_URL}/admin/pages/home/layout`, { cache: 'no-store' });
  return response.json();
}

export async function saveHomeLayout(layout: PageLayout) {
  const response = await fetch(`${API_URL}/admin/pages/home/layout`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(layout),
  });
  return response.json();
}

export async function publishHome() {
  const response = await fetch(`${API_URL}/admin/pages/home/publish`, { method: 'POST' });
  return response.json();
}
