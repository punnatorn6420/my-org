'use client';

import { useEffect, useState } from 'react';
import { PageRenderer } from '@my-org/renderer';
import { LayoutRow, PageLayout, RowTemplate, SectionInstance, rowTemplateToSpans } from '@my-org/schema';
import { Button, Card, Label, Select } from '@my-org/ui';
import { createId } from '@my-org/utils';
import { getHomeLayout, getSections, publishHome, saveHomeLayout } from '../../../lib/api';

function createRow(template: RowTemplate): LayoutRow {
  return {
    id: createId('row'),
    template,
    columns: rowTemplateToSpans[template].map((span) => ({ id: createId('col'), span })),
  };
}

export default function HomeLayoutEditorPage() {
  const [layout, setLayout] = useState<PageLayout>({ id: 'home_layout', slug: 'home', rows: [] });
  const [sections, setSections] = useState<SectionInstance[]>([]);
  const [template, setTemplate] = useState<RowTemplate>('12');

  useEffect(() => {
    async function load() {
      const [layoutData, sectionsData] = await Promise.all([getHomeLayout(), getSections()]);
      setLayout(layoutData);
      setSections(sectionsData);
    }
    void load();
  }, []);

  const addRow = () => setLayout({ ...layout, rows: [...layout.rows, createRow(template)] });

  const moveRow = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= layout.rows.length) return;
    const rows = [...layout.rows];
    [rows[index], rows[nextIndex]] = [rows[nextIndex], rows[index]];
    setLayout({ ...layout, rows });
  };

  const save = async () => {
    await saveHomeLayout(layout);
  };

  const publish = async () => {
    await saveHomeLayout(layout);
    await publishHome();
  };

  return (
    <main className="mx-auto max-w-6xl space-y-5 p-6">
      <h1 className="text-2xl font-bold">Home Layout Editor</h1>

      <Card className="space-y-3">
        <Label>Add row</Label>
        <div className="flex gap-2">
          <Select value={template} onChange={(event) => setTemplate(event.target.value as RowTemplate)}>
            <option value="12">12</option>
            <option value="6-6">6-6</option>
            <option value="4-4-4">4-4-4</option>
          </Select>
          <Button onClick={addRow}>Add row</Button>
          <Button variant="outline" onClick={save}>Save draft</Button>
          <Button variant="outline" onClick={publish}>Publish home</Button>
        </div>
      </Card>

      <div className="space-y-3">
        {layout.rows.map((row, rowIndex) => (
          <Card key={row.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Row {rowIndex + 1} • {row.template}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => moveRow(rowIndex, -1)}>Up</Button>
                <Button variant="outline" size="sm" onClick={() => moveRow(rowIndex, 1)}>Down</Button>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {row.columns.map((column) => (
                <div key={column.id} className="space-y-1">
                  <Label>Column ({column.span})</Label>
                  <Select
                    value={column.sectionInstanceId || ''}
                    onChange={(event) => {
                      const sectionInstanceId = event.target.value || undefined;
                      const rows = layout.rows.map((item) =>
                        item.id !== row.id
                          ? item
                          : {
                              ...item,
                              columns: item.columns.map((col) =>
                                col.id === column.id ? { ...col, sectionInstanceId } : col,
                              ),
                            },
                      );
                      setLayout({ ...layout, rows });
                    }}
                  >
                    <option value="">Unassigned</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>{section.name}</option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Preview</h2>
        <PageRenderer layout={layout} sections={sections} />
      </Card>
    </main>
  );
}
