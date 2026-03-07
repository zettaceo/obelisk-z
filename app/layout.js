import './globals.css';
import { Orbitron, Space_Mono, Syne } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap'
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap'
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL('https://obelisk-z.vercel.app'),
  title: 'OBELISK-Z | Camada de Wallet do Ecossistema ZETTA',
  description:
    'A OBELISK-Z integra segurança, arquitetura e execução para o ecossistema ZETTA com padrão institucional premium.',
  openGraph: {
    title: 'OBELISK-Z',
    description:
      'Infraestrutura institucional para operação segura no ecossistema ZETTA.',
    type: 'website',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OBELISK-Z',
    description:
      'Infraestrutura institucional para operação segura no ecossistema ZETTA.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#06020f" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${orbitron.variable} ${syne.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
