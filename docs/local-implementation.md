# Bản local — kiến trúc và phạm vi

## Folder ban đầu

Đã kiểm tra các source/config hiện có, 6 ảnh trong `IMG ref UI`, danh sách asset `public` và README. Cache npm và dependency là dữ liệu máy, không phải nội dung portfolio.

- Next.js App Router, React, Framer Motion, Lucide, Tailwind 3 đã có trong manifest.
- `src/app/page.tsx`: màn chọn sơ khởi, 5 tên project, hover đổi title; arrow chưa làm gì và mọi item cùng link example.
- `src/app/projects/example/page.tsx`: hero, intro, process, statement; tất cả sticky toàn màn, chưa có showcase ảnh 4; chapter dots tĩnh và có link `/work`, `/faq` không tồn tại.
- `layout.tsx`: metadata Level Artist; đổi sang Art Director theo yêu cầu.
- `public`: 5 SVG của starter Next/Vercel, không có ảnh tác phẩm thật.
- `postcss.config.js` và `.mjs` mâu thuẫn Tailwind3/4; giữ cấu hình phù hợp Tailwind3.
- ESLint config thuộc API đời mới hơn dependency; đã sửa để lint hoạt động.
- Chưa có lockfile/node_modules hoàn chỉnh; tạo lockfile và cài dependency.

## Bố cục

Màu chủ đạo #fff58b / #13140f / #f6f4e9. Typography sans đậm, tracking hẹp cho headline; monospace cho chapter, số thứ tự và metadata. Màn đầu giữ khoảng trống, biểu tượng ở tâm, tên project và dock ở dưới. Sau khi vào case, bố cục thay thành typography lớn trái / hình chủ đạo phải, rồi alternation vàng → ivory → vàng → ivory → đen.

Không dùng ảnh chụp reference làm artwork. 5 poster vector là placeholder thiết kế riêng để nhìn thấy kích thước, tỷ lệ, phối màu và sự thay đổi giữa stage. UI ghi “Layout studies / Demo content”, “Concept study” và “Illustrative artwork” ở các vị trí liên quan.

## Input và state

Selector có một index được chuẩn hóa modulo số project. Click thumbnail chỉ đổi lựa chọn. CTA lấy slug của lựa chọn hiện tại. Arrow trái/phải hỗ trợ bàn phím, không chạy khi focus ở editable field hoặc khi đã cuộn xuống index. Session storage là tùy chọn, có fallback khi bị chặn.

Mỗi project là route riêng, prerender từ dữ liệu. Next App Router xử lý chuyển trang và focus navigation. Back/index và next project có URL thật. `/projects/example` redirect để giữ tương thích link cũ.

## Scroll

Bản local dùng native scroll + Framer Motion hiện có, không thêm Lenis/WebGL trong giai đoạn layout. Native scroll giữ touch, wheel, keyboard và browser history; smooth chỉ áp dụng cho thao tác nhảy chapter. Motion value cập nhật progress/rotate mà không render lại toàn bộ trang từng pixel.

- `useScroll` toàn trang: thanh đọc và góc quay icon.
- Scroll listener passive → requestAnimationFrame: chọn chapter vượt mốc 44% viewport; state chỉ đổi khi chapter/percent thay đổi.
- Icon có anchor theo chapter. Spring stiffness52/damping15 tham khảo cơ chế đã xác minh của reference. Mobile giữ icon ở cạnh dưới để tránh che text.
- Reveal opacity/translate khi section vào viewport, chỉ một lần. Các reveal phục vụ nhịp đọc.
- Showcase là vùng cao320svh desktop/350svh mobile. Sticky giữ một sân khấu trong khi progress0–1 đổi phase bằng floor(progress×3).
- Artwork gồm 3 layer vector cùng tỷ lệ: wireframe, tonal, final. Crossfade opacity; chỉ layer đang chọn được đưa vào accessibility tree.
- Màn thấp≤680px không pin; 3 nút stage chuyển nội dung tại chỗ để toàn bộ hình luôn có thể cuộn tới.
- Marquee và biểu tượng có loop riêng; motion off dừng loop, tắt smooth và giảm transform.

## Chủ đích khác với Cloud Studio

Cloud Studio chọn mascot và có auto-tour khóa input. Portfolio chọn project và để người xem chủ động cuộn. Không thêm chat/game/audio/physics vì không phục vụ việc xem tác phẩm trong brief. Không khẳng định đây là bản sao 1:1 của toàn bộ JS reference.

Đã tạo đủ mạch kể chuyện và vị trí asset để chỉnh thêm. Cần artwork, icon, brief và credit thật để hoàn thiện portfolio cá nhân. Không tự gán khách hàng, thành tích hoặc số liệu kết quả.

## Kiểm chứng hoàn tất

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run build`: pass, prerender đủ 5 project; ESLint và type validation trong build pass.
- Next/eslint-config-next đồng bộ 15.5.26; ESLint8 dùng config `.eslintrc.json` phù hợp.
- Đã xem bằng trình duyệt: selector desktop, hero, showcase, selector390px và320px, showcase màn thấp320×640.
- Click Next + phím trái đổi lựa chọn và href; chọn Neon City mở đúng URL/nội dung.
- Mở artwork dialog/đóng Escape; nhảy chapter và stage 01/02/03; state chữ và artwork đổi theo tiến độ.
- Trên 320px, không overflow ngang, prev/next và thumbnails cùng hàng; CTA xuống hàng riêng.
- Viewport≤680px xác minh sticky chuyển sang position:relative; nút stage vẫn chuyển nội dung.
- Motion off/on cập nhật `data-motion`; lựa chọn được giữ khi qua route. Dừng các loop trang trí.
- Log error của tab preview mới sau khởi động lại: rỗng.
- Dev server đang chạy tại http://localhost:3001, chỉ trên máy local. Chưa publish.

Chưa đo Lighthouse/FPS trên thiết bị thật, chưa kiểm thử screen reader thực tế và chưa thay portfolio assets thật. Swipe đã nối sự kiện touch, nhưng QA chính dùng click/keyboard và kiểm tra responsive trong browser.
