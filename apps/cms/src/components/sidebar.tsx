'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  LayoutTemplate,
  Blocks,
} from 'lucide-react';

import { HOME_SECTION_KEYS } from '../../../../libs/ui/src/section/content-models';
import { cn } from '../../../../libs/ui/src/lib/utils';

type NavLink = { title: string; href: string; icon?: React.ReactNode };
type NavGroup = { title: string; items: NavLink[]; icon?: React.ReactNode };

function formatSectionTitle(sectionKey: string) {
  return sectionKey
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const nav: Array<NavLink | NavGroup> = [
  {
    title: 'Layout Manager',
    href: '/layout-builder',
  },
  {
    title: 'CMS Sections',
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
  }, [pathname, activeSection]);

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
    <aside className="h-[calc(100vh-4rem)] w-[16rem] shrink-0 border-r border-gray-200/90 bg-[#fcfcfd]">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <div className="space-y-2">
          {nav.map((item) => {
            if (!isNavGroup(item)) {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    'flex h-8 items-center gap-2 rounded-md px-2 text-sm',
                    active
                      ? 'bg-amber-100 font-medium text-amber-600'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                  )}
                >
                  <span>{item.title}</span>
                </Link>
              );
            }

            const isOpen = openGroups[item.title];
            const hasActiveChild = item.items.some((child) => {
              const childSection = child.href.split('section=')[1];
              return pathname === '/sections' && activeSection === childSection;
            });

            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() => toggleGroup(item.title)}
                  className={cn(
                    'flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm',
                    hasActiveChild
                      ? 'text-gray-500'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronDown
                    className={cn(
                      'ml-auto h-4 w-4 shrink-0 transition-transform duration-200',
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
                    <div className="ml-3 mt-2 border-l border-gray-200 pl-2">
                      <div className="space-y-2">
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
                                'group flex h-8 items-center justify-between rounded-md px-2 text-sm transition-colors',
                                active
                                  ? 'bg-amber-100 font-medium text-amber-600'
                                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                              )}
                            >
                              <span>{child.title}</span>
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
      </div>
    </aside>
  );
}
