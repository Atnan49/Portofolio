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
  title: 'Atnan Septian Wijanarko — Web Developer',
  description:
    'Fullstack Web Developer from Malang, Indonesia. Building clean, purposeful web experiences.',
  openGraph: {
    title: 'Atnan Septian Wijanarko — Web Developer',
    description:
      'Fullstack Web Developer from Malang, Indonesia. Building clean, purposeful web experiences.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
