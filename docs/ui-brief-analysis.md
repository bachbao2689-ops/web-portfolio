# Phân tích brief UI từ 6 ảnh tham chiếu

Ngày khảo sát: 24/09/2026. Nguồn: xem trực tiếp toàn bộ `IMG ref UI/1.png` đến `6.png`, đối chiếu với yêu cầu portfolio Art Director và mã nguồn ban đầu trong thư mục.

Tài liệu này tách ba mức độ: **quan sát được** là nội dung thực sự xuất hiện trong ảnh; **chuyển sang portfolio** là cách diễn giải brief của chủ portfolio; **đề xuất triển khai** là quyết định thiết kế/kỹ thuật cho bản local. Ảnh tĩnh không chứng minh thư viện JS, thời lượng animation, scroll pinning hay đường đi chính xác của mascot. Các chi tiết đó cần được xác nhận bằng khảo sát website đang chạy và mã nguồn công khai.

## 1. Luồng tổng thể cần giữ

1. Vào URL portfolio → màn chọn project toàn màn hình.
2. Chọn project trong dock phía dưới → tên, màu hoặc artwork trung tâm đổi để preview project hiện tại.
3. Bấm nút mở bên cạnh dock → vào trang kể chuyện riêng của project đó.
4. Đọc hero → bối cảnh/brief → concept và các ứng dụng → quy trình → kết quả/statement.
5. Icon đồng hành di chuyển hoặc đổi trạng thái theo tiến độ cuộn, tạo cảm giác xuyên suốt một câu chuyện.
6. Dùng dot navigation để biết đang ở đâu hoặc nhảy đến chương cần xem.
7. Cuối project có đường xem project tiếp theo hoặc quay lại danh sách.

Điểm quan trọng: ảnh gốc là website một studio, nhưng người dùng đã gán lại ý nghĩa: các nhân vật ở ảnh 1 trở thành các project và mỗi lựa chọn dẫn đến một câu chuyện dự án. Không sao chép nội dung bán dịch vụ AI của website gốc vào portfolio.

## 2. Ngôn ngữ thị giác chung

### Màu và không gian

- Ba nền chính: vàng nhạt, ivory và gần đen. Màu vàng đóng vai trò nhận diện, ivory tạo khoảng nghỉ đọc, đen tạo cao trào.
- Các section thay nền theo chương; không đặt mọi nội dung vào cùng một mặt phẳng đơn điệu.
- Gutter ngoài của header khoảng 2% chiều rộng, nhưng phần nội dung giữa trang được bó vào một khung hẹp hơn. Ở nhiều ảnh, nội dung chính bắt đầu gần 18% chiều rộng và kết thúc gần 82%.
- Khoảng trắng lớn là một thành phần bố cục có chủ đích. Nhịp đọc dựa trên ít câu nhưng phân cấp mạnh, không phải tăng mật độ card.
- Header, dot navigation và mascot tạo khung tham chiếu ổn định khi nội dung chuyển chương.

### Typography

- Headline là sans serif đậm, tracking âm và line-height chặt. Dòng lớn tạo cảm giác editorial, thường chỉ 2–3 dòng.
- Nội dung thân dùng sans serif thông thường, không quá mảnh, dòng ngắn để đọc nhanh.
- Nhãn chương, con số thứ tự, metadata và microcopy dùng monospace nhỏ với letter-spacing rộng.
- Đường gạch tay hoặc oval quanh một từ khóa xuất hiện ở headline; đây là điểm nhấn, không áp cho mọi đoạn.
- Không thể xác định chắc tên font chỉ từ ảnh; bản local có thể dùng font hệ thống tương đương trước khi chốt thương hiệu.

### Hình khối

- Nút dạng pill, icon tròn, dock màu đen bo tròn toàn bộ.
- Card lớn và lớp section nổi có bo góc rộng khoảng 24–40 px ở kích thước desktop tham chiếu.
- Viền card mảnh màu đen, gần như không có gradient hoặc glassmorphism.
- Artwork dạng hạt tạo độ sống động, nhưng hình dạng và icon riêng của chủ portfolio vẫn là phần sẽ thay sau.

## 3. Ảnh 1 — cổng vào và lựa chọn project

### Quan sát được

