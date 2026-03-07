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

export default function HomePage() {
  return (
    <InstitutionalShell bodyHtml={bodyHtml} runtimeScript={runtimeScript} />
  );
}
