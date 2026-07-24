# Impeccable Technical Audit — Pascal.dev (Final)

Date: 2026-07-24

Scope: public homepage, project archive, project case pages, 404 recovery surface, shared visual system, production output, deterministic detector, project data, engineering catalog, and Playwright coverage.

Baseline: 14/20 on `audit-2026-07-24.md`.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Keyboard, contrast, motion and touch behavior are strong; required-field communication and a few semantic states remain incomplete |
| 2 | Performance | 4/4 | Static rendering, isolated client islands, viewport-gated WebGL and a 157 kB homepage First Load JS budget |
| 3 | Responsive Design | 4/4 | Automated coverage passes at 320×568, 390×844, 768×1024 and 844×390 without horizontal overflow |
| 4 | Theming | 3/4 | Core observatory tokens are established, with five ambient color variants still outside the documented sidecar palette |
| 5 | Implementation Integrity | 4/4 | Coherent, product-specific implementation; detector warnings were verified as false positives and remaining advisories are isolated |
| **Total** | | **18/20** | **Excellent — minor polish** |

## Implementation Integrity Verdict

**PASS.** Pascal.dev expresses a coherent product-specific system.

Verified evidence:

- The “Observatorio de Ingeniería” concept is consistently expressed through graphite surfaces, polar-cyan signals, restrained atmospheric light, editorial spacing and the isolated 3D system.
- Professional claims are backed by structured local project data containing role, state, verification date, evidence source, demo and repository links.
- Static editorial sections are Server Components. Client boundaries are limited to navigation, search, contact state, back-to-top behavior and the viewport-gated spatial scene.
- The 404 recovery experience now uses the same language, palette, hierarchy and action patterns as the public portfolio.
- Seven unused legacy components and the old cyber/theme vocabulary were removed.

The bundled detector returned **22 findings**:

- **4 warnings** for `text-slate-950` on `bg-cyan-50`. These are false positives: the rendered pairing is approximately **19.4:1**, comfortably exceeding WCAG AA and AAA.
- **18 advisories** for five ambient color variants and compact/fluid typography values outside the exact `DESIGN.md` sidecar ramp. These are consistency signals, not evidence of a generic or broken interface.

## Executive Summary

- Audit Health Score: **18/20 (Excellent)**
- Improvement from baseline: **+4 points**
- Issues: **0 P0 / 0 P1 / 3 P2 / 2 P3**
- TypeScript: pass
- ESLint: pass
- Production build: pass
- Playwright: **10/10 pass**
- Project data validation: **6 projects pass**
- Engineering catalog validation: **3 repositories pass**
- Homepage First Load JS: **157 kB**, down from **173 kB**
- Project archive First Load JS: **109 kB**, down from **155 kB**

Top remaining priorities:

1. Communicate required fields and validation recovery explicitly in the contact form.
2. Correct skipped heading levels in the project archive and case sidebar.
3. Expose the visually active navigation item with `aria-current`.
4. Synchronize documented color and typography ramps with intentional production values.

## Detailed Findings by Severity

### P2 Minor

#### [P2] Required fields are not communicated before validation

- **Location:** `src/components/sections/contact/ContactSection.tsx:114-175`
- **Category:** Accessibility
- **Impact:** Visitors can infer the required fields only after browser validation runs. This adds avoidable friction for screen-reader and cognitive-accessibility users preparing a project inquiry.
- **WCAG/Standard:** WCAG 3.3.2 Labels or Instructions
- **Recommendation:** Mark “Nombre” and “Contexto para el diagnóstico” as required in their visible labels, add a concise form-level instruction, and associate recovery copy with invalid fields while preserving native validation.
- **Suggested command:** `$impeccable harden`

#### [P2] Project surfaces skip heading levels

- **Location:** `src/components/sections/projects/ProjectArchive.tsx:40,94`; `src/app/projects/[slug]/page.tsx:135,181-214`
- **Category:** Accessibility / Implementation Integrity
- **Impact:** The archive moves from `h1` directly to project-card `h3` headings, and case pages expose sidebar `h3` headings before their `h2` sections. Screen-reader heading navigation is therefore less predictable than the visual hierarchy.
- **WCAG/Standard:** WCAG 1.3.1 Info and Relationships
- **Recommendation:** Use `h2` for archive project titles and establish a consistent `h2` level for case-page regions before nested headings.
- **Suggested command:** `$impeccable harden`

