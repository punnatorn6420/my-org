'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../../../libs/ui/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../../../../libs/ui/src/components/ui/dialog';
import {
  DEFAULT_PAGE_SLUG,
  LAYOUT_STORAGE_KEY,
  createId,
  createRowFromSpans,
  formatSectionLabel,
  normalizeApiLayout,
  validateRows,
  type LayoutRow,
  type SectionInstanceOption,
} from '../_lib/layout-editor-model';
import { RowTemplatePicker } from './row-template-picker';
import { LayoutRowCard } from './layout-row-card';
import { LayoutPreviewGrid } from './layout-preview-grid';
import type {
  AnySectionProps,
  HomeSectionKey,
} from '../../../../../../libs/ui/src/section/content-models';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

interface SectionEntry {
  id: string;
  sectionKey: HomeSectionKey;
  draftProps: AnySectionProps;
}

function updateRow(
  rows: LayoutRow[],
  rowId: string,
  updater: (row: LayoutRow) => LayoutRow,
): LayoutRow[] {
  return rows.map((row) => (row.id === rowId ? updater(row) : row));
}

export function LayoutEditorPage() {
  const [rows, setRows] = useState<LayoutRow[]>([]);
  const [sections, setSections] = useState<SectionInstanceOption[]>([]);
  const [status, setStatus] = useState('Loading layout draft...');
  const [isBusy, setIsBusy] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const sectionLookup = useMemo(
    () => new Map(sections.map((section) => [section.id, section])),
    [sections],
  );

  const validationErrors = useMemo(() => validateRows(rows), [rows]);

  useEffect(() => {
    void loadInitialData();
  }, []);

  async function loadInitialData() {
    setIsBusy(true);
    try {
      const [sectionsResponse, layoutResponse] = await Promise.all([
        fetch(`${API_URL}/cms/sections/${DEFAULT_PAGE_SLUG}`),
        fetch(`${API_URL}/cms/layout/${DEFAULT_PAGE_SLUG}`),
      ]);

      const sectionPayload = sectionsResponse.ok
        ? ((await sectionsResponse.json()) as { entries?: SectionEntry[] })
        : { entries: [] };

      const sectionOptions: SectionInstanceOption[] = (
        sectionPayload.entries ?? []
      ).map((entry) => ({
        id: entry.id,
        sectionKey: entry.sectionKey,
        label: formatSectionLabel(entry.sectionKey),
        draftProps: entry.draftProps,
      }));

      setSections(sectionOptions);

      if (layoutResponse.ok) {
        const layoutPayload = (await layoutResponse.json()) as unknown;
        const parsedRows = normalizeApiLayout(layoutPayload, sectionOptions);
        setRows(parsedRows);
        setStatus('Draft loaded from API.');
        return;
      }

      loadFromLocalStorage(sectionOptions);
      setStatus('API unavailable, loaded local draft.');
    } catch {
      loadFromLocalStorage([]);
      setStatus('Failed to reach API, loaded local draft fallback.');
    } finally {
      setIsBusy(false);
    }
  }

  function loadFromLocalStorage(sectionOptions: SectionInstanceOption[]) {
    try {
      const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (!raw) {
        setRows([createRowFromSpans([12])]);
        return;
      }

      const parsed = JSON.parse(raw) as { rows?: LayoutRow[] };
      if (parsed.rows?.length) {
        setRows(normalizeApiLayout({ draftRows: parsed.rows }, sectionOptions));
        return;
      }

      setRows([createRowFromSpans([12])]);
    } catch {
      setRows([createRowFromSpans([12])]);
    }
  }

  function addRow(spans: number[]) {
    setRows((prev) => [...prev, createRowFromSpans(spans)]);
  }

  function updateColumnSpan(rowId: string, columnId: string, span: number) {
    const safeSpan = Number.isFinite(span)
      ? Math.max(1, Math.min(12, span))
      : 1;

    setRows((prev) =>
      updateRow(prev, rowId, (row) => ({
        ...row,
        columns: row.columns.map((column) =>
          column.id === columnId ? { ...column, span: safeSpan } : column,
        ),
      })),
    );
  }

  function assignSection(
    rowId: string,
    columnId: string,
    sectionInstanceId: string | undefined,
  ) {
    setRows((prev) =>
      updateRow(prev, rowId, (row) => ({
        ...row,
        columns: row.columns.map((column) =>
          column.id === columnId ? { ...column, sectionInstanceId } : column,
        ),
      })),
    );
  }

  function removeColumn(rowId: string, columnId: string) {
    setRows((prev) =>
      updateRow(prev, rowId, (row) => ({
        ...row,
        columns: row.columns.filter((column) => column.id !== columnId),
      })),
    );
  }

  function addColumn(rowId: string) {
    setRows((prev) =>
      updateRow(prev, rowId, (row) => ({
        ...row,
        columns: [...row.columns, { id: createId('col'), span: 3 }],
      })),
    );
  }

  function moveRow(rowId: string, direction: -1 | 1) {
    setRows((prev) => {
      const index = prev.findIndex((row) => row.id === rowId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.length) {
        return prev;
      }

      const copy = [...prev];
      const [target] = copy.splice(index, 1);
      copy.splice(nextIndex, 0, target);
      return copy;
    });
  }

  function duplicateRow(rowId: string) {
    setRows((prev) => {
      const index = prev.findIndex((row) => row.id === rowId);
      if (index < 0) return prev;

      const source = prev[index];
      const duplicated: LayoutRow = {
        id: createId('row'),
        columns: source.columns.map((column) => ({
          ...column,
          id: createId('col'),
        })),
      };

      const copy = [...prev];
      copy.splice(index + 1, 0, duplicated);
      return copy;
    });
  }

  function deleteRow(rowId: string) {
    setRows((prev) => {
      const filtered = prev.filter((row) => row.id !== rowId);
      return filtered.length ? filtered : [createRowFromSpans([12])];
    });
  }

  async function saveDraft() {
    if (validationErrors.length) {
      setStatus('Fix validation errors before saving.');
      return;
    }

    setIsBusy(true);

    try {
      const draftSections = rows
        .flatMap((row) => row.columns)
        .map((column) =>
          column.sectionInstanceId
            ? sectionLookup.get(column.sectionInstanceId)?.sectionKey
            : undefined,
        )
        .filter((value): value is HomeSectionKey => Boolean(value))
        .map((sectionKey) => ({ sectionKey }));

      const response = await fetch(
        `${API_URL}/cms/layout/${DEFAULT_PAGE_SLUG}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ draftSections, draftRows: rows }),
        },
      );

      localStorage.setItem(
        LAYOUT_STORAGE_KEY,
        JSON.stringify({
          pageSlug: DEFAULT_PAGE_SLUG,
          rows,
          updatedAt: new Date().toISOString(),
        }),
      );

      if (!response.ok) {
        setStatus('Draft saved locally. API rejected enhanced grid payload.');
        return;
      }

      setStatus('Draft saved successfully.');
    } catch {
      localStorage.setItem(
        LAYOUT_STORAGE_KEY,
        JSON.stringify({
          pageSlug: DEFAULT_PAGE_SLUG,
          rows,
          updatedAt: new Date().toISOString(),
        }),
      );
      setStatus('Draft saved locally. API request failed.');
    } finally {
      setIsBusy(false);
    }
  }

  async function publishLayout() {
    if (validationErrors.length) {
      setStatus('Cannot publish while layout has validation errors.');
      return;
    }

    setIsBusy(true);
    try {
      const response = await fetch(
        `${API_URL}/cms/publish/${DEFAULT_PAGE_SLUG}`,
        {
          method: 'POST',
        },
      );

      setStatus(response.ok ? 'Layout published.' : 'Publish failed on API.');
    } catch {
      setStatus('Publish failed on API.');
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Home Layout Editor
            </h1>
            <p className="text-sm text-muted-foreground">
              Build homepage layout using structured rows, columns, and
              12-column span rules.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview Layout
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void saveDraft()}
              disabled={isBusy}
            >
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={() => void publishLayout()}
              disabled={isBusy}
            >
              Publish
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{status}</p>
      </header>

      {validationErrors.length ? (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-semibold">Layout validation</p>
          <ul className="mt-1 list-disc pl-4">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-1">
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card p-3">
            <p className="text-sm font-medium">Layout Builder</p>
            <Button
              type="button"
              variant={isPreviewOpen ? 'secondary' : 'outline'}
              onClick={() => setIsPreviewOpen((prev) => !prev)}
            >
              {isPreviewOpen ? 'Hide Preview' : 'Show Preview'}
            </Button>
          </div>

          <RowTemplatePicker onPickTemplate={addRow} />

          <div className="space-y-4">
            {rows.map((row, index) => (
              <LayoutRowCard
                key={row.id}
                row={row}
                rowIndex={index}
                sectionOptions={sections}
                sectionLookup={sectionLookup}
                onMoveUp={() => moveRow(row.id, -1)}
                onMoveDown={() => moveRow(row.id, 1)}
                onDuplicate={() => duplicateRow(row.id)}
                onDelete={() => deleteRow(row.id)}
                onAddColumn={() => addColumn(row.id)}
                onRemoveColumn={(columnId) => removeColumn(row.id, columnId)}
                onUpdateColumnSpan={(columnId, span) =>
                  updateColumnSpan(row.id, columnId, span)
                }
                onAssignSection={(columnId, sectionId) =>
                  assignSection(row.id, columnId, sectionId)
                }
              />
            ))}
          </div>
        </section>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="h-[85vh] max-w-[min(1100px,95vw)] gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Layout Preview</DialogTitle>
            <DialogDescription>
              ตรวจสอบภาพรวมหน้าโดยไม่รบกวนพื้นที่แก้ไข layout หลัก
            </DialogDescription>
          </DialogHeader>
          <div className="h-full overflow-y-auto p-4">
            <LayoutPreviewGrid rows={rows} sectionLookup={sectionLookup} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
