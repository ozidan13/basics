# Four Progressive Frontend Student Projects — Implementation Plan

| Field | Value |
|---|---|
| Status | Implementation complete / rendered browser QA blocked by environment |
| Created | 2026-07-26 |
| Source request | Two attached requirement briefs (verified identical and consolidated as one request) |
| Source of truth | The attached brief and verified repository code; this repository has no `CODEHUB_REFERENCE.md`, `README`, `AGENTS.md`, or package manifest |
| Intended branch | `codex/four-progressive-frontend-projects` |
| Scope | Add four standalone, progressively harder HTML/CSS/JavaScript projects and expose them from the existing course portal |

## Progress

| Phase | Status | Completed result | Remaining |
|---|---|---|---|
| 0. Analysis and scope | Complete | Repository, learning sequence, visual conventions, requirements, and integration point verified | None |
| Branch setup | Complete | Created and switched to `codex/four-progressive-frontend-projects` | None |
| 1. Project One — `مساحتي` | Implemented / rendered QA blocked | Five independent files, complete brief, portfolio simulation, and minimal JavaScript created; syntax and link audits pass | Browser viewport, keyboard, and rendered interaction proof |
| 2. Project Two — `CaseCraft` | Implemented / rendered QA blocked | Five independent files, complete brief, responsive customizer, and DOM interactions created; syntax and link audits pass | Browser viewport and rendered interaction proof |
| 3. Project Three — `مصروفي` | Implemented / rendered QA blocked | Five independent files, complete brief, validated CRUD renderer, filters, totals, and guarded LocalStorage created; syntax and link audits pass | Browser CRUD, persistence, viewport, and corrupted-storage proof |
| 4. Project Four — `رحّال` | Implemented / rendered QA blocked | Five independent files, eight-destination dataset, three views, reusable renders, discovery tools, favorites, dialog, itinerary CRUD/totals, and guarded persistence created; syntax and link audits pass | Browser workflow, dialog, storage, and viewport proof |
| 5. Portal integration and cross-project QA | Source-level QA complete / rendered QA blocked | Portal exposes four projects; closing markup corrected; 20-file, 13-section, link, duplicate-ID, independence, storage-key, safe-rendering, and protected-lecture audits pass | Browser click-through, console, keyboard, and responsive proof |
| Final verification and handoff | Source verification complete / rendered QA blocked | Final worktree, syntax, structure, content, references, safety, independence, and scope reviewed; plan brought up to date | Run browser viewport, interaction, console, keyboard, accessibility, and persistence checks when local-page access is available |

## Main Task

Create four independent, polished educational projects at the repository root that guide beginners from semantic HTML and responsive CSS through DOM interaction, persistent CRUD, and a complete state-driven vanilla JavaScript application, with detailed Egyptian-Arabic briefs and fully working reference simulations.

## Verified Project Baseline

- [x] Confirmed `F:/work/basics` is the Git repository root.
- [x] Verified the current branch is `main`, tracking `origin/main`, at commit `f1b8d6e` (`Basics Fundamentals`).
- [x] Verified the worktree was clean before creating this plan.
- [x] Searched for and confirmed the absence of `CODEHUB_REFERENCE.md`, `README`, `AGENTS.md`, package manifests, source directories, and test/build configuration.
- [x] Read the root course portal and inspected the lecture pages, supporting instructor scripts, YouTube metadata, visual patterns, navigation, and interactive code relevant to the student learning flow.
- [x] Confirmed Node.js `v23.5.0` and Python `3.14.6` are available for syntax checks and a local static server; the repository itself defines no validation commands.
- [x] Confirmed planning has not changed lecture or product code.

### Current architecture and behavior

- The repository is a flat, framework-free static site. `index.html` is the course portal and links to four large standalone lecture presentations: `lect01.html` through `lect04.html`.
- Supporting `lect01script.html` through `lect04script.html` contain instructor delivery scripts. The `lect0N_youtube_seo.md` files contain publishing metadata and are not part of the learner-facing runtime.
- The verified learning sequence is:
  1. `lect01.html`: IT and web-development introduction.
  2. `lect02.html`: HTML structure, elements, attributes, text, media, lists, tables, forms, semantic HTML, accessibility, and common mistakes.
  3. `lect03.html`: CSS selectors, specificity, box model, typography, display/position, Flexbox, Grid, responsive design, animation, variables, gradients, and glassmorphism.
  4. `lect04.html`: JavaScript variables, types, operators, conditions, loops, functions, arrays, objects, DOM manipulation, events, and a small Todo example.
- Student-facing explanations mix Egyptian Arabic with necessary English technical terms. Lecture 2–4 documents use `lang="ar"`, `dir="rtl"`, Cairo for Arabic, Inter/JetBrains Mono for English/code, and LTR treatment for code samples.
- The existing visual language is a dark slate background with blue/purple/accent gradients, translucent glass cards, rounded corners, soft shadows, colored explanation states, responsive cards, and visible interactive feedback.
- Existing lecture pages are monolithic HTML documents with embedded CSS/JavaScript and CDN-loaded Tailwind, AOS, Font Awesome, and Google Fonts. The new project contract explicitly requires separate `style.css` and `script.js`, so the projects will reproduce the relevant visual language with authored CSS and vanilla JavaScript instead of adding framework dependencies.
- Existing lecture interactions include scrolling progress indicators, answer reveal controls, quiz rendering, DOM class updates, and a small Todo demonstration. They do not provide a reusable component or data layer for the new projects.
- There is no backend, database, authentication, API, bundler, package manager, automated test suite, or deployment-specific configuration in scope.
- The root portal currently shows only lecture cards. Adding a separate practical-projects section after the lecture grid is the smallest discoverable integration with the current student journey.

