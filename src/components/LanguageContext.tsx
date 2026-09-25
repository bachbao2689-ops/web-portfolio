'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'vi';
const LanguageContext = createContext<{ lang: Language; setLang: (l: Language) => void }>({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bart-lang') as Language;
      if (saved === 'vi' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Language) => {
    setLangState(l);
    try { localStorage.setItem('bart-lang', l); } catch {}
  };
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button className="lang-toggle mono" onClick={() => setLang(lang === 'en' ? 'vi' : 'en')} aria-label="Toggle language">
      <span style={{ opacity: lang === 'en' ? 1 : 0.5 }}>EN</span> / <span style={{ opacity: lang === 'vi' ? 1 : 0.5 }}>VI</span>
    </button>
  );
}
