'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectGlyph from './ProjectGlyph';
import ProjectImage from './ProjectImage';
import { MotionToggle, useMotionPreference } from './MotionPreference';
import AboutSection from './AboutSection';
import { useLanguage, LanguageToggle } from './LanguageContext';
import { useJourney } from './JourneyContext';
import FollowMascot from './FollowMascot';
import GuideDialog from './GuideDialog';
import { contact } from '@/data/profile';

export default function ProjectSelector() {
  const [selected, setSelected] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dock = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const { lang } = useLanguage();
  const { openProject } = useJourney();
  const isVi = lang === 'vi';
  const [guideOpen, setGuideOpen] = useState(false);
  
  const project = projects[selected];
  const projectTheme = { '--project-accent': project.accent } as CSSProperties;
  const handleProjectClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openProject(slug);
  };
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
    <section className="project-lobby" aria-label={isVi ? 'Chọn một dự án' : 'Choose a project'} style={projectTheme}>
      <header className="lobby-header">
        <Link href="/" className="wordmark" aria-label="BART home"> <img src={process.env.NODE_ENV === "production" ? "/web-portfolio/assets/logo.svg" : "/assets/logo.svg"} alt="BART" style={{ height: "32px", width: "auto" }} /> </Link>
        <span className="header-role mono">Bach Bao / Senior Art</span>
        <div className="header-end"><a className="about-nav-link" href="#project-index">{isVi ? 'Dự án' : 'Work'}</a><a className="about-nav-link" href="#about">{isVi ? 'Giới thiệu' : 'About'}</a><a className="about-nav-link contact-nav-link" href="#contact">{isVi ? 'Liên hệ' : 'Contact'}</a><LanguageToggle /><MotionToggle /></div>
      </header>
      <div className="lobby-heading">
        <p className="eyebrow">( Bach Bao / Senior Art / Portfolio 2026 )</p>
        <h1>{isVi ? 'Mỗi dự án' : 'Every project'}<br className="mobile-break" /> {isVi ? 'là một thế giới' : 'has a world'}<span className="period">.</span></h1>
        <p className="lobby-intro">{isVi ? 'Chọn một câu chuyện. BART sẽ dẫn bạn qua ý tưởng, hình ảnh và kết quả.' : 'Choose a story. BART will guide you through the idea, the visuals and the outcome.'}</p>
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
            <Link className="lobby-project-preview" href={`/projects/${project.slug}`} onClick={event => handleProjectClick(event, project.slug)} aria-label={`${isVi ? 'Bắt đầu câu chuyện' : 'Start the story'} ${project.name}`} style={{ backgroundColor: project.accent }}><ProjectImage image={project.cover} priority sizes="(max-width: 700px) 65vw, 400px" /><span className="preview-glyph"><ProjectGlyph variant={project.variant} /></span></Link>
          </motion.div>
        </AnimatePresence>
        <button type="button" className="lobby-guide" onClick={() => setGuideOpen(true)} aria-label={isVi ? 'Hỏi BART' : 'Ask BART'}><span className="lobby-guide-spark" aria-hidden="true" /><FollowMascot /><span className="lobby-guide-bubble">{isVi ? 'Chọn đi, mình dẫn đường.' : 'Pick one. I’ll guide you.'}</span></button>
        <span className="stage-caption mono">{isVi ? 'Một thế giới' : 'A world worth'}<br />{isVi ? 'đáng khám phá.' : 'looking into.'}</span>
      </div>
      <div className="selected-project" aria-live="polite" aria-atomic="true">
        <span className="project-count mono">0{selected + 1} <span>/ 0{projects.length}</span></span>
        <h2>{project.name}</h2>
        <p>{isVi && project.category_vi ? project.category_vi : project.category}</p>
        <p className="selected-question">{isVi && project.question_vi ? project.question_vi : project.question}</p>
      </div>
      <div className="lobby-bottom" id="project-picker">
        <div className="project-keyboard-hint mono" aria-hidden="true">{isVi ? 'Chọn một dự án · Vuốt hoặc dùng ← → để đổi' : 'Choose a project · Swipe or use ← → to switch'}</div>
        <div className="project-dock" role="group" aria-label={isVi ? 'Chọn dự án' : 'Select a project'}>
          <button className="dock-arrow" aria-label={isVi ? 'Dự án trước' : 'Previous project'} onClick={() => select(selected - 1)}><ChevronLeft size={19} /></button>
          <div className="dock-projects" ref={dock}>
            {projects.map((item, index) => <button key={item.slug} aria-label={`${isVi ? 'Chọn' : 'Select'} ${item.name}`} aria-pressed={selected === index}
              className={`dock-item ${selected === index ? 'is-selected' : ''}`} onClick={() => select(index)}>
              <ProjectImage image={item.cover} priority={selected === index} sizes="48px" /><span className="dock-tooltip">{item.name}</span>
            </button>)}
          </div>
          <button className="dock-arrow" aria-label={isVi ? 'Dự án tiếp theo' : 'Next project'} onClick={() => select(selected + 1)}><ChevronRight size={19} /></button>
          <span className="dock-divider" />
          <Link className="dock-view" href={`/projects/${project.slug}`} onClick={event => handleProjectClick(event, project.slug)}>{isVi ? 'Bắt đầu hành trình' : 'Start guided story'} <ArrowRight size={19} /></Link>
        </div>
        <div className="lobby-other-paths"><Link href={`/projects/${project.slug}`} className="free-view-link mono">{isVi ? 'Xem tự do' : 'Explore freely'} <ArrowUpRight size={13} /></Link><a href="#project-index" className="index-link mono">{isVi ? 'Tất cả dự án' : 'All projects'} <ArrowDown size={13} /></a></div>
      </div>
      <footer className="lobby-footer mono"><span>{isVi ? 'Senior Art. Một góc nhìn riêng.' : 'Senior Art. With a point of view.'}</span><span>← / → {isVi ? 'để chuyển' : 'to switch'}</span></footer>
    </section>
    <section className="project-index" id="project-index" aria-labelledby="index-title">
      <div className="index-heading"><div><p className="eyebrow">( {isVi ? 'Tuyển tập' : 'The collection'} )</p><h2 id="index-title">{isVi ? 'Thế giới chọn lọc' : 'Selected worlds'}<span>*</span></h2></div><p className="mono demo-label">0{projects.length} {isVi ? 'câu chuyện / Một góc nhìn' : 'stories / One point of view'}</p></div>
      <div className="index-grid">{projects.map((item, index) => <Link key={item.slug} className="index-card" href={`/projects/${item.slug}`} onClick={event => { select(index); handleProjectClick(event, item.slug); }}>
        <div className="index-art" style={{ backgroundColor: item.accent }}><ProjectImage image={item.cover} priority={selected === index} sizes="(max-width: 700px) 88vw, 43vw" /><span className="index-open"><ArrowUpRight size={24} /></span></div>
        <div className="index-card-info"><span className="mono">0{index + 1}</span><div><h3>{item.name}</h3><p>{isVi && item.category_vi ? item.category_vi : item.category}</p></div><ArrowUpRight size={21} /></div>
      </Link>)}</div>
      <div className="index-footer"><span className="mono">BART / {isVi ? '8 câu chuyện hình ảnh' : '8 visual stories'}</span><a href="#about">{isVi ? 'Gặp người đứng sau tác phẩm ↓' : 'Meet the person behind the work ↓'}</a></div>
    </section>
    <AboutSection />
    <section className="home-contact" id="contact" aria-labelledby="contact-title"><div><p className="eyebrow">( {isVi ? 'Câu chuyện tiếp theo' : 'The next story'} )</p><h2 id="contact-title">{isVi ? 'Cùng tạo nên' : 'Let’s make'}<br />{isVi ? 'điều đáng nhớ.' : 'something memorable.'}</h2><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={26} /></a></div><button type="button" className="contact-mascot" onClick={() => setGuideOpen(true)} aria-label={isVi ? 'Hỏi BART' : 'Ask BART'}><FollowMascot /><span className="mono">{isVi ? 'Nhấn để hỏi BART' : 'Click to ask BART'}</span></button><div className="contact-bottom mono"><span>© BART / 2026</span><a href={contact.behance} target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }); }}>{isVi ? 'Về đầu trang ↑' : 'Back to top ↑'}</a></div></section>
    <GuideDialog open={guideOpen} onClose={() => setGuideOpen(false)} />
  </main>;
}
