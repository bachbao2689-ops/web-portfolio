'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectGlyph from './ProjectGlyph';
import StudyArtwork from './StudyArtwork';
import { MotionToggle, useMotionPreference } from './MotionPreference';
import AboutSection from './AboutSection';

export default function ProjectSelector() {
  const [selected, setSelected] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const { reduced } = useMotionPreference();
  const project = projects[selected];
  const select = useCallback((index: number) => {
    const len = projects.length;
    const next = ((index % len) + len) % len;
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
    <a className="skip-link" href="#project-picker">Skip to projects</a>
    <section className="project-lobby" aria-label="Choose a project">
      <header className="lobby-header">
        <Link href="/" className="wordmark" aria-label="Bach Bao home">bachbao<span>*</span></Link>
        <span className="header-role mono">Independent Art Director</span>
        <div className="header-end"><a className="about-nav-link" href="#about">About me</a><MotionToggle /><span className="edition mono">Portfolio / 2026</span></div>
      </header>
      <div className="lobby-heading">
        <p className="eyebrow">( A collection of visual stories )</p>
        <h1>This is where<br className="mobile-break" /> stories begin<span className="period">.</span></h1>
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
        <span className="stage-coordinate mono">BB—0{selected + 1}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.slug} className="project-emblem" initial={{ opacity: 0, scale: reduced ? 1 : .8, rotate: reduced ? 0 : -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .92, rotate: reduced ? 0 : 12 }}
            transition={{ duration: reduced ? .12 : .35, ease: [.22, 1, .36, 1] }}>
            <div className="emblem-orbit" /><div className="emblem-glyph"><ProjectGlyph variant={project.variant} /></div>
          </motion.div>
        </AnimatePresence>
        <span className="stage-caption mono">A world worth<br />looking into.</span>
      </div>
      <div className="selected-project" aria-live="polite" aria-atomic="true">
        <span className="project-count mono">0{selected + 1} <span>/ 0{projects.length}</span></span>
        <h2>{project.name}</h2>
        <p>{project.category}</p>
      </div>
      <div className="lobby-bottom" id="project-picker">
        <div className="project-dock" role="group" aria-label="Select a project">
          <button className="dock-arrow" aria-label="Previous project" onClick={() => select(selected - 1)}><ChevronLeft size={19} /></button>
          <div className="dock-projects">
            {projects.map((item, index) => <button key={item.slug} aria-label={`Select ${item.name}`} aria-pressed={selected === index}
              className={`dock-item ${selected === index ? 'is-selected' : ''}`} onClick={() => select(index)}>
              <ProjectGlyph variant={item.variant} /><span className="dock-tooltip">{item.name}</span>
            </button>)}
          </div>
          <button className="dock-arrow" aria-label="Next project" onClick={() => select(selected + 1)}><ChevronRight size={19} /></button>
          <span className="dock-divider" />
          <Link className="dock-view" href={`/projects/${project.slug}`}>View project <ArrowRight size={19} /></Link>
        </div>
        <a href="#project-index" className="index-link mono">Explore all projects <ArrowDown size={13} /></a>
      </div>
      <footer className="lobby-footer mono"><span>Art direction. With a point of view.</span><span>← / → to switch</span></footer>
    </section>
    <AboutSection />
    <section className="project-index" id="project-index" aria-labelledby="index-title">
      <div className="index-heading"><div><p className="eyebrow">( The collection )</p><h2 id="index-title">Selected worlds<span>*</span></h2></div><p className="mono demo-label">Layout studies · Demo content</p></div>
      <div className="index-grid">{projects.map((item, index) => <Link key={item.slug} className="index-card" href={`/projects/${item.slug}`} onClick={() => select(index)}>
        <div className="index-art"><StudyArtwork variant={item.variant} /><span className="index-open"><ArrowUpRight size={24} /></span></div>
        <div className="index-card-info"><span className="mono">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.category}</p></div><ArrowUpRight size={21} /></div>
      </Link>)}</div>
      <div className="index-footer"><Link href="/" className="wordmark">bachbao*</Link><a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }); }}>Back to the beginning ↑</a></div>
    </section>
  </main>;
}
