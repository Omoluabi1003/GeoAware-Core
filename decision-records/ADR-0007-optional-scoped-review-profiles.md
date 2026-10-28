# ADR-0007: Optional scoped review profiles

## Status
Proposed for human review after the Project Architect authorized preparation.
No constitutional amendment or change to final authority is proposed.

## Context
The Project Architect requested selective adoption of Agency Agents review
practices. Repeated product review has exposed gaps between passing checks,
user comprehension and claims about actual behavior. Importing hundreds of
unmodified personas would duplicate governance and introduce conflicting rules.

## Decision
Keep four short, optional [review profiles](../review/AGENT_REVIEW.md) in the
canonical governance repository. Child adapters supply product constraints and
existing commands and pin the reviewed profile revision. Existing host tools
apply them explicitly; there is no global install, runtime agent framework,
new provider, new paid infrastructure, automatic delegation or automatic gate.
Source attribution and the MIT notice accompany the manually adapted content.

The profiles augment existing reviews. They do not change required checks,
application behavior, clinical authority, review roles, permissions or human
merge/deployment approval. Product-specific terminology and data models stay
with each product. This is optional enabling documentation under the existing
80/20 doctrine, not a new permanent obligation on every repository.

## Consequences and validation
Role separation does not guarantee independent reasoning. Evaluate bounded
pilots with known defective examples and correct controls; record limitations,
false positives, confirmed findings and measured cost/time when available.
Do not treat persona claims, synthetic tests or a non-blind rehearsal as proof
of improved delivery or clinical validity. Product reports remain internal.

Validate document links, exact source/license provenance and profile boundaries.
Run the target repository's existing relevant checks; do not build a new test
runner merely for these documents. REZAHS owns its first adapter and pilot.

## Rollback and review triggers
Remove the optional entry links, profiles and child adapter pin. Preserve this
decision record with superseded status if the decision changes. No schema,
clinical record, production configuration or user data is affected. Revisit if
the pilot produces unsupported findings, material overhead, missing boundaries
or a demonstrated need for enforcement/tooling beyond documentation.
