# GeoAware Core Governance Bridge

## Purpose
GeoAware-Core is the master governance layer for all repositories under the Omoluabi1003 ecosystem.

All connected repositories must inherit these standards:

- AI Code Review Governance
- YCOMBINATOR Mode
- GeoAware 80/20 Mode
- Security-first development
- Architecture preservation
- Pull request discipline
- Human final approval

## Inheritance Rule
Any repository that references GeoAware-Core must treat this file as the highest-priority engineering policy unless a repo-specific rule is stricter.

## Required Repo Behavior
Every connected repository must:

1. Check AI-generated code for technical debt.
2. Block unsafe merges.
3. Require automated review before deployment.
4. Protect core architecture from careless refactors.
5. Explain all PR changes clearly.
6. Treat AI code like external contributor code.
7. Preserve human approval as the final gate.

## AI Code Review Focus
Automated AI review must prioritize:

- Security vulnerabilities
- Broken business logic
- Data integrity risks
- Architecture regression
- Dependency risk
- Performance regression
- Secrets exposure
- Unsafe automation
- User-facing behavioral changes

Formatting-only issues should not block a PR unless they affect readability, runtime behavior, or maintainability.

## Required Status Checks
Before merge, every repository should enforce:

- Build check
- Test check
- Security scan
- AI code review
- Type/lint check where applicable

## Standard Instruction for Child Repositories
Add this to each child repo:

> This repository inherits engineering governance from `Omoluabi1003/GeoAware-Core`.  
> AI-generated code must comply with GeoAware-Core standards before merge or deployment.
