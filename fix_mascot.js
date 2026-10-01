const fs = require('fs');
let content = fs.readFileSync('src/components/NestlePtitStory.tsx', 'utf8');

// 1. Add IntersectionObserver logic to track sections
const importsMatch = content.match(/import { useState, useEffect } from 'react';/);
if (importsMatch) {
    content = content.replace(/import { useState, useEffect } from 'react';/, "import { useState, useEffect, useRef } from 'react';");
}

const functionStart = "export default function NestlePtitStory({ project, nextProject }: { project: Project; nextProject: Project }) {";
const stateAdditions = `
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveSection(index);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const mascotHints = [
    isVi ? "Sẵn sàng chưa?" : "Ready?",
    isVi ? "Bối cảnh..." : "Context...",
    isVi ? "Ý tưởng lớn!" : "Big idea!",
    isVi ? "Thực thi thôi!" : "Execution!",
    isVi ? "Tuyệt vời!" : "Great results!",
    isVi ? "Xem tiếp nhé!" : "Up next!"
  ];
`;

content = content.replace(functionStart, functionStart + stateAdditions);

// 2. Add refs and data-index to sections
content = content.replace(/<section style=\{\{ height: '100vh'/g, "<section ref={el => { sectionRefs.current[0] = el; }} data-index={0} style={{ height: '100vh'");
content = content.replace(/<section style=\{\{ paddingTop: '120px' \}\}>/g, "<section ref={el => { sectionRefs.current[1] = el; }} data-index={1} style={{ paddingTop: '120px' }}>");
content = content.replace(/<section style=\{\{ paddingTop: '180px' \}\}>\s*<Reveal style=\{\{ textAlign: 'center' \}\}>/g, "<section ref={el => { sectionRefs.current[2] = el; }} data-index={2} style={{ paddingTop: '180px' }}>\n              <Reveal style={{ textAlign: 'center' }}>");
content = content.replace(/<section style=\{\{ paddingTop: '180px' \}\}>\s*<Reveal>\s*<h2 style=\{\{ fontSize: '12px'/g, "<section ref={el => { sectionRefs.current[3] = el; }} data-index={3} style={{ paddingTop: '180px' }}>\n              <Reveal>\n                  <h2 style={{ fontSize: '12px'");
content = content.replace(/<section style=\{\{ padding: '120px 5%', backgroundColor: '#005e9e'/g, "<section ref={el => { sectionRefs.current[4] = el; }} data-index={4} style={{ padding: '120px 5%', backgroundColor: '#005e9e'");
content = content.replace(/<section className="next-project"/g, "<section ref={el => { sectionRefs.current[5] = el; }} data-index={5} className=\"next-project\"");

// 3. Update the Mascot div
const mascotHTML = `
      {/* Floating Mascot */}
      <div style={{ position: 'fixed', bottom: '40px', right: '40px', width: '90px', height: '90px', zIndex: 100, pointerEvents: 'none', transition: 'all 0.5s ease' }} className="floating-mascot">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div className="guide-bubble" style={{ position: 'absolute', bottom: '110%', right: '0', background: '#1a1a1a', color: '#b8e7f1', padding: '8px 12px', borderRadius: '12px', fontSize: '12px', whiteSpace: 'nowrap', opacity: 1 }}>
                  {mascotHints[activeSection]}
                  <div style={{ content: '""', position: 'absolute', bottom: '-4px', right: '20px', width: '10px', height: '10px', background: '#1a1a1a', transform: 'rotate(45deg)' }}></div>
              </div>
              <FollowMascot anchorX={window?.innerWidth ? window.innerWidth - 40 : 500} />
          </div>
      </div>
`;

content = content.replace(/\{\/\* Floating Mascot \*\/\}.*?<\/div>/s, mascotHTML);

fs.writeFileSync('src/components/NestlePtitStory.tsx', content);
