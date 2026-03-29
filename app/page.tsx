import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import InstitutionalShell from '../components/InstitutionalShell';
import type { Fragment } from '../components/InstitutionalShell';

const runtimeScript = readFileSync(
  join(process.cwd(), 'public/runtime/obelisk-runtime.js'),
  'utf8',
);

interface ManifestEntry {
  name: string;
  type: 'section' | 'interstitial' | 'tail';
  sectionId?: string;
}

interface Manifest {
  fragments: ManifestEntry[];
}

const fragmentsManifest = JSON.parse(
  readFileSync(join(process.cwd(), 'content/fragments/manifest.json'), 'utf8'),
) as Manifest;

const fragments: Fragment[] = fragmentsManifest.fragments.map((fragment) => ({
  ...fragment,
  html: readFileSync(join(process.cwd(), `content/fragments/${fragment.name}`), 'utf8'),
}));

export default function HomePage() {
  return <InstitutionalShell fragments={fragments} runtimeScript={runtimeScript} />;
}
