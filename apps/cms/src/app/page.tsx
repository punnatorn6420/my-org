'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  defaultSectionProps,
  HOME_PAGE_SLUG,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
  SectionRenderer,
} from '@my-org/ui';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

interface SectionEntry {
  id: string;
  sectionKey: HomeSectionKey;
  draftProps: AnySectionProps;
  publishedProps: AnySectionProps | null;
  updatedAt: string;
}

export default function CmsPage() {
  const [entries, setEntries] = useState<SectionEntry[]>([]);
  const [selectedKey, setSelectedKey] = useState<HomeSectionKey>('header-section');
  const [jsonDraft, setJsonDraft] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    void loadEntries();
  }, []);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.sectionKey === selectedKey),
    [entries, selectedKey],
  );

  useEffect(() => {
    const content = selectedEntry?.draftProps ?? defaultSectionProps[selectedKey];
    setJsonDraft(JSON.stringify(content, null, 2));
    setJsonError(null);
  }, [selectedEntry, selectedKey]);

  async function loadEntries() {
    const response = await fetch(`${API_URL}/cms/sections/${HOME_PAGE_SLUG}`);
    const data = await response.json();
    setEntries(data.entries);
    setStatus('Draft content loaded.');
  }

  function tryParseDraft(raw: string): AnySectionProps | null {
    try {
      return JSON.parse(raw) as AnySectionProps;
    } catch {
      return null;
    }
  }

  async function saveDraft() {
    const draftProps = tryParseDraft(jsonDraft);
    if (!draftProps) {
      setJsonError('Invalid JSON. Fix syntax before saving.');
      return;
    }
    setJsonError(null);

    const response = await fetch(`${API_URL}/cms/sections/${HOME_PAGE_SLUG}/${selectedKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftProps }),
    });

    if (!response.ok) {
      setStatus('Failed to save draft.');
      return;
    }

    await loadEntries();
    setStatus(`Draft saved for ${selectedKey}.`);
  }

  async function publishPage() {
    const response = await fetch(`${API_URL}/cms/publish/${HOME_PAGE_SLUG}`, {
      method: 'POST',
    });

    if (!response.ok) {
      setStatus('Publish failed.');
      return;
    }

    setStatus('Home page published successfully.');
    await loadEntries();
  }

  const parsedPreview = tryParseDraft(jsonDraft);
  const previewProps = parsedPreview ?? (selectedEntry?.draftProps ?? defaultSectionProps[selectedKey]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[280px_1fr_1fr]">
        <aside className="rounded-lg border bg-white p-4">
          <h1 className="text-lg font-semibold">CMS Sections</h1>
          <p className="mt-1 text-sm text-slate-500">Select a section and edit its structured props JSON.</p>
          <ul className="mt-4 space-y-2">
            {HOME_SECTION_KEYS.map((sectionKey) => (
              <li key={sectionKey}>
                <button
                  className={`w-full rounded px-3 py-2 text-left text-sm ${selectedKey === sectionKey ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                  onClick={() => setSelectedKey(sectionKey)}
                  type="button"
                >
                  {sectionKey}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2">
            <button type="button" className="w-full rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white" onClick={saveDraft}>
              Save Draft
            </button>
            <button type="button" className="w-full rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white" onClick={publishPage}>
              Publish Home Page
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">{status}</p>
        </aside>

        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-base font-semibold">{selectedKey} Draft JSON</h2>
          <textarea
            value={jsonDraft}
            onChange={(event) => setJsonDraft(event.target.value)}
            className="mt-3 h-[720px] w-full rounded border bg-slate-950 p-3 font-mono text-xs text-slate-100"
          />
          {jsonError ? <p className="mt-2 text-sm text-red-600">{jsonError}</p> : null}
        </section>

        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-base font-semibold">Live Section Preview</h2>
          <p className="mb-3 mt-1 text-sm text-slate-500">Uses the real shared section component from libs/ui.</p>
          <div className="overflow-hidden rounded border">
            <SectionRenderer sectionKey={selectedKey} props={previewProps} />
          </div>
        </section>
      </div>
    </div>
  );
}
