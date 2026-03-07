import { Fragment } from 'react';
import Script from 'next/script';
import HeroSection from './sections/HeroSection';
import EcosystemSection from './sections/EcosystemSection';
import RoadmapSection from './sections/RoadmapSection';
import FooterSection from './sections/FooterSection';

function HtmlBlock({ html }) {
  return <div className="legacy-fragment" dangerouslySetInnerHTML={{ __html: html }} />;
}

const sectionComponentById = {
  s1: HeroSection,
  s6: EcosystemSection,
  s7: RoadmapSection
};

function splitTailContent(html = '') {
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;
  const footerMatch = html.match(footerRegex);
  if (!footerMatch) {
    return { contentHtml: html.trim(), hasFooter: false };
  }

  const contentHtml = html.replace(footerRegex, '').trim();
  return { contentHtml, hasFooter: true };
}

export default function InstitutionalShell({ fragments, runtimeScript }) {
  return (
    <>
      <main aria-label="Página institucional OBELISK-Z">
        {fragments.map((fragment, index) => {
          const SectionComponent = sectionComponentById[fragment.sectionId];
          if (SectionComponent) {
            return <SectionComponent key={`section-component-${fragment.sectionId}-${index}`} />;
          }

          if (fragment.type === 'tail') {
            const { contentHtml, hasFooter } = splitTailContent(fragment.html);
            return (
              <Fragment key={`tail-fragment-${fragment.name}-${index}`}>
                {contentHtml ? <HtmlBlock html={contentHtml} /> : null}
                {hasFooter ? <FooterSection /> : null}
              </Fragment>
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
