import assets from './project-assets.json';

export type Artwork = { src: string; width: number; height: number; alt: string };
export type StoryPanel = { title: string; title_vi?: string; text: string; text_vi?: string; image: Artwork; layout?: 'portrait' };
export type Project = {
  slug: string; name: string; title: [string, string]; category: string; category_vi?: string; year: string; year_vi?: string;
  variant: number; accent: string; line: string; line_vi?: string; question: string; question_vi?: string; idea: string; idea_vi?: string;
  statement: string; statement_vi?: string; outcome: string; outcome_vi?: string; cover: Artwork; stages: StoryPanel[]; gallery: StoryPanel[];
  client: string; role: string; role_vi?: string; impact: string; impact_vi?: string;
  closing: [string, string]; closing_vi?: [string, string];
  context?: string; context_vi?: string;
};
function art(key: keyof typeof assets, alt: string): Artwork { return { ...assets[key], alt }; }
function panel(title: string, text: string, key: keyof typeof assets, layout?: 'portrait', title_vi?: string, text_vi?: string): StoryPanel {
  return { title, title_vi, text, text_vi, image: art(key, title), layout };
}
// Behance order first, then additional supplied projects. Dates and personal credits are not inferred.
export const projects: Project[] = [
  {
    slug: 'nestle-ptit', name: 'Nestlé P’tit', title: ['Nestlé', 'P’tit.'], category: 'Packaging · Social · Motion', year: 'Selected work', variant: 0, accent: '#b8e7f1',
    line: 'Vị ngon con thích. Bụng lành lớn nhanh.', question: 'A small beginning. A world of discovery.', question_vi: 'Một khởi đầu nhỏ. Một thế giới khám phá.',
    idea: 'A playful visual world for Nestlé P’tit Vietnam. Natural ingredients, a bright outdoor setting and a friendly blue character bring the product story into packaging, motion storyboards and social content.', idea_vi: 'Một thế giới hình ảnh vui nhộn cho Nestlé P’tit Việt Nam. Nguyên liệu tự nhiên, khung cảnh ngoài trời tươi sáng và nhân vật màu xanh thân thiện đưa câu chuyện sản phẩm vào bao bì, kịch bản chuyển động và nội dung mạng xã hội.',
    statement: 'Small moments.\nBright beginnings.', statement_vi: 'Những khoảnh khắc nhỏ.\nKhởi đầu tươi sáng.', outcome: 'One visual language, from the pack to the social feed.', outcome_vi: 'Một ngôn ngữ hình ảnh, từ bao bì đến mạng xã hội.',
    client: 'Nestlé Vietnam', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Achieved 2 million engagements in the first week of launch.', impact_vi: 'Đạt 2 triệu lượt tương tác trong tuần đầu tiên ra mắt.',
    closing: ['A colorful', 'journey.'], closing_vi: ['Hành trình', 'đầy màu sắc.'],
    context: 'Nestlé P’tit needed a cohesive visual language to unify its packaging, social media, and motion assets for the Vietnam market, establishing a natural, child-friendly identity.', context_vi: 'Nestlé P’tit cần một ngôn ngữ hình ảnh nhất quán để đồng bộ bao bì, truyền thông mạng xã hội và các ấn phẩm chuyển động tại thị trường Việt Nam, nhằm xây dựng một định vị thương hiệu tự nhiên, gần gũi với trẻ em.',
    cover: art('nestle-ptit/cover', 'Nestlé P’tit campaign with yogurt, banana and blue character'),
    stages: [panel('The product world', 'A blue sky, a green landscape and recognisable ingredients establish a fresh, welcoming mood.', 'nestle-ptit/overview'), panel('From image to pack', 'The character, product cues and colour palette carry through to the packaging.', 'nestle-ptit/packaging'), panel('A story in frames', 'Sequential frames introduce the product before bringing the campaign message into focus.', 'nestle-ptit/motion')],
    gallery: [panel('Packaging', 'Product mockups and the unfolded packaging design, presented together.', 'nestle-ptit/packaging'), panel('Motion storyboard', 'Two sequences shown frame by frame using the supplied storyboard stills.', 'nestle-ptit/motion'), panel('Social post', 'Hero posts lead into supporting product and educational content.', 'nestle-ptit/social')],
  },
  {
    slug: 'milo-erun', name: 'MILO ERUN', title: ['MILO', 'ERUN.'], category: 'Campaign · Print · Social', year: 'Selected work', variant: 1, accent: '#168344',
    line: 'Năng động Việt Nam. Energy in every step.', question: 'Turn everyday energy into a shared movement.', question_vi: 'Biến năng lượng mỗi ngày thành chuyển động chung.',
    idea: 'MILO ERUN brings the energy of sport into a connected visual world. Young runners emerge from a phone into an outdoor landscape, linking the online running experience with real activity and shared achievement.', idea_vi: 'MILO ERUN mang năng lượng thể thao vào một thế giới hình ảnh kết nối. Những vận động viên nhí bước ra từ chiếc điện thoại vào không cảnh thiên nhiên, kết nối trải nghiệm chạy bộ trực tuyến với hoạt động thực tế và thành tích chung.',
    statement: 'Built to\nkeep moving.', statement_vi: 'Được tạo ra\nđể không ngừng tiến bước.', outcome: 'A campaign system spanning the key visual, certificates, medals and social communication.', outcome_vi: 'Hệ thống chiến dịch bao gồm hình ảnh chủ đạo, giấy chứng nhận, huy chương và truyền thông mạng xã hội.',
    client: 'MILO Vietnam', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Increased event registrations by 35% compared to the previous year.', impact_vi: 'Tăng 35% số lượng đăng ký tham gia sự kiện so với năm trước.',
    closing: ['The race', 'continues.'], closing_vi: ['Đường đua', 'tiếp diễn.'],
    cover: art('milo-erun/cover', 'MILO ERUN runners emerging from a phone into an island landscape'),
    stages: [panel('The campaign idea', 'The familiar MILO green becomes the setting for a dynamic running scene.', 'milo-erun/overview'), panel('Building the scene', 'The phone, landscape, island and photographed runners are the core visual elements.', 'milo-erun/elements'), panel('Made tangible', 'Certificates and medals carry the same identity beyond the screen.', 'milo-erun/print')],
    gallery: [panel('Visual elements', 'Landscape elements and talent photography used in the campaign composition.', 'milo-erun/elements'), panel('Certificate & medal', 'The print and event applications follow the campaign key visual.', 'milo-erun/print'), panel('Social post', 'A six-post system connects launch, rewards, event information and participation.', 'milo-erun/social')],
  },
  {
    slug: 'skinology', name: 'Skinology', title: ['Skin', 'ology.'], category: 'Photography · Styling · Storyboards', year: 'Selected work', variant: 2, accent: '#f4c58d',
    line: 'A quieter way to make a product stand out.', question: 'Let light, texture and space tell the story.',
    idea: 'Product photography for Skinology, organised around concept, product combinations and skincare routines. Clean surfaces, directional light and carefully chosen props give each product a distinct mood while keeping the collection coherent.',
    statement: 'Less noise.\nMore feeling.', outcome: 'Concept imagery, stop-motion frames, lifestyle photography and skincare sequences.',
    client: 'Skinology', role: 'Art Director & Photographer', role_vi: 'Giám đốc Nghệ thuật & Nhiếp ảnh',
    impact: 'Elevated brand perception, resulting in a 40% boost in pre-orders.', impact_vi: 'Nâng tầm hình ảnh thương hiệu, giúp tăng 40% lượng đặt hàng trước.',
    closing: ['Pure skin,', 'pure light.'], closing_vi: ['Làn da', 'toả sáng.'],
    cover: art('skinology/cover', 'Skinology skincare products styled with soft light and warm backgrounds'),
    stages: [panel('Concept & combinations', 'Native, clean and focused visual directions create different ways to tell the product story.', 'skinology/overview'), panel('Frame by frame', 'An overhead composition becomes a sequence of product and prop arrangements.', 'skinology/stopmotion'), panel('In everyday life', 'Ingredients, colour and light bring the products into a tactile setting.', 'skinology/lifestyle')],
    gallery: [panel('Stop-motion frames', 'The original sequence stays together, preserving its rhythm from left to right.', 'skinology/stopmotion'), panel('Lifestyle', 'An asymmetrical photo collage, following the arrangement in the portfolio.', 'skinology/lifestyle'), panel('Step skincare', 'A structured grid turns individual products into clear skincare routines.', 'skinology/steps')],
  },
  {
    slug: 'ecommerce', name: 'E-commerce Visuals', title: ['Digital', 'shelves.'], category: 'Key visuals · Campaign · E-commerce', year: 'Selected work', variant: 3, accent: '#68b7e5',
    line: 'Many brands. One clear visual hierarchy.', question: 'Make the message land at first glance.',
    idea: 'A collection of commerce visuals across nutrition, food and retail. Product, offer and call to action are arranged into an immediate reading order, then adapted across campaign banners, product information and mobile storefronts.',
    statement: 'See it.\nGet it.', outcome: 'Campaign key visuals and product detail systems across different brands and formats.',
    client: 'Various Brands (TAT Ecommerce)', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Improved conversion rate by 25% across 5 major product lines.', impact_vi: 'Cải thiện 25% tỷ lệ chuyển đổi chốt sale trên 5 dòng sản phẩm chính.',
    closing: ['Cart', 'ready.'], closing_vi: ['Sẵn sàng', 'lên đơn.'],
    cover: art('ecommerce/cover', 'Six colourful e-commerce campaign key visuals'),
    stages: [panel('Brand & campaign', 'Distinct brand worlds connected by a clear product-first hierarchy.', 'ecommerce/overview'), panel('Key visual systems', 'Campaign messages, product groupings and promotional accents across formats.', 'ecommerce/board-2'), panel('The mobile journey', 'Product information unfolds in a vertical sequence for mobile shopping.', 'ecommerce/board-3')],
    gallery: [panel('Brand moments', 'Nutrition and ice-cream visuals open the collection.', 'ecommerce/board-1'), panel('Campaign collection', 'Six campaign compositions retain their original two-row arrangement.', 'ecommerce/board-2'), panel('Product detail pages', 'Mobile product stories shown side by side.', 'ecommerce/board-3'), panel('Maggi commerce', 'The hero visual expands into banners, offers and voucher modules.', 'ecommerce/board-4'), panel('Product information', 'A family of product detail layouts with consistent information hierarchy.', 'ecommerce/board-5')],
  },
  {
    slug: 'amazon', name: 'Amazon Visuals', title: ['Less is', 'more.'], category: 'Product · Performance creative', year: 'Selected work', variant: 4, accent: '#b4c6be',
    line: 'A personal place for every cat.', question: 'Make comfort the first thing you see.',
    idea: 'Product visuals for a US audience, built around a “less is more” approach. Product photography leads, concise benefit messages guide the eye and a clear offer completes the composition.',
    statement: 'Clear benefits.\nQuiet confidence.', outcome: 'Six product creatives exploring comfort, play and the everyday life of cats.',
    client: 'Amazon Store Sellers', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Generated a 50% increase in click-through rates on product listings.', impact_vi: 'Tăng 50% tỷ lệ click-through (CTR) trên các danh mục sản phẩm.',
    closing: ['Less noise,', 'more sales.'], closing_vi: ['Tối giản,', 'hiệu quả.'],
    cover: art('amazon/cover', 'Six cat furniture product creatives in a two-row grid'),
    stages: [panel('Less is more', 'A compact visual system keeps the product and its purpose easy to understand.', 'amazon/detail'), panel('Product & benefit', 'A consistent grid makes variations in colour, message and setting easy to compare.', 'amazon/cover'), panel('The collection', 'Comfort, play and reassurance become distinct messages within one product family.', 'amazon/overview')],
    gallery: [panel('The complete collection', 'The six creatives retain their original order and full compositions.', 'amazon/overview')],
  },
  {
    slug: 'gerber', name: 'Gerber × P’tit', title: ['Natural', 'beginnings.'], category: 'Packaging · Launch · Social', year: 'Selected work', variant: 5, accent: '#16a4ce',
    line: 'Khởi đầu tự nhiên. Mỗi ngày khôn lớn.', question: 'Make the ingredients part of the identity.',
    idea: 'Fruit and vegetables become playful letterforms for a baby-food launch. A clear blue foundation holds the system together, while ingredient colours, hand-drawn details and milestone stickers add warmth and discovery.',
    statement: 'Naturally\nfull of life.', outcome: 'A launch identity carried through the feeding box, packaging panels and social campaign.',
    client: 'Gerber', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Successfully launched the new product line to 1M+ targeted parents.', impact_vi: 'Tiếp cận thành công hơn 1 triệu phụ huynh mục tiêu trong chiến dịch ra mắt.',
    closing: ['A natural', 'finish.'], closing_vi: ['Đúc kết', 'tự nhiên.'],
    cover: art('gerber/cover', 'Gerber and Nestlé P’tit feeding boxes with fruit letterforms'),
    stages: [panel('A natural beginning', 'Real ingredients become the starting point for a friendly visual language.', 'gerber/overview'), panel('Letters with flavour', 'Fruit and vegetable typography gives each side of the box its own character.', 'gerber/packaging'), panel('Ready for launch', 'The packaging identity extends into a family of campaign posts.', 'gerber/social')],
    gallery: [panel('Packaging system', 'Front, back and side panels together show the complete packaging system.', 'gerber/packaging'), panel('Social campaign', 'Launch messages and product combinations share the blue, cream and ingredient palette.', 'gerber/social')],
  },
  {
    slug: 'maggi', name: 'Bạn & Maggi', title: ['Bạn &', 'Maggi.'], category: 'Campaign · Food · E-commerce', year: 'Selected work', variant: 6, accent: '#f3db21',
    line: 'Cùng tạo khác biệt tích cực.', question: 'Bring the warmth of the kitchen into the frame.',
    idea: 'Maggi becomes a companion in the kitchen. A tactile background, expressive headline and bold yellow brand colour connect the main visual, commerce applications and food photography.',
    statement: 'Good food.\nShared stories.', outcome: 'A connected set of key visuals, commerce modules and food imagery.',
    client: 'Maggi Vietnam', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Drove a 30% growth in online sales through engaging food visuals.', impact_vi: 'Thúc đẩy doanh số bán hàng trực tuyến tăng 30% nhờ hình ảnh ẩm thực cuốn hút.',
    closing: ['A flavorful', 'ending.'], closing_vi: ['Hương vị', 'đọng lại.'],
    cover: art('maggi/cover', 'Bạn & Maggi key visual with sauces and plated food'),
    stages: [panel('The campaign story', 'The product range and a shared-meal setting establish the campaign message.', 'maggi/overview'), panel('Across the shelf', 'The central composition adapts into promotional banners and commerce modules.', 'maggi/social'), panel('Food in focus', 'Ingredients, hands and dishes tell the food story through photographs.', 'maggi/food-process')],
    gallery: [panel('Social & e-commerce', 'The main visual sits alongside its promotional adaptations.', 'maggi/social'), panel('From preparation…', 'A three-column sequence follows ingredients, cooking and plating.', 'maggi/food-process'), panel('…to the final plate', 'The finished dishes form a companion grid.', 'maggi/food-final'), panel('Campaign banner', 'The same visual language in a horizontal format.', 'maggi/banner'), ...[1,2,3,4].map(n => panel(`Voucher / 0${n}`, 'Offer modules from the campaign artwork.', `maggi/voucher-${n}` as keyof typeof assets))],
  },
  {
    slug: 'ganh-hoi', name: 'Gánh Hội', title: ['Gánh', 'Hội.'], category: 'Editorial · Packaging · Craft', year: 'Selected work', variant: 7, accent: '#b5b68a',
    line: 'Gánh quà Trung Thu nghệ nhân.', question: 'Carry a little tradition into the present.', question_vi: 'Mang một chút truyền thống vào hiện tại.',
    idea: 'A Mid-Autumn gift collection from Phùng Ân, told through craft, material and ritual. The editorial presents the makers, the gift objects and their details with an earthy palette and a measured photographic rhythm.', idea_vi: 'Bộ sưu tập quà Trung Thu từ Phùng Ân, được kể qua thủ công, chất liệu và nghi lễ. Bài biên tập giới thiệu những người thợ, các món quà và chi tiết của chúng bằng bảng màu đất và nhịp điệu nhiếp ảnh có chừng mực.',
    statement: 'Craft carries\na story.', statement_vi: 'Thủ công mang theo\nmột câu chuyện.', outcome: 'An editorial journey through the collection, its handmade objects and gift packaging.', outcome_vi: 'Một hành trình biên tập qua bộ sưu tập, các món đồ thủ công và bao bì quà tặng.',
    client: 'Phùng Ân', role: 'Art Director', role_vi: 'Giám đốc Nghệ thuật',
    impact: 'Sold out the limited edition Mid-Autumn gift sets within 3 weeks.', impact_vi: 'Cháy hàng toàn bộ bộ quà tặng Trung Thu phiên bản giới hạn trong 3 tuần.',
    closing: ['Tradition', 'lives on.'], closing_vi: ['Dấu ấn', 'lưu truyền.'],
    cover: art('ganh-hoi/page-1', 'Gánh Hội Mid-Autumn gift collection cover'),
    stages: [panel('The story of craft', 'The collection opens with its cultural references and the hands behind the objects.', 'ganh-hoi/page-2'), panel('Made by hand', 'A collage of making, materials and detail introduces the craft process.', 'ganh-hoi/page-4'), panel('A gift, considered', 'Photography and packaging bring the story together in a tangible object.', 'ganh-hoi/page-12')],
    gallery: [panel('Gánh Mùa', 'The first gift composition in the collection.', 'ganh-hoi/page-5', 'portrait'), panel('Gánh Hoa', 'Colour and material in the second composition.', 'ganh-hoi/page-6', 'portrait'), panel('Gánh Mật', 'A companion composition in the editorial system.', 'ganh-hoi/page-7', 'portrait'), panel('Tặng phẩm nghệ nhân', 'The handmade objects and their details.', 'ganh-hoi/page-8', 'portrait'), panel('Objects in hand', 'A photographic pause within the story.', 'ganh-hoi/page-9', 'portrait'), panel('Colour & material', 'The Hũ Xu Xê colour palette.', 'ganh-hoi/page-10', 'portrait'), panel('Trà & bánh', 'Tea and mooncakes complete the gift ritual.', 'ganh-hoi/page-11', 'portrait'), panel('The gift box', 'Packaging photography from the editorial.', 'ganh-hoi/page-12', 'portrait'), panel('Brand applications', 'The identity across tags, bags and boxes.', 'ganh-hoi/page-18', 'portrait'), panel('The handmade detail', 'A close look at the woven material.', 'ganh-hoi/page-20', 'portrait')],
  },
];
export const chapters = [
  { id: 'overview', label: 'Overview', label_vi: 'Tổng quan', hint: 'Every story starts somewhere.', hint_vi: 'Mọi câu chuyện đều có khởi đầu.' },
  { id: 'idea', label: 'The idea', label_vi: 'Ý tưởng', hint: 'Find the idea behind the image.', hint_vi: 'Tìm ý tưởng đằng sau hình ảnh.' },
  { id: 'direction', label: 'Visual story', label_vi: 'Câu chuyện', hint: 'Scroll through the visual story.', hint_vi: 'Khám phá câu chuyện hình ảnh.' },
  { id: 'process', label: 'The collection', label_vi: 'Bộ sưu tập', hint: 'Take a closer look at the work.', hint_vi: 'Nhìn gần hơn vào tác phẩm.' },
  { id: 'outcome', label: 'The outcome', label_vi: 'Kết quả', hint: 'One idea, across every touchpoint.', hint_vi: 'Một ý tưởng, xuyên suốt mọi điểm chạm.' },
  { id: 'next-project', label: 'Up next', label_vi: 'Tiếp theo', hint: 'There is another story waiting.', hint_vi: 'Một câu chuyện khác đang chờ.' },
];