- Khung hình gần 16:9, phủ nền vàng nhạt từ đầu đến cuối.
- Góc trái trên có wordmark; góc phải có sound toggle và trạng thái “Live session”.
- Cụm thông điệp chính nằm giữa, phía trên tâm: nhãn monospace ngắn, headline một dòng rất lớn.
- Mascot dạng khối hạt với mắt ở trung tâm; phía dưới có tên lựa chọn và mô tả phụ.
- Dock nằm thấp, ở giữa màn hình. Nó là một capsule đen với bóng đổ mềm.
- Cấu trúc dock từ trái sang phải: nút lùi tròn → hàng lựa chọn tròn → nút tiến tròn → vạch phân cách → nút chính dài dạng pill.
- Item đang chọn sáng rõ, item còn lại giảm tương phản. Trạng thái được truyền bằng cả kích thước/viền và độ sáng.
- Bên dưới dock là liên kết phụ “Skip · Explore yourself”. Góc phải dưới có hướng dẫn dùng phím trái/phải.

### Chuyển sang portfolio

- Hero giới thiệu portfolio/Art Director; mascot hoặc artwork preview là phần thay đổi theo project.
- Mỗi vòng tròn dock đại diện cho một project thật, cần có tên truy cập được bằng hover, focus và trình đọc màn hình.
- Tên project được hiển thị ở vùng giữa để người dùng biết chính xác nút “View project” sẽ mở gì.
- Bấm item là **chọn và preview**; bấm CTA là **mở**. Hai hành vi cần tách rõ, phù hợp lời mô tả “thanh các Project… bên cạnh có nút… bấm vào để xem”.
- “Skip” có thể đổi thành “View all projects” hoặc “Explore selected project”; phải dẫn tới một hành động thật.
- Sound/Live/Game là UI của website gốc, không phải yêu cầu bắt buộc của portfolio. Nếu bản local chưa có audio thì không nên đưa một nút sound giả.

### Đề xuất triển khai JS

- Một state `selectedProjectIndex` làm nguồn dữ liệu duy nhất cho preview, tên, số thứ tự, trạng thái dock và URL CTA.
- `ArrowLeft` / `ArrowRight` đổi index; khi đến cuối có thể wrap, nhưng hành vi phải nhất quán với nút lùi/tiến.
- `Enter` ở CTA mở route thực của project; phím điều hướng không được bắt khi người dùng đang nhập liệu hoặc dùng control khác.
- Đổi preview bằng opacity và translate ngắn; tránh nhảy layout khi tên project có độ dài khác nhau.
- Hover có thể cho phản hồi nhẹ, nhưng không phải cách duy nhất chọn project; touch và bàn phím vẫn phải dùng được.
- Giữ focus ở control đã kích hoạt khi index đổi; item active có `aria-current` hoặc trạng thái radio phù hợp.
- Nếu dock không đủ chỗ trên mobile, dùng dải cuộn ngang, đảm bảo CTA vẫn dễ nhìn và vùng chạm tối thiểu khoảng 44 px.
- Dùng `100svh`/`100dvh` có fallback thay vì chỉ dựa vào `100vh`, tránh thanh địa chỉ mobile che dock.

## 4. Ảnh 2 — hero của project đã chọn

### Quan sát được

- Header đổi thành wordmark trái, icon nhỏ + Work + FAQ + CTA phải.
- Nền vàng tiếp tục giữ sự liên kết từ màn chọn.
- Headline khổ rất lớn bên trái, chia ba dòng; từ cuối được khoanh oval.
- Metadata nhỏ phía trên headline; dưới headline là CTA và đoạn giới thiệu ở hai cột nhỏ.
- Bên phải là artwork “LIVE” làm bằng hạt. Artwork chiếm nhiều diện tích nhưng vẫn có khoảng trống xung quanh.
- Mascot nằm gần phía trên giữa hai cột, có speech bubble đen; không bị đóng khung thành một card.
- Mép phải có dải dot dọc: một dot active to/rõ hơn và nhãn “HERO”; những dot còn lại mờ.
- Góc dưới có các control phụ của bản gốc, trong đó có ESC/timer.

### Chuyển sang portfolio

