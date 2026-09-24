'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';

const Preference = createContext({ reduced: false, toggle: () => {}, systemReduced: false });

export function MotionPreference({ children }: { children: React.ReactNode }) {
  const systemReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try { setPaused(localStorage.getItem('portfolio-motion') === 'off'); } catch { /* Storage is optional. */ }
  }, []);
  const reduced = Boolean(systemReduced || paused);
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'off' : 'on'; }, [reduced]);
  function toggle() {
    if (systemReduced) return;
    setPaused(value => {
      try { localStorage.setItem('portfolio-motion', value ? 'on' : 'off'); } catch { /* Private mode fallback. */ }
      return !value;
    });
  }
  return <Preference.Provider value={{ reduced, toggle, systemReduced: Boolean(systemReduced) }}>
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
  </Preference.Provider>;
}

export const useMotionPreference = () => useContext(Preference);

export function MotionToggle() {
  const { reduced, toggle, systemReduced } = useMotionPreference();
  return <button className="motion-toggle mono" onClick={toggle} aria-pressed={!reduced} disabled={systemReduced}
    title={systemReduced ? 'Reduced motion follows your device setting' : 'Turn decorative motion on or off'}>
    Motion: {reduced ? 'off' : 'on'}
  </button>;
}
