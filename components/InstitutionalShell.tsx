import { Fragment as ReactFragment } from 'react';
import Script from 'next/script';
import HeroSection from './sections/HeroSection';
import EcosystemSection from './sections/EcosystemSection';
import RoadmapSection from './sections/RoadmapSection';
import FooterSection from './sections/FooterSection';
import ScrollProgressBar from './ScrollProgressBar';

export interface Fragment {
  name: string;
  type: 'section' | 'interstitial' | 'tail';
  sectionId?: string;
  html: string;
}

interface HtmlBlockProps {
  html: string;
}

function HtmlBlock({ html }: HtmlBlockProps) {
  return <div className="legacy-fragment" dangerouslySetInnerHTML={{ __html: html }} />;
}

type SectionId = 's1' | 's6' | 's7';

const sectionComponentById: Record<SectionId, React.ComponentType> = {
  s1: HeroSection,
  s6: EcosystemSection,
  s7: RoadmapSection,
};

interface SplitTailResult {
  contentHtml: string;
  hasFooter: boolean;
}

function splitTailContent(html = ''): SplitTailResult {
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;
  const footerMatch = html.match(footerRegex);
  if (!footerMatch) {
    return { contentHtml: html.trim(), hasFooter: false };
  }

  const contentHtml = html.replace(footerRegex, '').trim();
  return { contentHtml, hasFooter: true };
}

interface InstitutionalShellProps {
  fragments: Fragment[];
  runtimeScript: string;
}

export default function InstitutionalShell({ fragments, runtimeScript }: InstitutionalShellProps) {
  return (
    <>
      <ScrollProgressBar />
      <main aria-label="Página institucional OBELISK-Z">
        {fragments.map((fragment, index) => {
          const sectionId = fragment.sectionId as SectionId | undefined;
          const SectionComponent = sectionId ? sectionComponentById[sectionId] : undefined;

          if (SectionComponent) {
            return <SectionComponent key={`section-component-${fragment.sectionId}-${index}`} />;
          }

          if (fragment.type === 'tail') {
            const { contentHtml, hasFooter } = splitTailContent(fragment.html);
            return (
              <ReactFragment key={`tail-fragment-${fragment.name}-${index}`}>
                {contentHtml ? <HtmlBlock html={contentHtml} /> : null}
                {hasFooter ? <FooterSection /> : null}
              </ReactFragment>
            );
          }

          return <HtmlBlock key={`legacy-block-${fragment.name}-${index}`} html={fragment.html} />;
        })}
      </main>
      <Script id="obelisk-runtime" strategy="afterInteractive">
        {runtimeScript}
      </Script>
    </>
  );
}
