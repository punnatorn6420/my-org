import Link from 'next/link';

const toc = [{ title: 'What is Kirimase?', href: '#what-is-kirimase' }];

export function AppToc() {
  return (
    <div>
      <h3 className="mb-5 text-[14px] font-semibold text-slate-800">On this page</h3>
      <div className="space-y-2">
        {toc.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block cursor-pointer rounded-md px-2 py-1 text-[14px] text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