- Hero cần đưa tên dự án, loại công việc và một câu mở đầu về ý tưởng lên trước.
- Cột phải nên dành cho key visual / motion / visual tượng trưng của project, tránh chỉ có chữ “LIVE” không liên quan.
- Metadata phù hợp: loại dự án, vai trò, năm; các dữ liệu chưa được cung cấp phải để rõ là demo hoặc chỗ cần điền.
- Mascot giới thiệu ngắn cách đọc: “Scroll to explore the story” hoặc tên chương, không che headline.
- “Work” trở về danh mục, “About”/“Contact” có thể thay FAQ tùy nội dung thực tế. Không tạo route không tồn tại.

### Đề xuất triển khai JS

- Entry transition từ selector sang hero giữ màu/biểu tượng liên tục; bản đầu có thể dùng fade ngắn nếu chưa cần shared-element transition.
- Intro text hiện theo cụm với delay nhẹ, artwork có nhịp chuyển động thấp. Không giấu nội dung lâu chỉ để chờ animation.
- Hero giữ chiều cao tối thiểu gần viewport ở desktop; nội dung cao hơn viewport vẫn được cuộn bình thường.
- Dot navigation gắn với các section thật, tự cập nhật theo vị trí cuộn và hỗ trợ click để đến anchor.
- Có nút tiếp tục/scroll cue để người dùng biết còn nội dung phía dưới; dùng anchor thật để hoạt động ngay cả khi animation chưa sẵn sàng.

## 5. Ảnh 3 — đoạn giới thiệu / brief

### Quan sát được

- Header vẫn hiển thị phía trên khi trang đã cuộn.
- Một dải marquee đen chạy ngang với chữ vàng và ký hiệu ngôi sao phân cách.
- Section chính nền ivory: bên trái nhãn nhỏ + headline hai dòng; bên phải đoạn giải thích ngắn + hàng keyword monospace.
- Mascot ở gần cạnh trái của headline, như đang dẫn mắt vào nội dung.
- Dot active đổi thành “WHAT WE DO”.
- Phần dưới ảnh đã thấy nền đen của section tiếp theo. Đây là bằng chứng về dòng chảy giữa các section: người dùng có thể thấy ranh giới và phần của hai chương trong cùng viewport.

### Chuyển sang portfolio

- Đây là chương “The brief” hoặc “The challenge”: dự án giải quyết vấn đề gì, insight nào dẫn đường, mục tiêu là gì.
- Marquee có thể dùng tên chuyên môn/đầu ra thực tế của project: Art direction, Visual identity, Campaign, Digital… Chỉ giữ những gì liên quan.
- Headline cần đưa ra một ý rõ, copy bên phải giải thích nó; tránh lặp lại tên dự án với ngôn ngữ chung chung.

### Đề xuất triển khai JS

- Marquee là lớp trang trí: animation tuyến tính nhẹ, không thay thế nội dung chính; dừng hoặc chuyển thành dòng tĩnh khi reduced motion.
- Không nhân đôi nội dung truy cập được khi clone marquee để loop: bản clone dùng `aria-hidden`.
- Reveal section bằng opacity/translate nhỏ khi bước vào vùng nhìn; có thể chỉ chạy một lần để không gây nhấp nháy khi người dùng cuộn ngược.
- Chiều cao section theo nội dung và khoảng đệm, không bắt buộc full screen.

## 6. Ảnh 4 — chương concept / showcase

### Quan sát được

- Header vàng vẫn nằm trên cùng; phía dưới còn thấy một vùng nền đen.
- Một khối section vàng rất lớn với hai góc trên bo tròn đang chiếm phần lớn màn hình. Nó tạo cảm giác một lớp mới chồng lên chương đen trước đó.
- Nội dung nằm khá thấp trong ảnh: cột trái là stepper “01 — 02 — 03”, nhãn nhỏ, headline, mô tả, danh sách ba dòng và một tag pill.
- Cột phải là khung demo gần đen, tỉ lệ hình chữ nhật ngang vừa phải, bo góc.
- Mascot và bubble đứng gần góc trên phải khung demo.
- Dưới cùng có hình số rất lớn, độ tương phản thấp, bị crop bởi mép viewport.

### Chuyển sang portfolio

- Cấu trúc phù hợp để trình bày “Concept → Visual system → Applications” hoặc ba quyết định art direction của cùng một project.
- Copy trái giải thích quyết định, artwork phải cho thấy kết quả; mỗi bước cần có visual tương ứng.
- Con số nền lớn tạo phân lớp và nhịp, không phải thông tin bắt buộc để hiểu bài.
- Bản local có thể dùng artwork demo được ghi rõ; không biến ảnh UI tham chiếu thành hình sản phẩm thực của người dùng.

