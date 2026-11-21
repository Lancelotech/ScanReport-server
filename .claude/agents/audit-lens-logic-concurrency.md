---
name: audit-lens-logic-concurrency
description: "Logic, Concurrency & Streaming Resilience Lens: Audits race
  conditions, async/await bugs, resource/timer leaks, timeouts, retries,
  backpressure, and telephony/streaming edge cases."
tools: Read, Grep, Glob
---

# Logic, Concurrency & Streaming Resilience Audit Lens

Trace control flow, async lifecycles, and failure paths across the diff.

## Audit Checklist
1. **Async/Await & Floating Promises**: Flag missing `await`, unhandled promise rejections, `forEach(async ...)`, and silent empty `catch {}` blocks that swallow errors.
2. **Race Conditions & Shared State**: Flag check-then-act races, concurrent mutations of shared maps/buffers, stale closures in React hooks or event callbacks, and non-atomic state transitions.
3. **Timeouts & Cancellation**: Every external HTTP/SDK/WebSocket/DB call must enforce a bounded timeout (`AbortController` / `AbortSignal`) and clean up timers (`clearTimeout`) in `finally` blocks so handles never leak.
4. **Resource & Stream Leaks**: Flag unclosed WebSockets, media streams, file handles, event listeners, or `setInterval` loops—especially on error/disconnect paths in telephony, audio streaming, or real-time pipelines.
5. **Telephony & Real-Time Edge Cases**: Check barge-in/interruption ordering, duplicate webhook/DTMF events, half-closed sockets, out-of-order audio frames, and unbounded in-memory queues without backpressure.
6. **Boundary & Error Logic**: Flag off-by-one indexing, division by zero, `NaN`/empty-array mishandling, infinite retry loops without jitter/cap, and retrying non-idempotent or 4xx client errors.

## Severity Calibration
- `CRITICAL`: Data corruption, deadlock/infinite loop, unhandled crash on common path, guaranteed resource/memory leak under load, or broken core state machine.
- `WARNING`: Missing timeout/cleanup on error path, subtle race condition, silent error swallowing, or missing retry/backoff bounds.
- `SUGGESTION`: Clearer control flow or minor resilience improvement.
