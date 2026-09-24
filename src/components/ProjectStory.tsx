'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { chapters, projects, type Project } from '@/data/projects';
import ProjectGlyph from './ProjectGlyph';
import StudyArtwork from './StudyArtwork';
import { MotionToggle, useMotionPreference } from './MotionPreference';
import Mascot from './Mascot';
import ShowcaseSection from './ShowcaseSection';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { reduced } = useMotionPreference();
  return <motion.div data-reveal className={className} initial={{ opacity: 0, y: reduced ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? .1 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

const phases = [
  { label: 'Composition', title: ['Find the', 'feeling.'], caption: '01 / Structure & visual hierarchy', tags: ['Scale', 'Rhythm', 'Focal point'] },
  { label: 'Color & light', title: ['Set the', 'atmosphere.'], caption: '02 / Color, contrast & mood', tags: ['Temperature', 'Contrast', 'Mood'] },
  { label: 'The final frame', title: ['Bring it', 'to life.'], caption: '03 / Detail & final composition', tags: ['Texture', 'Balance', 'Story'] },
];

function DirectionSequence({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
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
  const stage = phases[phase];
  function jump(index: number) {
    if (compact) { setPhase(index); return; }
    if (!ref.current) return;
    const start = ref.current.getBoundingClientRect().top + window.scrollY;
    const distance = ref.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + distance * ((index + .08) / 3), behavior: reduced ? 'instant' : 'smooth' });
  }
  return <section className="direction-sequence" id="direction" ref={ref} aria-label="Art direction in three stages">
    <div className="direction-sticky">
      <div className="sequence-top mono"><span>02 / Art direction</span><span>{compact ? 'Select a stage to explore' : 'Scroll to develop the image'} <ArrowDown size={14} /></span></div>
      <div className="direction-content content-width">
        <div className="direction-copy">
          <nav className="phase-nav" aria-label="Art direction stages">{phases.map((item, index) => <button key={item.label} onClick={() => jump(index)} aria-current={phase === index ? 'step' : undefined} aria-label={`Show ${item.label}`}><span>0{index + 1}</span><i /></button>)}</nav>
          <div className="phase-copy" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={phase} initial={{ opacity: 0, y: reduced ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -10 }} transition={{ duration: reduced ? .08 : .23 }}>
                <p className="eyebrow">( {stage.label} )</p>
                <h2>{stage.title[0]}<span className="phase-title-line"> {stage.title[1]}</span></h2>
                <p className="body-copy">{project.notes[phase]}</p>
                <div className="tag-list mono">{stage.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <figure className="direction-art">
          <div className="art-layers">{phases.map((_, index) => <motion.div key={index} className="art-layer" aria-hidden={phase !== index} animate={{ opacity: phase === index ? 1 : 0 }} transition={{ duration: reduced ? 0 : .55 }}><StudyArtwork variant={project.variant} phase={index} /></motion.div>)}</div>
          <figcaption className="mono"><span>{stage.caption}</span><span>Visual study</span></figcaption>
        </figure>
      </div>
      <div className="sequence-progress"><motion.div style={{ scaleX: scrollYProgress }} /></div>
      <span className="sequence-number" aria-hidden="true">0{phase + 1}</span>
    </div>
  </section>;
}

export default function ProjectStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);
  const [percent, setPercent] = useState(0);
  const [artOpen, setArtOpen] = useState(false);
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
    <a className="skip-link" href="#idea">Skip to project story</a>
    <header className="story-header">
      <Link href="/" className="wordmark" aria-label="Bach Bao home">bachbao<span>*</span></Link>
      <span className="header-project mono">0{project.variant + 1} / {project.name}</span>
      <nav><Link href="/#project-index" className="all-projects-link">All projects</Link><Link href="/" className="header-close"><span>Back to index</span><ArrowUpRight size={17} /></Link></nav>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} />
    </header>
    <section className="story-hero" id="overview">
      <div className="hero-copy">
        <p className="eyebrow">Art direction / Visual storytelling / {project.year}</p>
        <motion.h1 initial={{ y: reduced ? 0 : 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
          {project.title[0]}<br /><span className="circled-word">{project.title[1]}</span>
        </motion.h1>
        <div className="hero-intro"><button className="round-link" aria-label="Read the project story" onClick={() => goTo(1)}><ArrowDown size={24} /></button><p>{project.line}</p></div>
        <div className="hero-meta mono"><span>Concept study</span><span>0{project.variant + 1} — 0{projects.length}</span></div>
      </div>
      <motion.figure className="hero-artwork" initial={{ opacity: 0, rotate: reduced ? 0 : 4, y: reduced ? 0 : 45 }} animate={{ opacity: 1, rotate: -3, y: 0 }} transition={{ duration: .9, delay: reduced ? 0 : .15, ease: [.22, 1, .36, 1] }}>
        <button onClick={() => setArtOpen(true)} className="artwork-open" aria-label={`Enlarge ${project.name} visual study`}><StudyArtwork variant={project.variant} /><span className="artwork-expand"><Maximize2 size={18} /></span></button>
        <figcaption className="mono">A visual study / {project.name}<ArrowUpRight size={15} /></figcaption>
      </motion.figure>
      <div className="hero-bottom mono"><span>Scroll to discover the thinking</span><span>Layout prototype · Illustrative artwork</span></div>
    </section>
    <div className="story-marquee" aria-hidden="true"><div>{[0, 1, 2, 3].map(i => <span key={i}>Art direction <b>✦</b> Worldbuilding <b>✦</b> Visual storytelling <b>✦</b> {project.name} <b>✦</b> </span>)}</div></div>
    <section className="idea-section" id="idea">
      <div className="content-width idea-grid"><Reveal><p className="eyebrow">01 / The idea</p><h2>{project.question}</h2></Reveal><Reveal className="idea-body" delay={.12}><p className="large-copy">{project.idea}</p><div className="idea-disciplines mono"><span>◆ Art direction</span><span>◆ Composition</span><span>◆ Storytelling</span></div></Reveal></div>
    </section>
    <DirectionSequence project={project} />
    <ShowcaseSection project={project} />
    <section className="process-section" id="process">
      <div className="content-width"><div className="process-heading"><Reveal><p className="eyebrow">03 / The process</p><h2>One intention.<br />Every detail.</h2></Reveal><Reveal className="process-intro"><p className="large-copy">From the first question to the final frame. Three decisions that shape the world.</p></Reveal></div>
        <div className="process-cards">{[
          { title: 'Find the story', label: '01 · Discover', text: 'Start with a feeling, a question and a point of view. Gather references that share an intention, not just a look.' },
          { title: 'Build the language', label: '02 · Develop', text: 'Explore scale, composition and color. Test the strongest direction, then remove what does not serve it.' },
          { title: 'Make it matter', label: '03 · Refine', text: 'Bring the details together. Every shape, every shadow and every pause should support the same story.' },
        ].map((card, index) => <Reveal delay={index * .08} key={card.label} className="process-card"><p className="mono">{card.label}</p><h3>{card.title}<ArrowUpRight size={22} aria-hidden="true" /></h3><p>{card.text}</p></Reveal>)}</div>
        <p className="process-footnote mono">The image is the result. The thinking is the work.</p>
      </div>
    </section>
    <section className="outcome-section" id="outcome">
      <div className="outcome-grid" aria-hidden="true" />
      <div className="content-width outcome-content"><Reveal><p className="eyebrow">04 / The outcome</p><h2>{project.statement.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2><p>A world with a point of view.<br />An image that stays with you.</p></Reveal><div className="outcome-glyph" aria-hidden="true"><ProjectGlyph variant={project.variant} /></div></div>
      <div className="content-width outcome-footer mono"><span>{project.category}</span><span>Bach Bao / {project.year}</span></div>
    </section>
    <section className="next-section" id="next-project">
      <div className="content-width"><p className="eyebrow">( One more story? )</p><Link className="next-project-link" href={`/projects/${nextProject.slug}`}><div className="next-glyph"><ProjectGlyph variant={nextProject.variant} /></div><div><span className="mono">Up next / 0{nextProject.variant + 1}</span><h2>{nextProject.name}</h2></div><ArrowUpRight className="next-arrow" /></Link>
        <footer className="story-footer"><Link href="/" className="wordmark">bachbao*</Link><Link href="/#project-index"><ArrowLeft size={15} /> All projects</Link><span className="mono">Portfolio / 2026</span></footer>
      </div>
    </section>
    <nav className="chapter-nav" aria-label="Project chapters">{chapters.map((chapter, index) => <button key={chapter.id} onClick={() => goTo(index)} aria-label={`Go to ${chapter.label}`} aria-current={active === index ? 'location' : undefined}><span>{chapter.label}</span><i /></button>)}</nav>
    <motion.div className="story-guide" animate={reduced ? { x: '88vw', y: '25vh' } : { x: anchor.x, y: anchor.y }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 52, damping: 15 }}>
      <button onClick={() => goTo(Math.min(active + 1, chapters.length - 1))} aria-label={`Continue to ${chapters[Math.min(active + 1, chapters.length - 1)].label}`}><span className="guide-bubble">{chapters[active].hint}</span><motion.span style={{ rotate: reduced ? 0 : rotate }}><Mascot variant={project.variant} className="w-[50px] h-[50px] text-slate-900" /></motion.span></button>
    </motion.div>
    <div className="story-utilities"><span className="reading-count mono">{String(percent).padStart(3, '0')} / 100</span><MotionToggle /></div>
    <dialog className="art-dialog" ref={dialog} onCancel={() => setArtOpen(false)} onClick={event => { if (event.target === event.currentTarget) setArtOpen(false); }} aria-label={`${project.name} artwork preview`}>
      <button className="dialog-close" onClick={() => setArtOpen(false)} aria-label="Close artwork preview"><X size={24} /></button><StudyArtwork variant={project.variant} /><p className="mono">Illustrative artwork · {project.name}</p>
    </dialog>
  </main>;
}
