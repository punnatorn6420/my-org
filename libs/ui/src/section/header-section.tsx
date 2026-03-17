'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu';
import { Button } from '../components/ui/button';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Flights', href: '#' },
  { label: 'Travel Info', href: '#' },
  { label: 'Promotions', href: '#' },
  { label: 'Check-in', href: '#' },
  { label: 'Manage', href: '#' },
];

export function HeaderSection() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="inline-flex rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold tracking-wide text-black"
            aria-label="Nok Air Home"
          >
            NOK AIR
          </a>
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-medium tracking-wide text-slate-500">
            <a href="#" className="text-slate-900">
              EN
            </a>{' '}
            | <a href="#">TH</a>
          </div>
          <Button className="bg-black px-4 text-white hover:bg-black/85">Sign In</Button>
        </div>
      </div>
    </header>
  );
}