// Vietnamese translations dictionary synced with all 8 projects
projects.forEach((p) => {
  const catDict: Record<string, string> = {
    "Packaging · Social · Motion": "Bao bì · Mạng xã hội · Chuyển động",
    "Campaign · Print · Social": "Chiến dịch · In ấn · Mạng xã hội",
    "Photography · Styling · Storyboards": "Nhiếp ảnh · Phong cách · Kịch bản",
    "Key visuals · Campaign · E-commerce": "Hình ảnh chủ đạo · Chiến dịch · Thương mại điện tử",
    "Product · Performance creative": "Sản phẩm · Sáng tạo hiệu suất",
    "Packaging · Launch · Social": "Bao bì · Ra mắt · Mạng xã hội",
    "Campaign · Food · E-commerce": "Chiến dịch · Ẩm thực · Thương mại điện tử",
    "Editorial · Packaging · Craft": "Biên tập · Bao bì · Thủ công",
  };
  if (catDict[p.category]) p.category_vi = catDict[p.category];

  const dictionary: Record<string, string> = {
    // Nestlé P'tit stages & gallery
    "The product world": "Thế giới sản phẩm",
    "A blue sky, a green landscape and recognisable ingredients establish a fresh, welcoming mood.": "Bầu trời xanh, khung cảnh thiên nhiên tươi mát và các nguyên liệu quen thuộc tạo nên không khí trong lành, gần gũi.",
    "From image to pack": "Từ hình ảnh đến bao bì",
    "The character, product cues and colour palette carry through to the packaging.": "Nhân vật, dấu hiệu sản phẩm và bảng màu được triển khai xuyên suốt lên bao bì.",
    "A story in frames": "Câu chuyện qua từng khung hình",
    "Sequential frames introduce the product before bringing the campaign message into focus.": "Chuỗi khung hình nối tiếp giới thiệu sản phẩm trước khi đưa thông điệp chiến dịch vào tâm điểm.",
    "Packaging": "Bao bì",
    "Product mockups and the unfolded packaging design, presented together.": "Mô hình sản phẩm và bản thiết kế trải phẳng bao bì được trình bày song song.",
    "Motion storyboard": "Kịch bản chuyển động",
    "Two sequences shown frame by frame using the supplied storyboard stills.": "Hai chuỗi kịch bản được thể hiện từng khung hình từ bộ ảnh storyboard gốc.",
    "Social post": "Bài đăng mạng xã hội",
    "Hero posts lead into supporting product and educational content.": "Các bài đăng chủ đạo dẫn dắt sang chuỗi nội dung sản phẩm và kiến thức dinh dưỡng.",

    // MILO ERUN stages & gallery
    "The campaign idea": "Ý tưởng chiến dịch",
    "The familiar MILO green becomes the setting for a dynamic running scene.": "Sắc xanh MILO quen thuộc trở thành bối cảnh cho khung cảnh chạy bộ đầy năng lượng.",
    "Building the scene": "Xây dựng bối cảnh",
    "The phone, landscape, island and photographed runners are the core visual elements.": "Chiếc điện thoại, cảnh quan thiên nhiên, hòn đảo và hình ảnh vận động viên là các thành phần thị giác cốt lõi.",
    "Made tangible": "Hiện thực hóa trải nghiệm",
    "Certificates and medals carry the same identity beyond the screen.": "Giấy chứng nhận và huy chương mang cùng hệ thống nhận diện bước ra ngoài màn hình.",
    "Visual elements": "Thành phần hình ảnh",
    "Landscape elements and talent photography used in the campaign composition.": "Các thành phần cảnh quan và ảnh chụp nhân vật dùng trong bố cục chiến dịch.",
    "Certificate & medal": "Giấy chứng nhận & huy chương",
    "The print and event applications follow the campaign key visual.": "Các ấn phẩm in ấn và vật phẩm sự kiện đồng bộ theo hình ảnh chủ đạo chiến dịch.",
    "A six-post system connects launch, rewards, event information and participation.": "Hệ thống 6 bài đăng kết nối từ giai đoạn ra mắt, giải thưởng, thông tin sự kiện đến lời kêu gọi tham gia.",

    // Skinology
    "Let light, texture and space tell the story.": "Để ánh sáng, chất liệu và khoảng thở kể câu chuyện.",
    "Product photography for Skinology, organised around concept, product combinations and skincare routines. Clean surfaces, directional light and carefully chosen props give each product a distinct mood while keeping the collection coherent.": "Nhiếp ảnh sản phẩm cho Skinology, tổ chức xoay quanh ý tưởng, sự kết hợp sản phẩm và chu trình chăm sóc da. Bề mặt tối giản, ánh sáng có chủ đích và đạo cụ tinh tế tạo sắc thái riêng cho từng sản phẩm nhưng vẫn giữ tổng thể bộ sưu tập nhất quán.",
    "Less noise.\nMore feeling.": "Ít ồn ào hơn.\nNhiều cảm xúc hơn.",
    "Concept imagery, stop-motion frames, lifestyle photography and skincare sequences.": "Hình ảnh ý tưởng, khung hình stop-motion, nhiếp ảnh đời sống và chuỗi hướng dẫn chăm sóc da.",
    "Concept & combinations": "Ý tưởng & kết hợp sản phẩm",
    "Native, clean and focused visual directions create different ways to tell the product story.": "Những định hướng thị giác tự nhiên, tối giản và tập trung tạo nên nhiều góc kể chuyện sản phẩm.",
    "Frame by frame": "Từng khung hình một",
    "An overhead composition becomes a sequence of product and prop arrangements.": "Bố cục chụp từ trên xuống trở thành chuỗi sắp đặt nhịp nhàng giữa sản phẩm và đạo cụ.",
    "In everyday life": "Trong đời sống thường ngày",
    "Ingredients, colour and light bring the products into a tactile setting.": "Nguyên liệu, màu sắc và ánh sáng đưa sản phẩm vào bối cảnh giàu xúc giác.",
    "Stop-motion frames": "Khung hình Stop-motion",
    "The original sequence stays together, preserving its rhythm from left to right.": "Chuỗi khung hình gốc được giữ trọn vẹn nhằm bảo toàn nhịp điệu từ trái sang phải.",
    "Lifestyle": "Đời sống",
    "An asymmetrical photo collage, following the arrangement in the portfolio.": "Bố cục ghép ảnh bất đối xứng bám sát sắp đặt gốc trong portfolio.",
    "Step skincare": "Chu trình chăm sóc da",
    "A structured grid turns individual products into clear skincare routines.": "Lưới bố cục rõ ràng chuyển hóa từng sản phẩm đơn lẻ thành quy trình chăm sóc da dễ theo dõi.",

    // E-commerce
    "Make the message land at first glance.": "Để thông điệp chạm tới ngay từ ánh nhìn đầu tiên.",
    "A collection of commerce visuals across nutrition, food and retail. Product, offer and call to action are arranged into an immediate reading order, then adapted across campaign banners, product information and mobile storefronts.": "Bộ sưu tập hình ảnh thương mại điện tử đa ngành từ dinh dưỡng, thực phẩm đến bán lẻ. Sản phẩm, ưu đãi và lời kêu gọi hành động được sắp xếp theo trật tự đọc tức thì, sau đó triển khai đồng bộ lên banner chiến dịch, trang thông tin sản phẩm và gian hàng di động.",
    "See it.\nGet it.": "Nhìn thấy.\nChọn ngay.",
    "Campaign key visuals and product detail systems across different brands and formats.": "Hệ thống hình ảnh chủ đạo chiến dịch và trang chi tiết sản phẩm đa thương hiệu, đa định dạng.",
    "Brand & campaign": "Thương hiệu & chiến dịch",
    "Distinct brand worlds connected by a clear product-first hierarchy.": "Các thế giới thương hiệu riêng biệt được kết nối bằng hệ thống phân cấp ưu tiên sản phẩm rõ ràng.",
    "Key visual systems": "Hệ thống hình ảnh chủ đạo",
    "Campaign messages, product groupings and promotional accents across formats.": "Thông điệp chiến dịch, nhóm sản phẩm và điểm nhấn khuyến mãi qua nhiều định dạng.",
    "The mobile journey": "Hành trình trên di động",
    "Product information unfolds in a vertical sequence for mobile shopping.": "Thông tin sản phẩm được hé lộ theo chuỗi dọc tối ưu cho trải nghiệm mua sắm trên di động.",
    "Brand moments": "Khoảnh khắc thương hiệu",
    "Nutrition and ice-cream visuals open the collection.": "Hình ảnh dinh dưỡng và kem mở đầu bộ sưu tập.",
    "Campaign collection": "Bộ sưu tập chiến dịch",
    "Six campaign compositions retain their original two-row arrangement.": "6 bố cục chiến dịch giữ nguyên sắp xếp 2 hàng ban đầu.",
    "Product detail pages": "Trang chi tiết sản phẩm",
    "Mobile product stories shown side by side.": "Câu chuyện sản phẩm trên di động được hiển thị cạnh nhau.",
    "Maggi commerce": "Thương mại Maggi",
    "The hero visual expands into banners, offers and voucher modules.": "Hình ảnh chính mở rộng thành các banner, ưu đãi và module voucher.",
    "Product information": "Thông tin sản phẩm",
    "A family of product detail layouts with consistent information hierarchy.": "Nhóm các bố cục chi tiết sản phẩm với hệ thống phân cấp thông tin nhất quán.",

    // Amazon
    "Make comfort the first thing you see.": "Hãy để sự thoải mái là điều đầu tiên bạn thấy.",
    "Product visuals for a US audience, built around a “less is more” approach. Product photography leads, concise benefit messages guide the eye and a clear offer completes the composition.": "Hình ảnh sản phẩm dành cho thị trường Mỹ, xây dựng theo tinh thần \"less is more\". Nhiếp ảnh sản phẩm dẫn dắt, thông điệp lợi ích súc tích điều hướng ánh nhìn và ưu đãi rõ ràng hoàn thiện bố cục.",
    "Clear benefits.\nQuiet confidence.": "Lợi ích rõ ràng.\nTự tin thầm lặng.",
    "Six product creatives exploring comfort, play and the everyday life of cats.": "6 sáng tạo sản phẩm khám phá sự thoải mái, vui chơi và cuộc sống hằng ngày của loài mèo.",
    "Less is more": "Càng ít càng nhiều",
    "A compact visual system keeps the product and its purpose easy to understand.": "Hệ thống hình ảnh gọn gàng giữ cho sản phẩm và công năng thật dễ hiểu.",
    "Product & benefit": "Sản phẩm & lợi ích",
    "A consistent grid makes variations in colour, message and setting easy to compare.": "Lưới bố cục nhất quán giúp so sánh dễ dàng các biến thể màu sắc, thông điệp và bối cảnh.",
    "The collection": "Bộ sưu tập",
    "Comfort, play and reassurance become distinct messages within one product family.": "Sự thoải mái, vui chơi và an tâm trở thành những thông điệp rõ nét trong cùng một dòng sản phẩm.",
    "The complete collection": "Trọn bộ sưu tập",
    "The six creatives retain their original order and full compositions.": "6 thiết kế sáng tạo giữ nguyên thứ tự và bố cục gốc.",

    // Gerber
    "Make the ingredients part of the identity.": "Biến nguyên liệu thành một phần của nhận diện.",
    "Fruit and vegetables become playful letterforms for a baby-food launch. A clear blue foundation holds the system together, while ingredient colours, hand-drawn details and milestone stickers add warmth and discovery.": "Trái cây và rau củ biến thành các chữ cái vui nhộn cho chiến dịch ra mắt thức ăn trẻ em. Nền xanh lam kết nối toàn bộ hệ thống, trong khi sắc màu nguyên liệu, nét vẽ tay và nhãn dán cột mốc mang lại sự ấm áp và khám phá.",
    "Naturally\nfull of life.": "Tự nhiên\ntràn đầy sức sống.",
    "A launch identity carried through the feeding box, packaging panels and social campaign.": "Bộ nhận diện ra mắt được triển khai đồng bộ trên hộp ăn, các mặt bao bì và chiến dịch mạng xã hội.",
    "A natural beginning": "Khởi đầu tự nhiên",
    "Real ingredients become the starting point for a friendly visual language.": "Nguyên liệu thật trở thành điểm khởi đầu cho một ngôn ngữ hình ảnh thân thiện.",
    "Letters with flavour": "Những chữ cái mang hương vị",
    "Fruit and vegetable typography gives each side of the box its own character.": "Nghệ thuật chữ từ trái cây và rau củ mang lại sắc thái riêng cho từng mặt hộp.",
    "Ready for launch": "Sẵn sàng ra mắt",
    "The packaging identity extends into a family of campaign posts.": "Bộ nhận diện bao bì mở rộng thành chuỗi bài đăng chiến dịch.",
    "Packaging system": "Hệ thống bao bì",
    "Front, back and side panels together show the complete packaging system.": "Các mặt trước, sau và hai bên cùng nhau thể hiện trọn vẹn hệ thống bao bì.",
    "Social campaign": "Chiến dịch mạng xã hội",
    "Launch messages and product combinations share the blue, cream and ingredient palette.": "Thông điệp ra mắt và các tổ hợp sản phẩm dùng chung bảng màu xanh, kem và màu nguyên liệu.",

    // Maggi
    "Bring the warmth of the kitchen into the frame.": "Mang sự ấm áp của gian bếp vào khung hình.",
    "Maggi becomes a companion in the kitchen. A tactile background, expressive headline and bold yellow brand colour connect the main visual, commerce applications and food photography.": "Maggi trở thành người bạn đồng hành trong gian bếp. Nền giàu chất liệu, tiêu đề biểu cảm và sắc vàng thương hiệu đặc trưng kết nối hình ảnh chính, ứng dụng thương mại và nhiếp ảnh ẩm thực.",
    "Good food.\nShared stories.": "Món ăn ngon.\nCâu chuyện sẻ chia.",
    "A connected set of key visuals, commerce modules and food imagery.": "Bộ hình ảnh chủ đạo, module thương mại và nhiếp ảnh ẩm thực được liên kết chặt chẽ.",
    "The campaign story": "Câu chuyện chiến dịch",
    "The product range and a shared-meal setting establish the campaign message.": "Bộ sản phẩm và bối cảnh bữa ăn sum vầy xác lập thông điệp chiến dịch.",
    "Across the shelf": "Xuyên suốt quầy hàng",
    "The central composition adapts into promotional banners and commerce modules.": "Bố cục trung tâm biến tấu thành banner khuyến mãi và module thương mại.",
    "Food in focus": "Tâm điểm ẩm thực",
    "Ingredients, hands and dishes tell the food story through photographs.": "Nguyên liệu, đôi bàn tay và món ăn kể câu chuyện ẩm thực qua từng bức ảnh.",
    "Social & e-commerce": "Mạng xã hội & thương mại điện tử",
    "The main visual sits alongside its promotional adaptations.": "Hình ảnh chính đặt song hành cùng các biến thể khuyến mãi.",
    "From preparation…": "Từ khâu chuẩn bị…",
    "A three-column sequence follows ingredients, cooking and plating.": "Chuỗi 3 cột theo sát từ nguyên liệu, quá trình nấu nướng đến khâu bày biện.",
    "…to the final plate": "…đến món ăn hoàn chỉnh",
    "The finished dishes form a companion grid.": "Các món ăn hoàn chỉnh tạo thành lưới bố cục đồng hành.",
    "Campaign banner": "Banner chiến dịch",
    "The same visual language in a horizontal format.": "Cùng một ngôn ngữ hình ảnh được chuyển hóa sang định dạng ngang.",
    "Voucher / 01": "Voucher / 01",
    "Voucher / 02": "Voucher / 02",
    "Voucher / 03": "Voucher / 03",
    "Voucher / 04": "Voucher / 04",
    "Offer modules from the campaign artwork.": "Các module ưu đãi tách từ thiết kế chiến dịch.",

    // Gánh Hội stages & gallery
    "The story of craft": "Câu chuyện thủ công",
    "The collection opens with its cultural references and the hands behind the objects.": "Bộ sưu tập mở đầu bằng chất liệu văn hóa và đôi bàn tay nghệ nhân phía sau từng tặng phẩm.",
    "Made by hand": "Chế tác thủ công",
    "A collage of making, materials and detail introduces the craft process.": "Tổ hợp hình ảnh chế tác, chất liệu và chi tiết giới thiệu quy trình thủ công.",
    "A gift, considered": "Món quà được trau chuốt",
    "Photography and packaging bring the story together in a tangible object.": "Nhiếp ảnh và bao bì hội tụ câu chuyện thành một tặng phẩm hữu hình.",
    "Gánh Mùa": "Gánh Mùa",
    "The first gift composition in the collection.": "Tổ hợp quà tặng đầu tiên trong bộ sưu tập.",
    "Gánh Hoa": "Gánh Hoa",
    "Colour and material in the second composition.": "Màu sắc và chất liệu trong tổ hợp thứ hai.",
    "Gánh Mật": "Gánh Mật",
    "A companion composition in the editorial system.": "Tổ hợp đồng hành trong hệ thống biên tập.",
    "Tặng phẩm nghệ nhân": "Tặng phẩm nghệ nhân",
    "The handmade objects and their details.": "Các tặng phẩm thủ công và từng chi tiết hoàn thiện.",
    "Objects in hand": "Tặng phẩm trên tay",
    "A photographic pause within the story.": "Một khoảng lắng nhiếp ảnh trong mạch kể chuyện.",
    "Colour & material": "Màu sắc & chất liệu",
    "The Hũ Xu Xê colour palette.": "Bảng màu Hũ Xu Xê.",
    "Trà & bánh": "Trà & bánh",
    "Tea and mooncakes complete the gift ritual.": "Trà và bánh trung thu hoàn thiện nghi thức thưởng quà.",
    "The gift box": "Hộp quà tặng",
    "Packaging photography from the editorial.": "Nhiếp ảnh bao bì trong ấn phẩm biên tập.",
    "Brand applications": "Ứng dụng thương hiệu",
    "The identity across tags, bags and boxes.": "Hệ thống nhận diện trên thẻ treo, túi và hộp quà.",
    "The handmade detail": "Chi tiết đan lát thủ công",
    "A close look at the woven material.": "Góc nhìn cận cảnh vào chất liệu đan lát thủ công.",
  };

  if (dictionary[p.question]) p.question_vi = dictionary[p.question];
  if (dictionary[p.idea]) p.idea_vi = dictionary[p.idea];
  if (dictionary[p.statement]) p.statement_vi = dictionary[p.statement];
  if (dictionary[p.outcome]) p.outcome_vi = dictionary[p.outcome];

  p.stages.forEach((s) => {
    if (dictionary[s.title]) s.title_vi = dictionary[s.title];
    if (dictionary[s.text]) s.text_vi = dictionary[s.text];
  });

  p.gallery.forEach((s) => {
    if (dictionary[s.title]) s.title_vi = dictionary[s.title];
    if (dictionary[s.text]) s.text_vi = dictionary[s.text];
  });
});
