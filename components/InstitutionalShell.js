import Script from 'next/script';

export default function InstitutionalShell({ bodyHtml, runtimeScript }) {
  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <Script id="obelisk-runtime" strategy="afterInteractive">
        {runtimeScript}
      </Script>
    </>
  );
}
