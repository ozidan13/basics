# Implementation Plan: CodeHub Interactive Lesson Studio UI/UX Redesign

- **Status**: Complete (Implemented and verified directly on `main` per user instruction)
- **Source Request**: Redesign and refine the existing CodeHub Arabic-first interactive lesson interface (`lect01.html`–`lect04.html` built from the shared `lesson-shell.html` engine) into a restrained, developer-grade 2026 coding workspace while preserving 100% of existing learning workflows, state, XP/progress calculations, and lesson data.
- **Date**: 2026-11-26
- **Active Branch**: `main` (user explicitly instructed not to create a new branch)

---

## 1. Main Task

Redesign the CodeHub interactive lesson studio shell (`lesson-shell.html`) and repack all four Basics lectures (`lect01.html`–`lect04.html`) into a calm, editorial, developer-grade Arabic-first coding workspace—featuring a restrained dark token system, a collapsible/drawer-capable 300–320px chapter sidebar, consolidated lesson header/tabs, an unboxed editorial reading pane, and a unified code-editor + inspector + live-preview lab—without breaking any existing learning mechanic, XP/progress persistence, keyboard shortcut, or TaskViewer iframe constraint.

---

## 2. Verified Project Baseline

- **Primary Reference**:
  - `d:\work\projects\basics` has no local `CODEHUB_REFERENCE.md`, `README`, `AGENTS.md`, or `package.json`.
  - Verified authoritative runtime host reference in sibling repo `d:\work\projects\codehub\CODEHUB_REFERENCE.md` (Section 8 `Student Dashboard`, Section 35 `/lesson-game` Studio & Publish-by-Replacement Rule): `basics` is deployed to GitHub Pages (`https://ozidan13.github.io/basics/`) and embedded inside CodeHub's `TaskViewer.tsx` sandboxed `<iframe>` (`sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"`), where the bottom submission panel is open by default (`1366×374`, `1280×347`, `390×417`).
- **Current Git Branch**: `main` (tracking `origin/main`)
- **Current Git Head**: `2291712` (`Include Practical Projects section in upgraded studio portal`) — working tree verified clean.
- **Key Files & Runtime Paths Inspected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html` (1,793 lines, `104.5 KB` raw / `28.0 KB` gzipped) — Shared zero-dependency single-file HTML/CSS/JS engine packing all 4 lectures. Contains:
    - Top bar (`.topbar`, `56px`) with `.brand`, `.prog-ring-chip`, `.stat-pill.xp`, `.stat-pill.combo`, `#navRecall`, `#navSummary`.
    - 2-pane `.studio` grid (`clamp(244px, 19.8vw, 292px) minmax(0, 1fr)`), `.rail` (sections list, always unlocked), and `.workspace` (`.ws-header`, `.sub-bar`, `.ws-body`, `.ws-dock`).
    - Explain mode (`renderExplainMode`): 2-column `.doc-grid` with `.doc-card`, `.callout`, `.info-cards`, `.doc-table`, `.win-frame` (interactive `.spot` X-ray tokens), `.spot-readout`, `.console-frame`, and `.browser-frame`.
    - Play mode (`renderPlayMode`): all 8 interactive mechanics (`explore`, `choice`, `slot`, `buckets`/`wireframe`, `order`, `bughunt`, `match`, `patch` live HTML/CSS/JS editor), Boss 3-heart mode, Recall flashcards, Submission Summary, localStorage persistence (`lg2:<lesson.id>:v1`), and built-in `window.__LG_QA()`.
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\scripts\lesson-tool.mjs` — Deterministic `pack` and `lint` CLI enforcing: `≤ 260 KB` raw packed HTML, shell `≤ 30 KB` gzip warning threshold, `lang="ar" dir="rtl"`, allowlisted external hosts (`fonts.googleapis.com`, `fonts.gstatic.com` only), and zero forbidden sandbox APIs (`alert`, `confirm`, `prompt`, `navigator.clipboard`, `window.top`, `parent.location`, `scroll` listeners, Tailwind/AOS/FA CDNs).
  - `lect01.lesson.json` → `lect01.html` (`171.1 KB`, 10 sections, 34 stages, 8 mechanics, 10 recall cards).
  - `lect02.lesson.json` → `lect02.html` (`195.1 KB`, 11 sections, 42 stages, 7 mechanics, 10 recall cards).
  - `lect03.lesson.json` → `lect03.html` (`173.1 KB`, 11 sections, 34 stages, 7 mechanics, 10 recall cards).
  - `lect04.lesson.json` → `lect04.html` (`164.5 KB`, 10 sections, 31 stages, 7 mechanics, 10 recall cards).
  - `draft/lect01.html`–`draft/lect04.html` — Original reading versions linked via `LESSON.readUrl`.
  - `index.html` — Course portal linking `lect01.html`–`lect04.html`, `draft/lect01.html`–`draft/lect04.html`, and `project-one/`–`project-four/`.
  - Rendered visual baseline audited at `1440×900` and `390×736` (`lect01`–`lect04` screenshots from prior QA pass).
- **Verified Visual & UX Gaps in Current Implementation (Confirmed in Code + Rendered Screenshot)**:
  1. **Header visual noise & ambiguous progress**: `.topbar` (`56px`) has a glowing gradient bottom hairline (`.topbar::after`), heavy gradient brand glow, and `.prog-ring-chip` renders an almost-empty dark circle at `0%` that resembles an inactive toggle switch rather than a clear progress metric.
  2. **Sidebar width, decorative stars, and missing collapse/drawer**: `.rail` caps at `292px` (target `300–320px`), shows 3 dimmed decorative stars (`★★★`) on every uncompleted chapter, uses a heavy gradient/shadow box on `.sec-tab.active` plus a noisy green `✓ كلها مفتوحة` pill, lacks a desktop collapse/expand control, and collapses into a cramped horizontal scrolling strip `< 960px` instead of an accessible RTL slide-over drawer.
  3. **Competing horizontal bars above workspace**: `.ws-header` (title + mode switcher + geometric SVG deco) + `.sub-bar` (floating pill strip + topic counter) stack two heavy bars above the content, while `.doc-card h2` visually competes with `.ws-header h1`.
  4. **Over-containerized reading column & loud inline code**: Every doc section wraps prose in a bordered gradient `.doc-card`, uses bright yellow `<code>` pills (`#fde68a` with orange border) that interrupt Arabic reading flow, and lacks a comfortable constrained reading measure (`max-width: 62ch`).
  5. **Disconnected coding lab & noisy dashed code outlines**: `.win-frame`, `.spot-readout`, and `.browser-frame` render as 3 separate floating cards with gaps; clickable `.spot` elements use heavy pulsing dashed orange outlines (`border: 1px dashed; animation: spotPulse`) that hurt code legibility; code blocks lack line numbers; macOS traffic-light dots repeat twice in the same column; and Arabic text inside HTML tags (`<h1>أهلاً بيك!</h1>`) exhibits BiDi punctuation inversion (`!</h1>`).
  6. **Excessive accent competition**: Current dock primary CTA uses a bright emerald→cyan gradient, active chrome uses orange/purple/yellow per-lecture gradients, and callouts use strong tinted fills all in the same viewport.
  7. **Browser preview connection**: `.browser-frame` is visually detached from the editor above it and uses a bright green footer bar (`#ecfdf5`) that competes with the primary dock CTA.