#### [P2] Active navigation state is visual only

- **Location:** `src/components/layout/header/Header.tsx:68-82`
- **Category:** Accessibility
- **Impact:** Sighted visitors can identify the current section through the active capsule, but assistive technology receives no equivalent state.
- **WCAG/Standard:** WCAG 1.3.1, 4.1.2
- **Recommendation:** Add `aria-current="location"` to the link whose section matches `activeSection`, including the equivalent mobile navigation item.
- **Suggested command:** `$impeccable harden`

### P3 Polish

#### [P3] Five ambient color variants sit outside the documented palette

- **Location:** `src/app/globals.css:96,126,152,154,180`
- **Category:** Theming
- **Impact:** The interface is visually coherent today, but these independently encoded polar/atmospheric variants make later palette changes and detector interpretation less deterministic.
- **Recommendation:** Decide which variants are canonical, add them to the design-system tonal ramp, and reference variables rather than repeating literal RGBA values.
- **Suggested command:** `$impeccable document`

#### [P3] Production typography and DESIGN.md are slightly out of sync

- **Location:** `DESIGN.md:20-48`; `src/app/globals.css:211`; `src/components/sections/hero/HeroSection.tsx:18-44`; compact project metadata
- **Category:** Theming / Implementation Integrity
- **Impact:** The implemented responsive display sizes and 10–11 px metadata steps are intentional, but the documented ramp cannot currently distinguish them from accidental drift.
- **Recommendation:** Document the compact metadata step and actual responsive display range; reconcile the display tracking entry with the production `-0.04em` floor.
- **Suggested command:** `$impeccable document`

## Patterns & Systemic Issues

No systemic accessibility, performance or responsive failure remains.

The only recurring gap is **documentation precision**: production uses a small number of deliberate tonal and typographic variants that are not yet encoded in the design-system sidecar. This creates detector noise but does not currently create user-facing inconsistency.

## Positive Findings

- Skip link and stable main-content target provide keyboard bypass.
- Global focus-visible styling is high contrast and consistent.
- Search, icon-only links and the 3D scene expose accessible names.
- Contact controls have programmatic labels, native constraints and clear privacy expectations.
- `prefers-reduced-motion` preserves useful color/focus feedback, removes the focal entrance and switches WebGL to demand rendering.
- Touch targets are at least 44×44 px across the tested mobile path, including footer, project resources and empty-state recovery.
- Responsive tests verify no horizontal overflow at four representative compact and intermediate viewports.
- `next/image` provides responsive sizing and layout-stable image containers.
- The spatial scene is dynamically loaded, viewport gated, hidden on mobile, capped at DPR 1.5 and non-blocking.
- Homepage presentation-only sections no longer hydrate.
- The contact flow opens a reviewable WhatsApp message and performs no automatic external write.
- Static generation, metadata, robots, sitemap and structured project validation remain healthy.

## Verification Evidence

- `pnpm typecheck`: pass
- `pnpm lint`: pass
- `pnpm build`: pass
- `pnpm test:e2e`: 10/10 pass
- `pnpm validate:data`: 6 projects validated
- `pnpm validate:catalog`: 3 repositories validated, report schema v1
- `git diff --check`: pass
- Bundled detector: 22 findings reviewed; 4 false-positive warnings and 18 non-blocking advisories
- In-app visual inspection: unavailable in this session because no browser backend was exposed; automated Chromium coverage and source verification were used as fallback evidence

## Recommended Actions

1. **[P2] `$impeccable harden`**: complete required-field instructions, heading hierarchy and `aria-current` state.
2. **[P3] `$impeccable document`**: synchronize the intentional ambient colors and responsive typography with the design-system sidecar.
3. **[P3] `$impeccable polish`**: perform the final consistency check after those narrow changes.

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run `$impeccable audit` after fixes to see your score improve.
