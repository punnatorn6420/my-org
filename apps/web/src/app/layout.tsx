import './global.css';

export const metadata = {
  title: 'Page Composer - Web',
  description: 'Public home page rendered from published layout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
