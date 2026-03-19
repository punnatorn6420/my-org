import './global.css';
import { ReactNode } from 'react';
import { AppHeader } from '@/components/header';
import { AppSidebar } from '@/components/sidebar';
import { AppToc } from '@/components/toc';

export const metadata = {
  title: 'CMS',
  description: 'CMS mockup inspired by Kirimase',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen">
          <AppHeader />

          <div className="mx-auto flex max-w-[1600px]">
            <aside className="hidden w-[280px] shrink-0 border-r border-border bg-background lg:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
                <AppSidebar />
              </div>
            </aside>

            <main className="min-w-0 flex-1 px-6 py-10 lg:px-10">
              <div className="mx-auto max-w-4xl">{children}</div>
            </main>

            <aside className="hidden w-[260px] shrink-0 xl:block">
              <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-6 py-10">
                <AppToc />
              </div>
            </aside>
          </div>
        </div>
      </body>
    </html>
  );
}
