const fs = require('fs');
let content = fs.readFileSync('src/components/NestlePtitStory.tsx', 'utf8');

content = content.replace(/color: '#1a1a1a' }>1\. Packaging Design/g, "color: '#1a1a1a' }}>1. Packaging Design");
content = content.replace(/color: '#1a1a1a' }>3\. Social Campaign/g, "color: '#1a1a1a' }}>3. Social Campaign");

fs.writeFileSync('src/components/NestlePtitStory.tsx', content);