### Existing behavior that must remain unchanged

- The four lecture cards, their titles/descriptions, and links to `lect01.html`–`lect04.html` must continue to work.
- Lecture presentation files, instructor scripts, and YouTube metadata must not be edited as part of this task.
- The course's dark visual identity and beginner-friendly Egyptian-Arabic tone must remain recognizable.
- The static site must remain usable by opening files directly and when served by a simple local HTTP server.

### Documentation drift and existing issues

- There is no authoritative architecture/reference document to compare against; verified runtime code is the project truth for this task.
- `index.html` ends with a stray `</footer>` and is missing the expected closing tags for `.lectures-grid`, `<main>`, and `.container`. Browsers recover from this malformed structure, but Phase 5 must make only the minimum nearby structural correction required to add the projects section safely. This is not authorization for a broader homepage refactor.
- Lecture pages use external presentation libraries, while the requested project file contract calls for plain external CSS/JavaScript files. This is a deliberate task-specific convention, not a repository-wide migration.

## Requirements and Acceptance Criteria

| Requirement | Acceptance criterion | Planned phase |
|---|---|---|
| Four root-level standalone projects | `project-one/`, `project-two/`, `project-three/`, and `project-four/` exist at the repository root | Phases 1–4 |
| Exact file contract | Every project contains `index.html`, `brief.html`, `simulation.html`, `style.css`, and `script.js`; no required file is missing | Phases 1–4, Final |
| Independent projects | Every project uses only files inside its own folder plus optional direct font loading with system fallbacks; no project imports another project's assets or code | Phases 1–5 |
| Project gateway | Each project `index.html` clearly states its level, outcome, and skills, and links to its own brief, simulation, and the root course portal | Phases 1–4 |
| Complete Egyptian-Arabic brief | Each `brief.html` uses clear Egyptian Arabic and contains all 13 required teaching sections, a navigable structure, focused examples, common mistakes, testing, completion requirements, and bonuses | Phases 1–4 |
| No full answer in the brief | Brief code examples teach isolated concepts or partial patterns and never reproduce the complete simulation solution | Phases 1–4, Phase 5 audit |
| Complete reference simulation | Each `simulation.html` demonstrates every required feature in its brief with readable, beginner-appropriate HTML/CSS/JavaScript | Phases 1–4 |
| Project One foundations | The first project visibly demonstrates semantic structure, content sections, an accessible form, foundational CSS, Flexbox, and basic responsiveness with only minimal JavaScript | Phase 1 |
| Project Two DOM basics | The second project demonstrates Grid/Flexbox, reusable controls, responsive breakpoints, DOM selection, events, and live text/class/style updates without persistence or a complex data model | Phase 2 |
| Project Three interactive app | The third project uses arrays of objects, functions, conditions/loops, dynamic rendering, validated CRUD, filters, LocalStorage, and empty/error states | Phase 3 |
| Project Four complete app | The fourth project provides multiple views, reusable rendered components, search/filter/sort/categories, saved state, validated input, clear UI states, and organized JavaScript architecture | Phase 4 |
| Meaningful difficulty progression | Every project reuses earlier fundamentals while introducing a new state/interaction model; projects are not cosmetic variations of one another | Phases 1–5 |
| Responsive presentation | Gateways, briefs, and simulations have no clipped content or unusable controls at 360px, 768px, and 1280px viewport widths | Each phase, Final |
| Accessibility | Pages use semantic landmarks, ordered headings, labels, keyboard-operable controls, visible focus, meaningful status announcements, sufficient contrast, and reduced-motion handling | Each phase, Phase 5 |
| Professional portfolio quality | Each simulation has a distinct real-world concept, purposeful empty/error/success feedback, coherent visual hierarchy, and a finished appearance | Phases 1–4 |
| Portal discovery | Root `index.html` exposes all four projects in progression order without changing or breaking the lecture cards | Phase 5 |
| No unrelated systems changed | No lecture content, backend, schema, database, authentication, external API, or unrelated functionality is modified | All phases |
| No unnecessary dependencies | Projects use semantic HTML, authored CSS, and vanilla JavaScript; no framework, package, AOS, icon library, or build step is added | All phases |

## Rules and Non-Goals

### Technical and product rules

- Use `lang="ar"` and `dir="rtl"` on every student-facing project page. Mark English code and technical fragments LTR where needed.
- Write student-facing prose in friendly Egyptian Arabic. Keep English for established technical terms such as HTML, CSS, JavaScript, DOM, Flexbox, Grid, LocalStorage, and Event Listener.
- Use English, descriptive identifiers in example and simulation code so students learn common professional naming conventions.
- Each folder must own its complete HTML, CSS, and JavaScript. Root `index.html` may link to a project but must never supply runtime styles or behavior to it.
- Link `style.css` from all three HTML pages in each folder. Load `script.js` with `defer` only on pages that use its behavior, or guard every selector by page context so the shared file never throws on gateway/brief pages.
- Recreate the established dark glass/gradient identity with project-local CSS variables and components. Give each project a distinct accent and layout so progression is visual as well as technical.
- Use Cairo/Inter through a direct font link only if needed, always with system fallbacks. Do not make any functional behavior depend on a CDN.
- Keep scripts beginner-readable: constants first, then state/data, selectors, small named functions, event binding, and initialization. Project Four may use sectioned architecture in one file but not modules, classes, or abstractions that exceed the course level.
- Prefer `textContent`, `createElement`, and controlled attributes for user-provided values. Do not interpolate unsanitized form values into `innerHTML`.
- Namespace LocalStorage keys per project and version them: `codehub-expense-tracker-v1` and `codehub-egypt-trip-planner-v1`.
- Wrap LocalStorage parsing in defensive error handling and recover to a valid empty/default state when data is missing or malformed.
- Every form uses associated labels, correct input types, native constraints where useful, focused custom error feedback, and a clear success/update state.
- Every animation or transition must respect `prefers-reduced-motion`.
- Preserve existing behavior outside the declared scope and keep the implementation direct and maintainable.

