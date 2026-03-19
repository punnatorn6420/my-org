import Link from 'next/link';

const toc = [
  { title: 'What is Kirimase?', href: '#what-is-kirimase' },
];

export function AppToc() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-slate-900">On this page</h3>
      <div className="space-y-2">
        {toc.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
