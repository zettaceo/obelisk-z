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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OBELISK-Z',
  url: 'https://obelisk-z.vercel.app',
  logo: 'https://obelisk-z.vercel.app/assets/obelisk-z-logo.png',
  description:
    'Infraestrutura institucional para operação segura no ecossistema ZETTA.',
  sameAs: ['https://github.com/zettaceo/obelisk-z']
};

export const metadata = {
  metadataBase: new URL('https://obelisk-z.vercel.app'),
  title: 'OBELISK-Z | Camada de Wallet do Ecossistema ZETTA',
  description:
    'A OBELISK-Z integra segurança, arquitetura e execução para o ecossistema ZETTA com padrão institucional premium.',
  keywords: [
    'OBELISK-Z',
    'ZETTA',
    'wallet',
    'segurança',
    'multichain',
    'infraestrutura institucional'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'OBELISK-Z',
    description:
      'Infraestrutura institucional para operação segura no ecossistema ZETTA.',
    siteName: 'OBELISK-Z',
    url: 'https://obelisk-z.vercel.app',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'OBELISK-Z'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OBELISK-Z',
    description:
      'Infraestrutura institucional para operação segura no ecossistema ZETTA.',
    images: ['/opengraph-image.png']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/assets/obelisk-z-logo.png',
    apple: '/assets/obelisk-z-logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html id="Φ" lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#06020f" />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${orbitron.variable} ${syne.variable} ${spaceMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
