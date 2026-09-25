'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { chapters, projects, type Project, type Artwork } from '@/data/projects';
import ProjectGlyph from './ProjectGlyph';
import FollowMascot from './FollowMascot';
import ProjectImage from './ProjectImage';
import { useLanguage } from "./LanguageContext";
import { MotionToggle, useMotionPreference } from './MotionPreference';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { reduced } = useMotionPreference();
  return <motion.div data-reveal className={className} initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? .1 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function DirectionSequence({ project, onOpen }: { project: Project; onOpen: (image: Artwork) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference(); const { lang } = useLanguage(); const isVi = lang === "vi";
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [phase, setPhase] = useState(0);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(max-height: 680px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useMotionValueEvent(scrollYProgress, 'change', value => { if (!compact) setPhase(Math.min(2, Math.floor(value * 3))); });
  const stage = project.stages[phase];
  function jump(index: number) {
    if (compact) { setPhase(index); return; }
    if (!ref.current) return;
    const start = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + distance * ((index + .08) / 3), behavior: reduced ? 'instant' : 'smooth' });
  }
  return <section className="direction-sequence" id="direction" ref={ref} aria-label="Visual story in three chapters">
    <div className="direction-sticky">
      <div className="sequence-top mono"><span>02 / Visual story</span><span>{compact ? 'Select a chapter to explore' : 'Scroll to explore the story'} <ArrowDown size={14} /></span></div>
      <div className="direction-content content-width">
        <div className="direction-copy">
          <nav className="phase-nav" aria-label="Visual story chapters">{project.stages.map((item, index) => <button key={item.title} onClick={() => jump(index)} aria-current={phase === index ? 'step' : undefined} aria-label={`Show ${item.title}`}><span>0{index + 1}</span><i /></button>)}</nav>
          <div className="phase-copy" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={phase} initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? .08 : .23 }}>
                <p className="eyebrow">( {project.name} / 0{phase + 1} )</p>
                <h2>{isVi && stage.title_vi ? stage.title_vi : stage.title}</h2>
                <p className="body-copy">{isVi && stage.text_vi ? stage.text_vi : stage.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <figure className="direction-art">
          <button className="sequence-art-open" onClick={() => onOpen(stage.image)} aria-label={`Enlarge ${stage.title}`}><div className="art-layers">{project.stages.map((item, index) => <motion.div key={index} className="art-layer" aria-hidden={phase !== index} animate={{ opacity: phase === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : .55 }}><ProjectImage image={item.image} sizes="(max-width: 700px) 87vw, 52vw" /></motion.div>)}</div><span className="artwork-expand"><Maximize2 size={18} /></span></button>
          <figcaption className="mono"><span>0{phase + 1} / {isVi && stage.title_vi ? stage.title_vi : stage.title}</span><span>{isVi ? "Nhấn để xem chi tiết" : "Click to explore"}</span></figcaption>
        </figure>
      </div>
      <div className="sequence-progress"><motion.div style={{ scaleX: scrollYProgress }} /></div>
      <span className="sequence-number" aria-hidden="true">0{phase + 1}</span>
    </div>
  </section>;
}

