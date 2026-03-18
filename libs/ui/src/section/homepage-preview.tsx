import {
  defaultSectionProps,
  HOME_SECTION_KEYS,
  type HomeSectionKey,
  type SectionPropsMap,
} from './content-models';
import { SectionRenderer } from './section-renderer';

interface NokAirHomepagePreviewProps {
  sections?: Array<{ sectionKey: HomeSectionKey; props: SectionPropsMap[HomeSectionKey] }>;
}

export function NokAirHomepagePreview({ sections }: NokAirHomepagePreviewProps) {
  const fallbackSections = HOME_SECTION_KEYS.map((sectionKey) => ({
    sectionKey,
    props: defaultSectionProps[sectionKey],
  }));

  return (
    <main>
      {(sections ?? fallbackSections).map((section) => (
        <SectionRenderer
          key={section.sectionKey}
          sectionKey={section.sectionKey}
          props={section.props}
        />
      ))}
    </main>
  );
}
