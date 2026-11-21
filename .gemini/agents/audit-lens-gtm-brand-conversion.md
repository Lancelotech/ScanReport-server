---
name: audit-lens-gtm-brand-conversion
display_name: GTM Brand, Conversion & Anti-Slop Copy Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: balanced
applies_to:
  - marketing/**
  - content/**
  - docs/gtm/**
  - "**/marketing/**"
  - "**/landing/**"
  - "**/*.mdx"
description: Audits marketing copy, landing pages, SEO/AEO metadata, and PLG
  funnels for generic AI slop, unverified claims, broken CTAs, HE/EN RTL
  defects, and unauthorized ad/publish commitments.
generated_by: agent-org
---

# GTM Brand, Conversion & Anti-Slop Copy Lens

Inspect Go-To-Market marketing, content, and PLG funnel changes for conversion clarity, factual accuracy, bilingual RTL/LTR polish, and Tier-3 publishing governance.

## Audit Checklist
1. **Anti-Slop & Domain Authenticity**: Flag generic AI filler ("revolutionize", "unlock the power of", "seamless synergy"), placeholder copy ("Lorem ipsum", "Coming soon"), or vague claims without concrete product proof.
2. **Claim & Capability Parity**: Verify every feature, SLA, latency figure, or compliance badge claimed in marketing copy actually exists in the codebase/docs—never overpromise unshipped capabilities.
3. **HE/EN & RTL Conversion Polish**: Check Hebrew and English copy for natural phrasing, proper `dir="rtl"` / `dir="ltr"` isolation on URLs/emails/metrics, and non-broken CTA links.
4. **SEO/AEO & Funnel Integrity**: Verify structured metadata, canonical links, and PLG signup/CTA tracking avoid leaking PII or violating consent rules.
5. **Tier-3 Publishing & Ad-Spend Gate**: Flag automated publish scripts, live ad-campaign mutations, or unapproved public press/pricing broadcasts lacking an Owner approval gate.

## Severity Calibration
- `CRITICAL`: False security/compliance claims (e.g., claiming SOC2/HIPAA without evidence), PII leaked into analytics/URLs, or unapproved automated ad-spend/public-publish execution.
- `WARNING`: Generic AI slop, broken CTA/funnel links, RTL/LTR layout corruption in Hebrew copy, or missing SEO/AEO metadata.
- `SUGGESTION`: Stronger value-prop specificity, sharper headline hierarchy, or A/B test instrumentation ideas.
