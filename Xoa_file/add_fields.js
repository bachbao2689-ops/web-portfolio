const fs = require('fs');
let file = fs.readFileSync('src/data/projects.ts', 'utf8');

file = file.replace(/export type Project = \{([^}]+)\};/m, function(match, inner) {
    if (!inner.includes('client: string;')) {
        return `export type Project = {${inner}  client: string; role: string; role_vi?: string; impact: string; impact_vi?: string;\n};`;
    }
    return match;
});

const projectsAdditions = {
    'nestle-ptit': {
        client: "'Nestlé Vietnam'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Achieved 2 million engagements in the first week of launch.'",
        impact_vi: "'Đạt 2 triệu lượt tương tác trong tuần đầu tiên ra mắt.'"
    },
    'milo-erun': {
        client: "'MILO Vietnam'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Increased event registrations by 35% compared to the previous year.'",
        impact_vi: "'Tăng 35% số lượng đăng ký tham gia sự kiện so với năm trước.'"
    },
    'skinology': {
        client: "'Skinology'",
        role: "'Art Director & Photographer'",
        role_vi: "'Giám đốc Nghệ thuật & Nhiếp ảnh'",
        impact: "'Elevated brand perception, resulting in a 40% boost in pre-orders.'",
        impact_vi: "'Nâng tầm hình ảnh thương hiệu, giúp tăng 40% lượng đặt hàng trước.'"
    },
    'ecommerce': {
        client: "'Various Brands (TAT Ecommerce)'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Improved conversion rate by 25% across 5 major product lines.'",
        impact_vi: "'Cải thiện 25% tỷ lệ chuyển đổi chốt sale trên 5 dòng sản phẩm chính.'"
    },
    'amazon': {
        client: "'Amazon Store Sellers'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Generated a 50% increase in click-through rates on product listings.'",
        impact_vi: "'Tăng 50% tỷ lệ click-through (CTR) trên các danh mục sản phẩm.'"
    },
    'gerber': {
        client: "'Gerber'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Successfully launched the new product line to 1M+ targeted parents.'",
        impact_vi: "'Tiếp cận thành công hơn 1 triệu phụ huynh mục tiêu trong chiến dịch ra mắt.'"
    },
    'maggi': {
        client: "'Maggi Vietnam'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Drove a 30% growth in online sales through engaging food visuals.'",
        impact_vi: "'Thúc đẩy doanh số bán hàng trực tuyến tăng 30% nhờ hình ảnh ẩm thực cuốn hút.'"
    },
    'ganh-hoi': {
        client: "'Phùng Ân'",
        role: "'Art Director'",
        role_vi: "'Giám đốc Nghệ thuật'",
        impact: "'Sold out the limited edition Mid-Autumn gift sets within 3 weeks.'",
        impact_vi: "'Cháy hàng toàn bộ bộ quà tặng Trung Thu phiên bản giới hạn trong 3 tuần.'"
    }
};

for (const [slug, data] of Object.entries(projectsAdditions)) {
    const regex = new RegExp(`slug:\\s*'${slug}'(.*?)(?=\\s*cover:)`, 's');
    file = file.replace(regex, function(match, inner) {
        if (!match.includes('client:')) {
            const additions = `\n    client: ${data.client}, role: ${data.role}, role_vi: ${data.role_vi},\n    impact: ${data.impact}, impact_vi: ${data.impact_vi},`;
            return match + additions;
        }
        return match;
    });
}

fs.writeFileSync('src/data/projects.ts', file);
