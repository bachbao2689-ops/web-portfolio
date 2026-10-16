'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useMotionPreference } from './MotionPreference';

type CurtainPhase = 'idle' | 'closing' | 'opening';
type JourneyContextValue = { openProject: (slug: string) => void };
const JourneyContext = createContext<JourneyContextValue | null>(null);

export const TOUR_STORAGE_KEY = 'bart-guided-project';

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { reduced } = useMotionPreference();
  const [phase, setPhase] = useState<CurtainPhase>('idle');
  const target = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProject = useCallback((slug: string) => {
    const route = `/projects/${slug}`;
    if (timer.current) clearTimeout(timer.current);
    target.current = route;
    try {
      if (reduced) sessionStorage.removeItem(TOUR_STORAGE_KEY);
      else sessionStorage.setItem(TOUR_STORAGE_KEY, slug);
    } catch { /* Private browsing can disable storage. */ }
    if (reduced) {
      router.push(route);
      return;
    }
    setPhase('closing');
    timer.current = setTimeout(() => router.push(route), 620);
  }, [reduced, router]);

  useEffect(() => {
    if (phase !== 'closing' || pathname !== target.current) return;
    setPhase('opening');
    timer.current = setTimeout(() => setPhase('idle'), 750);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [pathname, phase]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return <JourneyContext.Provider value={{ openProject }}>
    {children}
    <motion.div className="journey-curtain" aria-hidden="true" initial={false}
      animate={{ scaleY: phase === 'closing' ? 1 : 0, opacity: phase === 'idle' ? 0 : 1 }}
      style={{ transformOrigin: phase === 'closing' ? 'bottom' : 'top', pointerEvents: phase === 'idle' ? 'none' : 'auto' }}
      transition={{ scaleY: { duration: phase === 'closing' ? .62 : .7, ease: [.76, 0, .24, 1] }, opacity: { duration: .05 } }}>
      <div className="curtain-eyes"><span /><span /></div>
      <p className="mono">BART / {phase === 'closing' ? 'Opening a new story' : 'Your story begins'}</p>
    </motion.div>
  </JourneyContext.Provider>;
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) throw new Error('useJourney must be used inside JourneyProvider');
  return context;
}
