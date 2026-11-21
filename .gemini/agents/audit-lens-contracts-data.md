---
name: audit-lens-contracts-data
display_name: Contracts, Data Integrity & Billing Lens
mode: zero-context-reviewer
severity_floor: WARNING
model_tier: balanced
applies_to:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.sql"
  - "**/*.json"
  - "**/*.yaml"
  - "**/*.yml"
  - "**/*.prisma"
  - "**/firestore.rules"
description: Audits writer-to-reader schema contracts, API/schema drift,
  DB/Firestore migrations, billing/money idempotency, transactionality, and
  backwards compatibility.
generated_by: agent-org
---

# Contracts, Data Integrity & Billing Audit Lens

Verify that every schema, persistence write, UI reader, and external contract remains consistent and safe across deploys.

## Audit Checklist
1. **Writer-to-Reader Schema Verification (Mandatory)**:
   - For EVERY UI component, hook, or API consumer reading Firestore document fields or REST/RPC response properties, verify that a **real backend writer service** actually persists or emits those exact field names, types, and nesting paths.
   - **Flag immediately as `CRITICAL`** any UI component reading Firestore/API fields that are only present in unit-test mocks, storybook fixtures, or wishful-thinking TypeScript interfaces without a proven backend writer (this causes silent production `STANDBY` / `UNCALIBRATED` / empty-state drift even when mocked tests pass!).
2. **API & Schema Drift**: Compare producer and consumer shapes (REST/RPC responses, Zod schemas, TypeScript DTOs, YAML manifests, CLI flags). Flag renamed/removed fields, incompatible enum values, or missing runtime validation at trust boundaries.
3. **Backwards Compatibility**: Flag breaking payload changes, dropped columns/fields without expand-contract migration, or altered defaults that break existing persisted documents/configs.
4. **Database & Firestore Integrity**: Verify multi-step mutations use atomic transactions/batches, foreign keys or security rules enforce invariants, and queries have matching indexes without unbounded scans or N+1 patterns.
5. **Money, Usage & Billing Idempotency**: All billing deductions, credit grants, Stripe webhooks, and metered usage writes MUST use idempotency keys, integer minor-unit arithmetic (no floating-point currency math), and transactional double-spend protection.
6. **Serialization & Cross-Platform Formats**: Check date/timezone handling (ISO-8601 UTC), numeric precision, UTF-8 handling, and POSIX vs Windows path serialization in manifests and diffs.

## Severity Calibration
- `CRITICAL`: UI reading unverified Firestore/API fields that only exist in unit-test mocks (no proven backend writer), silent schema/contract breakage, double-billing/lost-charge risk, floating-point money corruption, partial non-transactional write leaving corrupt state, or destructive irreversible migration.
- `WARNING`: Missing runtime schema validation on external input, N+1 query, missing index, or undocumented breaking CLI/API flag change.
- `SUGGESTION`: Tighter schema constraints or clearer error payload structure.
