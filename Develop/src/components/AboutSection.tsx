'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile, contact } from '@/data/profile';
import { assetPath } from '@/lib/assetPath';
import { useMotionPreference } from './MotionPreference';
import { useLanguage } from './LanguageContext';

export default function AboutSection() {
  const { reduced } = useMotionPreference();
  const { lang } = useLanguage();
  const isVi = lang === 'vi';
  const reveal = { opacity: 1, y: 0 };

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-topline">
        <p className="eyebrow">( {isVi ? 'Đôi nét về tôi' : 'A little about me'} )</p>
        <span className="mono">
          {isVi ? 'Người đứng sau tác phẩm' : 'The person behind the work'} <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
      <div className="about-grid">
        <motion.div
          data-reveal
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={reveal}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="about-title">
            {isVi ? 'Tâm trí' : 'The mind'}
            <br />
            {isVi ? 'tạo nên' : 'behind the'}
            <br />
            <span className="about-circled">{isVi ? 'thế giới.' : 'worlds.'}</span>
          </h2>
        </motion.div>
        <motion.div
          className="about-profile"
          data-reveal
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reveal}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-identity">
            <div className="about-identity-text">
              <p className="mono">{isVi ? 'Xin chào, tôi là' : 'Hello, I’m'}</p>
              <h3>
                {profile.name}
                <span aria-hidden="true">*</span>
              </h3>
              <p className="about-role">{profile.role}</p>
            </div>
            <motion.div
              className="about-mark"
              aria-hidden="true"
              whileHover={reduced ? {} : { rotate: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="about-mark-img" src={assetPath('/assets/chibi.svg')} alt="Bach Bao Avatar" />
            </motion.div>
          </div>
          <p className="about-introduction">{isVi && profile.introduction_vi ? profile.introduction_vi : profile.introduction}</p>
          <p className="about-approach">{isVi && profile.approach_vi ? profile.approach_vi : profile.approach}</p>
          <div className="about-contact">
            <div className="about-contact-item">
              <p className="mono about-contact-label">{isVi ? 'Liên hệ' : 'Contact'}</p>
              <a className="about-contact-link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div className="about-contact-item">
              <p className="mono about-contact-label">{isVi ? 'Mạng xã hội' : 'Social'}</p>
              <a className="about-contact-link is-underlined" href={contact.behance} target="_blank" rel="noopener noreferrer">
                Behance ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="about-principles" aria-label="My approach to Senior Art">
        {profile.principles.map((principle, index) => (
          <motion.div
            className="about-principle"
            key={principle.title}
            data-reveal
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.08 }}
          >
            <span className="mono">0{index + 1}</span>
            <div className="about-principle-copy">
              <h3>{isVi && principle.title_vi ? principle.title_vi : principle.title}</h3>
              <p>{isVi && principle.description_vi ? principle.description_vi : principle.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="about-bottom">
        <span className="mono">
          {isVi ? 'Ý tưởng' : 'Idea'} <span aria-hidden="true">→</span> {isVi ? 'Hình ảnh' : 'Image'} <span aria-hidden="true">→</span>{' '}
          {isVi ? 'Cảm xúc' : 'Feeling'}
        </span>
        <a href="#contact">
          {isVi ? 'Cùng tạo câu chuyện tiếp theo' : 'Let’s make the next story'}{' '}
          <span className="about-work-arrow">
            <ArrowDown size={20} />
          </span>
        </a>
      </div>
    </section>
  );
}
