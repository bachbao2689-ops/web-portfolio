const fs = require('fs');
let content = fs.readFileSync('src/components/NestlePtitStory.tsx', 'utf8');

const oldHints = `  const mascotHints = [
    isVi ? "Sẵn sàng chưa?" : "Ready?",
    isVi ? "Bối cảnh..." : "Context...",
    isVi ? "Ý tưởng lớn!" : "Big idea!",
    isVi ? "Thực thi thôi!" : "Execution!",
    isVi ? "Tuyệt vời!" : "Great results!",
    isVi ? "Xem tiếp nhé!" : "Up next!"
  ];`;

content = content.replace(oldHints, "");

content = content.replace(/const isVi = lang === "vi";/, `const isVi = lang === "vi";\n\n  const mascotHints = [
    isVi ? "Sẵn sàng chưa?" : "Ready?",
    isVi ? "Bối cảnh..." : "Context...",
    isVi ? "Ý tưởng lớn!" : "Big idea!",
    isVi ? "Thực thi thôi!" : "Execution!",
    isVi ? "Tuyệt vời!" : "Great results!",
    isVi ? "Xem tiếp nhé!" : "Up next!"
  ];`);

fs.writeFileSync('src/components/NestlePtitStory.tsx', content);
