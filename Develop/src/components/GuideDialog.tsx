'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { Project } from '@/data/projects';
import { contact, profile } from '@/data/profile';
import { useLanguage } from './LanguageContext';

export default function GuideDialog({ open, onClose, project }: { open: boolean; onClose: () => void; project?: Project }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [answer, setAnswer] = useState(0);
  const { lang } = useLanguage();
  const isVi = lang === 'vi';

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const prompts = project ? [
    { label: isVi ? 'Ý tưởng là gì?' : 'What is the idea?', text: isVi && project.idea_vi ? project.idea_vi : project.idea },
    { label: isVi ? 'Tác phẩm gồm những gì?' : 'What was created?', text: isVi && project.outcome_vi ? project.outcome_vi : project.outcome },
    { label: isVi ? 'Ai thực hiện?' : 'Who made it?', text: `${profile.name} · ${isVi && project.role_vi ? project.role_vi : project.role} · ${project.client}` },
  ] : [
    { label: isVi ? 'Bạch Bảo làm gì?' : 'What does BART do?', text: isVi ? profile.introduction_vi : profile.introduction },
    { label: isVi ? 'Xem tác phẩm ở đâu?' : 'Where can I see the work?', text: isVi ? 'Chọn một dự án ở đầu trang hoặc cuộn xuống bộ sưu tập gồm tám câu chuyện hình ảnh.' : 'Choose a project above or scroll to the collection of eight visual stories.' },
    { label: isVi ? 'Cách làm việc?' : 'What is the approach?', text: isVi ? profile.approach_vi : profile.approach },
  ];

  return <dialog ref={ref} className="guide-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-label={isVi ? 'Hỏi BART' : 'Ask BART'}>
    <div className="guide-dialog-header"><span className="mono">BART® / {isVi ? 'Trò chuyện nhanh' : 'Quick answers'}</span><button type="button" onClick={onClose} aria-label={isVi ? 'Đóng' : 'Close'}><X size={19} /></button></div>
    <div className="guide-dialog-body">
      <p className="eyebrow">{isVi ? 'Bạn vừa tìm thấy nút trò chuyện.' : 'You found the talk button.'}</p>
      <h2>{isVi ? 'Hỏi mình một điều.' : 'Ask me anything.'}</h2>
      <p className="guide-dialog-intro">{isVi ? 'Chọn câu hỏi bên dưới để tìm hiểu nhanh về tác phẩm và người thực hiện.' : 'Pick a question for a quick answer about the work and the person behind it.'}</p>
      <div className="guide-prompts" role="group" aria-label={isVi ? 'Câu hỏi gợi ý' : 'Suggested questions'}>
        {prompts.map((prompt, index) => <button key={prompt.label} type="button" className={answer === index ? 'is-active' : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{prompt.label}</button>)}
      </div>
      <div className="guide-answer" aria-live="polite"><span className="mono">BART / 0{answer + 1}</span><p>{prompts[answer].text}</p></div>
    </div>
    <div className="guide-dialog-actions"><a href={`mailto:${contact.email}`}>{isVi ? 'Gửi email' : 'Email me'} <ArrowUpRight size={17} /></a><a href={contact.behance} target="_blank" rel="noopener noreferrer">Behance <ArrowUpRight size={17} /></a></div>
  </dialog>;
}
