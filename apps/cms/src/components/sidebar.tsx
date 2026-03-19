'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, SunMedium } from 'lucide-react';
import {
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../../../../libs/ui/src/components/ui/sidebar';
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
    <div className="flex h-full flex-col pt-[72px]">
      <SidebarContent className="px-4 py-6">
        <SidebarMenu className="gap-5">
          {nav.map((group) => {
            if ('href' in group) {
              const active = pathname === group.href;
              return (
                <SidebarMenuItem key={group.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      'h-auto rounded-md px-3 py-[9px] text-[15px] leading-none',
                      active
                        ? 'bg-emerald-50 font-semibold text-emerald-900 hover:bg-emerald-50 hover:text-emerald-900'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                    )}
                  >
                    <Link href={group.href}>
                      <span>{group.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={group.title}>
                <div className="flex items-center justify-between px-3 text-[15px] text-slate-500">
                  <span>{group.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </div>

                <SidebarMenuSub className="mt-2 ml-3 border-slate-200 px-4 py-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <SidebarMenuSubItem key={item.href}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={active}
                          className={cn(
                            'h-auto rounded-md px-3 py-2 text-[15px]',
                            active
                              ? 'bg-emerald-50 font-medium text-emerald-900 hover:bg-emerald-50 hover:text-emerald-900'
                              : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                          )}
                        >
                          <Link href={item.href} className="flex items-center justify-between">
                            <span>{item.title}</span>
                            <ChevronRight className="h-4 w-4 opacity-80" />
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 px-4 py-4">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-[14px] text-slate-700 transition-colors hover:bg-slate-100"
        >
          <SunMedium className="h-4 w-4 text-slate-500" />
          <span>Light</span>
        </button>
      </SidebarFooter>
    </div>
  );
}
