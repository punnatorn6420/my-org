import './global.css';
import { ReactNode } from 'react';
import { AppHeader } from '@/components/header';
import { AppSidebar } from '@/components/sidebar';
import { AppToc } from '@/components/toc';

export const metadata = {
  title: 'Kirimase-style CMS',
  description: 'CMS shell matching Kirimase docs style with shadcn/ui + Tailwind',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fbfbfb] text-slate-900 antialiased">
        <div className="min-h-screen">
          <AppHeader />

          <div className="flex">
            <aside className="hidden w-[360px] shrink-0 border-r border-slate-200 bg-[#fbfbfb] lg:block">
              <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto px-4 py-6">
                <AppSidebar />
              </div>
            </aside>

            <main className="min-w-0 flex-1 px-8 py-10 xl:px-12">
              <div className="mx-auto max-w-[980px]">{children}</div>
            </main>

            <aside className="hidden w-[260px] shrink-0 border-l border-slate-200 2xl:block">
              <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto px-6 py-10">
                <AppToc />
              </div>
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}
