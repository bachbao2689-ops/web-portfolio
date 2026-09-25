'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import ProjectGlyph from './ProjectGlyph';
import { useMotionPreference } from './MotionPreference';
import { useLanguage } from './LanguageContext';

export default function AboutSection() {
  const section = useRef<HTMLElement>(null);
  const { reduced } = useMotionPreference();
  const { lang } = useLanguage();
  const isVi = lang === 'vi';
  const { scrollYProgress } = useScroll({ target: section, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 60]);
  const reveal = { opacity: 1, y: 0 };

  return <section className="about-section" id="about" ref={section} aria-labelledby="about-title">
    <div className="about-topline"><p className="eyebrow">( {isVi ? 'Đôi nét về tôi' : 'A little about me'} )</p><span className="mono">{isVi ? 'Người đứng sau tác phẩm' : 'The person behind the work'} <ArrowUpRight size={14} aria-hidden="true" /></span></div>
    <div className="about-grid">
      <motion.div data-reveal initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={reveal}
        viewport={{ once: true, amount: .25 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
        <h2 id="about-title">{isVi ? 'Tâm trí' : 'The mind'}<br />{isVi ? 'tạo nên' : 'behind the'}<br /><span className="about-circled">{isVi ? 'thế giới.' : 'worlds.'}</span></h2>
      </motion.div>
      <motion.div className="about-profile" data-reveal initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reveal}
        viewport={{ once: true, amount: .2 }} transition={{ duration: .7, delay: reduced ? 0 : .12, ease: [.22, 1, .36, 1] }}>
        <div className="about-identity">
          <div><p className="mono">{isVi ? 'Xin chào, tôi là' : 'Hello, I’m'}</p><h3>{profile.name}<span aria-hidden="true">*</span></h3><p className="about-role">{profile.role}</p></div>
          <motion.div className="about-mark" aria-hidden="true" whileHover={reduced ? {} : { rotate: 20 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}><img src="/assets/chibi.svg" alt="Bach Bao Avatar" style={{ width: "100%", height: "100%", objectFit: "contain" }} /></motion.div>
        </div>
        <p className="about-introduction">{isVi && profile.introduction_vi ? profile.introduction_vi : profile.introduction}</p>
        <p className="about-approach">{isVi && profile.approach_vi ? profile.approach_vi : profile.approach}</p>
      </motion.div>
    </div>
    <div className="about-principles" aria-label="My approach to Senior Art">
      {profile.principles.map((principle, index) => <motion.div className="about-principle" key={principle.title} data-reveal
        initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reveal} viewport={{ once: true, amount: .25 }}
        transition={{ duration: .55, delay: reduced ? 0 : index * .08 }}>
        <span className="mono">0{index + 1}</span><div><h3>{isVi && principle.title_vi ? principle.title_vi : principle.title}</h3><p>{isVi && principle.description_vi ? principle.description_vi : principle.description}</p></div>
      </motion.div>)}
    </div>
    <div className="about-bottom"><span className="mono">{isVi ? 'Ý tưởng' : 'Idea'} <span aria-hidden="true">→</span> {isVi ? 'Hình ảnh' : 'Image'} <span aria-hidden="true">→</span> {isVi ? 'Cảm xúc' : 'Feeling'}</span><a href="#project-index">{isVi ? 'Bây giờ, khám phá tác phẩm' : 'Now, into the work'} <span className="about-work-arrow"><ArrowDown size={20} /></span></a></div>
  </section>;
}