export default function ProjectStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const { lang } = useLanguage();
  const isVi = lang === "vi";

  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);
  const [percent, setPercent] = useState(0);
  const [artOpen, setArtOpen] = useState<Artwork | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const [anchor, setAnchor] = useState({ x: '51vw', y: '20vh' });
  const glyphAnchors = [
    { x: '51vw', y: '20vh' }, { x: '7vw', y: '38vh' }, { x: '88vw', y: '25vh' },
    { x: '87vw', y: '63vh' }, { x: '70vw', y: '23vh' }, { x: '9vw', y: '52vh' },
  ];
  useEffect(() => {
    try { sessionStorage.setItem('portfolio-project', String(project.variant)); } catch { /* Optional memory. */ }
  }, [project.variant]);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const marker = window.innerHeight * .44;
      let current = 0;
      chapters.forEach((chapter, index) => { if ((document.getElementById(chapter.id)?.getBoundingClientRect().top ?? Infinity) <= marker) current = index; });
      setActive(current);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setPercent(Math.max(0, Math.min(100, Math.round(window.scrollY / Math.max(1, height) * 100))));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  useEffect(() => { setAnchor(glyphAnchors[active]); /* Chapter changes, not every scroll pixel. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  const goTo = useCallback((index: number) => {
    const section = document.getElementById(chapters[index].id);
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY - (index === 2 ? 0 : 76);
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'instant' : 'smooth' });
    history.replaceState(null, '', `#${chapters[index].id}`);
  }, [reduced]);
  useEffect(() => {
    if (artOpen) { dialog.current?.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previous; }; }
    dialog.current?.close();
  }, [artOpen]);

  return <main className={`story-page ${active === 4 ? 'chapter-dark' : ''}`}>
    <a className="skip-link" href="#idea">{isVi ? 'Nhảy đến nội dung' : 'Skip to project story'}</a>
    <header className="story-header">
      <Link href="/" className="wordmark" aria-label="BART home"> <img src="/assets/logo.svg" alt="BART" style={{ height: "32px", width: "auto" }} /> </Link>
      <span className="header-project mono">0{project.variant + 1} / {project.name}</span>
      <nav><Link href="/#project-index" className="all-projects-link">{isVi ? 'Tất cả dự án' : 'All projects'}</Link><Link href="/" className="header-close"><span>{isVi ? 'Về trang chủ' : 'Back to index'}</span><ArrowUpRight size={17} /></Link></nav>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />
    </header>
    <section className="story-hero" id="overview">
      <div className="hero-copy">
        <p className="eyebrow">Senior Art / {isVi ? 'Kể chuyện bằng hình ảnh' : 'Visual storytelling'} / {project.year}</p>
        <motion.h1 initial={{ y: reduced ? 0 : 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
          {project.title[0]}<br /><span className="circled-word">{project.title[1]}</span>
        </motion.h1>
        <div className="hero-intro"><button className="round-link" aria-label="Read the project story" onClick={() => goTo(1)}><ArrowDown size={24} /></button><p>{isVi && project.line_vi ? project.line_vi : project.line}</p></div>
        <div className="hero-meta mono"><span>{isVi && project.category_vi ? project.category_vi : project.category}</span><span>0{project.variant + 1} — 0{projects.length}</span></div>
      </div>
      <motion.figure className="hero-artwork" initial={{ opacity: 0, rotate: reduced ? 0 : 4, y: reduced ? 0 : 45 }} animate={{ opacity: 1, rotate: -3, y: 0 }} transition={{ duration: .9, delay: reduced ? 0 : .15, ease: [.22, 1, .36, 1] }}>
        <button onClick={() => setArtOpen(project.cover)} className="artwork-open" aria-label={`Enlarge ${project.name} artwork`}><ProjectImage image={project.cover} priority sizes="(max-width: 700px) 90vw, 48vw" /><span className="artwork-expand"><Maximize2 size={18} /></span></button>
        <figcaption className="mono">{isVi ? 'Dự án chọn lọc' : 'Selected work'} / {project.name}<ArrowUpRight size={15} /></figcaption>
      </motion.figure>
      <div className="hero-bottom mono"><span>{isVi ? 'Cuộn để khám phá ý tưởng' : 'Scroll to discover the thinking'}</span><span>BART / Portfolio 2026</span></div>
    </section>
    <div className="story-marquee" aria-hidden="true"><div>{[0, 1, 2, 3].map(i => <span key={i}>Senior Art <b>✦</b> {isVi ? 'Thiết kế hình ảnh' : 'Image making'} <b>✦</b> {isVi ? 'Kể chuyện bằng hình ảnh' : 'Visual storytelling'} <b>✦</b> {project.name} <b>✦</b> </span>)}</div></div>
    <section className="idea-section" id="idea">
      <div className="content-width idea-grid"><Reveal><p className="eyebrow">01 / {isVi ? 'Ý tưởng' : 'The idea'}</p><h2>{isVi && project.question_vi ? project.question_vi : project.question}</h2></Reveal><Reveal className="idea-body" delay={.12}><p className="large-copy">{isVi && project.idea_vi ? project.idea_vi : project.idea}</p><div className="idea-disciplines mono"><span>◆ Senior Art</span><span>◆ Composition</span><span>◆ Storytelling</span></div></Reveal></div>
    </section>
    <DirectionSequence project={project} onOpen={setArtOpen} />
    <section className="process-section" id="process">
      <div className="content-width"><div className="process-heading"><Reveal><p className="eyebrow">03 / {isVi ? 'Bộ sưu tập' : 'The collection'}</p><h2>{isVi ? 'Chi tiết' : 'The work.'}<br />{isVi ? 'tác phẩm.' : 'In full.'}</h2></Reveal><Reveal className="process-intro"><p className="large-copy">{isVi && project.category_vi ? project.category_vi : project.category}<br /><span className="gallery-instruction">{isVi ? 'Chọn hình bất kỳ để xem chi tiết.' : 'Select any image for a closer look.'}</span></p></Reveal></div>
        <div className={`project-gallery ${project.slug === 'ganh-hoi' ? 'gallery-editorial' : ''}`}>{project.gallery.map((panel, index) => <Reveal key={panel.image.src} className={`gallery-panel ${panel.layout || ''}`}>
          <figure><button className="gallery-image-button" onClick={() => setArtOpen(panel.image)} aria-label={`Enlarge ${panel.title}`}><ProjectImage image={panel.image} sizes={panel.layout === 'portrait' ? '(max-width: 700px) 87vw, 40vw' : '(max-width: 700px) 87vw, 80vw'} /><span className="artwork-expand"><Maximize2 size={18} /></span></button><figcaption><span className="mono">{String(index + 1).padStart(2, '0')}</span><div><h3>{isVi && panel.title_vi ? panel.title_vi : panel.title}</h3><p>{isVi && panel.text_vi ? panel.text_vi : panel.text}</p></div></figcaption></figure>
        </Reveal>)}</div>
      </div>
    </section>
    <section className="outcome-section" id="outcome">
      <div className="outcome-grid" aria-hidden="true" />
      <div className="content-width outcome-content"><Reveal><p className="eyebrow">04 / {isVi ? 'Kết quả' : 'The outcome'}</p><h2>{(isVi && project.statement_vi ? project.statement_vi : project.statement).split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2><p>{isVi && project.outcome_vi ? project.outcome_vi : project.outcome}</p></Reveal><div className="outcome-glyph" aria-hidden="true"><ProjectGlyph variant={project.variant} /></div></div>
      <div className="content-width outcome-footer mono"><span>{isVi && project.category_vi ? project.category_vi : project.category}</span><span>BART / {project.year}</span></div>
    </section>
    <section className="next-section" id="next-project">
      <div className="content-width"><p className="eyebrow">( {isVi ? 'Một câu chuyện khác?' : 'One more story?'} )</p><Link className="next-project-link" href={`/projects/${nextProject.slug}`}><div className="next-glyph"><ProjectGlyph variant={nextProject.variant} /></div><div><span className="mono">{isVi ? 'Tiếp theo' : 'Up next'} / 0{nextProject.variant + 1}</span><h2>{nextProject.name}</h2></div><ArrowUpRight className="next-arrow" /></Link>
        <footer className="story-footer"><Link href="/" className="wordmark"> <img src="/assets/logo.svg" alt="BART" style={{ height: "32px", width: "auto" }} /> </Link><Link href="/#project-index"><ArrowLeft size={15} /> {isVi ? 'Tất cả dự án' : 'All projects'}</Link><span className="mono">Portfolio / 2026</span></footer>
      </div>
    </section>
    <nav className="chapter-nav" aria-label="Project chapters">{chapters.map((chapter, index) => <button key={chapter.id} onClick={() => goTo(index)} aria-label={`Go to ${chapter.label}`} aria-current={active === index ? 'location' : undefined}><span>{isVi && chapter.label_vi ? chapter.label_vi : chapter.label}</span><i /></button>)}</nav>
    <motion.div className="story-guide" animate={reduced ? { x: '88vw', y: '25vh' } : { x: anchor.x, y: anchor.y }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 52, damping: 15 }}>
      <button onClick={() => goTo(Math.min(active + 1, chapters.length - 1))} aria-label={`Continue`}><span className="guide-bubble">{isVi && chapters[active].hint_vi ? chapters[active].hint_vi : chapters[active].hint}</span><span><FollowMascot anchorX={typeof anchor.x === "number" ? anchor.x : 0} /></span></button>
    </motion.div>
    <div className="story-utilities"><span className="reading-count mono">{String(percent).padStart(3, '0')} / 100</span><MotionToggle /></div>
    <dialog className="art-dialog" ref={dialog} onCancel={() => setArtOpen(null)} onClick={event => { if (event.target === event.currentTarget) setArtOpen(null); }} aria-label={`${project.name} artwork preview`}>
      <button className="dialog-close" onClick={() => setArtOpen(null)} aria-label="Close artwork preview"><X size={24} /></button>{artOpen && <><ProjectImage image={artOpen} sizes="95vw" /><div className="dialog-caption"><p className="mono">{artOpen.alt}</p><a href={artOpen.src} target="_blank" rel="noreferrer">Open full image ↗</a></div></>}
    </dialog>
  </main>;
}
