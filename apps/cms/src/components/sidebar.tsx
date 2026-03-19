'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronRight, SunMedium } from 'lucide-react';
import { HOME_SECTION_KEYS } from '../../../../libs/ui/src/section/content-models';
import { cn } from '../../../../libs/ui/src/lib/utils';

type NavLink = { title: string; href: string };
type NavGroup = { title: string; items: NavLink[] };

function formatSectionTitle(sectionKey: string) {
  return sectionKey
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const nav: Array<NavLink | NavGroup> = [
  { title: 'Layout Manager', href: '/layout-builder' },
  {
    title: 'Homepage CMS Sections',
    items: HOME_SECTION_KEYS.map((sectionKey) => ({
      title: formatSectionTitle(sectionKey),
      href: `/sections?section=${sectionKey}`,
    })),
  },
];

function isNavGroup(item: NavLink | NavGroup): item is NavGroup {
  return 'items' in item;
}

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get('section');

  const defaultOpenGroups = React.useMemo(() => {
    return nav.reduce<Record<string, boolean>>((acc, item) => {
      if (isNavGroup(item)) {
        acc[item.title] = item.items.some(
          (child) =>
            pathname === '/sections' &&
            child.href === `/sections?section=${activeSection}`,
        );
      }
      return acc;
    }, {});
  }, [activeSection, pathname]);

  const [openGroups, setOpenGroups] =
    React.useState<Record<string, boolean>>(defaultOpenGroups);

  React.useEffect(() => {
    setOpenGroups((prev) => ({
      ...prev,
      ...defaultOpenGroups,
    }));
  }, [defaultOpenGroups]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="flex h-full flex-col bg-[#f8faf8]">
      <nav className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-2">
          {nav.map((item) => {
            if (!isNavGroup(item)) {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'flex min-h-11 items-center rounded-xl px-4 text-[15px] font-medium transition-colors',
                    active
                      ? 'bg-[#e4efe6] text-[#234434]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  )}
                >
                  {item.title}
                </Link>
              );
            }

            const isOpen = openGroups[item.title];
            const hasActiveChild = item.items.some(
              (child) =>
                pathname === '/sections' &&
                child.href === `/sections?section=${activeSection}`,
            );

            return (
              <div key={item.title} className="pt-2">
                <button
                  type="button"
                  onClick={() => toggleGroup(item.title)}
                  className={cn(
                    'flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-left text-[15px] font-medium transition-colors',
                    hasActiveChild
                      ? 'text-slate-900'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  )}
                >
                  <span>{item.title}</span>

                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-0' : '-rotate-90',
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'grid transition-all duration-200 ease-out',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="ml-4 mt-2 border-l border-slate-200 pl-4">
                      <div className="space-y-1 pb-1">
                        {item.items.map((child) => {
                          const childSection = child.href.split('section=')[1];
                          const active =
                            pathname === '/sections' &&
                            activeSection === childSection;

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'group flex min-h-11 items-center justify-between rounded-xl px-4 text-[15px] transition-colors',
                                active
                                  ? 'bg-[#e4efe6] font-medium text-[#234434]'
                                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                              )}
                            >
                              <span>{child.title}</span>
                              <ChevronRight
                                className={cn(
                                  'h-4 w-4 shrink-0 transition-all',
                                  active
                                    ? 'text-[#234434] opacity-100'
                                    : 'text-slate-400 opacity-70 group-hover:opacity-100',
                                )}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          <SunMedium className="h-4 w-4 text-slate-500" />
          <span>Light</span>
        </button>
      </div>
    </aside>
  );
}
