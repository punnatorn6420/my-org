'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  defaultSectionProps,
  HOME_PAGE_SLUG,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
} from '../../../../../libs/ui/src/section/content-models';
import { SectionRenderer } from '../../../../../libs/ui/src/section/section-renderer';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

interface SectionEntry {
  id: string;
  sectionKey: HomeSectionKey;
  draftProps: AnySectionProps;
  publishedProps: AnySectionProps | null;
  updatedAt: string;
}

function isHomeSectionKey(value: string | null): value is HomeSectionKey {
  if (!value) {
    return false;
  }

  return HOME_SECTION_KEYS.includes(value as HomeSectionKey);
}

export default function SectionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const querySection = searchParams.get('section');
  const selectedKey = isHomeSectionKey(querySection)
    ? querySection
    : HOME_SECTION_KEYS[0];

  const [entries, setEntries] = useState<SectionEntry[]>([]);
  const [jsonDraft, setJsonDraft] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading...');
  const [previewScale, setPreviewScale] = useState(0.6);

  useEffect(() => {
    if (!isHomeSectionKey(querySection)) {
      router.replace(`/sections?section=${HOME_SECTION_KEYS[0]}`);
    }
  }, [querySection, router]);

  useEffect(() => {
    void loadEntries();
  }, []);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.sectionKey === selectedKey),
    [entries, selectedKey],
  );

  useEffect(() => {
    const content =
      selectedEntry?.draftProps ?? defaultSectionProps[selectedKey];
    setJsonDraft(JSON.stringify(content, null, 2));
    setJsonError(null);
  }, [selectedEntry, selectedKey]);

  async function loadEntries() {
    try {
      const response = await fetch(`${API_URL}/cms/sections/${HOME_PAGE_SLUG}`);
      if (!response.ok) {
        setStatus('Failed to load draft content.');
        return;
      }

      const data = await response.json();
      setEntries(data.entries ?? []);
      setStatus('Draft content loaded.');
    } catch {
      setStatus('Failed to load draft content.');
    }
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

    const response = await fetch(
      `${API_URL}/cms/sections/${HOME_PAGE_SLUG}/${selectedKey}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftProps }),
      },
    );

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
  const previewProps =
    parsedPreview ??
    selectedEntry?.draftProps ??
    defaultSectionProps[selectedKey];

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl">
          Editing section: <span className="font-semibold">{selectedKey}</span>
        </h1>
      </div>

      <div className="grid gap-2 ">
        <section className="rounded-2xl space-y-2">
          <h2 className="text-base font-semibold">Live Section Preview</h2>
          <div className="flex flex-wrap gap-2">
            {[0.6, 0.72].map((scale) => {
              const isActive = previewScale === scale;
              return (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setPreviewScale(scale)}
                  className={`rounded-md border px-3 py-1 text-xs font-medium ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {Math.round(scale * 100)}%
                </button>
              );
            })}
          </div>

          <div className="overflow-auto rounded-sm border-4 border-amber-500">
            <div
              className="origin-top-left"
              style={{
                transform: `scale(${previewScale})`,
                width: `${100 / previewScale}%`,
              }}
            >
              <SectionRenderer sectionKey={selectedKey} props={previewProps} />
            </div>
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold">Draft JSON</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ปรับ JSON ของ section นี้ แล้วกดบันทึก Draft หรือ Publish ได้ทันที
          </p>

          <textarea
            value={jsonDraft}
            onChange={(event) => setJsonDraft(event.target.value)}
            className="mt-4 h-[560px] w-full rounded-lg border bg-slate-950 p-3 font-mono text-xs text-slate-100"
          />
          {jsonError ? (
            <p className="mt-2 text-sm text-red-600">{jsonError}</p>
          ) : null}

          <div className="mt-5 space-y-2">
            <button
              type="button"
              className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={saveDraft}
            >
              Save Draft
            </button>
            <button
              type="button"
              className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={publishPage}
            >
              Publish Home Page
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">{status}</p>
        </section>
      </div>
    </div>
  );
}
