const fs = require('fs');
let content = fs.readFileSync('src/components/NestlePtitStory.tsx', 'utf8');

// Main layout
content = content.replace(/backgroundColor: '#0a0a0a', color: '#f0f0f0'/g, "backgroundColor: '#fafafa', color: '#1a1a1a'");

// Chapter nav back button
content = content.replace(/background: '#b8e7f1', color: '#0a0a0a'/g, "background: '#005e9e', color: '#fff'");

// Hero section background
content = content.replace(/backgroundColor: '#0a0a0a'/g, "backgroundColor: '#005e9e'");
// Hero gradient
content = content.replace(/background: 'linear-gradient\\(to bottom, transparent, #0a0a0a\\)'/g, "background: 'linear-gradient(to bottom, transparent, #005e9e)'");

// Typography colors in Hero
content = content.replace(/color: '#b8e7f1'/g, "color: '#b8e7f1'"); // Keep light blue accent in hero

// Section 1: Context
content = content.replace(/color: '#fff', maxWidth: '900px'/g, "color: '#1a1a1a', maxWidth: '900px'");
content = content.replace(/color: '#aaa', maxWidth: '800px'/g, "color: '#555', maxWidth: '800px'");

// Section 2: Idea
content = content.replace(/color: '#fff', maxWidth: '1000px'/g, "color: '#1a1a1a', maxWidth: '1000px'");
content = content.replace(/margin: '0 auto 80px', color: '#aaa'/g, "margin: '0 auto 80px', color: '#444'");
content = content.replace(/color: '#aaa', marginBottom: '80px', maxWidth: '800px'/g, "color: '#555', marginBottom: '80px', maxWidth: '800px'");

// Section 3: Execution
content = content.replace(/color: '#fff', marginBottom: '100px'/g, "color: '#1a1a1a', marginBottom: '100px'");
content = content.replace(/color: '#fff' }\}>(1. Packaging Design)/g, "color: '#1a1a1a' }>$1");
content = content.replace(/color: '#fff' }\}>(3. Social Campaign)/g, "color: '#1a1a1a' }>$1");
content = content.replace(/color: '#fff' \}\}>\s*2. Motion Storyboard/g, "color: '#1a1a1a' }}>\\n                          2. Motion Storyboard");
content = content.replace(/background: '#050505'/g, "background: '#f0f9fa'");

// Packaging background
content = content.replace(/background: '#161616'/g, "background: '#f5f5f5'");

// Social container
content = content.replace(/background: '#161616', padding: '12px'/g, "background: '#f5f5f5', padding: '12px'");
content = content.replace(/color: '#aaa' \}>\s*\{isVi \? 'Các ấn phẩm/g, "color: '#555' }>\\n                              {isVi ? 'Các ấn phẩm");

// Outcome section (Section 4)
content = content.replace(/backgroundColor: '#050a0f'/g, "backgroundColor: '#005e9e'");

// General fix for h2 headings that were '#b8e7f1' but now need to be blue on white
content = content.replace(/color: '#b8e7f1', marginBottom: '24px' \}\}>01/g, "color: '#005e9e', marginBottom: '24px' }}>01");
content = content.replace(/color: '#b8e7f1', marginBottom: '24px' \}\}>02/g, "color: '#005e9e', marginBottom: '24px' }}>02");
content = content.replace(/color: '#b8e7f1', marginBottom: '24px' \}\}>03/g, "color: '#005e9e', marginBottom: '24px' }}>03");

// Image reveal button background
content = content.replace(/background: '#111'/g, "background: '#f5f5f5'");

fs.writeFileSync('src/components/NestlePtitStory.tsx', content);
