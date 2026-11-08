# Verified Autonomy Standard v1

GeoAware-Core remains **documentation-first** and the single authority for geospatial governance. OIC owns shared agent orchestration; applications own user-visible behavior.

## Mandatory decision sequence

OBSERVE → VERIFY → DECIDE → ACT (only when authorized) → AUDIT → RECOVER.

1. Every automated decision must have a correlation ID and an explicit product boundary.
2. Unknown or contradictory geographic evidence is **unverified**; never silently infer a place from IP addresses, country centroids, or stale cache.
3. Spatial decisions must consult the GeoAware-authoritative adapter. OIC must not become a competing spatial source.
4. Only bounded, idempotent, reversible operations may retry automatically. The maximum attempts must be explicit. No infinite loops.
5. A failed check must **fail closed** for payment, delivery settlement, identity, jurisdiction, and geographic relocation.
6. Users retain intentional control over playback, location, bookings, and financial transactions. No silent station teleport, automatic booking or payment.
7. Store minimal, redacted, append-only decision records. No tokens, personal information or raw sensitive provider payloads in logs.
8. Recovery must preserve the last verified state. Inability to recover is an explicit degraded state, not fabricated success.
9. Human review is mandatory for irreversible or consequential transitions.
10. Every integration requires deterministic tests for success, ambiguity, stale evidence, wrong geography, retry exhaustion and human override.

## Adoption

- **OIC**: reusable bounded recovery and verification contracts; orchestration only.
- **WaveAtlas**: station identity/geographic guard and playback candidate selection; user-led transitions.
- **Haulora**: offer/dispatch evidence gate with no automatic acceptance, booking, payment, delivery or settlement.
- **GeoAware-Core**: policy and architectural authority, not deployable application code.

## Deployment gates

Require typecheck, tests, security review, audit of changed behaviors, preview observation where relevant and Project Architect approval before merge. A module added to a repository does not mean a production capability has been switched on. Feature exposure requires an explicit integration change and production verification.
