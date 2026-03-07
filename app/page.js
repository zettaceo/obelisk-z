import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import InstitutionalShell from '../components/InstitutionalShell';

const bodyHtml = readFileSync(
  join(process.cwd(), 'content/obelisk-body.html'),
  'utf8'
);

const runtimeScript = readFileSync(
  join(process.cwd(), 'public/runtime/obelisk-runtime.js'),
  'utf8'
);

function splitBodyInBlocks(html) {
  const blocks = [];
  const sectionRegex = /<section[\s\S]*?<\/section>/g;
  let cursor = 0;
  let match = sectionRegex.exec(html);

  while (match) {
    if (match.index > cursor) {
      const interstitial = html.slice(cursor, match.index).trim();
      if (interstitial) {
        blocks.push(interstitial);
      }
    }

    blocks.push(match[0].trim());
    cursor = sectionRegex.lastIndex;
    match = sectionRegex.exec(html);
  }

  const tail = html.slice(cursor).trim();
  if (tail) {
    blocks.push(tail);
  }

  return blocks;
}

const bodyBlocks = splitBodyInBlocks(bodyHtml);

export default function HomePage() {
  return <InstitutionalShell blocks={bodyBlocks} runtimeScript={runtimeScript} />;
}