---

## 3. Scope & Requirements

### Required Outcomes
- [x] **Outcome 1 — Calm, Unified Token System**: Implement the restrained 2026 dark developer palette (`#080D18` main, `#0D1524` secondary, `#131F32` surface, `#19263B` elevated, `#273750` 1px borders, `#F3F6FC` primary ink, `#A5B4CC` secondary ink) with strict semantic color roles: Cyan `#35C5E5` (interactive hierarchy), Amber `#F5AD28` (progress, XP, selected highlights/insights), Emerald `#24C995` (completion/success), Coral Red `#F16B70` (errors only).
- [x] **Outcome 2 — Refined Global Header**: Compact (`48–50px`), visually quiet bar with sidebar toggle, clean course identity, legible linear progress readout (`التقدّم` bar + solved count/percentage), compact Amber XP indicator, and unified-height (`32px`) secondary utilities (`مراجعة`, `ملخص التسليم`).
- [x] **Outcome 3 — Redesigned Collapsible Chapter Sidebar & Drawer**: `308px` width on large desktop (`≥ 1120px`), smooth collapse/expand toggle with persisted preference, clear 3-state chapter styling (Completed / Active / Upcoming), zero decorative empty rating stars, tighter vertical rhythm, refined custom thin scrollbar, and accessible slide-over RTL drawer on medium (`< 1120px`) and mobile (`< 768px`) screens.
- [x] **Outcome 4 — Consolidated Lesson Header & Underline Sub-Tabs**: Merge competing bars into one coherent lesson header (section label + lesson title + restrained mode switcher) directly anchored to clean underline sub-topic/challenge tabs, eliminating visual bar clutter and heading duplication.
- [x] **Outcome 5 — Editorial Arabic/RTL Learning Column**: Comfortable reading measure (`max-width: 62ch`), balanced Arabic typography weights (`IBM Plex Sans Arabic` 400/500/600 + `Readex Pro` 600/700 for display), clean LTR-isolated inline technical terms & subtle inline code chips, restrained contextual insight blocks, and crisp 1px-bordered reference cards/tables.
- [x] **Outcome 6 — Unified Interactive Coding Lab**: Merge Code Editor + Contextual Code Inspector + Live Browser Preview (or JS Console) into **one cohesive split-panel coding environment** with a clean IDE toolbar, monospace line-number gutter, calm readable syntax highlighting, subtle underline/tint interactive token highlights (replacing heavy dashed pulsing outlines), accurate BiDi isolation inside code lines, and an authentic browser toolbar + live status dot connecting code to preview.
- [x] **Outcome 7 — Cohesive Play Mode, Dock & Interaction States**: Apply the same restrained design language and complete interaction-state matrix (default, hover, active, selected, focused, disabled, completed, success, error, loading) across all 8 game mechanics, Boss mode, Recall flashcards, Summary view, and the bottom navigation dock, with subtle `140–200ms` transitions respecting `prefers-reduced-motion`.
- [x] **Outcome 8 — Verified Multi-Lecture Rollout**: Repack `lect01.html`, `lect02.html`, `lect03.html`, and `lect04.html` cleanly with `lesson-tool.mjs`, passing `0` lint errors/warnings and `0` viewport/console regressions across desktop (`1440×900`, `1366×660`), TaskViewer short iframes (`1366×374`, `1280×347`), tablet (`768×916`), and mobile (`390×736`, `390×417`).

### In-Scope Behavior
- Redesigning CSS tokens, layout grid, SVG icon set, component markup, and interactive UI state logic (sidebar collapse + responsive drawer + code line-number gutter + unified coding lab) inside `lesson-shell.html`.
- Fixing BiDi rendering of Arabic text inside LTR code snippets in `lesson-shell.html` (wrapping non-tag text segments safely with `unicode-bidi: isolate` when needed).
- Repacking `lect01.html`, `lect02.html`, `lect03.html`, and `lect04.html` from their existing `lect01.lesson.json`–`lect04.lesson.json` sources.
- Verifying visual craftsmanship via Playwright screenshots at `1440×900` (primary desktop reference), `1024×768` (medium drawer), `1366×374` (TaskViewer iframe), and `390×736` (mobile), refining spacing/alignment/contrast before completion.

