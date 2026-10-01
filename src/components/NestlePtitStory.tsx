'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Maximize2, X, MousePointer2, ChevronRight, ChevronLeft } from 'lucide-react';
import { type Project, type Artwork } from '@/data/projects';
import ProjectImage from './ProjectImage';
import { useLanguage } from "./LanguageContext";
import { useMotionPreference } from './MotionPreference';
import FollowMascot from './FollowMascot';

function Reveal({ children, className = '', delay = 0, y = 40, style }: { children: React.ReactNode; className?: string; delay?: number, y?: number, style?: React.CSSProperties }) {
  const { reduced } = useMotionPreference();
  return <motion.div className={className} style={style} initial={{ opacity: 0, y: reduced ? 0 : y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? .1 : .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function NestlePtitStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [artOpen, setArtOpen] = useState<Artwork | null>(null);
  const { lang } = useLanguage(); 
  const isVi = lang === "vi";

  const contextImage = project.stages[0]?.image || project.cover;
  const ideaImage = project.stages[1]?.image || project.cover;
  const packagingImage = project.gallery[0]?.image || project.cover;
  const motionImage = project.gallery[1]?.image || project.cover;
  const socialImage = project.gallery[2]?.image || project.cover;
  const outcomeImage = project.stages[2]?.image || project.cover;

  return (
    <main className="nestle-layout" style={{ backgroundColor: '#fff', color: '#1a1a1a' }}>
      <nav className="chapter-nav" aria-label="Project navigation">
        <Link href="/#project-picker" className="nav-back" aria-label="Back to projects" style={{ background: '#005e9e', color: '#fff', border: 'none' }}><ArrowLeft size={20} /></Link>
      </nav>

      {/* Hero */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#005e9e' }}>
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.2 }}>
            <ProjectImage image={project.cover} sizes="100vw" className="nestle-hero-bg" />
        </motion.div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', width: '100%', padding: '20px' }}>
            <Reveal><p className="mono" style={{ color: '#fff', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '24px', textTransform: 'uppercase' }}>KV PRESENTATION &times; {project.year}</p></Reveal>
            <Reveal delay={0.1} y={50}>
                <h1 style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: '32px', color: '#fff', textTransform: 'uppercase' }}>
                    {project.title[0]}<br />{project.title[1]}
                </h1>
            </Reveal>
            <Reveal delay={0.2}><p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 500, maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>{isVi && project.line_vi ? project.line_vi : project.line}</p></Reveal>
        </div>
      </section>

      {/* Storyteller Layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
        
        {/* Mascot Column (Sticky) */}
        <div className="mascot-column" style={{ width: 'clamp(120px, 15vw, 250px)', position: 'sticky', top: '20vh', height: 'fit-content', padding: '40px 20px', zIndex: 10 }}>
            <div style={{ width: '100%', aspectRatio: '1/1' }}>
                <FollowMascot anchorX={500} />
            </div>
            <div className="mono" style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>
                {isVi ? 'Người kể chuyện' : 'The Storyteller'}
            </div>
        </div>

        {/* Content Column */}
        <div className="content-column" style={{ flex: 1, minWidth: '300px', padding: '0 5% 120px', borderLeft: '1px solid rgba(0,0,0,0.05)' }}>
            
            {/* 1. Bối cảnh (Context) */}
            <section style={{ paddingTop: '120px' }}>
                <Reveal>
                    <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px', fontWeight: 700 }}>01 / {isVi ? 'Bối cảnh' : 'Context'}</h2>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2, fontWeight: 800, marginBottom: '32px', color: '#1a1a1a', maxWidth: '800px' }}>
                        {isVi ? 'Tại sao lại là Nestlé P’tit?' : 'Why Nestlé P’tit?'}
                    </h3>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: '#555', maxWidth: '800px', marginBottom: '60px' }}>
                        {isVi && project.context_vi ? project.context_vi : project.context}
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <button onClick={() => setArtOpen(contextImage)} style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: 'none', padding: 0, background: '#f5f5f5', display: 'block' }}>
                        <ProjectImage image={contextImage} sizes="100vw" />
                        <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: '#fff', borderRadius: '50%', padding: '12px', color: '#005e9e' }}><Maximize2 size={20} /></span>
                    </button>
                </Reveal>
            </section>

            {/* 2. Ý tưởng (Idea) */}
            <section style={{ paddingTop: '160px' }}>
                <Reveal>
                    <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px', fontWeight: 700 }}>02 / {isVi ? 'Ý tưởng' : 'The Idea'}</h2>
                    <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.2, fontWeight: 800, marginBottom: '32px', color: '#005e9e', maxWidth: '800px' }}>
                        {isVi && project.question_vi ? project.question_vi : project.question}
                    </h3>
                    <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: '#444', marginBottom: '60px', maxWidth: '800px' }}>
                        {isVi && project.idea_vi ? project.idea_vi : project.idea}
                    </p>
                </Reveal>
                <Reveal delay={0.2}>
                    <button onClick={() => setArtOpen(ideaImage)} style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', position: 'relative', boxShadow: '0 30px 60px rgba(0,94,158,0.15)', border: 'none', padding: 0, background: '#f5f5f5', display: 'block' }}>
                        <ProjectImage image={ideaImage} sizes="100vw" />
                        <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: '#fff', borderRadius: '50%', padding: '12px', color: '#005e9e' }}><Maximize2 size={20} /></span>
                    </button>
                </Reveal>
            </section>

            {/* 3. Triển khai (Execution) */}
            <section style={{ paddingTop: '160px' }}>
                <Reveal>
                    <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px', fontWeight: 700 }}>03 / {isVi ? 'Triển khai' : 'Execution'}</h2>
                    <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, color: '#1a1a1a', marginBottom: '80px' }}>
                        {isVi ? 'Từ hình ảnh đến bao bì' : 'From image to pack'}
                    </h3>
                </Reveal>
                
                {/* 3.1 Packaging Split */}
                <div style={{ marginBottom: '160px' }}>
                    <Reveal><h4 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>1. Packaging Design</h4></Reveal>
                    <div className="packaging-split" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <Reveal delay={0.1}>
                            <p className="mono" style={{ marginBottom: '16px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>2D Design Panel</p>
                            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
                                <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${packagingImage.src}` : packagingImage.src} style={{ position: 'absolute', width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'left' }} alt="2D Panel" />
                            </div>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="mono" style={{ marginBottom: '16px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Product Mockup</p>
                            <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
                                <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${packagingImage.src}` : packagingImage.src} style={{ position: 'absolute', width: '200%', height: '100%', objectFit: 'cover', objectPosition: 'right' }} alt="Mockup" />
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* 3.2 Motion Storyboard Carousel */}
                <div style={{ marginBottom: '160px' }}>
                    <Reveal>
                        <h4 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            2. Motion Storyboard
                            <span className="mono" style={{ fontSize: '11px', color: '#005e9e', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,94,158,0.1)', padding: '6px 12px', borderRadius: '20px' }}><MousePointer2 size={12}/> Swipe / Drag</span>
                        </h4>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div style={{ width: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory', borderRadius: '24px', cursor: 'grab', background: '#111', padding: '40px 0', display: 'flex', gap: '20px' }} className="hide-scrollbar">
                            <div style={{ scrollSnapAlign: 'start', flex: '0 0 auto', width: '80vw', maxWidth: '800px', marginLeft: '5%' }}>
                                <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${motionImage.src}` : motionImage.src} style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'left' }} draggable={false} alt="Storyboard 1" />
                            </div>
                            <div style={{ scrollSnapAlign: 'start', flex: '0 0 auto', width: '80vw', maxWidth: '800px', marginRight: '5%' }}>
                                <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${motionImage.src}` : motionImage.src} style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'right', marginLeft: '-100%' }} draggable={false} alt="Storyboard 2" />
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* 3.3 Social Post (Mobile Layout) */}
                <div>
                    <Reveal><h4 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>3. Social Campaign</h4></Reveal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                        <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="phone-mockup" style={{ width: '300px', height: '600px', borderRadius: '40px', border: '12px solid #1a1a1a', backgroundColor: '#1a1a1a', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '25px', background: '#1a1a1a', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 10 }}></div>
                                <div style={{ height: '100%', width: '100%', overflowY: 'auto', backgroundColor: '#fff', scrollbarWidth: 'none' }} className="hide-scrollbar">
                                    <ProjectImage image={socialImage} sizes="300px" className="social-mobile-img" />
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: '#555' }}>
                                {isVi ? 'Các ấn phẩm mạng xã hội được thiết kế dọc tối ưu cho thiết bị di động, đảm bảo nhân vật P\'tit và sản phẩm luôn nổi bật trên news feed.' : 'Social posts were optimized for mobile vertical viewing, ensuring the P\'tit character and product pop out on the feed.'}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
      </div>

      {/* 4. Kết quả (Outcome) */}
      <section style={{ padding: '120px 5%', backgroundColor: '#005e9e', color: '#fff', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <Reveal>
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginBottom: '16px' }}>04 / {isVi ? 'Kết quả' : 'Outcome'}</h2>
                <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 900, marginBottom: '40px' }}>
                    {isVi && project.outcome_vi ? project.outcome_vi : project.outcome}
                </h3>
            </Reveal>
            <Reveal delay={0.2}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '60px 40px', borderRadius: '32px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, margin: 0, color: '#b8e7f1' }}>
                        &ldquo; {isVi && project.impact_vi ? project.impact_vi : project.impact} &rdquo;
                    </p>
                </div>
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
