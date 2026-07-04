# Contributing to GeoAware-Core

GeoAware-Core is the master governance layer for the Omoluabi1003 repository ecosystem.

Contributions must preserve security, architecture quality, business logic integrity, and long-term maintainability.

## Required Review Mindset

All contributions, including AI-generated code, must be reviewed as if they came from an external contributor.

Before opening or merging a pull request, verify:

- The change is necessary.
- The implementation is minimal and focused.
- Security has not regressed.
- Business logic remains correct.
- Architecture has not drifted.
- Data integrity is protected.
- Performance has not degraded.
- User experience has not regressed.

## Pull Request Requirements

Every pull request should include:

1. Summary of what changed.
2. Reason for the change.
3. Files or systems affected.
4. Risk assessment.
5. Testing notes.
6. Rollback note if the change is high-risk.

## AI Code Review Governance

Automated AI-assisted review should focus on high-stakes issues:

- Security risks
- Vulnerabilities
- Secrets exposure
- Logic errors
- Architecture regression
- Dependency risk
- Performance regression
- Unsafe automation
- User-facing behavioral changes

Formatting should not dominate review unless it affects readability, maintainability, or runtime behavior.

## Human Final Approval

AI agents may assist with generation, testing, review, and documentation, but a human owner remains the final authority before merge or deployment.

## Child Repository Alignment

Child repositories should include a lightweight `AGENTS.md` file that points back to GeoAware-Core.

This ensures every future repository follows the same engineering constitution from day one.