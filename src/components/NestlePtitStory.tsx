'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Maximize2, X, MousePointer2 } from 'lucide-react';
import { type Project, type Artwork } from '@/data/projects';
import ProjectImage from './ProjectImage';
import { useLanguage } from "./LanguageContext";
import { useMotionPreference } from './MotionPreference';
import FollowMascot from './FollowMascot';

function Reveal({ children, className = '', delay = 0, y = 40, style }: { children: React.ReactNode; className?: string; delay?: number, y?: number, style?: React.CSSProperties }) {
  const { reduced } = useMotionPreference();
  return <motion.div className={className} style={style} initial={{ opacity: 0, y: reduced ? 0 : y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? .1 : .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
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
    <main className="nestle-layout" style={{ backgroundColor: '#fafafa', color: '#1a1a1a', overflowX: 'hidden' }}>
      <nav className="chapter-nav" aria-label="Project navigation">
        <Link href="/#project-picker" className="nav-back" aria-label="Back to projects" style={{ background: '#005e9e', color: '#fff', border: 'none' }}><ArrowLeft size={20} /></Link>
      </nav>

      {/* Hero - Cinematic Dark Transition */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden', backgroundColor: '#005e9e' }}>
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, opacity: 0.3 }}>
            <ProjectImage image={project.cover} sizes="100vw" className="nestle-hero-bg" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50vh', background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }}></div>
        </motion.div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', width: '100%', padding: '20px' }}>
            <Reveal><p style={{ fontFamily: 'var(--font-mono)', color: '#b8e7f1', fontSize: '14px', letterSpacing: '4px', marginBottom: '24px', textTransform: 'uppercase' }}>Key Visual Presentation &times; {project.year}</p></Reveal>
            <Reveal delay={0.1} y={50}>
                {/* Playful layout for typography instead of rigid block */}
                <h1 style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.03em', marginBottom: '32px', color: '#fff', textTransform: 'uppercase', position: 'relative' }}>
                    <span style={{ display: 'block', transform: 'rotate(-2deg)' }}>{project.title[0]}</span>
                    <span style={{ display: 'block', color: '#b8e7f1', transform: 'rotate(1deg)' }}>{project.title[1]}</span>
                </h1>
            </Reveal>
            <Reveal delay={0.2}><p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 400, maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.7)' }}>{isVi && project.line_vi ? project.line_vi : project.line}</p></Reveal>
        </div>
      </section>

      {/* Floating Mascot */}
      <div style={{ position: 'fixed', bottom: '40px', right: '40px', width: '120px', height: '120px', zIndex: 100, pointerEvents: 'none' }} className="floating-mascot">
          <FollowMascot anchorX={500} />
      </div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 5% 120px' }}>
          
          {/* 1. Bối cảnh (Context) - Full-bleed Art */}
          <section style={{ paddingTop: '120px' }}>
              <Reveal>
                  <h2 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px' }}>01 / {isVi ? 'Bối cảnh' : 'Context'}</h2>
                  <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 700, marginBottom: '32px', color: '#1a1a1a', maxWidth: '900px' }}>
                      {isVi ? 'Tại sao lại là Nestlé P’tit?' : 'Why Nestlé P’tit?'}
                  </h3>
                  <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', maxWidth: '800px', marginBottom: '80px' }}>
                      {isVi && project.context_vi ? project.context_vi : project.context}
                  </p>
              </Reveal>
              <Reveal delay={0.2}>
                  <button onClick={() => setArtOpen(contextImage)} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative', border: 'none', padding: 0, background: '#f5f5f5', display: 'block' }}>
                      <ProjectImage image={contextImage} sizes="100vw" />
                      <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', padding: '12px', color: '#fff' }}><Maximize2 size={20} /></span>
                  </button>
              </Reveal>
          </section>

          {/* 2. Ý tưởng (Idea) */}
          <section style={{ paddingTop: '180px' }}>
              <Reveal style={{ textAlign: 'center' }}>
                  <h2 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px' }}>02 / {isVi ? 'Ý tưởng' : 'The Idea'}</h2>
                  <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, fontWeight: 700, marginBottom: '32px', color: '#1a1a1a', maxWidth: '1000px', margin: '0 auto 32px' }}>
                      {isVi && project.question_vi ? project.question_vi : project.question}
                  </h3>
                  <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#555', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
                      {isVi && project.idea_vi ? project.idea_vi : project.idea}
                  </p>
              </Reveal>
              <Reveal delay={0.2}>
                  <button onClick={() => setArtOpen(ideaImage)} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative', border: 'none', padding: 0, background: '#f5f5f5', display: 'block' }}>
                      <ProjectImage image={ideaImage} sizes="100vw" />
                      <span style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', borderRadius: '50%', padding: '12px', color: '#fff' }}><Maximize2 size={20} /></span>
                  </button>
              </Reveal>
          </section>

          {/* 3. Triển khai (Execution) */}
          <section style={{ paddingTop: '180px' }}>
              <Reveal>
                  <h2 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: '#005e9e', marginBottom: '24px' }}>03 / {isVi ? 'Triển khai' : 'Execution'}</h2>
                  <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, fontWeight: 700, color: '#1a1a1a', marginBottom: '100px' }}>
                      {isVi ? 'Từ hình ảnh đến bao bì' : 'From image to pack'}
                  </h3>
              </Reveal>
              
              {/* 3.1 Packaging */}
              <div style={{ marginBottom: '180px' }}>
                  <Reveal><h4 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '40px', color: '#1a1a1a' }}>1. Packaging Design</h4></Reveal>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
                      <Reveal delay={0.1}>
                          <p className="mono" style={{ marginBottom: '16px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>2D Design Panel (Upload riêng ảnh 2D vào đây sau)</p>
                          <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5' }}>
                              <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${packagingImage.src}` : packagingImage.src} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} alt="2D Panel" />
                          </div>
                      </Reveal>
                      <Reveal delay={0.3}>
                          <p className="mono" style={{ marginBottom: '16px', color: '#888', fontSize: '12px', textTransform: 'uppercase' }}>Product Mockup 3D (Upload riêng ảnh 3D vào đây sau)</p>
                          <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5' }}>
                              <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${packagingImage.src}` : packagingImage.src} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '20px' }} alt="Mockup" />
                          </div>
                      </Reveal>
                  </div>
              </div>

              {/* 3.2 Motion Storyboard Carousel */}
              <div style={{ marginBottom: '180px' }}>
                  <Reveal>
                      <h4 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#1a1a1a' }}>\n                          2. Motion Storyboard
                          <span className="mono" style={{ fontSize: '11px', color: '#0a0a0a', display: 'flex', alignItems: 'center', gap: '8px', background: '#b8e7f1', padding: '6px 12px', borderRadius: '20px' }}><MousePointer2 size={12}/> Swipe / Drag</span>
                      </h4>
                  </Reveal>
                  <Reveal delay={0.2}>
                      <div style={{ width: '100vw', marginLeft: '50%', transform: 'translateX(-50%)', overflowX: 'auto', scrollSnapType: 'x mandatory', cursor: 'grab', background: '#f0f9fa', padding: '40px 0', display: 'flex', gap: '20px' }} className="hide-scrollbar">
                          {/* We make the image huge inside a scrolling container to allow interaction */}
                          <div style={{ scrollSnapAlign: 'center', flex: '0 0 auto', width: '90vw', maxWidth: '1200px', marginLeft: '5vw' }}>
                              <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${motionImage.src}` : motionImage.src} style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'left' }} draggable={false} alt="Storyboard 1" />
                          </div>
                          <div style={{ scrollSnapAlign: 'center', flex: '0 0 auto', width: '90vw', maxWidth: '1200px', marginRight: '5vw' }}>
                              <img src={process.env.NODE_ENV === 'production' ? `/web-portfolio${motionImage.src}` : motionImage.src} style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'cover', objectPosition: 'right', marginLeft: '-100%' }} draggable={false} alt="Storyboard 2" />
                          </div>
                      </div>
                  </Reveal>
              </div>

              {/* 3.3 Social Post */}
              <div>
                  <Reveal><h4 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '40px', color: '#1a1a1a' }}>3. Social Campaign</h4></Reveal>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                      <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'center' }}>
                          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                              {/* Simple Elegant Container instead of fake CSS Phone */}
                              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', background: '#f5f5f5', padding: '12px' }}>
                                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '650px', overflowY: 'auto' }} className="hide-scrollbar">
                                      <ProjectImage image={socialImage} sizes="400px" className="social-mobile-img" />
                                  </div>
                              </div>
                              <p className="mono" style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '12px' }}>* Khi có file PNG khung điện thoại trong suốt, chèn đè (absolute) lên div này.</p>
                          </div>
                      </Reveal>
                      <Reveal delay={0.4}>
                          <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: '#aaa' }}>
                              {isVi ? "Các ấn phẩm mạng xã hội được thiết kế dọc tối ưu cho thiết bị di động, đảm bảo nhân vật P'tit và sản phẩm luôn nổi bật trên news feed." : "Social posts were optimized for mobile vertical viewing, ensuring the P'tit character and product pop out on the feed."}
                          </p>
                      </Reveal>
                  </div>
              </div>
          </section>
      </div>

      {/* 4. Kết quả (Outcome) */}
      <section style={{ padding: '120px 5%', backgroundColor: '#005e9e', color: '#fff', textAlign: 'center', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <Reveal>
                <h2 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '2px', color: '#b8e7f1', marginBottom: '24px' }}>04 / {isVi ? 'Kết quả' : 'Outcome'}</h2>
                <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 700, marginBottom: '60px' }}>
                    {isVi && project.outcome_vi ? project.outcome_vi : project.outcome}
                </h3>
            </Reveal>
            <Reveal delay={0.2}>
                <div style={{ padding: '40px 0' }}>
                    <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 400, margin: 0, color: '#fff', fontStyle: 'italic' }}>
                        &ldquo; {isVi && project.impact_vi ? project.impact_vi : project.impact} &rdquo;
                    </p>
                </div>
            </Reveal>
        </div>
      </section>

      {/* Up Next */}
      <section className="next-project" style={{ padding: '100px 5%', backgroundColor: '#000', color: '#fff' }}>
        <Reveal className="content-width">
            <Link href={`/projects/${nextProject.slug}`} className="next-link">
                <div className="next-heading"><p className="eyebrow">05 / {isVi ? 'Tiếp theo' : 'Up next'}</p><h2>{nextProject.name}</h2></div>
                <div className="next-cover"><ProjectImage image={nextProject.cover} sizes="(max-width: 700px) 90vw, 40vw" /></div>
            </Link>
        </Reveal>
        <footer className="site-footer content-width"><p className="mono">© 2026 Bui Bach Bao.</p></footer>
      </section>

      {/* Modal Dialog */}
      <dialog className="art-dialog" open={!!artOpen} onClick={e => { if (e.target === e.currentTarget) setArtOpen(null); }} style={{ display: artOpen ? 'grid' : 'none', background: 'rgba(0,0,0,0.9)' }}>
        {artOpen && <>
            <button className="dialog-close" onClick={() => setArtOpen(null)}><X size={24} color="#fff" /></button>
            <ProjectImage image={artOpen} sizes="95vw" />
            <div className="dialog-caption"><p className="mono" style={{ color: '#aaa' }}>{artOpen.alt}</p><a href={process.env.NODE_ENV === 'production' ? `/web-portfolio${artOpen.src}` : artOpen.src} target="_blank" rel="noreferrer" style={{ color: '#b8e7f1' }}>Open full image ↗</a></div>
        </>}
      </dialog>
    </main>
  );
}
