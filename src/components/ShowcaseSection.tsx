import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';

export default function ShowcaseSection({ project }: { project: Project }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full" id="showcase">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        {/* Text Content */}
        <div className="flex flex-col items-start" data-reveal>
          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#71715d] mb-12">
            <span>01</span><span className="w-8 h-[1px] bg-black/20"></span><span className="text-black font-medium">02</span><span className="w-8 h-[1px] bg-black/20"></span><span>03</span>
          </div>
          <p className="eyebrow mb-6">( {project.category.toUpperCase()} )</p>
          <h2 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-medium tracking-tight mb-8">
            Digital<br />experiences
          </h2>
          <p className="text-xl leading-relaxed mb-8 max-w-md">
            Full products end to end — auth, billing, dashboards and the visual layer, engineered to scale from day one.
          </p>
          <ul className="space-y-4 font-mono text-xs mb-10 text-[#71715d]">
            <li className="flex items-center gap-3"><span>→</span> MVPs that survive users</li>
            <li className="flex items-center gap-3"><span>→</span> Internal tools</li>
            <li className="flex items-center gap-3"><span>→</span> Concept inside your existing product</li>
          </ul>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 text-xs font-mono uppercase tracking-widest hover:bg-black hover:text-[#fff58b] transition-colors cursor-default">
            Live in 6-10 weeks
          </div>
        </div>

        {/* Media / Demo Card */}
        <div className="relative w-full aspect-[4/3] bg-[#13140f] rounded-[32px] p-8 md:p-12 text-[#f6f4e9] shadow-2xl flex flex-col justify-center" data-reveal>
           {/* Mock UI inside the dark card */}
           <div className="w-full flex items-center justify-between mb-12 border-b border-white/10 pb-6">
              <span className="font-mono text-xs tracking-widest text-white/50">records</span>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase">
                <span className="text-white/40">synthetic</span>
                <div className="w-8 h-4 rounded-full bg-white/20 relative"><div className="absolute right-1 top-1 w-2 h-2 rounded-full bg-[#fff58b]"></div></div>
                <span className="text-[#fff58b]">live</span>
              </div>
           </div>
           
           <div className="space-y-6 w-full">
             {[
               { label: 'user_id', w1: 'w-full', w2: 'w-12', delay: '0s' },
               { label: 'amount', w1: 'w-3/4', w2: 'w-32', delay: '0.1s' },
               { label: 'email', w1: 'w-1/2', w2: 'w-48', delay: '0.2s' },
             ].map((row, i) => (
               <div key={i} className="flex items-center gap-4 w-full">
                 <span className="font-mono text-[10px] w-16 text-white/40">{row.label}</span>
                 <div className="flex-1 flex gap-2 h-3 overflow-hidden rounded-full bg-white/5">
                   <div className={`h-full ${row.w1} bg-gradient-to-r from-white/10 to-white/20 animate-pulse rounded-full`} style={{ animationDelay: row.delay }}></div>
                   <div className={`h-full ${row.w2} bg-white/5 rounded-full`}></div>
                 </div>
               </div>
             ))}
           </div>
           
           <div className="mt-auto pt-12 flex items-center gap-4 font-mono text-[10px] text-[#799573]">
             <span>✓ auth</span><span>·</span><span>billing</span><span>·</span><span>dashboards</span><span>·</span><span>wired</span>
           </div>
        </div>
      </div>
    </section>
  );
}
