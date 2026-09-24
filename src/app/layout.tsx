import type { Metadata } from 'next';
import { MotionPreference } from '@/components/MotionPreference';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Bach Bao — Art Director', template: '%s — Bach Bao' },
  description: 'Selected worlds, visual stories and art direction by Bach Bao. An interactive portfolio.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><noscript><style>{`[data-reveal], .hero-artwork, .hero-copy h1 { opacity: 1 !important; transform: none !important; }`}</style></noscript><MotionPreference>{children}</MotionPreference></body></html>;
}
