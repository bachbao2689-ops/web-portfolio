const fs = require('fs');
let file = fs.readFileSync('src/data/projects.ts', 'utf8');

file = file.replace(/export type Project = \{([^}]+)\};/m, function(match, inner) {
    if (!inner.includes('context?:')) {
        return `export type Project = {${inner}  context?: string; context_vi?: string;\n};`;
    }
    return match;
});

const contextEng = "'Nestlé P’tit needed a cohesive visual language to unify its packaging, social media, and motion assets for the Vietnam market, establishing a natural, child-friendly identity.'";
const contextVi = "'Nestlé P’tit cần một ngôn ngữ hình ảnh nhất quán để đồng bộ bao bì, truyền thông mạng xã hội và các ấn phẩm chuyển động tại thị trường Việt Nam, nhằm xây dựng một định vị thương hiệu tự nhiên, gần gũi với trẻ em.'";

const regex = new RegExp(`slug:\\s*'nestle-ptit'(.*?)(?=\\s*cover:)`, 's');
file = file.replace(regex, function(match) {
    if (!match.includes('context:')) {
        return match + `\n    context: ${contextEng}, context_vi: ${contextVi},`;
    }
    return match;
});

fs.writeFileSync('src/data/projects.ts', file);
