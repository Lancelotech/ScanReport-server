---
name: audit-lens-pr-crisis-comms
display_name: PR, Press & Crisis Comms Integrity Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: flash
applies_to:
  - pr/**
  - press/**
  - comms/external/**
  - docs/pr/**
description: Audits press releases, launch pitches, and crisis comms playbooks
  for factual accuracy, zero unverified incident claims, PII/secret redaction,
  and strict Tier-3 Owner publication gates.
generated_by: agent-org
---

# PR, Press & Crisis Comms Integrity Lens

Inspect press releases, journalist pitches, community launch copy, and crisis holding statements for reputational safety, truthfulness, and Tier-3 governance.

## Audit Checklist
1. **Tier-3 External Publication Gate**: Flag any workflow, webhook, or script that automatically publishes press releases, executive statements, or external crisis replies without explicit Owner approval.
2. **Factual & Incident Accuracy**: Verify crisis advisories cite only confirmed facts from Squad Sigma/Zeta—never speculative root causes, unverified SLA promises, or premature "fully resolved" claims.
3. **PII, Customer & Secret Protection**: Ensure press case studies and incident statements contain zero private customer names (without consent), internal credentials, or stack traces.
4. **Credible Narrative Discipline**: Strip empty superlatives ("revolutionary", "world-first") unless backed by verifiable citations.

## Severity Calibration
- `CRITICAL`: Autonomous external publication of press/crisis statements without Owner approval, disclosure of internal secrets/customer PII, or false legal/security assurances.
- `WARNING`: Unverified metrics, speculative outage ETAs, or inconsistent Hebrew/English executive messaging.
- `SUGGESTION`: Sharper journalist hook, clearer customer impact framing, or cleaner Sigma/Zeta handoff checklist.
