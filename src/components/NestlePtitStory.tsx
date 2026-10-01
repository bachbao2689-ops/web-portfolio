'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2, X, ArrowDown } from 'lucide-react';
import { type Project, type Artwork } from '@/data/projects';
import ProjectImage from './ProjectImage';
import { useLanguage } from "./LanguageContext";
import { useMotionPreference } from './MotionPreference';
import FollowMascot from './FollowMascot';

function Reveal({ children, className = '', delay = 0, y = 30, style }: { children: React.ReactNode; className?: string; delay?: number, y?: number, style?: React.CSSProperties }) {
  const { reduced } = useMotionPreference();
  return <motion.div className={className} style={style} initial={{ opacity: 0, y: reduced ? 0 : y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? .1 : .7, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function NestlePtitStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [artOpen, setArtOpen] = useState<Artwork | null>(null);
  const { reduced } = useMotionPreference(); 
  const { lang } = useLanguage(); 
  const isVi = lang === "vi";

  // Placeholder logic for missing images (if any)
  const contextImage = project.stages[0]?.image || project.cover;
  const ideaImage = project.stages[1]?.image || project.cover;
  const executionImages = project.gallery || [];
  const outcomeImage = project.stages[2]?.image || project.cover;

  return (
    <main className="nestle-layout" style={{ backgroundColor: '#fafafa', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav className="chapter-nav" aria-label="Project navigation">
        <Link href="/#project-picker" className="nav-back" aria-label="Back to projects"><ArrowLeft size={20} /></Link>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.15 }}>
            <ProjectImage image={project.cover} sizes="100vw" className="nestle-hero-bg" />
        </motion.div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', width: '100%' }}>
            <Reveal><p className="mono" style={{ color: project.accent, fontWeight: 'bold', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>{project.client} &times; {project.year}</p></Reveal>
            <Reveal delay={0.1} y={50}>
                <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '24px', color: '#005e9e' }}>
                    {project.title[0]} {project.title[1]}
                </h1>
            </Reveal>
            <Reveal delay={0.2}><p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 500, maxWidth: '600px', margin: '0 auto', color: '#333' }}>{isVi && project.line_vi ? project.line_vi : project.line}</p></Reveal>
            
            <Reveal delay={0.4}>
                <div style={{ marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '14px' }}>
                    <div style={{ padding: '8px 16px', border: '1px solid rgba(0,94,158,0.2)', borderRadius: '30px' }}><strong>Role:</strong> {isVi && project.role_vi ? project.role_vi : project.role}</div>
                    <div style={{ padding: '8px 16px', border: '1px solid rgba(0,94,158,0.2)', borderRadius: '30px' }}><strong>Category:</strong> {isVi && project.category_vi ? project.category_vi : project.category}</div>
                </div>
            </Reveal>
        </div>
      </section>

      {/* 1. Bối cảnh (Context) */}
      <section style={{ padding: '100px 5%', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
            <Reveal>
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>01 / {isVi ? 'Bối cảnh' : 'Context'}</h2>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, fontWeight: 700, marginBottom: '24px', color: '#1a1a1a' }}>
                    {isVi ? 'Tại sao lại là Nestlé P’tit?' : 'Why Nestlé P’tit?'}
                </h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#555' }}>
                    {isVi && project.context_vi ? project.context_vi : project.context}
                </p>
            </Reveal>
            <Reveal delay={0.2} className="nestle-image-wrapper">
                <button onClick={() => setArtOpen(contextImage)} style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                    <ProjectImage image={contextImage} sizes="(max-width: 700px) 100vw, 50vw" />
                    <span style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#fff', borderRadius: '50%', padding: '8px', color: '#005e9e' }}><Maximize2 size={16} /></span>
                </button>
            </Reveal>
        </div>
      </section>

      {/* 2. Ý tưởng (Idea) */}
      <section style={{ padding: '120px 5%', backgroundColor: '#f0f9fa' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '16px' }}>02 / {isVi ? 'Ý tưởng' : 'The Idea'}</h2>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.2, fontWeight: 700, marginBottom: '32px', color: '#005e9e' }}>
                    {isVi && project.question_vi ? project.question_vi : project.question}
                </h3>
                <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: '#444', marginBottom: '60px' }}>
                    {isVi && project.idea_vi ? project.idea_vi : project.idea}
                </p>
            </Reveal>
        </div>
        <Reveal delay={0.2} style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <button onClick={() => setArtOpen(ideaImage)} style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 30px 60px rgba(0,94,158,0.15)' }}>
                <ProjectImage image={ideaImage} sizes="100vw" />
                <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: '#fff', borderRadius: '50%', padding: '12px', color: '#005e9e' }}><Maximize2 size={20} /></span>
            </button>
        </Reveal>
      </section>

      {/* 3. Triển khai (Execution) */}
      <section style={{ padding: '100px 5%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Reveal>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>03 / {isVi ? 'Triển khai' : 'Execution'}</h2>
                    <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 700, color: '#1a1a1a' }}>
                        {isVi ? 'Từ hình ảnh đến bao bì' : 'From image to pack'}
                    </h3>
                </div>
            </Reveal>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                {executionImages.map((panel, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: idx % 2 === 0 ? '1fr 1.5fr' : '1.5fr 1fr', gap: '40px', alignItems: 'center' }}>
                        <Reveal className={idx % 2 === 0 ? 'order-1' : 'order-2'}>
                            <h4 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>{isVi && panel.title_vi ? panel.title_vi : panel.title}</h4>
                            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6 }}>{isVi && panel.text_vi ? panel.text_vi : panel.text}</p>
                        </Reveal>
                        <Reveal className={idx % 2 === 0 ? 'order-2' : 'order-1'} delay={0.2}>
                            <button onClick={() => setArtOpen(panel.image)} style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', position: 'relative', background: '#f5f5f5' }}>
                                <ProjectImage image={panel.image} sizes="(max-width: 700px) 100vw, 60vw" />
                                <span style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#fff', borderRadius: '50%', padding: '8px', color: '#005e9e' }}><Maximize2 size={16} /></span>
                            </button>
                        </Reveal>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. Kết quả (Outcome) */}
      <section style={{ padding: '120px 5%', backgroundColor: '#005e9e', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginBottom: '16px' }}>04 / {isVi ? 'Kết quả' : 'Outcome'}</h2>
                <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, marginBottom: '40px' }}>
                    {isVi && project.outcome_vi ? project.outcome_vi : project.outcome}
                </h3>
            </Reveal>
            <Reveal delay={0.2}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
                        &ldquo; {isVi && project.impact_vi ? project.impact_vi : project.impact} &rdquo;
                    </p>
                </div>
            </Reveal>
            <Reveal delay={0.4}>
                <button onClick={() => setArtOpen(outcomeImage)} style={{ marginTop: '60px', width: '100%', maxWidth: '600px', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <ProjectImage image={outcomeImage} sizes="(max-width: 700px) 100vw, 600px" />
                    <span style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#fff', borderRadius: '50%', padding: '8px', color: '#005e9e' }}><Maximize2 size={16} /></span>
                </button>
            </Reveal>
        </div>
      </section>

      {/* Up Next */}
      <section className="next-project" style={{ padding: '100px 5%', backgroundColor: '#111', color: '#fff' }}>
        <Reveal className="content-width">
            <Link href={`/projects/${nextProject.slug}`} className="next-link">
                <div className="next-heading"><p className="eyebrow">05 / {isVi ? 'Tiếp theo' : 'Up next'}</p><h2>{nextProject.name}</h2></div>
                <div className="next-cover"><ProjectImage image={nextProject.cover} sizes="(max-width: 700px) 90vw, 40vw" /></div>
            </Link>
        </Reveal>
        <footer className="site-footer content-width"><p className="mono">© 2026 Bui Bach Bao.</p></footer>
      </section>

      {/* Modal Dialog */}
      <dialog className="art-dialog" open={!!artOpen} onClick={e => { if (e.target === e.currentTarget) setArtOpen(null); }} style={{ display: artOpen ? 'grid' : 'none' }}>
        {artOpen && <>
            <button className="dialog-close" onClick={() => setArtOpen(null)}><X size={24} /></button>
            <ProjectImage image={artOpen} sizes="95vw" />
            <div className="dialog-caption"><p className="mono">{artOpen.alt}</p><a href={process.env.NODE_ENV === 'production' ? `/web-portfolio${artOpen.src}` : artOpen.src} target="_blank" rel="noreferrer">Open full image ↗</a></div>
        </>}
      </dialog>
    </main>
  );
}
