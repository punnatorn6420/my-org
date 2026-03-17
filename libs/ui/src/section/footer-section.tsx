import { Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterLinkColumn {
  title: string;
  links: string[];
}

const footerColumns: FooterLinkColumn[] = [
  {
    title: 'About Nok Air',
    links: [
      'Our Story',
      'Newsroom',
      'Sustainability',
      'Investor Relations',
      'Careers',
    ],
  },
  {
    title: 'Support',
    links: [
      'Help Center',
      'Contact Us',
      'Refund Request',
      'Baggage Info',
      'Flight Disruptions',
    ],
  },
  {
    title: 'Legal',
    links: [
      'Terms of Use',
      'Privacy Policy',
      'Conditions of Carriage',
      'Cookie Policy',
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="bg-white text-slate-700">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <a
            href="#"
            className="inline-flex rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold tracking-wide text-black"
          >
            NOK AIR
          </a>
          <p className="mt-4 max-w-sm text-sm text-slate-500">
            Nok Air is a premium international airline based in Bangkok,
            Thailand. We are dedicated to providing the highest standards of
            safety and service.
          </p>
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full p-1.5 hover:bg-slate-100 hover:text-slate-700"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full p-1.5 hover:bg-slate-100 hover:text-slate-700"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-full p-1.5 hover:bg-slate-100 hover:text-slate-700"
            >
              <Twitter className="size-4" />
            </a>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-slate-900">
              {column.title}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-slate-900">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © 2026 Nok Airlines Public Company Limited. All rights reserved.
          </p>
          <p>Official Member of Premium Alliance</p>
        </div>
      </div>
    </footer>
  );
}