### Explicit Non-Goals
- No edits to lesson educational content, questions, or JSON schemas (`lect01.lesson.json`–`lect04.lesson.json`), unless a tiny BiDi punctuation fix is strictly required and logged.
- No changes to XP calculation formulas, streak multiplier logic, Boss 3-heart rules, or `localStorage` persistence key format (`lg2:<lesson.id>:v1`)—existing student progress must carry over seamlessly.
- No changes to `draft/lect01.html`–`draft/lect04.html`, `lect01script.html`–`lect04script.html`, `lect0*_youtube_seo.md`, or `project-one/`–`project-four/`.
- No changes to `index.html` unless separately requested after reviewing the lesson studio (keep scope tightly focused on the lesson interface).
- No new frameworks, build tools, npm packages, or external CDN dependencies.
- No merging to `main` or pushing to `origin` without separate user authorization.

### Technical and Product Rules
- **Single-file self-contained output**: All CSS, JS, SVGs, and JSON payload inline in each packed `lect0N.html`; only `fonts.googleapis.com` and `fonts.gstatic.com` allowed externally.
- **Budgets (enforced by `lesson-tool.mjs`)**: Packed HTML `≤ 260 KB` raw; engine shell `≤ 30 KB` gzipped.
- **Sandbox & Viewport Laws (L1–L12)**:
  - Root `html, body { height: 100%; overflow: hidden; }` (`0` document scroll on desktop, TaskViewer iframe, tablet, and mobile); bounded internal panes scroll independently (`overscroll-behavior: contain`).
  - Zero `alert()`, `confirm()`, `prompt()`, `navigator.clipboard`, `window.top`, `parent.location`, or `window` scroll listeners.
  - `<html lang="ar" dir="rtl">`; all code surfaces `dir="ltr"` with `unicode-bidi: isolate`.
- **Visual Restraint Rules**:
  - Consistent `1px` `#273750` borders; radii strictly `8px–14px` (pills reserved only for tiny status indicators); zero glowing borders, zero multi-accent gradients on the same component, zero decorative empty stars, zero unnecessary animations.
  - One primary interactive accent per component (Cyan `#35C5E5` for primary/interactive, Amber `#F5AD28` for rewards/progress/selected highlight, Emerald `#24C995` for completion/success, Coral `#F16B70` for error).
- **Accessibility & Motion**:
  - Visible keyboard focus ring (`2px solid #35C5E5`), `aria-expanded` / `aria-controls` on sidebar toggle & drawer, `Esc` closes drawer/modal and restores focus, `aria-live="polite"` feedback dock, `≥ 40–44px` touch targets on mobile, full `prefers-reduced-motion` support.

### Existing Functionality to Preserve
- All 10–11 open sections per lecture (zero linear locks; 1-click navigation to any section, sub-topic, or challenge).
- Explain (`افهم الشرح`) ↔ Practice (`العب وطبّق`) mode switching + `راجع الشرح` quick link in the Play dock.
- All 8 game mechanics (`explore`, `choice` with live browser preview options, `slot`, `buckets` columns & 2D `wireframe`, `order` with drag + `▲`/`▼`, `bughunt`, `match`, `patch` live HTML/CSS sandboxed `srcdoc` iframe + JS real-time requirement checklist).
- Pointer Events drag-and-drop with tap-to-pick/tap-to-place fallback and input-safe keyboard shortcuts (`Enter`, `H`, `1–4`, `Esc`).
- Boss 3-heart retry flow, 3-miss progressive help (why → hint → reveal), Recall spaced-retry flashcards, Submission Summary view, `نسخة القراءة` external link, and `window.__LG_QA` / `?qa=1` self-auditor.

### Working Assumptions
1. **Color Identity Across All 4 Lectures (Reversible Decision)**: Following Section 4 of the brief (*"Cyan should establish interactive hierarchy. Amber should identify rewards, progress, and selected learning highlights. Green should indicate success. Red for errors. Avoid using multiple bright accents on the same component"*), we will standardize the workspace chrome across all 4 lectures onto this unified **CodeHub Signature Palette** (`#080D18` / `#0D1524` / `#131F32` / `#19263B` / `#273750` + Cyan `#35C5E5` + Amber `#F5AD28` + Emerald `#24C995` + Coral `#F16B70`), while keeping each lecture's unique subject emblem icon (`IT`, `HTML`, `CSS`, `JS`) in the header brand mark for subtle course distinction. *(If you prefer per-lecture accent overrides on the active indicator instead of unified Cyan, let me know before Phase 2.)*
2. **Primary Visual Reference**: The redesign targets the exact CodeHub interactive lesson screen (`lect02.html` Explain + Play studio and its siblings `lect01`, `lect03`, `lect04`), which are all generated from `lesson-shell.html`.
3. **Typography Stack**: Keep `IBM Plex Sans Arabic` (body/UI, weights `400;500;600;700`) + `Readex Pro` (editorial display headings, weights `500;600;700`) + `JetBrains Mono` (code editor & monospace metadata, weights `400;500;600`), reducing over-bolding (`600` for headings/active labels, `400/500` for body/UI) for sharper hierarchy.
4. **Sidebar Collapse Persistence**: Store desktop collapse preference separately (`lg2:ui:railCollapsed`) so student lesson progress keys (`lg2:basics-lect0X:v1`) remain untouched.

### Blockers / Open Questions
- **No hard blockers.** Two optional preferences you may confirm before authorizing implementation:
  1. **Unified Palette vs Per-Lecture Accents**: Confirm whether all 4 lectures should use the unified CodeHub Cyan/Amber/Emerald system (recommended for visual discipline) or retain per-lecture accent tints on the brand badge only.
  2. **Portal (`index.html`) Alignment**: Confirm whether `index.html` should stay untouched in this task (default non-goal) or receive a light token-alignment pass in Phase 5 to match the new `#080D18` / `#35C5E5` / `#F5AD28` surfaces.