### Non-goals

- No edits to `lect01.html`–`lect04.html`, `lect01script.html`–`lect04script.html`, or the YouTube SEO files.
- No broad redesign of the root course portal; only a projects section, its required styling, and the minimal closing-markup correction around the integration point.
- No backend, database, authentication, accounts, cloud sync, API calls, analytics, grading system, or student progress tracking.
- No framework, package manifest, bundler, test framework, shared component library, or cross-project asset folder.
- No image download pipeline or large media assets. Use CSS, inline decorative markup, gradients, and lightweight icons/emoji where they support the concept.
- No speculative features beyond each project's declared educational objective and bonus challenges.
- No merging or pushing the implementation branch without a separate explicit request.

### Assumptions

- “Inside the current project” means the four named folders should be direct children of `F:/work/basics`, beside `index.html` and the lecture files.
- The simulation is intentionally a visible reference result; the prohibition on a complete solution applies to the teaching content inside `brief.html`.
- The five specified files are the complete per-project deliverable. Additional project-local files are unnecessary for the selected concepts.
- A root portal projects section is appropriate because `index.html` is the current student entry point and otherwise the new folders would be undiscoverable.
- Browser-based manual checks plus JavaScript syntax checks are proportionate for this static repository because no automated validation system exists.

## Proposed Folder Structure

```text
F:/work/basics/
├── index.html                         # Existing portal; add Practical Projects section
├── project-one/
│   ├── index.html                     # Project gateway
│   ├── brief.html                     # Egyptian-Arabic guided assignment
│   ├── simulation.html                # Finished portfolio reference
│   ├── style.css                      # Gateway, brief, and portfolio styles
│   └── script.js                      # Minimal form feedback and small enhancements
├── project-two/
│   ├── index.html
│   ├── brief.html
│   ├── simulation.html
│   ├── style.css
│   └── script.js
├── project-three/
│   ├── index.html
│   ├── brief.html
│   ├── simulation.html
│   ├── style.css
│   └── script.js
├── project-four/
│   ├── index.html
│   ├── brief.html
│   ├── simulation.html
│   ├── style.css
│   └── script.js
└── docs/
    └── four-progressive-frontend-projects-implementation-plan.md
```

## Project Concepts and Educational Progression

| Level | Folder and title | Real-world result | Primary learning shift | Distinct visual direction |
|---|---|---|---|---|
| 1 — Foundations | `project-one/` — **مساحتي: Personal Portfolio** | A polished one-page personal portfolio with an accessible contact form | From tags and selectors to a complete semantic, responsive page | Deep navy, cyan/blue accent, editorial portfolio layout |
| 2 — DOM UI | `project-two/` — **CaseCraft: مخصّص جراب الموبايل** | A responsive product customizer with a live phone-case preview and price summary | From static layouts to event-driven DOM updates | Purple/pink accent, split configurator and CSS-built product preview |
| 3 — Interactive data | `project-three/` — **مصروفي: Expense Tracker** | A persistent income/expense manager with CRUD, summaries, and filters | From fixed DOM controls to an array-of-objects state rendered into the page | Emerald/teal financial dashboard with status cards and transaction list |
| 4 — Complete app | `project-four/` — **رحّال: Egypt Trip Planner** | A multi-view destination explorer, favorites list, and itinerary planner | From one collection to coordinated app state, reusable renders, search/filter/sort, and persistence | Amber/teal travel dashboard with destination art panels and itinerary workspace |

### Project One — `مساحتي: Personal Portfolio`

**Educational objective:** Teach the student to turn a blank file into a credible portfolio page using semantic HTML, foundational CSS, Flexbox, an accessible form, and a small amount of JavaScript.

**Skills covered:** document structure, semantic landmarks, heading order, links, sections, cards, lists, forms and labels, CSS selectors, cascade, colors, typography, spacing, borders, backgrounds, hover/focus states, Flexbox alignment/wrapping, basic media queries, and one guarded form Event Listener.

**Required simulation features:**

- A skip link, responsive header/navigation, hero introduction, and clear call-to-action links.
- About and skills sections with readable content hierarchy.
- Three portfolio project cards that wrap from rows to a single column.
- A contact form with name, email, service/topic, and message fields using native HTML validation.
- Minimal JavaScript that prevents a demo submission, shows an accessible success message, clears the form only after a valid submission, and updates the footer year.
- Visible hover/focus states and responsive behavior without a JavaScript navigation menu.

**Complexity boundary:** No arrays, dynamic card rendering, LocalStorage, filtering, or reusable state model.

### Project Two — `CaseCraft: مخصّص جراب الموبايل`

**Educational objective:** Teach the student how CSS Grid/Flexbox and a small set of DOM events can turn a static product page into a responsive, interactive experience.

**Skills covered:** responsive two-column Grid, reusable option controls, CSS custom properties, `data-*` attributes, DOM selection, Event Listeners, input events, class toggling, text updates, inline custom-property updates, button state, and computed display values.

**Required simulation features:**

- A responsive product preview and configuration panel.
- Static device-model controls, color swatches, pattern controls, personalized-name input, and quantity buttons.
- A CSS-built phone/case preview that changes accent color, pattern class, and personalized text live.
- Selected states using `aria-pressed` and visible class changes.
- A live order summary and price calculation based on selected model/options/quantity.
- Reset behavior and a lightweight “added to cart” status message; no real checkout or persistence.

