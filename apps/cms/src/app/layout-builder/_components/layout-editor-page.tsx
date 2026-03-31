'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../../../libs/ui/src/components/ui/button';
import type {
  AnySectionProps,
  HomeSectionKey,
} from '../../../../../../libs/ui/src/section/content-models';
import {
  DEFAULT_PAGE_SLUG,
  GRID_COLUMNS,
  canPlaceBlock,
  createBlockFromSection,
  formatSectionLabel,
  getRequiredRows,
  moveBlock,
  normalizeApiLayout,
  type GridPosition,
  type LayoutBlock,
  type LayoutCanvasState,
  type SectionInstanceOption,
} from '../_lib/layout-editor-model';
import { GridCanvas } from './grid-canvas';
import { InspectorPanel } from './inspector-panel';
import { PreviewPanel } from './preview-panel';
import { SectionPalette } from './section-palette';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

interface SectionEntry {
  id: string;
  sectionKey: HomeSectionKey;
  draftProps: AnySectionProps;
}

type ActiveDrag =
  | { type: 'palette'; section: SectionInstanceOption }
  | { type: 'block'; blockId: string }
  | null;

export function LayoutEditorPage() {
  const [canvas, setCanvas] = useState<LayoutCanvasState>({
    columns: GRID_COLUMNS,
    rows: 8,
    blocks: [],
  });
  const [sections, setSections] = useState<SectionInstanceOption[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string>();
  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [dropPreview, setDropPreview] = useState<{
    colStart: number;
    rowStart: number;
    colSpan: number;
    rowSpan: number;
    isValid: boolean;
  } | null>(null);
  const [status, setStatus] = useState('Loading layout draft...');
  const [isBusy, setIsBusy] = useState(false);

  const sectionLookup = useMemo(
    () => new Map(sections.map((section) => [section.id, section])),
    [sections],
  );

  const blockLookup = useMemo(
    () => new Map(canvas.blocks.map((block) => [block.id, block])),
    [canvas.blocks],
  );

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
        setCanvas(normalizeApiLayout(layoutPayload));
        setStatus('Draft loaded from API.');
        return;
      }

      setStatus('Layout API unavailable.');
    } catch {
      setStatus('Failed to reach API.');
    } finally {
      setIsBusy(false);
    }
  }

  function resolveCandidate(position: GridPosition) {
    if (!activeDrag) return null;

    if (activeDrag.type === 'palette') {
      const candidate = createBlockFromSection(activeDrag.section, position);
      return {
        candidate,
        isValid: canPlaceBlock(candidate, canvas.blocks, canvas.columns),
        mode: 'create' as const,
      };
    }

    const source = blockLookup.get(activeDrag.blockId);
    if (!source) return null;

    const candidate: LayoutBlock = {
      ...source,
      colStart: position.colStart,
      rowStart: position.rowStart,
    };

    return {
      candidate,
      isValid: canPlaceBlock(
        candidate,
        canvas.blocks,
        canvas.columns,
        source.id,
      ),
      mode: 'move' as const,
    };
  }

  function handleCanvasDragOver(position: GridPosition) {
    const resolved = resolveCandidate(position);
    if (!resolved) {
      setDropPreview(null);
      return;
    }

    setDropPreview({
      colStart: resolved.candidate.colStart,
      rowStart: resolved.candidate.rowStart,
      colSpan: resolved.candidate.colSpan,
      rowSpan: resolved.candidate.rowSpan,
      isValid: resolved.isValid,
    });
  }

  function handleCanvasDrop(position: GridPosition) {
    const resolved = resolveCandidate(position);
    if (!resolved?.isValid) {
      setDropPreview(null);
      setActiveDrag(null);
      return;
    }

    setCanvas((prev) => {
      if (resolved.mode === 'create') {
        const nextBlocks = [...prev.blocks, resolved.candidate];
        return {
          ...prev,
          blocks: nextBlocks,
          rows: getRequiredRows(nextBlocks),
        };
      }

      if (!activeDrag || activeDrag.type !== 'block') {
        return prev;
      }

      const moved = moveBlock(
        prev.blocks,
        activeDrag.blockId,
        {
          colStart: resolved.candidate.colStart,
          rowStart: resolved.candidate.rowStart,
        },
        prev.columns,
      );

      return {
        ...prev,
        blocks: moved.blocks,
        rows: getRequiredRows(moved.blocks),
      };
    });

    setDropPreview(null);
    setActiveDrag(null);
  }

  function deleteBlock(blockId: string) {
    setCanvas((prev) => {
      const nextBlocks = prev.blocks.filter((block) => block.id !== blockId);
      return {
        ...prev,
        blocks: nextBlocks,
        rows: getRequiredRows(nextBlocks),
      };
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(undefined);
    }
  }

  async function saveDraft() {
    setIsBusy(true);

    try {
      const draftSections = canvas.blocks
        .map((block) => {
          const sectionKey =
            block.sectionKey ??
            (block.sectionInstanceId
              ? sectionLookup.get(block.sectionInstanceId)?.sectionKey
              : undefined);
          return sectionKey ? { sectionKey } : undefined;
        })
        .filter((value): value is { sectionKey: HomeSectionKey } =>
          Boolean(value),
        );

      const response = await fetch(
        `${API_URL}/cms/layout/${DEFAULT_PAGE_SLUG}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ draftSections, draftLayout: canvas }),
        },
      );

      setStatus(
        response.ok ? 'Draft saved successfully.' : 'Draft save failed on API.',
      );
    } catch {
      setStatus('Draft save failed on API.');
    } finally {
      setIsBusy(false);
    }
  }

  async function publishLayout() {
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

  const selectedBlock = selectedBlockId
    ? blockLookup.get(selectedBlockId)
    : undefined;
  const selectedSection = selectedBlock?.sectionInstanceId
    ? sectionLookup.get(selectedBlock.sectionInstanceId)
    : undefined;

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Home Layout Editor
            </h1>
            <p className="text-sm text-muted-foreground">
              Visual-first, constrained grid editor with non-overlapping section
              blocks.
            </p>
          </div>

          <div className="flex gap-2">
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

      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        <SectionPalette
          sections={sections}
          onDragSection={(section) =>
            setActiveDrag({ type: 'palette', section })
          }
        />
        <GridCanvas
          columns={canvas.columns}
          rows={canvas.rows}
          blocks={canvas.blocks}
          sectionLookup={sectionLookup}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onDragBlock={(blockId) => setActiveDrag({ type: 'block', blockId })}
          onCanvasDragOver={handleCanvasDragOver}
          onCanvasDrop={handleCanvasDrop}
          onCanvasDragLeave={() => setDropPreview(null)}
          dropPreview={dropPreview}
        />
        <div className="space-y-4">
          <InspectorPanel
            selectedBlock={selectedBlock}
            selectedSection={selectedSection}
            onDelete={deleteBlock}
          />
          <PreviewPanel blocks={canvas.blocks} sectionLookup={sectionLookup} />
        </div>
      </div>
    </div>
  );
}