---

## 4. Change Map

| Area / Component | Target Files | Reason & Nature of Change |
| :--- | :--- | :--- |
| **Shared Studio Design System & Engine Shell** | `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html` | Single source of truth for CSS tokens, typography scale, refined SVG icons, compact Global Header, collapsible 308px Chapter Sidebar + responsive RTL Drawer, consolidated Lesson Header + underline tabs, unboxed Editorial Reading Column, Unified Coding Lab (line-numbered editor + subtle token highlights + docked inspector + realistic live browser/console preview), refined Play Mode mechanics, and clean bottom Action Dock. |
| **Packed Lecture 01** | `lect01.html` | Repacked deterministically from `lect01.lesson.json` + redesigned `lesson-shell.html`. |
| **Packed Lecture 02** | `lect02.html` | Repacked deterministically from `lect02.lesson.json` + redesigned `lesson-shell.html` (primary screenshot reference). |
| **Packed Lecture 03** | `lect03.html` | Repacked deterministically from `lect03.lesson.json` + redesigned `lesson-shell.html`. |
| **Packed Lecture 04** | `lect04.html` | Repacked deterministically from `lect04.lesson.json` + redesigned `lesson-shell.html`. |
| **QA & Plan Artifact** | `docs/codehub-lesson-studio-redesign-implementation-plan.md` | Living phased plan updated as steps and validation gates complete. |
| **Protected / Untouched** | `lect01.lesson.json`–`lect04.lesson.json`, `draft/*`, `project-one/`–`project-four/`, `lect0*script.html`, `lect0*_youtube_seo.md` | Preserved untouched to guarantee zero content, progress, or unrelated project regressions. |

---

## 5. Phased Implementation Plan

### Phase 1: Baseline Safeguards, Token System & Global Chrome (Header + Collapsible Sidebar/Drawer)
- **Objective**: Establish the dedicated branch, capture baseline QA metrics, replace the CSS design-token foundation with the restrained 2026 CodeHub palette/typography scale, redesign the Global Header, and rebuild the Chapter Sidebar with 308px desktop sizing, 3-state lesson rows (removing empty decorative stars), desktop collapse/expand, and an accessible RTL slide-over drawer.
- **Files Affected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html`
- **Implementation Steps**:
  - [x] 1.1: Create and switch to `codex/lesson-studio-ui-redesign` from clean `main`; verify `lesson-tool.mjs lint` baseline on `lect01.html`–`lect04.html`.
  - [x] 1.2: Replace `:root` CSS tokens in `lesson-shell.html` with the semantic token system (`--bg: #080D18`, `--bg-2: #0D1524`, `--surface: #131F32`, `--surface-hi: #19263B`, `--code-bg: #0A101D`, `--border: #273750`, `--border-hi: #344968`, `--text: #F3F6FC`, `--text-soft: #A5B4CC`, `--muted: #7486A3`, `--accent: #35C5E5`, `--amber: #F5AD28`, `--ok: #24C995`, `--bad: #F16B70`) and remove ambient radial mesh washes, glowing borders, and decorative header grid SVG (`#i-deco-grid`).
  - [x] 1.3: Refine typography scale and weights (`IBM Plex Sans Arabic` 400/500/600/700, `Readex Pro` 500/600/700, `JetBrains Mono` 400/500/600) with explicit scale tokens (`--t-h1`, `--t-h2`, `--t-body`, `--t-sm`, `--t-xs`, `--t-code`) avoiding over-bolding (`font-weight: 900` replaced by `600`/`700`).
  - [x] 1.4: Redesign `.topbar` (`50px` height, `#0D1524`, `1px solid #273750` bottom border): add sidebar collapse/drawer toggle button (`#railToggle`, `aria-expanded`, `aria-controls="rail"`), quiet course emblem + title/subtitle, clear linear progress meter (`التقدّم` thin bar + `solved/total` & `%` readout replacing the empty toggle-like circle), compact Amber XP readout (`0 XP`), and uniform `32px` ghost utility buttons (`مراجعة`, `ملخص التسليم`).
  - [x] 1.5: Redesign `.rail` (`308px` on `≥ 1120px`, `#0D1524` surface, `1px` `#273750` border):
    - Compact header with chapter count + desktop collapse icon button (remove noisy `✓ كلها مفتوحة` badge).
    - Tight, scannable chapter rows (`padding: 8px 10px`, `gap: 3px`) with clear 3-state semantics:
      - **Completed**: subtle `#24C995` check icon in index box + muted emerald solved ratio.
      - **Active**: `#19263B` fill + `2.5px` right-edge Cyan `#35C5E5` indicator bar + `#F3F6FC` `600` title (zero heavy orange gradient or drop shadow).
      - **Upcoming**: transparent row, `#131F32` muted number chip, `#A5B4CC` title, quiet `٠/٣` challenge count.
    - Remove decorative empty 3-star ratings completely (display real numeric progress `sc/tot` + completion check only).
    - Add independent smooth thin scrollbar + clean `نسخة القراءة` footer link.
  - [x] 1.6: Implement sidebar state & transitions:
    - Desktop (`≥ 1120px`): `.studio.rail-collapsed` smoothly transitions rail column from `308px` to `0px` (`180ms cubic-bezier(.22,1,.36,1)`), persisted in `localStorage` (`lg2:ui:railCollapsed`).
    - Medium/Mobile (`< 1120px`): `.rail` renders as an off-canvas right-side RTL slide-over drawer with dim backdrop (`.drawer-backdrop`), `Esc` key close, outside-click close, auto-close on chapter selection, and focus restoration to `#railToggle`.