**Complexity boundary:** Controls may use `data-*` values, but product choices remain pre-authored in HTML. No array-driven rendering, LocalStorage, or CRUD.

### Project Three — `مصروفي: Expense Tracker`

**Educational objective:** Teach the student to model real data as objects in an array, render that state into the DOM, validate changes, and persist the result safely.

**Skills covered:** arrays, objects, IDs, small functions, conditions, loops/array methods, form handling, validation, CRUD, render functions, filters, derived totals, event delegation where explained, LocalStorage serialization, and empty/error states.

**Required simulation features:**

- Summary cards for total balance, income, and expenses derived from current transactions.
- A transaction form with description, amount, type, category, and date.
- Validation for required text, positive finite amount, valid type/category, and date.
- Add, edit, save/cancel edit, and delete actions.
- Filter by transaction type and category, with a reset-filter action.
- Dynamic transaction count/list, a first-use empty state, a no-filter-results state, inline form errors, and status announcements.
- Persistent transactions under `codehub-expense-tracker-v1`, including safe recovery from invalid stored data.

**Complexity boundary:** One primary transaction collection and one main screen. No routing, remote data, authentication, charts library, or multiple coordinated collections.

### Project Four — `رحّال: Egypt Trip Planner`

**Educational objective:** Combine all previous skills into a cohesive frontend application with multiple views, derived data, reusable rendering functions, coordinated saved state, and professional interaction states.

**Skills covered:** structured seed data, central app state, derived collections, reusable card rendering, search, category/region filtering, sorting, view switching, favorites, itinerary entries, validation, LocalStorage, event delegation, dialog/drawer behavior, summary calculations, and organized initialization.

**Required simulation features:**

- Three keyboard-accessible views: Discover, Favorites, and My Itinerary.
- A seeded array of Egyptian destinations with stable IDs, region, trip style/category, estimated daily budget, rating, duration suggestion, and short description.
- Search by title/description, filter by region/category, sort by recommended order/rating/budget, and show a live result count.
- Reusable destination cards with favorite state, details action, and add-to-itinerary action.
- An accessible details dialog or drawer with focus handling and Escape/close behavior.
- Favorites persisted across reloads.
- A validated itinerary form for destination, start date, days, travelers, and optional note; duplicate/invalid cases receive clear feedback.
- An itinerary view with edit/remove actions and derived totals for days and estimated budget.
- Clear default, empty favorites, empty itinerary, no-search-results, validation error, success, and recovered-storage states.
- Persistence under `codehub-egypt-trip-planner-v1`, with schema checks and safe default recovery.
- A single beginner-readable `script.js` organized in labeled sections: constants/data, state, DOM references, storage helpers, utilities, render functions, actions/event handlers, event binding, and `init()`.

**Complexity boundary:** No external travel API, map SDK, date library, account system, network loading, or client-side routing library.

## Detailed File Responsibilities

### Shared page contract inside every project

| File | Responsibility |
|---|---|
| `index.html` | Project gateway with title, level, visual preview/summary, skills, expected result, estimated build stages (not a time promise), and clear links to `brief.html`, `simulation.html`, and `../index.html` |
| `brief.html` | Long-form Egyptian-Arabic teaching brief using semantic sections, table of contents, checklists, small isolated code examples, common mistakes, tests, completion criteria, and bonuses without the full solution |
| `simulation.html` | Semantic markup for the finished reference result, including every required control, state container, accessible label/status region, and project navigation |
| `style.css` | Project-local reset/tokens, shared gateway/brief presentation, simulation layout and components, interactive states, responsive breakpoints, focus styling, RTL/LTR handling, and reduced-motion override |
| `script.js` | Only that project's behaviors, with safe initialization, named functions, Event Listeners, UI/state updates, and comments that explain intent without narrating every line |

### Student brief structure required in all four `brief.html` files

Each brief will contain these clearly titled sections in this order, tailored to that project:

1. **فكرة المشروع والهدف النهائي** — the real-world scenario and the finished experience.
2. **إنت هتبني إيه؟** — a concrete list of visible parts and behaviors.
3. **المهارات والمفاهيم اللي هتتدرّب عليها** — prior knowledge and new concepts.
4. **هيكل HTML المطلوب** — semantic landmarks, elements, relationships, and accessibility reasoning.
5. **تنسيق CSS المطلوب** — layout, selectors, responsive behavior, components, and UI states.
6. **منطق JavaScript المطلوب** — data/state and events at the appropriate project level.
7. **كل Feature شغّالة إزاي وليه** — behavior-by-behavior explanation from user action to rendered result.
8. **ترتيب التنفيذ المقترح** — small milestones that keep a working page at each step.
9. **أمثلة صغيرة للمفاهيم الصعبة** — isolated examples using neutral names/content, never the full project solution.
10. **أخطاء شائعة وإزاي تتجنبها** — syntax, layout, DOM, validation, and state mistakes appropriate to the level.
11. **Checklist الاختبار** — content, interaction, responsive, keyboard, persistence, and edge checks as applicable.
12. **شروط اكتمال المشروع** — measurable student deliverables matching the simulation features.
13. **Bonus Challenges اختيارية** — scoped extensions that do not block the core learning objective.

Every brief will also include a “قبل ما تبدأ” note explaining how to use the brief and simulation: build from the brief first, compare behavior with the simulation, and inspect the final source only after attempting the milestone.

### Simulation page structure

