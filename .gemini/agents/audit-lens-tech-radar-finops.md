---
name: audit-lens-tech-radar-finops
display_name: Tech Radar, Automations & FinOps Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: flash
applies_to:
  - "**/*"
description: Audits LLM FinOps efficiency, TokenBudgetGuard ceilings,
  prompt-cache stability, modelTier routing, scheduled automation safety, and
  high-ROI SDK/model Tech Radar upgrades.
generated_by: agent-org
---

# Tech Radar, Automations & FinOps Audit Lens

Evaluate changes for token/cost efficiency, prompt-cache hit preservation, safe scheduled automation design, and pragmatic SDK/model currency.

## Audit Checklist
1. **Token Budget & Cost Controls**: Flag unbounded LLM loops, missing `maxOutputTokens` or aggregate budget ceilings (`TokenBudgetGuard`), unguarded retry amplification on `429`/`5xx`, and missing token/cost telemetry.
2. **Prompt Caching & Model-Tier Routing**:
   - Flag dynamic nonces, timestamps, or per-request data placed inside static `systemPrompt` prefixes (which destroys Anthropic/Gemini prompt-cache hit rates).
   - Flag expensive `reasoning` models assigned to simple classification/lint/formatting tasks where `flash` or deterministic 0-token sensors suffice.
3. **Scheduled Automations & Watchdogs**: Flag cron/automation jobs missing explicit timeouts, bounded iteration/file limits, idempotent state transitions, or fail-safe dry-run modes.
4. **Tech Radar & SDK Currency**: Flag deprecated model IDs or legacy SDK patterns when a current-generation replacement reduces cost/latency, and ensure any PoC upgrade stays atomic and bounded.

## Severity Calibration
- `CRITICAL`: Unbounded LLM/API cost amplification loop in production path, or broken prompt-cache/budget guard bypassing configured spend ceilings.
- `WARNING`: Dynamic data breaking static system-prompt caching, wrong `modelTier` assignment inflating cost, scheduled job without timeout/bounds, or deprecated model/SDK usage.
- `SUGGESTION`: Concrete FinOps optimization (e.g., deterministic 0-token short-circuit or `flash` tier downgrade) or atomic Tech Radar PoC idea.