- **Expected Behavior After Phase**:
  - Header is calm, compact, and unambiguous; progress looks like a real progress meter; sidebar scans cleanly at 308px without decorative star clutter and collapses smoothly on desktop or slides cleanly as a drawer `< 1120px`.
- **Review and Validation Gate**:
  - [x] `node lesson-tool.mjs lint lesson-shell.html` exits `0` with `0` errors and shell gzip `≤ 30 KB`.
  - [x] Verify desktop sidebar collapse/expand, drawer open/close via button/backdrop/`Esc`, and `0` horizontal overflow on `1440×900`, `1024×768`, and `390×736`.
- **Dependencies**: None

---

### Phase 2: Lesson Header Consolidation, Editorial Reading Column & Unified Coding Lab
- **Objective**: Eliminate competing horizontal bars above the workspace, transform the Right Column into a clean editorial Arabic/RTL reading environment, and merge the Left Column's code editor, contextual inspector, and live browser/console preview into one cohesive IDE-grade coding lab.
- **Files Affected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html`
- **Implementation Steps**:
  - [x] 2.1: Consolidate `.ws-header` + `.sub-bar` into a unified **Lesson Header** (`.ws-head`):
    - Top bar: quiet section index label (`القسم 02` in subtle monospace/secondary text, no bright pill) + `<h1>` lesson title + muted LTR English subtitle, paired with a restrained **Explain / Practice** segmented control (`#080D18` well, `#19263B` active segment, subtle `#35C5E5` icon/text tint, no heavy green/blue border glow).
    - Directly attached bottom **Underline Tab Strip** (`.ws-tabs`) for sub-topic tabs (`١. أول ملف HTML`, `٢. الـ Meta Tags المهمة`) in Explain mode and challenge tabs (`تحدي ١`, `تحدي ٢`…) in Play mode—active tab indicated by `#F3F6FC` weight `600`, subtle `#19263B` top tint, and a crisp `2px` bottom Cyan `#35C5E5` bar (replacing the separate floating `.sub-bar` pill strip).
  - [x] 2.2: Redesign **Right Column (Learning Content)** for editorial Arabic reading:
    - Remove heavy outer `.doc-card` gradient box wrapper; render content directly on the calm `#131F32` workspace surface inside a `max-width: 62ch` reading column with generous spacing (`padding: 20px 24px`).
    - Establish clear visual hierarchy between lesson `<h1>` (in header) and sub-topic `<h2>` (`16.5px`, `600`, muted divider below) so headings never feel duplicated.
    - Refine Arabic body text (`15px`, `line-height: 1.85`, `#CBD5E1` / `#F3F6FC` strong) and mixed Arabic/English inline `<code>` tokens (`direction: ltr; unicode-bidi: isolate; background: rgba(53,197,229,.08); border: 1px solid rgba(53,197,229,.18); color: #93DDF2; padding: 1px 6px; border-radius: 5px; font-size: .84em`)—calm and readable instead of loud yellow pills.
    - Redesign `.callout` notes (Analogy / Tip / Warning) into subtle contextual insight blocks (`background: #19263B`, `1px solid #273750`, crisp `2.5px` right semantic accent bar: Amber `#F5AD28` for analogy, Emerald `#24C995` for tip, Coral `#F16B70` for warning).
    - Refine `.info-cards` and `.doc-table-wrap` with clean `1px solid #273750` borders, flat layered `#0D1524` surfaces, and proper LTR alignment on code-only titles (`<!DOCTYPE html>`, `<head>`, `<body>`).
  - [x] 2.3: Build the **Unified Interactive Coding Lab (`.coding-lab`)** in the Left Column:
    - Single continuous container (`background: #0D1524`, `border: 1px solid #273750`, `border-radius: 12px`, `overflow: hidden`) housing three seamlessly joined regions separated by `1px solid #273750` hairlines:
      1. **Code Editor Pane**: Compact IDE header (`filename` tab + subtle language label `HTML`/`CSS`/`JS` + interactive progress badge `٠/٤ مفحوص`, removing decorative macOS traffic-light dots) + monospace code area (`#0A101D`) with a crisp **line-number gutter** (`1, 2, 3...` in `#566885`, `user-select: none`) and balanced syntax palette (tags `#6CE5B1`, attributes `#7CC4FA`, values `#F6B96E`, keywords `#F48FB1`, comments `#6E7F9B`).
      2. **Refined Interactive Code Highlights (`.spot`)**: Replace heavy pulsing dashed orange boxes with clean, low-noise code highlighting:
         - Default uninspected: soft translucent tint (`rgba(53,197,229,.10)`) + crisp `1.5px solid rgba(53,197,229,.5)` bottom underline (no `spotPulse` animation!).
         - Hover: `rgba(53,197,229,.18)` background.
         - Selected/Active: Amber `#F5AD28` highlight (`rgba(245,173,40,.16)` fill + `2px solid #F5AD28` bottom border + `#F3F6FC` text).
         - Inspected/Seen: subtle Emerald `#24C995` bottom underline (`rgba(36,201,149,.55)`).
         - Fix BiDi order on mixed Arabic text inside HTML tags (`<h1>أهلاً بيك!</h1>`) by isolating each line/text segment cleanly inside LTR `<code>`.
      3. **Docked Contextual Inspector Strip**: Directly under the code editor inside `.coding-lab` (`#131F32` strip, `1px` top border) showing the selected token title in Amber/Cyan monospace + clear Egyptian explanation (or subtle prompt before first click).
      4. **Integrated Live Browser Preview / Console Output Pane**: Lower section of `.coding-lab` separated by a refined toolbar (`#131F32` bar with subtle browser lock + address bar `file:///index.html` + small `#24C995` live status dot + «معاينة مباشرة» label), enclosing the crisp authentic white rendered HTML preview (removing the noisy mint-green footer bar). For JS docs with `d.console`, render the integrated dark Console Output pane (`Console · F12` header + monospace output lines).
  - [x] 2.4: Redesign the bottom **Lesson Navigation Dock** (`.ws-dock`, `52px`, `#0D1524`, `1px solid #273750` top border):
    - Clean Primary CTA (`background: #35C5E5; color: #080D18; font-weight: 700; height: 36px; border-radius: 10px`, zero rainbow gradient) vs quiet Secondary buttons (`#131F32`, `1px solid #273750`, `#A5B4CC` hover `#F3F6FC`).
    - Subtle centered contextual instruction/toast strip (`aria-live="polite"`, semantic border tint only on active feedback states).
