import Link from 'next/link';
import { Github, MessageCircle, Search, PanelLeft } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-[#fcfcfd]/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 lg:hidden"
          >
            <PanelLeft className="h-5 w-5" />
          </button>

          <div className="flex cursor-default items-center gap-3 select-none">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-emerald-700 text-[11px] font-bold text-white shadow-sm">
              ✳
            </div>
            <span className="text-xl font-bold leading-none tracking-tight text-[#111827]">
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

          <label className="group relative block w-[360px] xl:w-[355px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
            <input
              placeholder="Search documentation..."
              className="h-11 w-full rounded-2xl border border-slate-300 bg-[#f8fafc] pl-11 pr-20 text-[15px] text-slate-700 outline-none transition focus:border-emerald-300 focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-500">
              CTRL K
            </span>
          </label>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Github className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