| Project | Main simulation structure |
|---|---|
| `project-one/simulation.html` | Skip link → header/nav → hero → about → skills → project cards → contact form/status → footer |
| `project-two/simulation.html` | Header → product customizer main → preview panel → device/color/pattern/name/quantity controls → live summary/status → footer |
| `project-three/simulation.html` | Header → balance summary → transaction form/error/status → filters → dynamic transaction list and empty states → footer |
| `project-four/simulation.html` | App header/view tabs → Discover toolbar and results → Favorites view → Itinerary view/form/summary → details dialog/drawer → global status → footer |

## Change Map

| Area/file | Planned change | Reason |
|---|---|---|
| `index.html` | Add a “Practical Projects” section with four ordered cards and minimally repair the malformed closing structure at the insertion point | Make the projects discoverable without disturbing lecture content |
| `project-one/index.html` | Create the Level 1 gateway and navigation | Required project entry point |
| `project-one/brief.html` | Create the complete Egyptian-Arabic portfolio assignment | Teach semantic HTML/CSS foundations without copying the solution |
| `project-one/simulation.html` | Create the finished accessible personal portfolio | Provide the required reference result |
| `project-one/style.css` | Create local gateway, brief, portfolio, Flexbox, form, and responsive styles | Keep the project independent and demonstrate foundational CSS |
| `project-one/script.js` | Add only valid demo-form feedback and current-year behavior | Meet the file contract while keeping JavaScript minimal |
| `project-two/index.html` | Create the Level 2 gateway and navigation | Required project entry point |
| `project-two/brief.html` | Create the complete Egyptian-Arabic product-customizer assignment | Teach Grid, reusable controls, and DOM basics |
| `project-two/simulation.html` | Create the complete accessible customizer UI | Provide the required reference result |
| `project-two/style.css` | Create the split responsive layout, control components, and CSS phone/case preview | Demonstrate Grid/Flexbox and visual DOM state changes |
| `project-two/script.js` | Bind static controls and update selection, preview, quantity, total, reset, and status | Teach event-driven DOM manipulation without a complex data model |
| `project-three/index.html` | Create the Level 3 gateway and navigation | Required project entry point |
| `project-three/brief.html` | Create the complete Egyptian-Arabic expense-tracker assignment | Teach state, rendering, validation, CRUD, and persistence |
| `project-three/simulation.html` | Create the dashboard, form, filters, list, and state containers | Provide semantic hooks for every required app state |
| `project-three/style.css` | Create dashboard, form, transaction, filter, state, and responsive styles | Give the data application a polished responsive presentation |
| `project-three/script.js` | Implement transaction state, validation, CRUD, filters, derived totals, rendering, and safe LocalStorage | Deliver the Project Three learning objectives |
| `project-four/index.html` | Create the Level 4 gateway and navigation | Required project entry point |
| `project-four/brief.html` | Create the complete Egyptian-Arabic trip-planner assignment | Teach complete application composition and organized state |
| `project-four/simulation.html` | Create view tabs, toolbar, lists, itinerary form/summary, dialog, and state regions | Provide semantic application structure |
| `project-four/style.css` | Create the multi-view dashboard, destination art/cards, dialog, itinerary, responsive, and state styles | Deliver a professional final appearance without media/framework dependencies |
| `project-four/script.js` | Implement seed data, central state, search/filter/sort, reusable rendering, favorites, itinerary CRUD, dialog behavior, validation, and persistence | Deliver the complete frontend application objective |
| `docs/four-progressive-frontend-projects-implementation-plan.md` | Update checkboxes, phase results, actual branch, decisions, and validation evidence during implementation | Keep the approved plan as the living execution record |

## Phase 0 — Analysis and Safeguards

**Objective:** Establish an accurate baseline, make the educational progression explicit, and prevent scope regressions.

- [x] Read the requested skill and its complete plan template.
- [x] Compare the two attached briefs and confirm they contain the same requirements.
- [x] Locate the repository root and inspect branch, remote, recent history, and worktree status.
- [x] Search for authoritative docs, repository instructions, manifests, routes, source folders, and test/build commands.
- [x] Inspect the portal, lectures, instructor scripts, metadata roles, styling conventions, navigation, and interactive learning flow.
- [x] Define four non-repetitive concepts that map directly to the requested difficulty levels.
- [x] Record exact paths, requirements, non-goals, acceptance criteria, risks, and validation gates.
- [x] Confirm no product implementation was performed during planning.

### Review and validation

- [x] All stated project facts are supported by repository evidence.
- [x] Every user requirement maps to an acceptance criterion and implementation phase.
- [x] Every phase has a dedicated review and validation gate.
- [x] Assumptions are separated from verified facts.
- [x] Existing lecture functionality is explicitly protected.

## Approved Branch Setup

Complete this section only after the user approves implementation.

- [x] Recheck `main`, the upstream state, and the worktree; preserve unrelated user changes.
- [x] Create and switch to `codex/four-progressive-frontend-projects` from the approved base.
- [x] Confirm no existing task branch conflicted with the new branch.
- [x] Record the actual branch here and in the progress table.
- [x] Keep every implementation phase on the dedicated branch.
- [x] Do not merge or push without a separate explicit request.

### Review and validation

- [x] Verify the active branch is the intended dedicated task branch.
- [x] Verify branch setup introduced no unintended content changes.

## Phase 1 — Project One: HTML and CSS Foundations

**Objective:** Deliver a standalone, portfolio-quality page that a beginner can reproduce using semantic HTML, foundational CSS, Flexbox, a form, and minimal JavaScript.

**Affected areas:** `project-one/index.html`, `project-one/brief.html`, `project-one/simulation.html`, `project-one/style.css`, `project-one/script.js`

