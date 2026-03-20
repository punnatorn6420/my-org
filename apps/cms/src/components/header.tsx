'use client';

import Image from 'next/image';
import { SidebarTrigger } from '../../../../libs/ui/src/components/ui/sidebar';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 h-12 border-b border-slate-200/90 bg-[#fcfcfd]/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 md:hidden" />
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Nok Studio"
              width={28}
              height={28}
              priority
              className="rounded-md"
            />
            <span className="text-xl font-bold text-slate-900 ">
              Nok Studio
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
