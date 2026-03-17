import { PageRenderer } from '@my-org/renderer';
import { Card, CardDescription, CardTitle } from '@my-org/ui';
import { fetchPublishedHomePage } from '../lib/api';

export default async function HomePage() {
  const { payload, error } = await fetchPublishedHomePage();

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-6">
      {error ? (
        <Card className="border-amber-300 bg-amber-50">
          <CardTitle>Unable to load published home page</CardTitle>
          <CardDescription>{error}</CardDescription>
          <CardDescription>
            Start API with: <code>pnpm nx serve api</code>
          </CardDescription>
        </Card>
      ) : null}
      <PageRenderer layout={payload.layout} sections={payload.sections} />
    </main>
  );
}