### Đề xuất triển khai JS

- Có thể làm một đoạn sticky ngắn cho media/mascot trong khi copy chuyển bước; chỉ pin ở đoạn thật sự cần điều phối câu chuyện.
- Stepper có active state được điều khiển bởi các mốc cuộn của từng bước; nếu cho click thì nhảy đến bước tương ứng.
- Card vàng “đi lên phủ nền đen” có thể đạt bằng bố cục section thông thường + border-radius, hoặc sticky có giới hạn. Ảnh tĩnh chưa đủ chứng minh phương pháp của website gốc.
- Khi bước thay đổi, đổi media bằng crossfade hoặc dịch chuyển nhẹ. Không dùng fade làm biến mất toàn bộ nội dung nếu ảnh chưa tải xong.
- Trên mobile, text trước và media sau; bỏ pin nếu pin làm nội dung vượt chiều cao khả dụng.

## 7. Ảnh 5 — quy trình / ba bước

### Quan sát được

- Phần trên ảnh còn thấy đuôi section vàng trước đó, bao gồm chồng card và CTA của website gốc.
- Section đang đọc nền ivory. Nhãn chương + headline ở trái, đoạn tóm tắt ở phải.
- Bên dưới là ba card vàng đặt ngang bằng nhau. Mỗi card có số/bước mờ, title đậm và đoạn mô tả.
- Card viền đen mảnh, bo góc rộng, khoảng cách đều.
- Dưới card là divider ngang mảnh và một dòng monospace kết luận.
- Mascot đứng phía trên phải card thứ ba; dot nav active ở “HOW WE WORK”.

### Chuyển sang portfolio

- Đây là chương làm rõ tư duy Art Director: Research / Direction / Craft, hoặc các bước đúng với dự án thực tế.
- Mỗi card nên nêu một quyết định có tác động, tránh chỉ liệt kê phần mềm đã dùng.
- Với case study, nếu đã có quy trình riêng thì dùng nội dung đó thay vì áp dụng ba bước cố định vào mọi project.

### Đề xuất triển khai JS

- Reveal ba card theo thứ tự nhẹ, vẫn để cả ba đọc được sau khi hiện.
- Hover chỉ nâng/đổi tương phản vừa đủ; không tạo affordance click khi card không có nội dung mở rộng.
- Mobile xếp một cột, không ép carousel nếu không cần; giữ số bước để đọc đúng trình tự.
- Section có chiều cao tự nhiên. Thông tin không được crop bởi `overflow-hidden` và `height: 100vh` khi màn hình thấp hoặc text dài.

## 8. Ảnh 6 — statement / cao trào và đường đi tiếp

### Quan sát được

- Nền gần đen, headline vàng rất lớn ở trái; nhãn nhỏ phía trên và copy phụ màu ivory phía dưới.
- Bên phải là hình hạt lớn có chiều sâu, bị crop nhẹ ở rìa.
- Background có các điểm và đường nối rất nhẹ.
- Mascot ở giữa vùng text và artwork, đổi thành hạt vàng cho hợp nền tối.
- Dot active và text chuyển sáng để đọc được trên đen.
- Dưới section tối là một dải vàng lớn với “Selected work”, rồi tiếp tục tới phần tối khác. Một lần nữa, nhiều section cùng xuất hiện trong một viewport.

### Chuyển sang portfolio

- Đây là chương kết quả hoặc statement chốt ý tưởng. Có thể dùng một thông điệp sáng tạo, một key visual lớn và kết quả thực tế được cung cấp.
- Không tự bịa số liệu hiệu quả/giải thưởng/khách hàng để làm mạnh phần kết.
- Dải “Selected work” nên chuyển thành “Next project” hoặc “More selected work” để người xem tiếp tục duyệt portfolio.

### Đề xuất triển khai JS

- Artwork có thể phản ứng nhẹ theo scroll progress, còn typography ưu tiên đọc được.
- Đổi màu mascot và progress UI theo section active; không chỉ dựa vào `mix-blend-difference` nếu nó làm nút/viền khó kiểm soát.
- Giới hạn mật độ hạt nếu dựng bằng canvas; canvas trang trí phải `aria-hidden` và không chặn input.
- Dừng animation ngoài viewport hoặc khi tab ẩn để giảm tải.

