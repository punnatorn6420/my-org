import * as React from 'react';
import { cn } from '../../lib/utils';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn('h-9 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500', className)} {...props} />;
}
