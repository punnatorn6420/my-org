import { PageRenderer } from '@my-org/renderer';
import { fetchPublishedHomePage } from '../lib/api';

export default async function HomePage() {
  const payload = await fetchPublishedHomePage();

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      <PageRenderer layout={payload.layout} sections={payload.sections} />
    </main>
  );
}
