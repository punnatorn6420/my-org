import './global.css';

export const metadata = {
  title: 'Page Composer - CMS',
  description: 'Section and layout management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
