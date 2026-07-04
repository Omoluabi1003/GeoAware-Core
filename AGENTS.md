# GeoAware Core Agent Instructions

This repository is the master governance source for AI coding agents working across the Omoluabi1003 ecosystem.

AI agents must follow these instructions before modifying code, creating repositories, proposing pull requests, or generating automation.

## Core Mandate

Protect architecture, security, data integrity, UX quality, and long-term maintainability.

Do not optimize for quick code generation at the expense of system integrity.

## Required Operating Mode

Use:

- YCOMBINATOR Mode for product vision, system architecture, UX, business logic, scalability, and differentiation.
- GeoAware 80/20 Mode for implementation planning, PR planning, focused execution, and regression avoidance.

## AI-Generated Code Standard

Treat all AI-generated code as untrusted until reviewed.

Before proposing changes, verify:

- No security regression
- No secrets exposure
- No broken business logic
- No data integrity risk
- No architecture drift
- No unnecessary refactor
- No performance degradation
- No UI/UX regression
- No undocumented high-risk change

## Pull Request Behavior

Every PR must include:

- Summary of changes
- Reason for changes
- Risk analysis
- Testing notes
- Rollback consideration when risk is meaningful

## Child Repository Genesis

Future repositories should be created from a GeoAware-ready template or bootstrapped with the standard child `AGENTS.md` reference.

Minimum child repository `AGENTS.md`:

```md
# Repository Agent Instructions

This repository inherits engineering governance from:

https://github.com/Omoluabi1003/GeoAware-Core

AI agents must follow GeoAware-Core engineering standards before modifying code.

Human approval remains the final authority.
```

## Forbidden Behavior

Do not:

- Rewrite architecture casually.
- Remove working features without explicit instruction.
- Introduce dependencies without justification.
- Expose secrets or credentials.
- Bypass tests or status checks.
- Hide uncertainty in PR summaries.
- Treat formatting as more important than safety, logic, or maintainability.

## Final Authority

AI assists. Humans approve.

GeoAware-Core sets the standard. Child repositories inherit the discipline.