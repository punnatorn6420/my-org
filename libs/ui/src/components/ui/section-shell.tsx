import * as React from 'react';
import { cn } from '../../lib/utils';

export function SectionShell({ title, className, children }: { title?: string; className?: string; children: React.ReactNode; }) {
  return (
    <section className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm', className)}>
      {title ? <h2 className="mb-4 text-xl font-semibold text-slate-900">{title}</h2> : null}
      {children}
    </section>
  );
}
