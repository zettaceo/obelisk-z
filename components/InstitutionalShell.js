import Script from 'next/script';

function HtmlBlock({ html }) {
  return <div className="legacy-fragment" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function InstitutionalShell({ blocks, runtimeScript }) {
  return (
    <>
      <main aria-label="Página institucional OBELISK-Z">
        {blocks.map((block, index) => (
          <HtmlBlock key={`legacy-block-${index}`} html={block} />
        ))}
      </main>
      <Script id="obelisk-runtime" strategy="afterInteractive">
        {runtimeScript}
      </Script>
    </>
  );
}
