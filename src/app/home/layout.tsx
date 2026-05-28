import type { Metadata } from 'next';
import './homepage.css';

export const metadata: Metadata = {
  title: 'Dashboard — Home',
  description: 'Browser Homepage with smart search, weather, clock, and shortcuts.',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="homepage-root-wrapper">{children}</div>;
}
