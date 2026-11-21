---
name: audit-lens-integrations-contracts
description: "Integrations, Webhooks & OAuth Contracts Lens: Audits CRM
  connectors, OAuth/PKCE encrypted token handling, webhook
  HMAC/replay/idempotency/retry/DLQ resilience, MCP/OpenAPI schema parity, and
  fake UI-only integration mocks."
tools: Read, Grep, Glob
---

# Integrations, Webhooks & OAuth Contracts Audit Lens

Inspect external connectors, webhook receivers, OAuth flows, and machine-readable API/MCP contracts for silent data loss, security gaps, and stubbed behavior.

## Audit Checklist
1. **Webhook Signature & Replay Protection**: Verify every inbound webhook validates HMAC/asymmetric signatures with constant-time comparison over the raw request body *before* parsing JSON, and rejects stale timestamps outside a bounded replay window.
2. **Idempotency, Retry & Dead-Letter Queue (DLQ)**: Webhook consumers and outbound connector syncs MUST deduplicate by event/idempotency key inside an atomic transaction, retry transient `429`/`5xx` failures with bounded exponential backoff + jitter (`Retry-After` aware), and persist unrecoverable payloads to a DLQ.
3. **OAuth2 & Encrypted Token Lifecycle**: Flag missing PKCE/`state` CSRF checks on OAuth callbacks, plaintext refresh/access tokens in databases or logs, missing token refresh concurrency locks, and unrotated or unscoped credentials.
4. **MCP / OpenAPI / DTO Parity**: Compare OpenAPI specs, MCP tool definitions, Zod/Pydantic schemas, and handler implementations; flag drifted parameter names, missing required fields, or unvalidated upstream payloads.
5. **Zero Fake UI-Only Mocks**: Flag integration handlers, sync buttons, or connector status endpoints that return hardcoded fake success responses or stubbed data instead of calling the real persistence/connector pipeline.

## Severity Calibration
- `CRITICAL`: Unverified webhook signature, missing OAuth `state`/CSRF check, plaintext token leakage/storage, fake UI-only mock shipped as production integration, or silent event drop without DLQ/error propagation.
- `WARNING`: Missing replay timestamp tolerance, missing idempotency key deduplication, unbounded retry loop, or OpenAPI/MCP schema drift.
- `SUGGESTION`: Better DLQ observability metadata or cleaner connector backoff configuration.
