'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  defaultSectionProps,
  HOME_PAGE_SLUG,
  HOME_SECTION_KEYS,
  type AnySectionProps,
  type HomeSectionKey,
} from '../../../../../libs/ui/src/section/content-models';
import { SectionRenderer } from '../../../../../libs/ui/src/section/section-renderer';
import { Button } from '../../../../../libs/ui/src/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../libs/ui/src/components/ui/tabs';
import { Textarea } from '../../../../../libs/ui/src/components/ui/textarea';

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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const querySection = searchParams.get('section');
  const selectedKey = isHomeSectionKey(querySection)
    ? querySection
    : HOME_SECTION_KEYS[0];

  const [entries, setEntries] = useState<SectionEntry[]>([]);
  const [jsonDraft, setJsonDraft] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading...');
  const [previewScale, setPreviewScale] = useState(0.6);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  const adjustTextareaHeight = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

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

  useLayoutEffect(() => {
    if (activeTab !== 'edit') return;

    const frame = requestAnimationFrame(() => {
      adjustTextareaHeight();
    });

    return () => cancelAnimationFrame(frame);
  }, [jsonDraft, activeTab, selectedKey]);

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
    <div className="w-full space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'preview' | 'edit')}
        className="w-full"
      >
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="min-w-0 text-xl">
            Editing section:{' '}
            <span className="font-semibold">{selectedKey}</span>
          </h1>

          <TabsList className="inline-flex p-1 rounded-md bg-slate-100 shadow-sm gap-1">
            <TabsTrigger
              value="preview"
              className="px-4 py-2 data-[state=active]:bg-white w-32"
            >
              Preview
            </TabsTrigger>

            <TabsTrigger
              value="edit"
              className="px-4 py-2 data-[state=active]:bg-white w-32"
            >
              Edit Content
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="w-full">
          <section className="w-full space-y-3">
            <div className="flex flex-wrap gap-2">
              {[0.36, 0.48, 0.6, 0.72, 0.84, 1].map((scale) => {
                const isActive = previewScale === scale;

                return (
                  <Button
                    key={scale}
                    type="button"
                    size="sm"
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => setPreviewScale(scale)}
                  >
                    {Math.round(scale * 100)}%
                  </Button>
                );
              })}
            </div>

            <div className="w-full overflow-x-auto rounded-sm border-4 border-amber-500 bg-white">
              <div
                className="origin-top-left"
                style={{
                  transform: `scale(${previewScale})`,
                  width: `${100 / previewScale}%`,
                }}
              >
                <SectionRenderer
                  sectionKey={selectedKey}
                  props={previewProps}
                />
              </div>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="edit" className="w-full">
          <div className="rounded-2xl bg-neutral-200/25 p-6 dark:bg-neutral-900/60">
            <Textarea
              ref={textareaRef}
              rows={1}
              value={jsonDraft}
              onChange={(event) => setJsonDraft(event.target.value)}
              onInput={adjustTextareaHeight}
              spellCheck={false}
              className="min-h-0 w-full resize-none overflow-hidden border-0 bg-transparent p-0 font-mono text-sm leading-5 text-amber-700 shadow-none outline-none ring-0 focus-visible:ring-0 dark:text-amber-400"
            />
          </div>

          {jsonError ? (
            <p className="mt-3 text-sm text-red-600">{jsonError}</p>
          ) : null}

          <div className="mt-5 space-y-2">
            <Button type="button" className="w-full" onClick={saveDraft}>
              Save Draft
            </Button>

            <Button
              type="button"
              className="w-full"
              variant="secondary"
              onClick={publishPage}
            >
              Publish Home Page
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">{status}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