- **Expected Behavior After Phase**:
  - Reading content and unified coding lab sit side-by-side in calm visual harmony; code is effortlessly readable with line numbers and subtle token underlines; clicking a code token immediately updates the docked inspector right below; browser preview clearly reads as the live output of the editor above.
- **Review and Validation Gate**:
  - [x] Pack `lect02.lesson.json` → test build and visually inspect `lect02` Explain view at `1440×900` side-by-side against the original screenshot reference.
  - [x] Verify BiDi rendering of Arabic inside HTML tags (`<h1>أهلاً بيك في أول صفحة!</h1>`), mixed RTL inline code, and `0` horizontal overflow.
- **Dependencies**: Phase 1

---

### Phase 3: Play Mode Mechanics, Unified Mini-IDE (`patch`), & Full Interaction-State Matrix
- **Objective**: Align all 8 interactive game mechanics, Boss mode, Recall flashcards, Submission Summary, modals, and keyboard/pointer feedback states to the exact same restrained design language and `140–200ms` micro-interaction system without altering any game logic or scoring.
- **Files Affected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html`
- **Implementation Steps**:
  - [x] 3.1: Define and wire consistent visual states across every interactive control (`button`, `.sec-tab`, `.ws-tab`, `.opt-btn`, `.chip`, `.slot-blank`, `.bucket`, `.order-row`, `.bug-tok`, `.m-btn`, `.ins-chip`):
    - **Default** (`#131F32`, `1px solid #273750`), **Hover** (`#19263B`, `#344968`, `150ms`), **Active** (`scale(.99)`, `120ms`), **Selected** (`#19263B`, `1px solid #35C5E5`, `rgba(53,197,229,.12)` fill), **Focused** (`2px solid #35C5E5`, `offset: 2px`), **Disabled** (`opacity: .42`, `cursor: not-allowed`), **Completed / Success** (`#24C995` border + subtle `rgba(36,201,149,.12)` tint), **Error** (`#F16B70` border + subtle `rgba(241,107,112,.12)` tint + crisp 220ms horizontal recoil), **Loading / Pending** (clean muted status text/dot in preview/inspector).
  - [x] 3.2: Refine Play Mode layout (`.game-shell`, `.mission-card`, `.playfield`):
    - Remove heavy 3D-blocky button shadows (`0 3px 0`) and noisy rounded-card nesting; use clean `1px` layered surfaces (`#131F32` → `#19263B`) with crisp subtle elevation on hover/drag.
    - Replace raw dashed borders on `.bughunt` and `.explore` with the same refined line-numbered code editor style from Phase 2.
    - Upgrade `patch` (Live Mini-IDE) into the exact **Unified Split Coding Lab** container (editor + quick-insert chips + reset button on right/top; live browser preview OR live JS requirement checklist on left/bottom, separated by `1px solid #273750`).
  - [x] 3.3: Refine Boss 3-heart bar, Recall flashcards, Submission Summary checklist, and Level Clear modal:
    - Quiet, purposeful celebration modal (clean `#24C995` / `#F5AD28` completion summary + mistake takeaway, removing noisy bouncing infinite trophy animation and excessive confetti; keep subtle optional 600ms completion burst disabled under `prefers-reduced-motion`).
  - [x] 3.4: Audit all JS interactions to verify zero regressions:
    - Pointer Events drag-and-drop + tap fallback on `slot`, `buckets`/`wireframe`, and `order`.
    - 3-miss progressive reveal, XP/streak calculation (`S.xp`, `S.streak`, `S.solved`, `S.levels`), Boss heart decrement & zero-heart free-hint restart, and input-safe shortcuts (`Enter`, `H`, `1–4`, `Esc`).
- **Expected Behavior After Phase**:
  - Switching between `افهم الشرح` and `العب وطبّق` feels like one continuous developer studio; every game mechanic has crisp states, immediate precise feedback, and zero visual clutter.
- **Review and Validation Gate**:
  - [x] Automated Playwright click-through verifies solving `explore`, `choice`, `slot`, `buckets` (columns + wireframe), `order`, `bughunt`, `match`, `patch` (HTML, CSS, JS), Boss retry, Recall flip, and Summary view with `0` console/page errors.
- **Dependencies**: Phase 2

---

