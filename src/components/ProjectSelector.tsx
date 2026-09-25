'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectGlyph from './ProjectGlyph';
import ProjectImage from './ProjectImage';
import { MotionToggle, useMotionPreference } from './MotionPreference';
import AboutSection from './AboutSection';
import { useLanguage, LanguageToggle } from './LanguageContext';

export default function ProjectSelector() {
  const [selected, setSelected] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dock = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const { lang } = useLanguage();
  const isVi = lang === 'vi';
  
  const project = projects[selected];
  useEffect(() => {
    const row = dock.current;
    const item = row?.children[selected] as HTMLElement | undefined;
    if (row && item) row.scrollTo({ left: item.offsetLeft - row.offsetLeft - (row.clientWidth - item.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
  }, [selected, reduced]);
  const select = useCallback((index: number) => {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    try { sessionStorage.setItem('portfolio-project', String(next)); } catch { /* Optional memory. */ }
  }, []);
  useEffect(() => {
    try {
      const saved = Number(sessionStorage.getItem('portfolio-project'));
      if (Number.isInteger(saved) && saved >= 0 && saved < projects.length) setSelected(saved);
    } catch { /* Optional memory. */ }
  }, []);
  useEffect(() => {
    function handleKeys(event: KeyboardEvent) {
      if (event.altKey || event.metaKey || event.ctrlKey || window.scrollY > window.innerHeight / 2) return;
      if ((event.target as HTMLElement).matches('input,textarea,select,[contenteditable=true]')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); select(selected + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); select(selected - 1); }
    }
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [select, selected]);

  return <main className="home-page">
    <a className="skip-link" href="#project-picker">{isVi ? 'Nhảy đến dự án' : 'Skip to projects'}</a>
    <section className="project-lobby" aria-label="Choose a project">
      <header className="lobby-header">
        <Link href="/" className="wordmark" aria-label="BART home"> <img src="/assets/logo.svg" alt="BART" style={{ height: "32px", width: "auto" }} /> </Link>
        <span className="header-role mono">Senior Art</span>
        <div className="header-end"><a className="about-nav-link" href="#about">{isVi ? 'Giới thiệu' : 'About me'}</a><LanguageToggle /><MotionToggle /><span className="edition mono">Portfolio / 2026</span></div>
      </header>
      <div className="lobby-heading">
        <p className="eyebrow">( {isVi ? 'Tuyển tập câu chuyện hình ảnh' : 'A collection of visual stories'} )</p>
        <h1>{isVi ? 'Nơi những' : 'This is where'}<br className="mobile-break" /> {isVi ? 'câu chuyện bắt đầu' : 'stories begin'}<span className="period">.</span></h1>
      </div>
      <div className="project-stage" onTouchStart={event => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }} onTouchEnd={event => {
        const touch = event.changedTouches[0];
        const start = touchStart.current;
        if (start && Math.abs(touch.clientX - start.x) > 42 && Math.abs(touch.clientY - start.y) < 60) {
          select(selected + (touch.clientX < start.x ? 1 : -1));
        }
        touchStart.current = null;
      }}>
        <span className="stage-coordinate mono">BART—0{selected + 1}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.slug} className="project-emblem" initial={{ opacity: 0, scale: reduced ? 1 : .8, rotate: reduced ? 0 : -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .92, rotate: reduced ? 0 : 12 }}
            transition={{ duration: reduced ? .12 : .35, ease: [.22, 1, .36, 1] }}>
            <Link className="lobby-project-preview" href={`/projects/${project.slug}`} aria-label={`View ${project.name}`} style={{ backgroundColor: project.accent }}><ProjectImage image={project.cover} priority sizes="(max-width: 700px) 65vw, 400px" /><span className="preview-glyph"><ProjectGlyph variant={project.variant} /></span></Link>
          </motion.div>
        </AnimatePresence>
        <span className="stage-caption mono">{isVi ? 'Một thế giới' : 'A world worth'}<br />{isVi ? 'đáng khám phá.' : 'looking into.'}</span>
      </div>
      <div className="selected-project" aria-live="polite" aria-atomic="true">
        <span className="project-count mono">0{selected + 1} <span>/ 0{projects.length}</span></span>
        <h2>{project.name}</h2>
        <p>{isVi && project.category_vi ? project.category_vi : project.category}</p>
      </div>
      <div className="lobby-bottom" id="project-picker">
        <div className="project-dock" role="group" aria-label="Select a project">
          <button className="dock-arrow" aria-label="Previous project" onClick={() => select(selected - 1)}><ChevronLeft size={19} /></button>
          <div className="dock-projects" ref={dock}>
            {projects.map((item, index) => <button key={item.slug} aria-label={`Select ${item.name}`} aria-pressed={selected === index}
              className={`dock-item ${selected === index ? 'is-selected' : ''}`} onClick={() => select(index)}>
              <ProjectImage image={item.cover} priority={selected === index} sizes="48px" /><span className="dock-tooltip">{item.name}</span>
            </button>)}
          </div>
          <button className="dock-arrow" aria-label="Next project" onClick={() => select(selected + 1)}><ChevronRight size={19} /></button>
          <span className="dock-divider" />
          <Link className="dock-view" href={`/projects/${project.slug}`}>{isVi ? 'Xem dự án' : 'View project'} <ArrowRight size={19} /></Link>
        </div>
        <a href="#project-index" className="index-link mono">{isVi ? 'Khám phá tất cả dự án' : 'Explore all projects'} <ArrowDown size={13} /></a>
      </div>
      <footer className="lobby-footer mono"><span>{isVi ? 'Senior Art. Một góc nhìn riêng.' : 'Senior Art. With a point of view.'}</span><span>← / → {isVi ? 'để chuyển' : 'to switch'}</span></footer>
    </section>
    <AboutSection />
    <section className="project-index" id="project-index" aria-labelledby="index-title">
      <div className="index-heading"><div><p className="eyebrow">( {isVi ? 'Tuyển tập' : 'The collection'} )</p><h2 id="index-title">{isVi ? 'Thế giới chọn lọc' : 'Selected worlds'}<span>*</span></h2></div><p className="mono demo-label">0{projects.length} {isVi ? 'câu chuyện / Một góc nhìn' : 'stories / One point of view'}</p></div>
      <div className="index-grid">{projects.map((item, index) => <Link key={item.slug} className="index-card" href={`/projects/${item.slug}`} onClick={() => select(index)}>
        <div className="index-art" style={{ backgroundColor: item.accent }}><ProjectImage image={item.cover} priority={selected === index} sizes="(max-width: 700px) 88vw, 43vw" /><span className="index-open"><ArrowUpRight size={24} /></span></div>
        <div className="index-card-info"><span className="mono">0{index + 1}</span><div><h3>{item.name}</h3><p>{isVi && item.category_vi ? item.category_vi : item.category}</p></div><ArrowUpRight size={21} /></div>
      </Link>)}</div>
      <div className="index-footer"><Link href="/" className="wordmark"> <img src="/assets/logo.svg" alt="BART" style={{ height: "32px", width: "auto" }} /> </Link><a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }); }}>{isVi ? 'Trở về đầu trang ↑' : 'Back to the beginning ↑'}</a></div>
    </section>
  </main>;
}
