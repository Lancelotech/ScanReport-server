---
name: audit-lens-anti-slop-ui
display_name: Anti-Slop UI, RTL & Accessibility Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: flash
applies_to:
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.css"
  - "**/*.scss"
  - "**/*.html"
description: Audits AI-slop visual cliches, hardcoded dir="rtl" locale leaks,
  mixed bilingual copy, legacy sky-blue/AI-purple colors, celebration
  emoji/Sparkles slop, RTL logical CSS properties, accessibility (a11y), and
  cohesive screen design.
generated_by: agent-org
---

# Anti-Slop UI, RTL & Accessibility Audit Lens

Protect visual craftsmanship, strict EN/HE dual-locale purity, brand color discipline, internationalized RTL ergonomics, and WCAG accessibility.

## Audit Checklist
1. **Anti-Slop Craftsmanship & Brand Color Purity**:
   - Flag generic AI-slop aesthetics: gratuitous purple/indigo neon gradients (`from-indigo-*` + `to-purple-*`), `glass-card`/backdrop-blur overuse, oversized `shadow-xl` everywhere, `animate-bounce` novelty motion, arbitrary raw hex colors (`bg-[#...]`) bypassing design tokens, and raw internal ticket IDs (e.g., `VF-123`, `JIRA-45`) leaked into user-visible JSX text.
   - Flag hardcoded **legacy sky-blue / AI-purple brand colors** (`#38BDF8`, `#0EA5E9`, `#0066CD`, `#4F46E5`, `#6366F1`, `#818CF8`, `bg-sky-*`, `text-sky-*`, `border-sky-*`) in charts, strokes, borders, or backgrounds — require semantic design tokens (`var(--ink-carbon)`, `var(--signal-live)`, etc.).
   - Flag **celebration / AI-slop emojis** (`🎉`, `🚀`, `✨`) and **`<Sparkles />` icons** in production JSX copy or chrome.
   - Flag **holistic surface clashes**: slapping heavy dark/obsidian cards or hero blocks onto uncleaned legacy light screens without unifying the surrounding layout, palette, and whitespace.
2. **Dual-Locale Purity & Zero Hardcoded `dir="rtl"`**:
   - Flag any **hardcoded `dir="rtl"`** (or `dir={'rtl'}`) on UI components outside root layout/bootstrap (`layout.tsx`). Hardcoded RTL breaks LTR `EN` pages; direction must flow from the root locale provider, using `<bdi dir="ltr">` only for inline phone numbers, numbers, or code tokens.
   - Flag **mixed bilingual strings** concatenated on the same line or text node (e.g., `Test Live Agent · בדיקת סוכן חי`, `תקין · Call failed`). `EN` views must have 0 Hebrew characters and `HE` views must have 0 untranslated UI chrome.
3. **No Static Inline Styles**: Flag static `style={{ ... }}` props where Tailwind/design-system classes belong (dynamic computed values like `width: \`${pct}%\`` are acceptable).
4. **RTL & Logical Properties**: For bidirectional apps (Hebrew/Arabic + English), flag physical directional utilities (`ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-`, `text-left`, `text-right`) where CSS logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `text-end`) are required.
5. **Complete UI States**: Every async data view or form MUST implement loading, error (with recovery/retry), empty, and disabled-during-submit states.
6. **Accessibility (a11y)**: Flag clickable `<div>`/`<span>` without button semantics/keyboard handlers, icon-only buttons missing `aria-label`, inputs missing `<label>`, missing `alt` attributes, broken focus rings, and insufficient contrast.

## Severity Calibration
- `CRITICAL`: Hardcoded `dir="rtl"` in UI components outside root `layout.tsx`, mixed bilingual EN+HE strings in user-facing copy, hardcoded legacy sky-blue/AI-purple hexes or `*-sky-*` brand color violations, inaccessible primary user flow, broken RTL layout obscuring controls, or leaked internal/debug identifiers in customer UI.
- `WARNING`: Celebration/AI-slop emoji (`🎉`/`🚀`/`✨`) or `<Sparkles>` icons, heavy dark blocks bolted onto uncleaned legacy light screens, AI-slop visual tokens/arbitrary hex colors, static inline styles, missing loading/error/empty states, or physical instead of logical directional classes.
- `SUGGESTION`: Microcopy polish or minor semantic HTML improvement.
