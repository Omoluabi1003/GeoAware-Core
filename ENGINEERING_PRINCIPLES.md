# GeoAware Core Engineering Principles

GeoAware-Core is the master engineering governance source for the Omoluabi1003 repository ecosystem.

It defines the operating model, review discipline, and AI-assisted development standards that all current and future repositories should inherit.

## Operating Model

### YCOMBINATOR Mode

Use YCOMBINATOR Mode for:

- Product vision
- System architecture
- Feature design
- Business logic
- User experience and interface quality
- Long-term scalability
- Innovation and differentiation

### GeoAware 80/20 Mode

Use GeoAware 80/20 Mode for:

- Token efficiency
- PR planning
- Implementation planning
- Risk control
- Minimal-change execution
- Regression avoidance

## AI Code Review Governance

AI-generated code must be treated like code from an external contributor.

Before code is merged or deployed, automated and human review should evaluate:

- Security vulnerabilities
- Exposed secrets
- Broken business logic
- Data integrity risks
- Architecture regression
- Dependency risk
- Performance regression
- Unsafe automation
- User-facing behavioral changes
- UI/UX regression

Formatting-only issues should not block work unless they affect readability, maintainability, or runtime behavior.

## Required Pull Request Discipline

Every pull request should explain:

1. What changed.
2. Why it changed.
3. What risks were considered.
4. How the change was tested.
5. Whether the change affects architecture, security, data, performance, or UX.

## Merge Gate Standard

Repositories should enforce status checks where practical:

- Build check
- Test check
- Type or lint check
- Security scan
- AI-assisted code review

Critical issues must block merge until resolved.

## Human Final Approval

AI may generate, review, summarize, and test code, but the human owner remains the final strategic approver.

The human developer is the orchestrator, not a passive acceptor of generated code.

## Child Repository Inheritance Instruction

Each child repository should include a lightweight `AGENTS.md` file pointing back to this repository as the master engineering standard.

Recommended child repository instruction:

```md
# Repository Agent Instructions

This repository inherits engineering governance from:

https://github.com/Omoluabi1003/GeoAware-Core

AI agents must follow GeoAware-Core engineering standards before modifying code.

Before proposing or merging changes, verify:

- No security regression
- No broken business logic
- No architecture drift
- No exposed secrets
- No unnecessary refactor
- No performance degradation
- No UI/UX regression
- No undocumented high-risk change

Human approval remains the final authority.
```

## Genesis Principle

Every future repository should be born with GeoAware governance already present.

New projects should start from a GeoAware-ready template or bootstrap process so that engineering standards are embedded from day one.