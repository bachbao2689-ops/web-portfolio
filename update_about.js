const fs = require('fs');
let file = fs.readFileSync('src/components/AboutSection.tsx', 'utf8');

// Import contact
file = file.replace(/import { profile } from '@\/data\/profile';/, `import { profile, contact } from '@/data/profile';`);

// Add contact info block to about-profile
const contactHtml = `        <div className="about-contact" style={{ display: 'flex', gap: '20px', marginTop: '24px', flexWrap: 'wrap', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p className="mono" style={{ color: 'var(--yellow)', opacity: 0.8, marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase' }}>{isVi ? 'Liên hệ' : 'Contact'}</p>
            <a href={\`mailto:\${contact.email}\`} style={{ display: 'inline-block', fontSize: '18px', fontWeight: 500 }}>{contact.email}</a>
          </div>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <p className="mono" style={{ color: 'var(--yellow)', opacity: 0.8, marginBottom: '8px', fontSize: '11px', textTransform: 'uppercase' }}>{isVi ? 'Mạng xã hội' : 'Social'}</p>
            <a href={contact.behance} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '18px', fontWeight: 500, textDecoration: 'underline' }}>Behance ↗</a>
          </div>
        </div>`;

file = file.replace(/<\/p>\n\s*<\/motion.div>\n\s*<\/div>/, `</p>\n${contactHtml}\n      </motion.div>\n    </div>`);

fs.writeFileSync('src/components/AboutSection.tsx', file);