### Phase 4: Responsive Breakpoints, Accessibility & Multi-Lecture Repacking
- **Objective**: Fine-tune desktop (`≥ 1120px`), medium drawer (`768–1119px`), mobile (`< 768px`), and TaskViewer short-iframe (`max-height: 480px`) layouts, audit RTL/a11y/reduced-motion compliance, and repack all 4 lectures (`lect01.html`–`lect04.html`).
- **Files Affected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html`
  - `lect01.html`, `lect02.html`, `lect03.html`, `lect04.html`
- **Implementation Steps**:
  - [x] 4.1: Tune responsive layout rules cleanly across all 4 tiers (never shrinking desktop):
    - **Large Desktop (`≥ 1120px`)**: Persistent collapsible `308px` right sidebar + 2-column workspace (`minmax(0, 1fr) minmax(0, 1.05fr)`).
    - **Medium (`768px – 1119px`)**: Sidebar becomes an accessible slide-over RTL drawer (`width: min(320px, 86vw)`); workspace uses 100% width, transitioning from 2 columns (`≥ 960px`) to comfortable stacked single column (`< 960px`: Editorial Content → Unified Coding Lab).
    - **Mobile (`< 768px`)**: Single-column sequence (Learning Content → Code Editor + Inspector → Live Preview), accessible Chapter Drawer triggered from top bar, compact `46px` header, non-overlapping bottom navigation dock with `≥ 44px` tap targets and `env(safe-area-inset-bottom)`.
    - **TaskViewer Short Iframe (`max-height: 480px`, e.g. `1366×374`, `1280×347`, `390×417`)**: Controlled compact spacing maintaining `0` document scroll (`docY == 0`, `docX == 0`) while keeping text legible (`≥ 13.5px`).
  - [x] 4.2: Accessibility & RTL audit:
    - Confirm proper ARIA roles (`navigation`, `tablist`, `tab`, `aria-selected`, `dialog`, `aria-modal`, `aria-live="polite"`, `aria-expanded`), logical Tab order, visible Cyan focus outlines, contrast ratios (`≥ 4.5:1` for `#F3F6FC` and `#A5B4CC` on `#080D18`/`#0D1524`/`#131F32`), and `prefers-reduced-motion: reduce`.
  - [x] 4.3: Repack all four lectures deterministically via `lesson-tool.mjs`:
    - `node lesson-tool.mjs pack lect01.lesson.json lect01.html`
    - `node lesson-tool.mjs pack lect02.lesson.json lect02.html`
    - `node lesson-tool.mjs pack lect03.lesson.json lect03.html`
    - `node lesson-tool.mjs pack lect04.lesson.json lect04.html`
- **Expected Behavior After Phase**:
  - All 4 lectures pass `lesson-tool.mjs` with `0` errors/warnings and render cleanly across desktop, medium, TaskViewer short-iframe, and mobile screens without clipping or cramped controls.
- **Review and Validation Gate**:
  - [x] `lesson-tool.mjs` reports `0` errors and `0` warnings across all 4 HTML files; shell gzip remains `≤ 30 KB`; all raw files remain `≤ 260 KB`.
  - [x] Playwright `window.__LG_QA()` passes with `docY == 0` and `docX == 0` across all 222 views × 7 viewports (`1440×900`, `1366×660`, `1366×374`, `1280×347`, `1024×768`, `768×916`, `390×736`, `390×417`).
- **Dependencies**: Phase 3

---

### Phase 5: Visual Screenshot Critique, Refinement Pass & Final Documentation
- **Objective**: Visually inspect rendered screenshots at the original reference resolution (`1440×900`) plus medium drawer (`1024×768`), TaskViewer (`1366×374`), and mobile (`390×736`), fix any subtle spacing/contrast/BiDi/alignment imperfections, and finalize the plan documentation.
- **Files Affected**:
  - `C:\Users\almoh\.gemini\config\skills\lesson-game\assets\lesson-shell.html` (refinement pass if needed)
  - `lect01.html`–`lect04.html` (repacked if refined)
  - `docs/codehub-lesson-studio-redesign-implementation-plan.md`
- **Implementation Steps**:
  - [x] 5.1: Capture and inspect rendered Playwright screenshots of:
    - `lect02.html` Explain (desktop `1440×900` — primary reference comparison, including clicked code token + inspector + live preview),
    - `lect02.html` with collapsed desktop sidebar (`1440×900`),
    - `lect02.html` Play mode (`wireframe` + `patch` Mini-IDE),
    - `lect03.html` Explain & CSS live `patch`,
    - `lect04.html` Explain (Console Output) & JS live check `patch`,
    - Medium drawer open (`1024×768`), TaskViewer short viewport (`1366×374`), and Mobile (`390×736`).
  - [x] 5.2: Perform one deliberate refinement pass to resolve any visual imperfection (line-number alignment, Arabic/English spacing, contrast, wrapping, drawer transition, or touch target tightness) and re-run `lesson-tool.mjs` + Playwright QA.
  - [x] 5.3: Update all checkboxes, progress table, and update log in `docs/codehub-lesson-studio-redesign-implementation-plan.md`, and verify clean `git status` on `codex/lesson-studio-ui-redesign` with zero unintended changes to protected files.
- **Expected Behavior After Phase**:
  - Final rendered screenshots unmistakably look like a bespoke, cohesive CodeHub developer learning environment—calm, legible, responsive, and 100% functionally verified.
- **Review and Validation Gate**:
  - [x] Full Playwright viewport matrix + interaction checks pass with `0` errors.
  - [x] `git diff --stat` confirms only intended files changed; all protected files (`draft/*`, `project-*`, `lect0*script.html`, `lect0*.lesson.json`) remain unmodified.
- **Dependencies**: Phase 4

---

## 6. Risks and Rollback Notes

- **Identified Risks & Mitigations**:
  1. **Shell gzip budget (`≤ 30 KB`)**: Adding line-number gutters and responsive drawer logic could push gzip size near `30 KB` (currently `28.0 KB`). *Mitigation*: Removing decorative radial meshes, `#i-deco-grid`, redundant animations, and consolidating duplicate `.sub-bar`/`.ws-header` CSS will likely **reduce** shell size to ~`24–26 KB` gzipped; monitor via `lesson-tool.mjs lint` at every phase.
  2. **BiDi corruption inside line-numbered code blocks**: Splitting marked code (`[[0|...]]`) into numbered lines could accidentally split an HTML tag or break multi-line syntax spans (`hl()`). *Mitigation*: Run `renderMarked` / `hl` per line (or safely track multi-line comments) and verify with Playwright against every `code` block across all 4 lectures (`lect01`–`lect04`).
  3. **TaskViewer short-height overflow (`1366×374`, `1280×347`)**: Adding a consolidated header + unified coding lab must preserve `min-height: 0` on every flex/grid wrapper so internal scrolling stays contained and `docY` stays `0`. *Mitigation*: Explicitly verify `window.__LG_QA()` at `1366×374` and `1280×347` in Phase 4 and Phase 5.
  4. **LocalStorage progress compatibility**: Changing state schema could wipe existing learners' XP/solved stages. *Mitigation*: Keep `lg2:<lesson.id>:v1` schema untouched; store UI-only sidebar collapse preference under a separate key (`lg2:ui:railCollapsed`).
