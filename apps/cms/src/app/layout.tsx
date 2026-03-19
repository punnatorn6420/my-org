import './global.css';
import { CSSProperties, ReactNode } from 'react';
import { AppHeader } from '@/components/header';
import { AppSidebar } from '@/components/sidebar';
import { AppToc } from '@/components/toc';
import {
  Sidebar,
  SidebarProvider,
} from '../../../../libs/ui/src/components/ui/sidebar';

export const metadata = {
  title: 'Kirimase-style CMS',
  description: 'CMS shell matching Kirimase docs style with shadcn/ui + Tailwind',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
        <SidebarProvider
          style={
            {
              '--sidebar-width': '340px',
            } as CSSProperties
          }
        >
          <div className="min-h-screen">
            <AppHeader />

            <div className="flex">
              <Sidebar
                collapsible="none"
                className="hidden border-r border-slate-200/90 bg-[#fcfcfd] lg:flex"
              >
                <div className="h-[calc(100vh-72px)] w-full pt-0">
                  <AppSidebar />
                </div>
              </Sidebar>

              <main className="min-w-0 flex-1 px-8 py-10 xl:px-12">
                <div className="mx-auto max-w-[1020px]">{children}</div>
              </main>

              <aside className="hidden w-[270px] shrink-0 border-l border-slate-200/90 2xl:block">
                <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto px-8 py-11">
                  <AppToc />
                </div>
              </aside>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