## 9. Hệ JS/UX đề xuất cho bản local

### A. Điều khiển màn chọn project

Nguồn dữ liệu nên là danh sách project có `slug`, `title`, `category`, `year`, màu nhận diện và bộ nội dung story. Selector đọc dữ liệu này; từng project có route trực tiếp. Thay asset về sau không cần viết lại controller.

Trạng thái cần có: project active, trạng thái transition, có bật reduced motion hay không. Không dùng tên project để vừa làm nội dung vừa làm khóa điều hướng.

### B. Cuộn theo câu chuyện

- Duy trì native scroll để trackpad, touch, bàn phím, PageDown và tìm trong trang hoạt động như kỳ vọng.
- `IntersectionObserver` có thể xác định chương active. Khi hai chương cùng hiện, chọn chương gần điểm tham chiếu khoảng 40–50% viewport để dot nav không đổi quá sớm.
- Scroll progress toàn trang = `scrollY / (documentHeight - viewportHeight)`; luôn bảo vệ mẫu số 0 và clamp về 0…1.
- Progress trong section nên đo theo bounding rect của section, rồi clamp vào khoảng cần dùng cho chuyển động.
- Dùng một vòng `requestAnimationFrame` hoặc motion value để cập nhật transform, không set React state cho từng pixel cuộn.
- Chỉ set state khi active chapter thay đổi. `scroll` listener phải passive và được cleanup khi unmount.
- Remeasure sau resize/font/media load nếu đường di chuyển phụ thuộc kích thước.
- Scroll animation phải có giới hạn rõ: nhập/chuyển/ra, không chuyển động liên tục khiến người đọc không giữ được vị trí.

### C. Mascot/icon đồng hành

- Có thể triển khai một icon tạm dạng SVG/CSS với interface độc lập, để thay icon final mà không viết lại logic.
- Định nghĩa anchor theo chương: hero trên giữa; brief cạnh headline; concept trên media; process cạnh card cuối; result giữa text và media.
- Chuyển giữa anchor bằng interpolation hoặc spring nhẹ, không teleport khi active chapter đổi.
- Đường đi cần né header, headline, các nút tương tác và dot navigation; mascot nằm ở lớp trang trí `pointer-events: none` nếu không có hành động thật.
- Bubble ngắn gắn với chương; trên mobile dùng nhãn cố định nhỏ hoặc ẩn bubble để không phủ nội dung.
- Pointer-follow mắt là hiệu ứng phụ trên thiết bị có con trỏ chính xác; không chạy như một điều kiện để dùng website.
- Reduced motion: mascot ở anchor ổn định, bỏ xoay/float/particle; nội dung và tiến độ vẫn đầy đủ.

### D. Tiến độ và điều hướng

- Mỗi section có `id` ổn định và heading liên quan.
- Dot là button/link có tên truy cập được, hover/focus hiện nhãn và `aria-current` báo chương active.
- Dùng `scroll-margin-top` để heading không bị header che khi nhảy tới anchor.
- Home/back trả về màn chọn đúng project trước đó khi có thể; không reset người dùng vào lựa chọn ngẫu nhiên.
- Project deep link tải trực tiếp được, refresh không mất nội dung, nút Back hoạt động bình thường.

### E. Responsive và input

- Desktop: dock ở giữa đáy, layout hai cột, dot nav ở mép phải.
- Tablet: giảm headline bằng `clamp`, media/text đổi tỉ lệ khi cần, giữ khoảng tránh dot nav.
- Mobile: xếp một cột, dock cuộn ngang hoặc gọn hơn, thanh tiến độ ngang nếu dot dọc quá chật.
- Không khóa cuộn chỉ vì đang hover project/card. Mọi hành động chính đều dùng được bằng touch.
- Tương phản text/metadata đủ đọc trên cả ba nền; trạng thái active không chỉ khác màu.

## 10. Các thiếu sót của mã nguồn ban đầu

Đây là nhận xét về mã nguồn tại thời điểm khảo sát, trước khi root agent chỉnh sửa.

