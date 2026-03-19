import Link from 'next/link';
import { Github, MessageCircle, Search, PanelLeft } from 'lucide-react';
import { Button } from '../../../../libs/ui/src/components/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <PanelLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-emerald-700 text-[10px] font-bold text-white">
              ✳
            </div>
            <span className="text-xl font-bold leading-none tracking-tight text-black">
              Kirimase
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="#"
            className="text-[15px] text-slate-600 transition-colors hover:text-slate-900"
          >
            Contact ↗
          </Link>

          <div className="relative w-[320px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Search documentation..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-20 text-sm text-slate-700 outline-none transition focus:border-slate-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500">
              CTRL K
            </span>
          </div>

          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
