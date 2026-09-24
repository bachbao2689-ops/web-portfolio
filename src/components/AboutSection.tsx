'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import ProjectGlyph from './ProjectGlyph';
import { useMotionPreference } from './MotionPreference';

export default function AboutSection() {
  const section = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 60]);
  const reveal = { opacity: 1, y: 0 };

  return <section className="about-section" id="about" ref={section} aria-labelledby="about-title">
    <div className="about-topline"><p className="eyebrow">( A little about me )</p><span className="mono">The person behind the work <ArrowUpRight size={14} aria-hidden="true" /></span></div>
    <div className="about-grid">
      <motion.div data-reveal initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={reveal}
        viewport={{ once: true, amount: .25 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
        <h2 id="about-title">The mind<br />behind the<br /><span className="about-circled">worlds.</span></h2>
      </motion.div>
      <motion.div className="about-profile" data-reveal initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reveal}
        viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: reduced ? 0 : .12, ease: [.22, 1, .36, 1] }}>
        <div className="about-identity">
          <div><p className="mono">Hello, I’m</p><h3>{profile.name}<span aria-hidden="true">*</span></h3><p className="about-role">{profile.role}</p></div>
          <motion.div className="about-mark" aria-hidden="true" style={{ rotate: reduced ? 0 : rotate }}><ProjectGlyph variant={1} /></motion.div>
        </div>
        <p className="about-introduction">{profile.introduction}</p>
        <p className="about-approach">{profile.approach}</p>
      </motion.div>
    </div>
    <div className="about-principles" aria-label="My approach to art direction">
      {profile.principles.map((principle, index) => <motion.div className="about-principle" key={principle.title} data-reveal
        initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reveal} viewport={{ once: true, amount: .25 }}
        transition={{ duration: .55, delay: reduced ? 0 : index * .08 }}>
        <span className="mono">0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.description}</p></div>
      </motion.div>)}
    </div>
    <div className="about-bottom"><span className="mono">Idea <span aria-hidden="true">→</span> Image <span aria-hidden="true">→</span> Feeling</span><a href="#project-index">Now, into the work <span className="about-work-arrow"><ArrowDown size={20} /></span></a></div>
  </section>;
}
