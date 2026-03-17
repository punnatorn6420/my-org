'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SECTION_DEFINITIONS, SectionInstance, SectionType } from '@my-org/schema';
import { Button, Card, CardDescription, CardTitle, Select } from '@my-org/ui';
import { createSection, getSections } from '../../lib/api';

export default function SectionsPage() {
  const [sections, setSections] = useState<SectionInstance[]>([]);
  const [selectedType, setSelectedType] = useState<SectionType>('hero');

  const load = async () => setSections(await getSections());

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async () => {
    await createSection(selectedType);
    await load();
  };

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Sections</h1>
      <Card className="space-y-3">
        <CardTitle>Create section instance</CardTitle>
        <div className="flex gap-2">
          <Select value={selectedType} onChange={(event) => setSelectedType(event.target.value as SectionType)}>
            {SECTION_DEFINITIONS.map((definition) => (
              <option key={definition.type} value={definition.type}>{definition.label}</option>
            ))}
          </Select>
          <Button onClick={onCreate}>Create</Button>
        </div>
      </Card>
      <div className="space-y-2">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardTitle>{section.name}</CardTitle>
            <CardDescription>{section.type}</CardDescription>
            <Link href={`/sections/${section.id}`} className="text-sm font-medium text-blue-600">Edit section</Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
