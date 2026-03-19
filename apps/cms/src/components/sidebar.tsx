'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../../../libs/ui/src/lib/utils';

type NavLink = { title: string; href: string };
type NavGroup = { title: string; items: NavLink[] };

const nav: Array<NavLink | NavGroup> = [
  { title: 'Introduction', href: '/' },
  { title: 'The Tutorial', href: '/tutorial' },
  { title: 'Getting Started', href: '/getting-started' },
  {
    title: 'Commands',
    items: [
      { title: 'Init', href: '/commands/init' },
      { title: 'Add', href: '/commands/add' },
      { title: 'Generate', href: '/commands/generate' },
    ],
  },
  {
    title: 'Packages',
    items: [
      { title: 'ORM', href: '/packages/orm' },
      { title: 'Authentication', href: '/packages/authentication' },
      { title: 'Component Library', href: '/packages/component-library' },
      { title: 'Miscellaneous', href: '/packages/miscellaneous' },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-5 pb-8">
      {nav.map((group) => {
        if ('href' in group) {
          const active = pathname === group.href;
          return (
            <Link
              key={group.title}
              href={group.href}
              className={cn(
                'block rounded-md px-3 py-2 text-[15px] leading-none transition-colors',
                active
                  ? 'bg-emerald-50 font-semibold text-emerald-900'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              {group.title}
            </Link>
          );
        }

        return (
          <div key={group.title} className="space-y-3">
            <div className="flex items-center justify-between px-3 text-[15px] text-slate-500">
              <span>{group.title}</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            <div className="ml-4 border-l border-slate-200 pl-4">
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between rounded-md px-3 py-1.5 text-[15px] transition-colors',
                        active
                          ? 'bg-emerald-50 font-medium text-emerald-900'
                          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                      )}
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
