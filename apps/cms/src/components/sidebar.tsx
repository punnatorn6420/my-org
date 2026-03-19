'use client';

import { usePathname } from 'next/navigation';
import { ChevronRight, Link } from 'lucide-react';
import { cn } from '../../../../libs/ui/src/lib/utils';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {/* {cmsNav.map((group) => {
        if ('href' in group) {
          return (
            <Link
              key={group.title}
              href={group.href}
              className={cn(
                'block rounded-lg px-3 py-2 text-[15px] font-medium transition-colors',
                pathname === group.href
                  ? 'bg-green-50 text-green-900'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {group.title}
            </Link>
          );
        }

        return (
          <div key={group.title} className="space-y-2">
            <div className="flex items-center justify-between px-3 text-[15px] font-medium text-foreground">
              <span>{group.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="ml-4 border-l border-border pl-4">
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href + item.title}
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-[15px] transition-colors',
                      pathname === item.href
                        ? 'bg-green-50 text-green-900'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })} */}
    </nav>
  );
}
