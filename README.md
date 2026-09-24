# Bach Bao — Art Director portfolio

Local prototype dựa trên 6 ảnh brief và flow tương tác của Cloud Studio. Dữ liệu demo giữ 5 tên project từ starter; các SVG là minh hoạ bố cục, chưa phải artwork thật của chủ portfolio.

## Chạy local

```bash
npm install
npm run dev -- --port 3001
```

Mở http://localhost:3001. Server chỉ bind loopback trên máy này. Hot reload hoạt động khi sửa source.

```bash
npm run typecheck
npm run lint
npm run build
npm run start -- --port 3002
```

Production build dùng `.next-production` riêng để không ghi đè output của dev server.

## Luồng đã dựng

- Màn chọn project: bottom dock, prev/next, phím ←/→, nút mở project, nhớ lựa chọn trong session.
- Project URL riêng: `/projects/deserted-outpost`, `/projects/forgotten-ruins`, `/projects/cyber-slums`, `/projects/neon-city`, `/projects/forest-temple`.
- Hero → The idea → Art direction → The process → The outcome → Next project.
- Showcase ghim theo scroll: composition → color & light → final frame; bấm số để nhảy tới stage.
- Icon theo chapter bằng spring, quay theo tiến độ cuộn; click icon tới chapter tiếp theo.
- Navigation bên cạnh, reading progress, mở artwork lớn bằng dialog và đóng bằng Escape.
- Motion toggle và `prefers-reduced-motion`; trên màn hình thấp (≤680px), showcase chuyển về chiều cao tự nhiên và chọn stage bằng nút.
- `/projects/example` chuyển hướng sang project đầu tiên. Slug không hợp lệ có trang 404.

## Chỗ chỉnh tiếp

| Nội dung | File |
| --- | --- |
| Tên, slug, caption, brief, statement, nội dung từng stage | `src/data/projects.ts` |
| Icon tạm, sau này thay mascot của bro | `src/components/ProjectGlyph.tsx` |
| Artwork vector tạm, sau này thay ảnh/video thật | `src/components/StudyArtwork.tsx` |
| Màn chọn project và dock | `src/components/ProjectSelector.tsx` |
| Toàn bộ flow story và scroll | `src/components/ProjectStory.tsx` |
| Màu, typography, khoảng cách, breakpoint | `src/app/globals.css` |
| Preference giảm chuyển động | `src/components/MotionPreference.tsx` |

Giữ wrapper của `ProjectGlyph` khi thay icon để không phải viết lại scroll logic. Artwork hiện có tỷ lệ 7:8; khi thay ảnh nên khai báo kích thước/tỷ lệ và alt cụ thể. Nội dung project là mẫu biên tập; cần thay bằng brief, role, deliverables và credit thật trước khi public.

## Tài liệu nghiên cứu

- `docs/ui-brief-analysis.md`: phân tích ảnh 1–6, layout, hierarchy, flow, audit starter.
- `docs/cloudstudio-js-research.md`: xác minh JS công khai của reference, selector, Lenis, mascot Canvas2D, particle Three.js, các thông số motion, phần nên áp dụng.
- `docs/local-implementation.md`: kiến trúc bản local, khác biệt có chủ đích và trạng thái kiểm chứng.
