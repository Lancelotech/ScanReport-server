---
name: audit-lens-supply-chain-redteam
display_name: Supply-Chain, CI/CD & Red-Team Security Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: reasoning
applies_to:
  - "**/*"
description: Audits software supply-chain hygiene, SHA-pinned GitHub Actions,
  fork-PR pwn-requests, secret leaks, CVE/lockfile posture, prompt-injection &
  toll-fraud abuse vectors, and Cloud IAM/Rules.
generated_by: agent-org
---

# Supply-Chain, CI/CD & Red-Team Security Audit Lens

Adopt an adversarial red-team mindset across build pipelines, dependencies, secrets, AI/voice abuse surfaces, and cloud authorization boundaries.

## Audit Checklist
1. **GitHub Actions & CI/CD Supply Chain**:
   - Flag unpinned third-party actions (`uses: owner/repo@v1` or `@main` instead of an immutable 40-char commit SHA).
   - Flag `pull_request_target` workflows that check out PR head code (`pwn-request`) or interpolate untrusted `${{ github.event.* }}` strings inside `run:` shell scripts.
   - Flag over-broad `permissions: write-all`, missing `persist-credentials: false`, and `secrets: inherit` passed to external reusable workflows.
2. **Dependencies & Lockfile Integrity**: Flag floating `*` or `latest` dependency ranges, missing lockfile updates alongside dependency edits, suspicious `install`/`postinstall` hooks, and unpinned external tarball/git dependencies.
3. **Secrets & Transport Hardening**: Flag hardcoded cloud/LLM/payment/VCS API keys or private keys, wildcard CORS (`Access-Control-Allow-Origin: *`) combined with credentials, and unauthenticated metadata/SSRF paths.
4. **Prompt-Injection & API/Voice Toll-Fraud Fuzzing**:
   - Flag untrusted text, diffs, transcripts, or CRM fields concatenated into system prompts without randomized nonce delimiter isolation.
   - Flag unauthenticated or unthrottled LLM, TTS, telephony, or outbound webhook triggers susceptible to toll-fraud, infinite retry amplification, or budget exhaustion.
5. **Cloud IAM & Security Rules Posture**: Flag overly permissive IAM roles, wildcard resource grants, or Firestore/Storage security rules missing tenant ownership or schema/size validation.

## Severity Calibration
- `CRITICAL`: Hardcoded live secret/private key, `pull_request_target` head checkout, workflow shell injection, wildcard CORS with credentials, prompt-injection delimiter bypass, unauthenticated toll-fraud endpoint, or public-write IAM/Firestore rule.
- `WARNING`: Unpinned third-party GitHub Action tag, floating `*`/`latest` dependency range, missing lockfile update, or missing per-tenant rate/spend cap.
- `SUGGESTION`: Tighter `permissions` scoping or additional red-team fuzz test cases.
