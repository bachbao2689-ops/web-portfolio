# Cloudstudio — nghiên cứu JS và UX để chuyển thành portfolio Art Director

Ngày khảo sát: 24/09/2026. Đối tượng: phiên bản live tại [cloudstudio.es](https://cloudstudio.es/).

Tài liệu này phân biệt **xác minh từ mã nguồn công khai** với **đề xuất cho portfolio**. Phần phân tích source thực hiện bằng HTML/JS/CSS được website phục vụ trực tiếp; không suy đoán thư viện chỉ từ cảm giác animation. Trình duyệt của tác vụ chính kiểm tra giao diện thực tế. Đây là nghiên cứu để xây implementation mới, không phải sao chép toàn bộ source/brand/mascot của Cloudstudio.

## 1. Kết luận kiến trúc có ảnh hưởng trực tiếp tới brief

Website có hai trải nghiệm khác nhau: người xem tự scroll và một tour mà mascot chủ động điều khiển scroll. Màn chọn nhân vật phủ lên homepage; thanh dưới là bộ chọn nhân vật, không phải project. Với brief này, chuyển bộ chọn ấy thành project và dùng từng project làm một câu chuyện riêng.

| Từ reference | Chuyển thành portfolio | Ý nghĩa UX |
| --- | --- | --- |
| Nhân vật được chọn | Project được chọn | Màn mở đầu giới thiệu từng case mà chưa ép người xem đọc dài |
| Thumbnail nhân vật | Thumbnail artwork/biểu tượng case | Cho phép nhận diện bằng hình |
| Tên nhân vật lớn | Tên project lớn | Đặt tác phẩm làm nội dung chính |
| Màu riêng của nhân vật | Màu nhận diện project | Tạo cảm giác bước vào một không gian riêng |
| CTA bắt đầu tour | CTA mở project | Hành động rõ, không phụ thuộc hover |
| Mascot đi qua các section | Icon dẫn chuyện đi qua chapter | Giữ mạch thị giác trong lúc xem sản phẩm |
| Các service panel xếp chồng | Các chương Brief / Idea / Execution | Kết hợp giải thích tư duy và show visual |

**Đề xuất:** mặc định để người xem chủ động scroll. Auto tour là scope bổ sung nếu cần sau này; flow tuyển dụng/đánh giá portfolio cần khả năng lướt nhanh, dừng ở hình và quay lại nội dung.

## 2. Bằng chứng kỹ thuật

Các đường dẫn sau là tài sản công khai của website, có thể thay đổi sau ngày khảo sát:

| Nguồn | Bằng chứng tìm được | Phạm vi khẳng định |
| --- | --- | --- |
| [HTML homepage](https://cloudstudio.es/) | Các script React, React DOM, `dc-runtime`, Lenis, Lottie, Matter, Three, `organism.js`; logic `Component extends DCLogic` inline | Có các dependency này trên bản đã tải; chưa xác nhận số phiên bản package |
| [Mascot JS](https://cloudstudio.es/mascot.js?v=1787346163) | `createChoice`, `activeBlock`, `idleFollowPoint`, `runGuide`, `scrollToNode`, `drawMascot` | Source điều khiển launcher, mascot, theme và tour |
| [Mascot CSS](https://cloudstudio.es/mascot.css?v=1783279985) | Dock fixed, stage, state active, layout ≤640px, reduced motion | Cơ chế bố cục và các transition của launcher |
| [Organism JS](https://cloudstudio.es/site/js/organism.js?v=1783102360) | `THREE.WebGLRenderer`, `ShaderMaterial`, `Points`, `pause`, `resume` | Particle object của nội dung dùng WebGL |

**Không có bằng chứng rằng GSAP/ScrollTrigger điều khiển trang này:** tên GSAP xuất hiện trong nội dung toolkit, nhưng các import và logic scroll được kiểm tra dùng Lenis + JavaScript tùy biến. Không nên viết “web này dùng GSAP” chỉ vì animation trông giống GSAP.

**Mascot và organism là hai lớp khác nhau:** mascot nổi được vẽ bằng Canvas 2D; các vật thể particle lớn trong nội dung dùng Three.js. Portfolio không cần WebGL để làm icon chạy theo scroll. Một SVG/component có API vị trí, góc và scale là đủ cho giai đoạn UX.

## 3. Màn chọn — logic tương tác cần giữ

### 3.1 State và thứ tự hành động

Launcher dùng overlay fixed toàn màn hình. Các nút chọn chỉ thay đổi lựa chọn hiện tại; CTA mới bắt đầu trải nghiệm. Hai hành vi này tách rõ để người xem có thể so sánh nhiều lựa chọn mà không bị đưa vào nội dung ngoài ý muốn.

Đề xuất state của portfolio:

```text
SELECTING(projectIndex)
  ├─ click thumbnail / previous / next / ArrowLeft / ArrowRight / swipe
  │    → cập nhật preview, tên, metadata, màu nền
  └─ click “View project”
       → ENTERING(projectId)
       → READING(projectId, chapter)
            ├─ scroll / chapter button → chapter mới
            ├─ “All projects” → SELECTING(projectIndex)
            └─ “Next project” → ENTERING(nextId)
```

Mỗi project cần một ID ổn định. Việc đổi active project phải cập nhật đồng thời preview, tên, role, năm và CTA. Khi mở project, lưu ID vào URL để refresh và gửi link trực tiếp được; khi quay lại selector, giữ lựa chọn trước đó.

### 3.2 Input đã xác minh trong reference

`createChoice` nối sự kiện cho thumbnail, hai nút mũi tên, phím trái/phải và swipe ngang. Ngưỡng swipe là 42px. Phím chỉ đổi nhân vật khi launcher đang mở. Việc chọn thay đổi theme qua CSS variables và lưu lựa chọn vào localStorage.

Đề xuất portfolio dùng cùng mô hình input, thêm tên project đầy đủ ở accessible label, `aria-pressed` cho nút đang chọn, vùng focus rõ và Enter/Space cho CTA. Không bắt người dùng nhớ phím tắt để thao tác chính.

### 3.3 Dock và hierarchy

CSS reference: dock desktop là viên thuốc tối, fixed dưới viewport; thumbnail 40px, thumbnail active phóng 1.32 lần, nút previous/next 44px. CTA có nền accent nên nổi rõ ở bên phải. Trên điện thoại, dock chia hàng và CTA chiếm hàng riêng; có safe-area bottom.

Đề xuất thumbnail artwork lớn hơn chấm màu nếu tài sản nhiều chi tiết. Có thể hiện thêm số thứ tự `01 / 03` ở metadata để người dùng nhận biết tập project hữu hạn. Dock cần chừa khoảng cho active thumbnail phóng to mà không bị cắt. Nếu số project tăng, dùng horizontal overflow hoặc phân trang rõ; không ép nhỏ toàn bộ thumbnail.

### 3.4 Motion khi đổi lựa chọn

Reference cập nhật palette toàn trang, chạy sóng màu dạng `clip-path: circle`, trượt tên theo hướng chọn, scale mascot theo spring và nhấp nhô thumbnail lần lượt. Mỗi nhân vật còn có exit riêng.

Đề xuất giữ ba dấu hiệu có chủ đích: (1) ảnh active đổi, (2) tên trượt cùng hướng, (3) màu nền thay đổi. Animation trang trí nên nằm dưới artwork và không che ảnh lâu. Chỉ mở project khi người xem bấm CTA; dùng một transition ổn định cho mọi case trước khi đầu tư vào hiệu ứng riêng.

## 4. Scroll engine — cơ chế thực sự của reference

### 4.1 Smooth scroll là lớp input, không phải toàn bộ storytelling

Trong `initLenis`, bản khảo sát cấu hình `lerp: 0.14` và `smoothWheel: true`. Vòng `requestAnimationFrame` gọi `lenis.raf(time)`. `applyScroll` nhận sự kiện từ Lenis và native scroll, tránh chạy lại khi vị trí không đổi.

Điều đó có nghĩa Lenis chỉ làm mềm việc di chuyển trang. Các reveal, scale panel, chapter state, mascot và progress được tính riêng. Một thư viện smooth scroll đơn lẻ không tạo được trải nghiệm này.

Đề xuất app có một chủ sở hữu scroll/ticker, một nơi tính tiến độ và một nơi cập nhật icon. Tránh vừa CSS smooth-scroll vừa nhiều thư viện animate scroll cùng điều khiển viewport. Đối với touch, ưu tiên hành vi trình duyệt; desktop có thể dùng Lenis.

### 4.2 Bảng các lớp motion

| Lớp | Cơ chế xác minh ở reference | Cách áp dụng cho case study |
| --- | --- | --- |
| Progress | `scrollY / (scrollHeight - viewportHeight)` | Một thanh mảnh + số phần trăm, giúp biết câu chuyện dài bao nhiêu |
| Chapter nav | Section chứa đường giữa viewport được active | Chuyển thành Overview / Brief / Direction / Work / Credits |
| Reveal một lần | Element vượt ngưỡng khoảng 90% chiều cao viewport | Caption vào trước, visual hoặc text khối tiếp theo; không animate lại mọi lần quay lên |
| Sticky stack | Panel cũ scale xuống 0.91 và tối tới 0.68, dùng tiến độ bình phương | Chương cũ lùi xuống khi chương mới vào; cần section đủ cao để đọc |
| Parallax | Độ lệch tính từ tâm element so với tâm viewport | Nhẹ trên ảnh bìa/ảnh full bleed, không trên body text |
| Outline text | Chuyển stroke sang fill khi đi qua khoảng 62% viewport | Một câu concept quan trọng có thể dần được nhấn mạnh |
| Doodle draw | Stroke-dashoffset SVG chuyển về 0 | Hợp với dấu khoanh, gạch chân do Art Director tạo |
| Count up | Số tăng trong khoảng 1.4 giây | Chỉ dùng với số liệu thực đã được xác nhận |
| Marquee | Tốc độ liên hệ vận tốc scroll, skew giới hạn ±5° | Có thể dùng cho discipline/từ khóa; không dùng cho câu bắt buộc phải đọc |

Các con số trên là thông số source của reference, không phải mục tiêu hiệu năng được đo trên local. Prototype có thể chọn thông số khác để phù hợp số lượng hình và lượng copy thực tế.

### 4.3 Pin/sticky cần phục vụ việc đọc

Hiệu ứng stack không nên biến mọi chương thành một màn 100vh cứng. Nếu copy dài hoặc màn hình thấp, nội dung phải tăng chiều cao. Các section visual nên có khoảng nghỉ; nếu tất cả phần đều pin và chuyển động, artwork mất vai trò chính.

Đề xuất khung câu chuyện:

1. **Project hero:** tên, hình chủ đạo, discipline, năm, role.
2. **Context / Brief:** một mục tiêu cụ thể, bối cảnh và giới hạn của đề bài.
3. **Creative direction:** ý tưởng chính, visual language, lựa chọn tạo nên hướng thiết kế.
4. **Execution:** ảnh lớn, hệ thống nhận diện, layout, vật phẩm ứng dụng; caption giải thích chọn lọc.
5. **Details / Outcome:** chi tiết typography, màu, key visual hoặc các đầu ra đã có.
6. **Credits / Next project:** ghi nhận cộng tác thực tế và đường đi tiếp rõ ràng.

Đây là đề xuất biên tập nội dung cho portfolio, không khẳng định assets hiện tại đã có đầy đủ brief, KPI hoặc credit. Không điền số liệu thành công, tên khách hàng, role hay giải thưởng chưa được cung cấp.

## 5. Icon dẫn chuyện — tách hình dạng khỏi hành vi

### 5.1 Reference đang làm gì?

Trong chế độ tự scroll, source chọn section gần một điểm khoảng 48% viewport rồi lấy điểm neo phù hợp section. Icon đi về target bằng spring: độ cứng 52, damping 12.6, delta thời gian chặn tối đa 0.05 giây. Khi đang tour, damping đổi để hạn chế vượt quá điểm neo. Trên mobile, điểm neo thường ở mép phải để tránh đè nội dung.

Đây chủ yếu là **icon đi theo vị trí neo của section**, không phải một đường SVG duy nhất kéo dài từ đầu đến cuối trang. Hình thức “dẫn chuyện” đến từ target, thay đổi scale, ánh mắt và nhịp phối hợp với nội dung.

### 5.2 API nên dành cho icon người dùng sẽ thay sau

```text
StoryGuide props/state
  asset: SVG, component hoặc image của người dùng
  chapterId: chương hiện tại
  progress: tiến độ cục bộ trong chương [0, 1]
  anchor: điểm an toàn trong viewport
  rotation / scale: biên độ nhỏ theo chương
  reducedMotion: trạng thái ưu tiên hệ thống
```

Vị trí icon nên do layout quyết định, không hardcode vào artwork. Một wrapper chịu trách nhiệm translate/rotate/scale; artwork bên trong có thể thay mà không đổi toàn bộ scroll logic. Icon đặt `pointer-events: none` nếu chỉ trang trí. Nếu là nút điều hướng, phải có label và vùng chạm riêng.

Không đưa icon qua giữa paragraph để tạo motion. Desktop có thể dùng phần trống cạnh section, mobile dùng góc hoặc cạnh dưới. Ưu tiên một icon nhỏ, có tương phản rõ trên cả nền sáng và tối. Khi sang dark chapter, icon đổi tone thông qua token của section.

## 6. Auto tour: hiểu đúng để quyết định scope

`runGuide` của reference chạy một chuỗi beat bất đồng bộ. `scrollToNode` chờ Lenis `onComplete`, có timeout dự phòng. Trong tour, website chặn wheel, touchmove và phím scroll; có skip/abort và giải phóng khóa khi lỗi. Đây là kịch bản điều khiển trang, khác với animation được người dùng scrub bằng scroll.

Nếu sau này muốn guided tour cho portfolio, nên đặt nó sau nút tùy chọn “Play story”. Mỗi beat cần có: target section, thời lượng tối thiểu để đọc, nội dung icon, trạng thái pause, skip và cancel. Người dùng cuộn tay nên được tiếp quản ngay. Không nên dùng tour bắt buộc làm lối duy nhất để xem case study.

## 7. Những lớp phụ tạo cảm giác “sống”

Source có custom cursor với nhãn ngữ cảnh, magnetic button, marquee phản ứng vận tốc, FAQ accordion, hover showcase, vật lý Matter.js cho tag, animation Lottie và particle Three.js. Chúng là các module độc lập, không phải điều kiện bắt buộc để có storytelling.

Đề xuất mức ưu tiên cho bản portfolio:

| Ưu tiên | Nên làm | Lý do |
| --- | --- | --- |
| P0 | Project selector, CTA, chapter flow, image layout, back/next | Hoàn thành tác vụ xem sản phẩm |
| P1 | Icon theo chapter, sticky transitions, text reveal, tiến độ | Tạo ngôn ngữ chuyển động thống nhất |
| P2 | Magnetic button, label cursor, subtle parallax | Tăng phản hồi trên desktop nếu không cản thao tác |
| Sau khi chốt UX | WebGL, sound, physics playground, auto tour | Tốn hiệu năng và dễ khiến người xem mất tập trung |

Không áp dụng custom cursor cho thiết bị touch. Không để cursor đặc biệt là cách duy nhất biểu đạt một link. Mỗi image gallery phải hoạt động khi không có hover.

## 8. Responsive và accessibility cần hoàn thiện ở local

Các điểm dưới đây là yêu cầu thiết kế đề xuất cho local, không phải kết luận rằng reference lỗi:

- Layout phải giữ CTA và project active nhìn thấy được ở 390×844, màn hình thấp và landscape.
- Dock tính `safe-area-inset-bottom`; không che caption hoặc nút thoát ở cuối case.
- `prefers-reduced-motion` chuyển về đọc nội dung trực tiếp: dừng loop trang trí, bỏ parallax, bỏ smooth-scroll dài và transition mở màn mạnh.
- Không giấu nội dung vĩnh viễn nếu script reveal chưa chạy hoặc lỗi; các ảnh/caption vẫn phải có fallback đọc được.
- Keyboard có thể chọn, mở, đóng project và đến chapter; sau khi mở đưa focus tới heading, khi quay lại trả focus về nút project cũ.
- Section dùng heading có thứ bậc. Artwork dùng alt theo nội dung, icon thuần trang trí dùng `aria-hidden`.
- CTA, next/previous và chapter link có trạng thái focus-visible và hit area đủ lớn.
- Không phát âm thanh tự động. Không cần copy sound/chat/game của reference vào brief hiện tại.

## 9. Hiệu năng và cách kiểm chứng

Reference đã có các biện pháp đáng học: tránh applyScroll khi không đổi vị trí, cache danh sách element, bỏ reveal đã hoàn tất khỏi danh sách, pause WebGL khi ngoài viewport, chỉ update physics gần viewport, giới hạn pixel ratio và giảm particle count trên mobile.

Đề xuất portfolio giữ nội dung dữ liệu tách khỏi component; ảnh có width/height hoặc aspect-ratio ổn định để tránh dịch layout. Hero đang chọn cần sẵn, ảnh sâu trong story lazy-load. Không load toàn bộ ảnh gốc kích thước lớn cho tất cả project vào màn selector. Dùng transform/opacity cho motion thông thường và giảm đọc/ghi layout xen kẽ trong mỗi frame.

Checklist xác minh local có giá trị thực:

1. Chọn project bằng click, keyboard, previous/next; CTA mở đúng case.
2. Scroll xuống và lên: chapter, progress, icon nhất quán; không mất text khi quay lại.
3. Bấm chapter: heading tới vùng đọc được, không bị header che.
4. Back/All projects, next project, refresh deep link: giữ đúng route/state.
5. Mobile: không overflow ngang, dock không che nội dung, thao tác không đòi hover.
6. Reduced motion: xem đủ toàn bộ nội dung và thao tác mà không cần animation.
7. Ảnh thiếu hoặc tải chậm: giữ tỷ lệ layout và có trạng thái thay thế.
8. Chụp desktop/mobile tại selector, hero, transition giữa chapter và cuối project; xem bằng mắt để bắt overlap/crop.

## 10. Giới hạn của nghiên cứu

Chưa xác định phiên bản package chính xác, build tool nội bộ, dữ liệu analytics, tỷ lệ chuyển đổi hay điểm Lighthouse của reference. Các giá trị được in trên chính website không phải phép đo độc lập. Mô tả logic ở trên dựa trên source công khai tại thời điểm khảo sát; trải nghiệm thực có thể thay đổi theo viewport, lựa chọn nhân vật và cập nhật website.

Tài liệu này là nền cho việc chuyển flow và nhịp motion sang portfolio. Độ giống cần đánh giá ở **cách chọn project → bước vào case → tiến triển qua chapter**, đồng thời để artwork và tiếng nói của Art Director quyết định nội dung, màu và nhịp cuối cùng.