- [x] Create all five files and link them with correct project-local relative paths.
- [x] Build the `مساحتي` gateway with level, outcome, core skills, project workflow, brief/simulation actions, and course-home navigation.
- [x] Write all 13 brief sections in Egyptian Arabic, with short examples for semantic structure, label/input association, Flexbox wrapping, a media query, and form Event Listener behavior.
- [x] Build the semantic simulation structure and ensure heading order, landmarks, labels, required fields, status region, and skip link are correct before styling.
- [x] Implement the dark/cyan visual system, readable content width, project cards, accessible form states, Flexbox layouts, and mobile-first breakpoint behavior in `style.css`.
- [x] Implement only valid demo submission feedback and footer-year behavior in `script.js`; guard selectors and avoid data/state abstractions.
- [x] Check that every feature shown in the simulation is explained and testable from the brief, while full project code is absent from the brief.

### Review and validation

- [x] Run `node --check project-one/script.js`.
- [ ] Serve the repository locally and open all three project pages from their real relative links.
- [ ] Verify the simulation at 360px, 768px, and 1280px; confirm no horizontal overflow and usable touch targets.
- [ ] Complete the form by keyboard only; verify focus visibility, native invalid states, one success announcement, and correct reset behavior.
- [ ] Disable JavaScript and confirm the portfolio content and native form constraints still remain understandable.
- [x] Review the phase diff for independence, beginner readability, no full solution in the brief, and no unrelated files.
- [x] Update this plan and the progress table with the validation result.

## Phase 2 — Project Two: Responsive UI and DOM Basics

**Objective:** Deliver a visually distinct product customizer that teaches responsive Grid/Flexbox and direct DOM updates through a bounded set of controls.

**Depends on:** Phase 1 establishes the shared quality bar for gateways, briefs, navigation, responsiveness, and accessibility; no files are shared at runtime.

**Affected areas:** `project-two/index.html`, `project-two/brief.html`, `project-two/simulation.html`, `project-two/style.css`, `project-two/script.js`

- [x] Create all five independent files and the Level 2 gateway.
- [x] Write all 13 brief sections with isolated examples for `querySelector`, `querySelectorAll`, Event Listeners, `dataset`, `classList`, `textContent`, CSS custom-property updates, and button state.
- [x] Build the static semantic customizer markup with grouped controls, labels, `aria-pressed` states, quantity controls, preview, summary, reset, and live status.
- [x] Implement the responsive split layout and CSS-built phone/case preview; define distinct color/pattern/selected/focus states without images or external UI libraries.
- [x] Bind controls in `script.js`, update the preview and accessible state, clamp quantity to valid limits, compute the displayed total, reset to documented defaults, and announce add-to-cart feedback.
- [x] Keep options pre-authored in HTML and avoid array-driven rendering, storage, or Project Three concepts.
- [x] Verify one-to-one coverage between the brief's required features and the simulation.

### Review and validation

- [x] Run `node --check project-two/script.js`.
- [ ] Open all three pages through the local server and verify every internal/back link.
- [ ] Exercise every device, color, pattern, text, quantity, reset, and add action; verify visual and textual summaries stay synchronized.
- [ ] Verify `aria-pressed`, disabled/minimum quantity behavior, focus order, live status, and keyboard activation.
- [ ] Verify 360px, 768px, and 1280px layouts and long personalized text handling.
- [ ] Reload and confirm state intentionally resets because persistence is outside this project's scope.
- [x] Review the phase diff for beginner-level DOM code, project independence, and no unrelated changes.
- [x] Update this plan and the progress table.

## Phase 3 — Project Three: Interactive JavaScript Application

**Objective:** Deliver a persistent expense tracker that teaches a single source of truth, array-of-object state, validated CRUD, dynamic rendering, filters, and LocalStorage.

**Depends on:** Phase 2 introduces events and direct UI state; Phase 3 deliberately advances to data-driven rendering.

**Affected areas:** `project-three/index.html`, `project-three/brief.html`, `project-three/simulation.html`, `project-three/style.css`, `project-three/script.js`

- [x] Create all five independent files and the Level 3 gateway.
- [x] Write all 13 brief sections with isolated examples for an object shape, array update, `filter`, `reduce`, render functions, validation, JSON serialization, and safe LocalStorage loading.
- [x] Build the semantic dashboard markup with derived summary regions, labelled transaction form, error/status regions, filters, list container, and separate empty/no-results states.
- [x] Define and document the transaction schema: stable ID, description, finite positive amount, `income`/`expense` type, allowed category, and ISO date.
- [x] Implement safe load/save helpers for `codehub-expense-tracker-v1`, including missing/malformed data fallback.
- [x] Implement add, start edit, save edit, cancel edit, and delete actions using one in-memory transactions array.
- [x] Implement filters, derived balance/income/expense totals, result count, and full re-render after each state change.
- [x] Render user-entered values safely without raw HTML interpolation.
- [x] Style the summaries, form, filters, transaction rows/cards, action states, and mobile layout.
- [x] Verify the brief explains the complete mental model and each feature without publishing the final combined source.

### Review and validation

- [x] Run `node --check project-three/script.js`.
- [ ] Verify empty first load, valid add, invalid inputs, edit/save, edit/cancel, delete, filter matches, no filter matches, and filter reset.
- [ ] Verify totals remain mathematically correct after every add/edit/delete/filter operation and filters do not mutate stored data.
- [ ] Reload after mutations and confirm transactions persist under only the namespaced key.
- [ ] Manually place malformed JSON and an invalid transaction shape in the project key; confirm safe recovery, a usable page, and no uncaught error.
- [ ] Verify keyboard operation, focus movement after submit/edit/delete where appropriate, live announcements, and responsive layouts at 360px/768px/1280px.
- [x] Review the diff for safe DOM rendering, small functions, stable IDs, and no Project Four overengineering.
- [x] Update this plan and the progress table.

## Phase 4 — Project Four: Complete Frontend Application

