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
const LOCKED_MESSAGE = 'Structure lock is on. Missing/invalid fields will be restored from the template before save.';

interface SectionEntry {
  id: string;
  sectionKey: HomeSectionKey;
  draftProps: AnySectionProps;
  publishedProps: AnySectionProps | null;
  updatedAt: string;
}

type JsonLike = string | number | boolean | null | JsonLike[] | { [key: string]: JsonLike };

interface ValidationIssue {
  path: string;
  message: string;
}

function formatType(value: unknown): string {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function buildTemplateHint(value: JsonLike): JsonLike {
  if (Array.isArray(value)) {
    if (value.length === 0) return [];
    return [buildTemplateHint(value[0] as JsonLike)];
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, buildTemplateHint(nested as JsonLike)]));
  }

  if (typeof value === 'string') return '<string>';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  return null;
}

function validateAndNormalize(input: unknown, template: JsonLike, path = '$'): { normalized: JsonLike; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];

  if (Array.isArray(template)) {
    if (!Array.isArray(input)) {
      return {
        normalized: template,
        issues: [{ path, message: `Expected array but got ${formatType(input)}.` }],
      };
    }

    if (template.length === 0) {
      return { normalized: input as JsonLike, issues };
    }

    const normalizedItems = input.map((item, index) => {
      const result = validateAndNormalize(item, template[0] as JsonLike, `${path}[${index}]`);
      issues.push(...result.issues);
      return result.normalized;
    });

    return { normalized: normalizedItems, issues };
  }

  if (typeof template === 'object' && template !== null) {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
      return {
        normalized: template,
        issues: [{ path, message: `Expected object but got ${formatType(input)}.` }],
      };
    }

    const normalizedObject: Record<string, JsonLike> = {};
    const inputObject = input as Record<string, unknown>;

    for (const [key, templateValue] of Object.entries(template)) {
      if (!(key in inputObject)) {
        normalizedObject[key] = templateValue as JsonLike;
        issues.push({ path: `${path}.${key}`, message: 'Missing required field.' });
        continue;
      }

      const nestedResult = validateAndNormalize(inputObject[key], templateValue as JsonLike, `${path}.${key}`);
      normalizedObject[key] = nestedResult.normalized;
      issues.push(...nestedResult.issues);
    }

    for (const key of Object.keys(inputObject)) {
      if (!(key in template)) {
        issues.push({ path: `${path}.${key}`, message: 'Unknown field. It will be ignored while lock is enabled.' });
      }
    }

    return { normalized: normalizedObject, issues };
  }

  if (typeof input !== typeof template) {
    return {
      normalized: template,
      issues: [{ path, message: `Expected ${typeof template} but got ${formatType(input)}.` }],
    };
  }

  return { normalized: input as JsonLike, issues };
}

