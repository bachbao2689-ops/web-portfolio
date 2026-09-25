# Behance → local portfolio

Reference: https://www.behance.net/gallery/245519605/Portfolio-2026-Bach-Bao
Reviewed 25 September 2026. The web reader could not fetch the page; it was successfully inspected in the browser. All 16 image modules were obtained from their observed public image URLs and visually reviewed alongside all supplied PNGs and rendered PDF pages.

## Original layout and reading order

1. Cover: wide wordmark composition with the name inserted into the portfolio title.
2. About: portrait and contact at left; introduction in the middle; education, experience and software at right.
3. Nestlé P’tit: numbered, narrow introduction column on the left, larger campaign board on the right.
4. Packaging: large pack mockup against a narrow, tall unfolded packaging panel.
5. Motion: two horizontal storyboard strips. These are still images, not supplied video.
6. Social: three larger hero compositions above smaller supporting content.
7. MILO ERUN: numbered introduction and green campaign board.
8. Certificate and medal: two physical applications side by side.
9. Social: six compositions in a regular 3 × 2 grid.
10. Skinology: introduction plus concept/combo board; large photography above three smaller visual directions.
11. Stop-motion: consecutive overhead frames arranged horizontally.
12. Lifestyle: asymmetrical photo collage with changes of scale and overlapping visual rhythm.
13. Skincare steps: ordered product-routine grid.
14. E-commerce: long vertical collection. Category opener → paired campaigns → campaign grid → mobile detail pages → Maggi commerce → product information systems.
15. Amazon: separate numbered “Less Is More” case, descriptive left column and six product creatives at right.
16. Closing thanks.

The large boards already contain designed compositions. Cropping all of them into uniform square cards would discard captions and break the layouts. Full case-study boards therefore keep intrinsic aspect ratios; cover crops are separate exports and never replace their originals.

## Asset mapping

| Case | Source | Local adaptation |
| --- | --- | --- |
| Nestlé P’tit | Behance modules 3–6 | Original order: campaign, packaging, storyboard, social. Not the same artwork as Gerber. |
| MILO ERUN | `Milo` + `Maggi/visual element.png` | Campaign, visual ingredients, certificate/medal, social. The misplaced visual-element file is MILO artwork; the MILO PDF confirms it. |
| Skinology | `Cosmetic` | Concept, stop-motion stills, lifestyle collage, skincare sequence. Matches Behance order. |
| E-commerce | `Ecom/Documentation.png`, `1.png`–`5.png` | Native vertical story with each board legible at full content width. |
| Amazon | `Ecom/6.png`, Behance module 15 | Separate case as in Behance, preserving the six-image grid. |
| Gerber × P’tit | `Doc img` | Additional case: ingredient typography, packaging faces and social launch. |
| Bạn & Maggi | `Maggi` | Campaign, commerce, cooking/finished-food grids, banner and voucher modules. |
| Gánh Hội | `Official Gánh Hội_PAA.pdf` | Cover, story, craft, gift collection, materials and brand applications. Portrait pages remain portrait; desktop pairs offset vertically, mobile reads one column. Sales pricing/order-policy pages are omitted from the portfolio story. |

The raster documentation PDFs duplicate supplied PNG boards (except Gánh Hội). PSD files were not flattened because the corresponding exported boards already exist. Original source files are untouched.

## Interaction and JavaScript

- Existing Next.js routes, yellow/black identity, About position, project selector and glyph guide are retained.
- Selector now has 8 real project covers, keyboard arrows, swipe and remembered selection. On narrow screens its thumbnail row scrolls independently and follows the active project.
- Each project has 3 case-specific stages. Framer Motion `useScroll` maps normalized section progress to a stage index; opacity transitions change real artwork and explanatory copy. Phase buttons navigate to the appropriate scroll position.
- Screens below 680px high use the existing unpinned mode, with explicit phase selection so content is not trapped below a sticky viewport.
- The chapter navigation and guide still follow the same 6-section document flow. Gallery height is included in reading progress.
- Gallery images use intrinsic width/height and Next Image responsive delivery. Content boards use `object-fit: contain`, not cover cropping. Only circular dock thumbnails are cropped.
- Native dialog opens any hero, phase or gallery artwork. Escape, close button and backdrop close it. Body scroll is locked while open; the full-image link allows closer inspection of dense boards.
- Reduced-motion preference remains available. Decorative transforms and transitions respect the existing preference; native scrolling stays user-controlled.

## Content choices

Descriptions summarize visible work rather than infer dates or exact personal responsibilities. “Portfolio 2026” is the edition, not a date claim for every campaign. Existing outcome statistics remain inside supplied artwork; no new performance claims or awards are added to site copy. About text follows the Behance introduction's branding/visual-identity/digital focus and “less is more” approach. Branding remains BART, with Bach Bao and BART — Senior Art in About.

## Files

- `src/data/projects.ts`: ordered cases, image descriptions, storytelling and galleries.
- `src/data/project-assets.json`: image dimensions and web paths.
- `scripts/prepare-project-assets.mjs`: deterministic WebP export from local boards and audited reference images.
- `public/projects/`: 53 web image exports. Full boards are resized to at most 1920px width; original files are preserved.
- `tmp/asset-audit/`: temporary source renders and contact sheets used for review.

## Verification

- TypeScript and ESLint passed; production build generated all 8 case routes.
- All 53 WebP exports exist and their dimensions match the manifest (10.5 MB total before responsive delivery).
- Browser checked desktop homepage, project entry, phase navigation, artwork dialog and Escape close, and portrait editorial gallery.
- 390 × 844 mobile checked homepage, 8-project dock navigation, Gánh Hội hero and sticky stage. No horizontal document overflow or broken loaded images was observed.
