'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, SunMedium } from 'lucide-react';
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
    <div className="flex h-full flex-col">
      <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-6">
        {nav.map((group) => {
          if ('href' in group) {
            const active = pathname === group.href;
            return (
              <Link
                key={group.title}
                href={group.href}
                className={cn(
                  'block cursor-pointer rounded-md px-3 py-[9px] text-[15px] leading-none transition-all duration-150',
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
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between px-3 text-[15px] text-slate-500 transition-colors hover:text-slate-700"
              >
                <span>{group.title}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="ml-3 border-l border-slate-200 pl-4">
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-[15px] transition-all duration-150',
                          active
                            ? 'bg-emerald-50 font-medium text-emerald-900'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                        )}
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="h-4 w-4 opacity-80" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-[14px] text-slate-700 transition-colors hover:bg-slate-100"
        >
          <SunMedium className="h-4 w-4 text-slate-500" />
          <span>Light</span>
        </button>
      </div>
    </div>
  );
}
