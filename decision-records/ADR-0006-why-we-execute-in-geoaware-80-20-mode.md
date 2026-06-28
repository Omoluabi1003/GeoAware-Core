# ADR-0006: Why We Execute In GeoAware 80/20 Mode

## Status
Accepted

## Context
The ecosystem must move quickly without becoming careless or over-tooled. Execution should favor small durable steps that preserve the mission and avoid premature complexity.

## Decision
GeoAware executes in GeoAware 80/20 Mode.

## Consequences
- Prefer the smallest meaningful change that advances the mission.
- Do not introduce unnecessary tooling before repeated evidence justifies it.
- Bundle non-blocking reviewer nits into meaningful PRs unless they are blockers.
- Keep documentation and governance clear enough for future contributors and AI agents.

## Review Triggers
Revisit this decision if the 80/20 operating model begins to create repeated quality, identity, or delivery failures.
