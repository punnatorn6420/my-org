import Link from 'next/link';
// import { cmsToc } from '@/lib/toc';

export function AppToc() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-foreground">
        On this page
      </h3>

      {/* <div className="space-y-3">
        {cmsToc.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.title}
          </Link>
        ))}
      </div> */}
    </div>
  );
}