| Khu vực | Hiện trạng | Tác động | Hướng xử lý |
| --- | --- | --- | --- |
| Project data | Có 5 tên nhưng mọi link đều đến `/projects/example` | Không thực sự xem được project đã chọn | Tách dữ liệu theo slug, route động hoặc mapping thực |
| Selector | State chỉ thay title khi hover | Không có selected state bền vững; touch kém | Tách chọn project khỏi mở project |
| Prev/next | Button chưa có handler | Control có vẻ tương tác nhưng không hoạt động | Kết nối index, wrap và keyboard |
| CTA | Luôn mở example | Không phản ánh lựa chọn | URL lấy từ project active |
| Skip/sound | Text hoặc button chưa có chức năng | Gây kỳ vọng sai | Triển khai hành động thật hoặc bỏ UI dư |
| Story layout | Tất cả section `sticky top-0 h-screen overflow-hidden` | Dễ chồng lớp, crop nội dung ở mobile; không giống flow có ranh giới section trong ảnh | Section tự nhiên, chỉ pin đoạn cần thiết |
| Scroll progress | `useScroll` và `useTransform` được import nhưng chưa dùng | Chưa có chuyển động bám cuộn | Controller progress thực và mascot theo chương |
| Dot nav | Các dot trang trí tĩnh, `pointer-events-none` | Không báo active đúng, không nhảy chương | Active section observer + anchor |
| Story content | Chỉ có bốn section, thiếu cấu trúc showcase ảnh 4 | Câu chuyện và media chưa đầy đủ | Thêm concept/showcase có media và trình tự |
| Header links | `/work`, `/faq` chưa thấy route tương ứng | Có khả năng 404 | Anchor thực hoặc route hoàn chỉnh |
| Artwork | Chữ “LIVE” và mắt placeholder | Chưa thể hiện portfolio Art Director | Artwork demo có chủ ý, dễ thay bằng asset final |
| Accessibility | Dock item không có label rõ | Bàn phím/trình đọc màn hình không biết project | Label, focus, semantics, reduced motion |

## 11. Checklist nghiệm thu bản local

### Luồng và nội dung

- [ ] Mở trang vào đúng màn selector và thấy dock ngay ở viewport desktop/mobile.
- [ ] Mọi project đều chọn được bằng chuột, touch và phím trái/phải.
- [ ] Preview, title và CTA đồng bộ với lựa chọn.
- [ ] Nút mở đi đến đúng project; URL mở trực tiếp và refresh hoạt động.
- [ ] Story đủ hero, brief, showcase, process, result và đường xem tiếp.
- [ ] Nội dung/visual demo được phân biệt với portfolio thật đang chờ cập nhật.

### Layout và chuyển động

- [ ] Header không che anchor hoặc headline.
- [ ] Nền vàng/ivory/đen tạo nhịp rõ; khoảng trắng được giữ như ảnh.
- [ ] Scroll native ổn định; không có section mất hoặc bị crop.
- [ ] Mascot theo chương, chuyển vị trí mượt, không che chữ hoặc nút.
- [ ] Dot active khớp chương khi cuộn xuôi/ngược và khi click anchor.
- [ ] Animation dừng/giảm khi reduced motion; nội dung luôn có thể đọc.
- [ ] Không bị tràn ngang ở màn hình nhỏ; dock không nằm ngoài vùng an toàn.

### Tương tác và kỹ thuật

- [ ] Tất cả button/link có tác dụng thật, focus nhìn thấy được.
- [ ] Không có route 404, lỗi console hoặc hydration warning trong luồng chính.
- [ ] Không dùng một React state update cho mỗi pixel cuộn nếu không cần.
- [ ] Cleanup event listener/RAF/observer khi đổi route.
- [ ] Build production qua; thử ít nhất một viewport desktop và một mobile.
- [ ] Kiểm tra lại bằng ảnh chụp và thao tác thực tế, không chỉ đọc source.

## 12. Những thứ cần thay sau khi chốt UX

- Tên hiển thị, bio, thông tin liên hệ và link mạng xã hội của Art Director.
- Danh sách project thật, client, năm, vai trò, credits và kết quả được xác nhận.
- Key visual, ảnh quá trình, ứng dụng, video/motion và alt text.
- Mascot/icon final; giữ cùng interface để cắm vào chuyển động có sẵn.
- Font và palette thương hiệu nếu muốn tách khỏi màu vàng của reference.

Các mục này không ngăn việc hoàn thiện flow và motion local; chúng là dữ liệu/asset thay thế sau khi bố cục và UX được duyệt.
