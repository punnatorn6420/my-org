'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { SectionInstance } from '@my-org/schema';
import { Button, Card, Input, Label, Textarea } from '@my-org/ui';
import { getSection, updateSection } from '../../../lib/api';

export default function SectionEditPage() {
  const params = useParams<{ id: string }>();
  const [section, setSection] = useState<SectionInstance | null>(null);
  const [jsonProps, setJsonProps] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const data = await getSection(params.id);
      setSection(data);
      setJsonProps(JSON.stringify(data.props, null, 2));
    }
    void load();
  }, [params.id]);

  const parsedProps = useMemo(() => {
    try {
      setError('');
      return JSON.parse(jsonProps) as Record<string, unknown>;
    } catch {
      setError('Invalid JSON in props');
      return null;
    }
  }, [jsonProps]);

  const onSave = async () => {
    if (!section || !parsedProps) return;
    const updated = await updateSection(section.id, { name: section.name, props: parsedProps });
    setSection(updated);
  };

  if (!section) return <main className="p-6">Loading...</main>;

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit section</h1>
        <Link href="/sections" className="text-sm text-blue-600">Back to sections</Link>
      </div>
      <Card className="space-y-3">
        <div>
          <Label>Name</Label>
          <Input value={section.name} onChange={(event) => setSection({ ...section, name: event.target.value })} />
        </div>
        <div>
          <Label>Type</Label>
          <Input value={section.type} disabled />
        </div>
        <div>
          <Label>Props (JSON)</Label>
          <Textarea value={jsonProps} onChange={(event) => setJsonProps(event.target.value)} className="min-h-64 font-mono" />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
        <Button disabled={!parsedProps} onClick={onSave}>Save section</Button>
      </Card>
    </main>
  );
}
