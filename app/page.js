import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import InstitutionalShell from '../components/InstitutionalShell';

const runtimeScript = readFileSync(
  join(process.cwd(), 'public/runtime/obelisk-runtime.js'),
  'utf8'
);

const fragmentsManifest = JSON.parse(
  readFileSync(join(process.cwd(), 'content/fragments/manifest.json'), 'utf8')
);

const bodyBlocks = fragmentsManifest.fragments.map((fragment) =>
  readFileSync(join(process.cwd(), `content/fragments/${fragment.name}`), 'utf8')
);

export default function HomePage() {
  return <InstitutionalShell blocks={bodyBlocks} runtimeScript={runtimeScript} />;
}
