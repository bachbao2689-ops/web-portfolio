import type { Metadata } from 'next';
import { MotionPreference } from '@/components/MotionPreference';
import { LanguageProvider } from '@/components/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'BART — Senior Art', template: '%s — BART' },
  description: 'Selected worlds, visual stories and Senior Art by BART. An interactive portfolio.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><noscript><style>{`[data-reveal], .hero-artwork, .hero-copy h1 { opacity: 1 !important; transform: none !important; }`}</style></noscript><LanguageProvider><MotionPreference>{children}</MotionPreference></LanguageProvider></body></html>;
}