**Objective:** Deliver a professional multi-view Egypt trip planner that combines responsive UI, reusable rendering, coordinated state, discovery controls, favorites, itinerary management, validation, and persistence.

**Depends on:** Phase 3 establishes state, CRUD, rendering, validation, and storage patterns that this phase composes into a larger application.

**Affected areas:** `project-four/index.html`, `project-four/brief.html`, `project-four/simulation.html`, `project-four/style.css`, `project-four/script.js`

- [x] Create all five independent files and the Level 4 gateway.
- [x] Write all 13 brief sections with isolated examples for central state, derived results, reusable render functions, event delegation, view switching, storage schema, and dialog accessibility.
- [x] Create a small, varied destination dataset with stable IDs and all declared fields; keep it local and understandable.
- [x] Build semantic view tabs, Discover toolbar/results, Favorites state, Itinerary form/list/summary, details dialog/drawer, and shared status regions.
- [x] Implement the central state and labeled script sections without modules/classes or hidden framework patterns.
- [x] Implement search, region/category filters, sorting, result count, and reusable destination card rendering without mutating seed data.
- [x] Implement favorites toggling/persistence and consistent favorite state in every rendered view.
- [x] Implement dialog/drawer open/close, destination detail rendering, focus placement/return, backdrop/close control, and Escape handling.
- [x] Implement validated itinerary add/edit/remove behavior, duplicate policy, derived trip-day/traveler/budget summaries, and appropriate focus/status feedback.
- [x] Implement safe persistence and schema fallback under `codehub-egypt-trip-planner-v1`.
- [x] Style the three views, controls, cards, CSS destination art, dialog, itinerary, summaries, responsive navigation, empty/no-results/error/success states, and reduced motion.
- [x] Audit the brief against every final interaction while ensuring its snippets remain partial teaching examples.

### Review and validation

- [x] Run `node --check project-four/script.js`.
- [ ] Verify all view tabs by mouse and keyboard, active-state semantics, and focus visibility.
- [ ] Test search alone and combined with every filter/sort option; verify count/order and no-results recovery.
- [ ] Toggle favorites from Discover/details/Favorites and confirm all views and persisted state stay synchronized.
- [ ] Test dialog focus entry, close control, Escape, focus return, and small-screen presentation.
- [ ] Test itinerary valid/invalid add, duplicate handling, edit, remove, summaries, empty state, and reload persistence.
- [ ] Inject malformed and structurally invalid stored data; verify safe defaults and no uncaught error.
- [ ] Verify 360px, 768px, and 1280px layouts, long Arabic content, touch targets, and no horizontal overflow.
- [x] Review the diff for organized beginner-readable architecture, safe rendering, independence, and complete UI states.
- [x] Update this plan and the progress table.

## Phase 5 — Portal Integration and Cross-Project Quality Review

**Objective:** Connect the completed projects to the current course journey and verify educational, visual, technical, responsive, and accessibility consistency across the whole deliverable.

**Depends on:** Phases 1–4 must produce working gateway destinations before the root portal links are exposed.

**Affected areas:** `index.html`, all `project-*/` files, and this plan

- [x] Add a clearly separated “Practical Projects” section after the existing lecture grid, with four ordered cards showing level, title, educational focus, and link to each project gateway.
- [x] Add only the CSS required for the project cards and responsive section while preserving existing lecture card appearance.
- [x] Correct the malformed closing structure near the insertion point using the smallest valid change; do not rewrite unrelated portal markup.
- [x] Verify all project gateways link back to `../index.html` and all gateway/brief/simulation links are relative, local, and case-correct.
- [x] Audit folder independence: no `project-*` HTML/CSS/JS reference another `project-*` folder.
- [x] Audit every brief for the exact 13-section structure, Egyptian-Arabic tone, purposeful why-explanations, partial examples, common mistakes, tests, completion requirements, and bonuses.
- [x] Audit every simulation feature against its brief and acceptance criteria; remove undocumented behavior or document missing required behavior.
- [x] Audit progression so Project One remains foundational, Project Two remains direct-DOM, Project Three remains one-collection state, and Project Four is the only coordinated multi-view app.
- [ ] Run a shared accessibility pass for landmarks, heading order, labels, button names/types, focus, keyboard flows, live messages, contrast, and reduced motion.
- [ ] Run a shared responsive pass at 360px, 768px, and 1280px for all 12 project HTML pages plus the portal.
- [ ] Check browser consoles for errors and verify reload behavior, storage-key isolation, and direct/local-server navigation.

### Review and validation

- [x] Run `node --check` against all four `script.js` files.
- [x] Run `git diff --check` and inspect the complete diff for malformed markup, accidental large assets, secrets, external libraries, and unrelated edits.
- [ ] Click all four lecture links and all project/brief/simulation/back links from a local server.
- [x] Confirm the root portal retains the original four lecture cards and no lecture file changed.
- [x] Confirm each project folder contains the required five files and no cross-project runtime dependency.
- [x] Confirm LocalStorage keys do not collide and clearing/corrupting one project cannot break another.
- [x] Record validation evidence and any approved deviation in this plan.

## Final Verification and Handoff

- [ ] Verify every requirement row has passed its observable acceptance criterion.
- [ ] Verify all four projects are visually complete, meaningfully distinct, and progressively harder.
- [x] Verify all student-facing content is Egyptian Arabic with English limited to useful technical terms.
- [x] Verify each brief can guide a beginner without external tutorials and still withholds the complete solution.
- [x] Verify each simulation implements every mandatory feature with clean semantic markup and beginner-readable code at source level.
- [x] Verify no framework, package, backend, schema, database, authentication, API, or unrelated project functionality was introduced or changed.
- [x] Verify every implementation change exists only on the dedicated task branch.
- [x] Review the final worktree for unintended files, secrets, temporary artifacts, and unrelated changes.
- [x] Update accurate checkboxes, phase results, actual branch, and the update log.
- [x] Provide the user a concise handoff with completed files and validation results; do not merge or push unless separately requested.