- **Rollback Strategy**:
  - All work will be isolated on dedicated branch `codex/lesson-studio-ui-redesign` created from `main` (`2291712`). Switching back to `main` (`git checkout main`) or reverting any commit restores the exact prior production state cleanly, and `lesson-shell.html` can be backed up in scratch before Phase 1 edits.

---

## 7. Final Definition of Done

- [x] Every requirement in Sections 1–9 of the redesign brief maps to verified rendered behavior.
- [x] All 5 phase review gates have passed with `0` errors.
- [x] `lesson-tool.mjs` passes with `0` errors and `0` warnings on `lect01.html`–`lect04.html` (shell gzip `≤ 30 KB`, raw `≤ 260 KB`).
- [x] Playwright verifies `0` document scroll overflows (`docY == 0`), `0` horizontal overflows (`docX == 0`), and `0` console/page errors across all 222 views × 8 viewports (`1440×900`, `1366×660`, `1366×374`, `1280×347`, `1024×768`, `768×916`, `390×736`, `390×417`).
- [x] Rendered screenshots at `1440×900`, `1024×768`, `1366×374`, and `390×736` are visually inspected and refined.
- [x] No regression introduced to navigation, XP/progress calculations, submission summary, review flashcards, code editor/preview execution, or protected repository files.
- [x] All implementation checklist items in this plan are checked `[x]`.

---

## 8. Progress Table and Update Log

### Progress Table
| Phase | Status | Steps Completed | Validation Gate Passed |
| :--- | :--- | :--- | :--- |
| Discovery & Planning | Complete | Baseline inspected, plan written | [x] |
| Phase 1: Baseline, Tokens, Header & Sidebar/Drawer | Complete | 6 / 6 | [x] |
| Phase 2: Lesson Header, Editorial Content & Unified Lab | Complete | 4 / 4 | [x] |
| Phase 3: Play Mode, Mini-IDE & Interaction States | Complete | 4 / 4 | [x] |
| Phase 4: Responsive, Accessibility & 4-Lecture Repack | Complete | 3 / 3 | [x] |
| Phase 5: Visual Critique, Refinement & Final QA | Complete | 3 / 3 | [x] |
| Phase 6: App-Wide Editorial Light Theme & Full QA | Complete | 4 / 4 | [x] |

### Update Log
| Timestamp | Step / Phase | Action Taken | Deviation / Notes |
| :--- | :--- | :--- | :--- |
| 2026-11-26 00:02 | Discovery & Planning | Inspected `basics` repo (`2291712`), `CODEHUB_REFERENCE.md` iframe constraints, `lesson-shell.html`, `lesson-tool.mjs`, and rendered `lect02` screenshot; created phased redesign plan under `docs/`. | Planning-only requested; no branch created and no product code modified. |
| 2026-11-26 00:11 | Branch Policy | User instructed to implement directly on `main` without creating a new branch. | Recorded deviation from intended branch `codex/lesson-studio-ui-redesign`. |
| 2026-11-26 00:17 | Phases 1–4 | Rebuilt `lesson-shell.html` (27.5 KB gzip) with restrained CodeHub token palette, compact header + linear progress, 308px collapsible sidebar + <1120px RTL drawer, consolidated header + underline tabs, unboxed 62ch editorial prose, unified line-numbered BiDi-safe coding lab + docked inspector + live preview, and cohesive Play Mode / Mini-IDE; repacked `lect01.html`–`lect04.html` (0 lint errors). | All 4 lectures pass `lesson-tool.mjs` with 0 errors and 0 warnings. |
| 2026-11-26 00:25 | Phase 5 | Visually audited 9 Playwright screenshots across 1440x900, 1366x374, 1024x768, and 390x736; caught and fixed mobile `.doc-prose-wrap` / `.lab-col` `flex-shrink: 0` clipping, 390px header breathing room, and horizontal code scroll span; repacked and re-verified 222 views x 8 viewports (0 overflows, 0 console errors). | Changes remain on `main` without pushing until user requests commit/push. |
| 2026-11-26 01:21 | Phase 6 (Light Theme Pivot) | Pivoted the entire CodeHub Basics application from dark theme to an eye-friendly **Editorial Warm Pearl Light Theme** (`#F2F0EA` linen canvas, `#EAE7DF` pearl chrome, `#F9F8F4` warm ivory cards, `#F0EEE8` code well, `#DBD7CC` 1px borders, `#182230` ink, `#0E7C90` petrol / `#B3700B` amber / `#167E5C` emerald / `#C03943` crimson accents — zero pure `#FFFFFF` dominant surfaces, zero glassmorphism/glows). Applied consistently across `lesson-shell.html` (`27.1 KB` gzip), `lect01.html`–`lect04.html`, `index.html`, and all 4 practical project stylesheets (`project-one` through `project-four`). Visual + Playwright QA caught and fixed a multi-pass JS/CSS syntax tokenizer overlap in `lesson-shell.html` and a mobile `<pre>` grid overflow on all 4 `project-*/brief.html` pages. Final QA passed `1,776` lecture renders (`222` views × `8` viewports), `index.html`, and all `24` project page renders (`12` pages × desktop/mobile) with `0` overflows and `0` console/page errors. | User explicitly directed full app-wide light theme, verification, commit, and push on `main`. |