export default function CmsPage() {
  const [entries, setEntries] = useState<SectionEntry[]>([]);
  const [selectedKey, setSelectedKey] = useState<HomeSectionKey>('header-section');
  const [jsonDraft, setJsonDraft] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [lockStructure, setLockStructure] = useState(true);
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
    const draftProps = tryParseDraft(jsonDraft) as JsonLike | null;
    if (!draftProps) {
      setJsonError('Invalid JSON. Fix syntax before saving.');
      setValidationIssues([]);
      return;
    }
    setJsonError(null);

    const template = defaultSectionProps[selectedKey] as JsonLike;
    const validationResult = validateAndNormalize(draftProps, template);

    if (lockStructure) {
      if (validationResult.issues.length > 0) {
        setJsonDraft(JSON.stringify(validationResult.normalized, null, 2));
        setStatus('Fixed structure with template lock, then saved draft.');
      }
      setValidationIssues(validationResult.issues);
    } else {
      setValidationIssues(validationResult.issues);
    }

    const response = await fetch(`${API_URL}/cms/sections/${HOME_PAGE_SLUG}/${selectedKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        draftProps: lockStructure ? validationResult.normalized : draftProps,
      }),
    });

    if (!response.ok) {
      setStatus('Failed to save draft.');
      return;
    }

    await loadEntries();
    if (!lockStructure && validationResult.issues.length > 0) {
      setStatus(`Draft saved for ${selectedKey} with ${validationResult.issues.length} structure warning(s).`);
      return;
    }
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
  const templateOutline = useMemo(() => buildTemplateHint(defaultSectionProps[selectedKey] as JsonLike), [selectedKey]);

  function resetToTemplate() {
    setJsonDraft(JSON.stringify(defaultSectionProps[selectedKey], null, 2));
    setJsonError(null);
    setValidationIssues([]);
    setStatus(`Reset ${selectedKey} to default template.`);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border bg-white p-4 shadow-sm">
          <h1 className="text-lg font-semibold">CMS Sections</h1>
          <p className="mt-1 text-sm text-slate-500">เลือก section แล้วแก้ JSON ได้เลย พร้อมตัวช่วยกันโครงสร้างพัง</p>
          <ul className="mt-4 space-y-2">
            {HOME_SECTION_KEYS.map((sectionKey) => (
              <li key={sectionKey}>
                <button
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${selectedKey === sectionKey ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}
                  onClick={() => setSelectedKey(sectionKey)}
                  type="button"
                >
                  {sectionKey}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <label className="flex cursor-pointer items-start gap-2 text-sm">
              <input type="checkbox" checked={lockStructure} onChange={(event) => setLockStructure(event.target.checked)} className="mt-1" />
              <span>
                <span className="font-semibold">Structure lock</span>
                <span className="mt-1 block text-xs text-slate-600">{LOCKED_MESSAGE}</span>
              </span>
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <button type="button" className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white" onClick={saveDraft}>
              Save Draft
            </button>
            <button type="button" className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700" onClick={resetToTemplate}>
              Reset To Default JSON
            </button>
            <button type="button" className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white" onClick={publishPage}>
              Publish Home Page
            </button>
          </div>
          <p className="mt-3 rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{status}</p>
        </aside>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">{selectedKey} Draft JSON</h2>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${lockStructure ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {lockStructure ? 'LOCK ON' : 'LOCK OFF'}
            </span>
          </div>
          <textarea
            value={jsonDraft}
            onChange={(event) => setJsonDraft(event.target.value)}
            className="mt-3 h-[500px] w-full rounded-lg border bg-slate-950 p-3 font-mono text-xs text-slate-100"
          />
          {jsonError ? <p className="mt-2 text-sm text-red-600">{jsonError}</p> : null}
          {validationIssues.length > 0 ? (
            <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <p className="font-semibold">Structure warnings ({validationIssues.length})</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {validationIssues.slice(0, 8).map((issue) => (
                  <li key={`${issue.path}-${issue.message}`}>
                    {issue.path}: {issue.message}
                  </li>
                ))}
              </ul>
              {validationIssues.length > 8 ? <p className="mt-2">...and {validationIssues.length - 8} more</p> : null}
            </div>
          ) : null}
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Expected JSON Outline</h2>
          <p className="mt-1 text-sm text-slate-500">โครงร่างนี้บอกว่าฟิลด์แต่ละตัวควรเป็นอะไร (string, array, object ฯลฯ)</p>
          <pre className="mt-3 max-h-[500px] overflow-auto rounded-lg border bg-slate-900 p-3 text-xs text-slate-100">
            {JSON.stringify(templateOutline, null, 2)}
          </pre>
        </section>

        <section className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
          <h2 className="text-base font-semibold">Live Section Preview</h2>
          <p className="mb-3 mt-1 text-sm text-slate-500">
            Full-width preview using the real shared section component (closer to production proportions).
          </p>
          <div className="overflow-auto rounded border bg-white">
            <div className="min-w-[1100px]">
              <SectionRenderer sectionKey={selectedKey} props={previewProps} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
