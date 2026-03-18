import { Facebook, Instagram, Twitter } from 'lucide-react';

import type { FooterSectionProps } from './content-models';
import { defaultSectionProps } from './content-models';

export function FooterSection(props: FooterSectionProps = defaultSectionProps['footer-section']) {
  const socialLinks = Array.isArray(props?.socialLinks)
    ? props.socialLinks
    : defaultSectionProps['footer-section'].socialLinks;
  const footerGroups = Array.isArray(props?.footerGroups)
    ? props.footerGroups
    : defaultSectionProps['footer-section'].footerGroups;

  return (
    <footer className="bg-white text-slate-700">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-6">
        <div>
          <a href="#" className="inline-flex rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold tracking-wide text-black">
            {props.logoText}
          </a>
          <p className="mt-4 max-w-sm text-sm text-slate-500">{props.companyText}</p>
          <div className="mt-4 flex items-center gap-2 text-slate-400">
            {socialLinks.map((link) => (
              <a key={link.platform} href={link.href} aria-label={link.platform} className="rounded-full p-1.5 hover:bg-slate-100 hover:text-slate-700">
                {link.platform === 'facebook' ? <Facebook className="size-4" /> : null}
                {link.platform === 'instagram' ? <Instagram className="size-4" /> : null}
                {link.platform === 'twitter' ? <Twitter className="size-4" /> : null}
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-slate-900">{column.title}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-slate-900">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-6">
          <p>{props.copyrightText}</p>
          <p>{props.allianceText}</p>
        </div>
      </div>
    </footer>
  );
}