## Risks and Rollback

| Risk | Prevention/validation | Rollback |
|---|---|---|
| Four long briefs drift in structure or omit a requirement | Use the same verified 13-section checklist and feature-to-brief audit in every phase | Revert only the affected brief and restore the last validated version |
| Projects feel repetitive despite increasing JavaScript | Use four different product types and enforce each phase's complexity boundary | Remove duplicated interaction patterns and keep the approved project-specific feature set |
| A project accidentally depends on another folder | Use only project-local relative paths and run a cross-folder reference audit | Replace the reference with a duplicated project-local implementation or remove it |
| Root integration breaks lecture navigation because existing closing markup is malformed | Make a surgical insertion/closure fix, review the HTML structure, and click all lecture links | Revert the root `index.html` change; project folders remain independently accessible |
| LocalStorage corruption causes a blank or crashing app | Namespaced versioned keys, guarded parsing, schema checks, and invalid-data tests | Clear only the affected namespaced key and restore safe defaults |
| User-entered text becomes an injection path | Render values through `textContent`/created nodes and never concatenate raw input into HTML | Remove the unsafe render path and restore the last safe renderer |
| JavaScript becomes too advanced for beginners | Enforce per-project complexity boundaries and the documented function order | Simplify the affected phase without changing observable requirements |
| RTL prose and LTR code/layout create overflow or confusing ordering | Explicit direction wrappers, logical CSS properties, and three-width responsive checks | Revert the faulty styling block and restore the previous validated layout |
| External fonts are unavailable | Keep functional code dependency-free and provide system font fallbacks | Remove the font link; content and behavior remain intact |
| Simulation and brief stop matching during edits | Require a feature-to-brief audit before each phase closes | Update the incorrect side to the approved requirement; do not add speculative behavior |
| Existing files are unintentionally edited | Review `git status`/diff after every phase and protect lecture paths explicitly | Revert only the unintended files on the dedicated branch after confirming their exact paths |

Because all implementation is additive except the small root portal integration, rollback is straightforward: remove the four new project directories and revert the `index.html` project-section change on the dedicated branch. The plan file can remain as historical documentation or be reverted separately.

## Definition of Done

- [x] Work was implemented on `codex/four-progressive-frontend-projects` (or an explicitly approved replacement branch).
- [x] The repository root contains `project-one/` through `project-four/`, each with exactly the five required deliverable files.
- [ ] All 12 project HTML pages open through their intended navigation paths.
- [x] Each brief contains all required teaching content in clear Egyptian Arabic and does not provide the full solution.
- [x] Each simulation implements every documented required feature at source level and is designed as a polished portfolio reference.
- [x] The four projects form the approved semantic HTML/CSS → DOM → data-driven CRUD → complete app progression.
- [x] All JavaScript syntax checks and source-level phase validation gates pass.
- [ ] Responsive, keyboard, accessibility, UI-state, and persistence checks pass where applicable.
- [x] Root portal project links resolve at source level and all original lecture links/content remain unchanged.
- [x] No disallowed dependency, backend, database, schema, authentication, API, secret, or unrelated refactor is present.
- [x] Documentation and checkboxes accurately match the final implementation and the outstanding rendered-QA limitation.
- [x] The worktree contains only intended task changes.

## Update Log

| Date | Phase/step | Result or deviation | Validation |
|---|---|---|---|
| 2026-07-26 | Plan created | Initial evidence-based implementation plan completed; two identical briefs consolidated; no product implementation started | Requirements mapped to exact paths, phases, acceptance criteria, and validation gates |
| 2026-07-26 | Branch setup | User approved implementation; created and switched to `codex/four-progressive-frontend-projects` | Active branch verified; only the plan was present before product work |
| 2026-07-26 | Phases 1–2 implementation | Created the portfolio and product-customizer projects with independent five-file structures and complete Egyptian-Arabic briefs | Both scripts pass `node --check`; all local references resolve; rendered QA remains open because the in-app browser blocked the local file URL and the environment blocked background static-server startup |
| 2026-07-26 | Phase 3 implementation | Created the expense tracker with validated transaction schema, CRUD, derived totals, filters, safe DOM rendering, and guarded namespaced LocalStorage | `node --check` passes; five-file/13-section and local-reference audits pass; rendered CRUD and persistence gates remain open under the same browser limitation |
| 2026-07-26 | Phase 4 implementation | Created the capstone trip planner with eight destinations, three views, reusable destination rendering, discovery controls, favorites, native dialog, itinerary CRUD/totals, validation, and guarded persistence | `node --check` passes; required-file/section/link and unsafe-rendering audits pass; rendered workflow gates remain open |
| 2026-07-26 | Phase 5 source QA | Added four ordered portal links and minimally corrected the portal's closing structure; audited all project folders together | 20/20 required files; 13/13 sections per brief; all local references resolve; no duplicate IDs, cross-project imports, unsafe HTML/eval patterns, storage-key collision, or lecture-file changes; Browser rejected the local file URL and background server launch was blocked, so console/viewport/keyboard execution remains unverified |
| 2026-07-26 | Final source verification and handoff | Re-ran syntax and diff checks, reviewed the complete task worktree, and updated the living plan to distinguish completed implementation from environment-blocked rendered QA | All four scripts pass `node --check`; `git diff --check` passes apart from Git's informational LF/CRLF notice; only the root portal, plan, and four requested project folders are changed; no commit, push, or merge performed |
