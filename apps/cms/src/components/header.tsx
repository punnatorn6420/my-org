import { Github, Search, Bell, PanelLeft } from 'lucide-react';
import { Button } from '../../../../libs/ui/src/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <PanelLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700 text-sm font-bold text-white">
              C
            </div>
            <span className="text-[2rem] font-bold tracking-tight text-foreground">
              CMS
            </span>
          </div>
        </div>

        <div className="hidden flex-1 px-8 lg:flex">
          <div className="relative ml-auto w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search documentation..."
              className="h-11 w-full rounded-xl border border-border bg-muted/40 pl-10 pr-16 text-sm text-foreground outline-none transition focus:border-foreground/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
              CTRL K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
