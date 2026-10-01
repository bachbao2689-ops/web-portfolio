'use client';
import { useLanguage } from './LanguageContext';

export default function GlobalNav() {
  const { lang } = useLanguage();
  const isVi = lang === 'vi';
  
  return (
    <nav className="sticky-nav" aria-label="Global navigation">
      <a href="/">{isVi ? 'Dự án' : 'Work'}</a>
      <span>/</span>
      <a href="/#about">{isVi ? 'Giới thiệu' : 'About'}</a>
      <span>/</span>
      <a href="mailto:bachbao2608@gmail.com">{isVi ? 'Liên hệ' : 'Contact'}</a>
      <span>/</span>
      <a href="https://www.behance.net/gallery/245519605/Portfolio-2026-Bach-Bao" target="_blank" rel="noopener noreferrer">Behance</a>
    </nav>
  );
}
