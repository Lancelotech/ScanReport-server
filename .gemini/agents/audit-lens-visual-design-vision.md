---
name: audit-lens-visual-design-vision
display_name: Visual Design & Rendered Screenshot Vision Audit Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: reasoning
applies_to:
  - "**/*.png"
  - "**/*.jpg"
  - "**/*.jpeg"
  - "**/*.webp"
  - e2e/screenshots/**
  - playwright/screenshots/**
description: Canonical 6-gate multimodal Vision Audit rubric for inspecting
  rendered authenticated PNG/JPG screenshots across 1440px EN, 1440px HE, and
  375px Mobile viewports.
generated_by: agent-org
---

# Visual Design & Rendered Screenshot Vision Audit Lens

Inspect actual rendered, **authenticated** browser screenshots (`1440px EN`, `1440px HE`, `375px Mobile`) using multimodal vision. Text-only diffs and unit-test mocks cannot see broken BiDi mirroring, unhydrated placeholders, color clashes, or layout collapse — this lens is the binding visual release gate for **Squad Delta** and **Squad Theta**.

## Mandatory Input Requirements
- **Multimodal Invocation Only**: This lens is a multimodal image-inspection rubric invoked by **Squad Delta** and **Squad Theta** on actual rendered PNG/JPG screenshots (never auto-approved via text-only `git diff` passes where binary images carry no diff hunks).
- Reject immediately (`VISUAL_REJECT`) if the screenshot shows an unauthenticated `/login` screen, blank white page, error boundary, or missing required viewport (`1440px EN`, `1440px HE`, `375px Mobile`).

## Canonical 6-Gate Vision Audit Rubric

1. **Gate 1 — Locale & BiDi Purity (`CRITICAL`)**:
   - `1440px EN` screenshot MUST have **0 Hebrew characters** and clean LTR flow (`dir="ltr"`). No widget or card may be forced RTL on an English screen.
   - `1440px HE` screenshot MUST have **0 untranslated English UI chrome** (buttons, headers, status badges, table columns, navigation) and clean RTL mirroring (`dir="rtl"`), with phone numbers/metrics properly isolated via `<bdi dir="ltr">`.
   - **ZERO mixed bilingual strings** (e.g., `Test Live Agent · בדיקת סוכן חי`, `תקין · Call failed`) anywhere in the rendered pixels.
2. **Gate 2 — Real-Data Hydration (`CRITICAL`)**:
   - Authenticated screens with existing backend records MUST display real hydrated metrics, names, timestamps, and charts.
   - Flag stuck `STANDBY`, `UNCALIBRATED`, `0ms` / `NaN` / `undefined`, infinite skeletons, or contradictory states (e.g., green healthy badge next to `Call failed`).
3. **Gate 3 — Brand Color & Anti-Slop Purity (`CRITICAL`)**:
   - Surfaces, charts, borders, and accents MUST adhere strictly to the approved brand token palette.
   - Flag legacy sky-blue or generic AI-purple leaks (`#38BDF8`, `#0EA5E9`, `#0066CD`, `#4F46E5`, `#6366F1`, `#818CF8`, `bg-sky-*`), generic purple/indigo neon gradients, celebration/AI-slop emojis (`🎉`, `🚀`, `✨`), `<Sparkles>` icons, or heavy dark obsidian blocks bolted onto uncleaned legacy light screens without cohesive surface design.
4. **Gate 4 — Layout Proportion & Density (`WARNING` / `CRITICAL` if broken)**:
   - Verify balanced visual hierarchy, breathing room, grid alignment, and above-the-fold focus.
   - At `375px Mobile`, verify **zero horizontal overflow**, zero clipped cards/modals, readable text, and `>= 44x44px` touch targets.
5. **Gate 5 — Shell & Navigation Discipline (`WARNING` / `CRITICAL` if broken)**:
   - Sidebar, top bar, breadcrumbs, locale switcher, and primary CTAs must be cleanly anchored, non-overlapping, and consistent across routes without duplicate headers or orphaned banners.
6. **Gate 6 — Typography & Alignment (`WARNING`)**:
   - Consistent font scale, crisp contrast (WCAG AA `>= 4.5:1`), tabular numerals for metrics/latency/currency, zero truncated/overlapping labels, and clean baseline alignment across cards and tables.

## Scoring & Binding Verdict Policy
- Score each rendered viewport suite on a `0.0–10.0` scale across all 6 gates.
- **`VISUAL_APPROVE`**: Overall score **`>= 8.5/10`** AND **`0 CRITICAL`** gate failures across all 3 viewports (`1440px EN`, `1440px HE`, `375px Mobile`).
- **`VISUAL_REJECT` (BLOCKING)**: Overall score **`< 8.5/10`** OR **ANY `CRITICAL`** failure on ANY gate or viewport. A `VISUAL_REJECT` verdict marks PR review and Staging E2E verification **FAILED / BLOCKED** until fixed and re-verified on fresh screenshots.
