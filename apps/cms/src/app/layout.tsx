import './global.css';
import { ReactNode } from 'react';
import { AppHeader } from '@/components/header';
import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider } from '../../../../libs/ui/src/components/ui/sidebar';

export const metadata = {
  title: 'Nok Studio',
  description:
    'CMS shell matching Kirimase docs style with shadcn/ui + Tailwind',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased">
        <SidebarProvider defaultOpen>
          <div className="min-h-screen bg-[#fcfcfd]">
            <AppHeader />

            <div className="flex">
              <div className="hidden md:block">
                <AppSidebar />
              </div>

              <main className="min-w-0 flex-1">
                <div className="mx-auto max-w-[1400px] px-6 py-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
