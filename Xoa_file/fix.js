const fs = require('fs');
let content = fs.readFileSync('src/components/NestlePtitStory.tsx', 'utf8');

const oldLine = "{isVi ? 'Các ấn phẩm mạng xã hội được thiết kế dọc tối ưu cho thiết bị di động, đảm bảo nhân vật P\\'tit và sản phẩm luôn nổi bật trên news feed.' : 'Social posts were optimized for mobile vertical viewing, ensuring the P\\'tit character and product pop out on the feed.'}";
const oldLineFallback1 = `{isVi ? 'Các ấn phẩm mạng xã hội được thiết kế dọc tối ưu cho thiết bị di động, đảm bảo nhân vật P'tit và sản phẩm luôn nổi bật trên news feed.' : 'Social posts were optimized for mobile vertical viewing, ensuring the P'tit character and product pop out on the feed.'}`;

const newLine = `{isVi ? "Các ấn phẩm mạng xã hội được thiết kế dọc tối ưu cho thiết bị di động, đảm bảo nhân vật P'tit và sản phẩm luôn nổi bật trên news feed." : "Social posts were optimized for mobile vertical viewing, ensuring the P'tit character and product pop out on the feed."}`;

content = content.replace(oldLine, newLine).replace(oldLineFallback1, newLine);

fs.writeFileSync('src/components/NestlePtitStory.tsx', content);
