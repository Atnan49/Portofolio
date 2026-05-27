import type { Metadata } from 'next';
import { Cormorant, Outfit } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atnan.my.id'),
  title: 'Atnan Septian Wijanarko — Web Developer',
  description:
    'Fullstack Web Developer from East Java, Indonesia. Building clean, purposeful web experiences.',
  keywords: [
    'Atnan Septian Wijanarko',
    'Atnan Septian',
    'Web Developer Malang',
    'Fullstack Developer Indonesia',
    'Portfolio Web Developer',
    'React Developer',
    'Next.js Developer'
  ],
  authors: [{ name: 'Atnan Septian Wijanarko', url: 'https://atnan.my.id' }],
  creator: 'Atnan Septian Wijanarko',
  openGraph: {
    title: 'Atnan Septian Wijanarko — Web Developer',
    description:
      'Fullstack Web Developer from East Java, Indonesia. Building clean, purposeful web experiences.',
    url: 'https://atnan.my.id',
    siteName: 'Atnan Septian Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Atnan Septian Wijanarko Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atnan Septian Wijanarko — Web Developer',
    description:
      'Fullstack Web Developer from East Java, Indonesia. Building clean, purposeful web experiences.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://atnan.my.id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
