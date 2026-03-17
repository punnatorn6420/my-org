import Link from 'next/link';
import { Card, CardDescription, CardTitle } from '@my-org/ui';

export default function CmsDashboardPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <h1 className="text-3xl font-bold">Page Composer CMS</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/sections">
          <Card className="transition hover:shadow-md">
            <CardTitle>Sections</CardTitle>
            <CardDescription>Manage content for shared section instances.</CardDescription>
          </Card>
        </Link>
        <Link href="/layouts/home">
          <Card className="transition hover:shadow-md">
            <CardTitle>Home Layout</CardTitle>
            <CardDescription>Arrange rows, assign sections, preview, and publish.</CardDescription>
          </Card>
        </Link>
      </div>
    </main>
  );
}
