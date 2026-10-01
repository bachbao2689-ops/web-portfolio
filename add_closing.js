const fs = require('fs');
let file = fs.readFileSync('src/data/projects.ts', 'utf8');

file = file.replace(/export type Project = \{([^}]+)\};/m, function(match, inner) {
    if (!inner.includes('closing: string;')) {
        return `export type Project = {${inner}  closing: [string, string]; closing_vi?: [string, string];\n};`;
    }
    return match;
});

const closings = {
    'nestle-ptit': {
        closing: "['A colorful', 'journey.']",
        closing_vi: "['Hành trình', 'đầy màu sắc.']"
    },
    'milo-erun': {
        closing: "['The race', 'continues.']",
        closing_vi: "['Đường đua', 'tiếp diễn.']"
    },
    'skinology': {
        closing: "['Pure skin,', 'pure light.']",
        closing_vi: "['Làn da', 'toả sáng.']"
    },
    'ecommerce': {
        closing: "['Cart', 'ready.']",
        closing_vi: "['Sẵn sàng', 'lên đơn.']"
    },
    'amazon': {
        closing: "['Less noise,', 'more sales.']",
        closing_vi: "['Tối giản,', 'hiệu quả.']"
    },
    'gerber': {
        closing: "['A natural', 'finish.']",
        closing_vi: "['Đúc kết', 'tự nhiên.']"
    },
    'maggi': {
        closing: "['A flavorful', 'ending.']",
        closing_vi: "['Hương vị', 'đọng lại.']"
    },
    'ganh-hoi': {
        closing: "['Tradition', 'lives on.']",
        closing_vi: "['Dấu ấn', 'lưu truyền.']"
    }
};

for (const [slug, data] of Object.entries(closings)) {
    const regex = new RegExp(`slug:\\s*'${slug}'(.*?)(?=\\s*cover:)`, 's');
    file = file.replace(regex, function(match) {
        if (!match.includes('closing:')) {
            return match + `\n    closing: ${data.closing}, closing_vi: ${data.closing_vi},`;
        }
        return match;
    });
}

fs.writeFileSync('src/data/projects.ts', file);
