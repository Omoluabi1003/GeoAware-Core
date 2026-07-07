# GeoAware Development Environment Strategy

## Purpose

GeoAware repositories should use development environments to make work reproducible, safe, and easy to review without adding tooling before it earns its keep.

Docker is useful when it reduces environment drift. It is not useful when it becomes ceremony for a repository that only needs clear documentation and lightweight validation.

This strategy defines when GeoAware repositories should use Docker, devcontainers, or no container tooling at all.

## Guiding Principles

Development environment tooling should support:

- **Reproducibility**: contributors and agents can run the same checks with the same assumptions.
- **Codex consistency**: AI coding agents can operate in predictable environments with fewer machine-specific surprises.
- **Build validation**: application repositories can prove that installs, builds, tests, and runtime dependencies work from a clean environment.
- **Onboarding**: new contributors can become productive without reverse-engineering local setup.
- **Governance discipline**: tooling should protect architecture, security, data integrity, UX quality, and maintainability rather than adding unnecessary complexity.

## Repository Categories

### Documentation-first governance repositories

Examples:

- `GeoAware-Core`
- standards, policy, templates, principles, and governance-only repositories

These repositories primarily contain Markdown, lightweight examples, process documents, and governance artifacts. They usually do not need full Docker images, Compose stacks, service containers, or production-like runtime simulation.

For documentation-first repositories, Docker is appropriate only when there is a proven need such as:

- validating generated documentation with a non-trivial toolchain;
- running repeatable linting or link-checking that is difficult to install locally;
- testing repository templates that scaffold application environments;
- reproducing an issue caused by a specific runtime or OS dependency.

Until that need is proven, these repositories should avoid adding Dockerfiles, Docker Compose files, or containerized runtime infrastructure.

### Application repositories

Examples:

- `GeoAware Bible`
- `WaveAtlas`

Application repositories contain runnable product code, dependency graphs, build steps, test suites, and user-facing behavior. They benefit more directly from Docker because the cost of environment drift is higher.

For application repositories, Docker is appropriate when it supports:

- clean install and build validation;
- repeatable test execution;
- parity between local development, agent execution, CI, and deployment expectations;
- consistent handling of databases, caches, queues, search indexes, media tools, or other services;
- safer onboarding for contributors who should not need to manually assemble every dependency.

Application repositories should prefer Docker when the repository has enough runtime complexity that a documented local setup is no longer sufficient.

## GeoAware-Core Recommendation

`GeoAware-Core` should remain lightweight.

Recommended support:

- a minimal devcontainer configuration when there is a demonstrated need for consistent agent or contributor execution;
- documentation of expected local tools and checks;
- optional Markdown, formatting, or link validation commands if they become part of the governance workflow.

Not recommended at this stage:

- adding a Dockerfile without a concrete runtime requirement;
- adding Docker Compose for a repository that has no services to orchestrate;
- introducing container-only workflows that make simple documentation changes harder;
- treating Docker adoption as a governance milestone by itself.

The current standard for `GeoAware-Core` is: document the strategy first, add container files later only when they solve a real problem.

## GeoAware Bible Recommendation

`GeoAware Bible` should plan for full Docker support once it has runnable application structure, tests, and service dependencies.

A mature Docker setup should support:

- deterministic dependency installation;
- application build validation;
- test execution from a clean environment;
- local preview or development server startup;
- any required backing services, such as databases or content indexes;
- Codex-ready execution for common development and review tasks.

Docker should not obscure product quality. It should make the geographic Bible experience easier to build, test, review, and onboard.

## WaveAtlas Recommendation

`WaveAtlas` should plan for full Docker support because audio discovery, metadata processing, search behavior, and application runtime concerns are likely to require stronger reproducibility than documentation-only repositories.

A mature Docker setup should support:

- clean dependency installation;
- repeatable tests for discovery, search, and GeoAudio behavior;
- build validation for application code;
- consistent local execution for contributors and Codex;
- service orchestration if the product adds databases, queues, indexing services, or media-processing dependencies.

Docker should be introduced incrementally when it protects product velocity and regression safety.

## Decision Rules

Before adding Docker files to any GeoAware repository, answer:

1. What concrete environment problem are we solving?
2. Is the repository documentation-first or application-runtime focused?
3. Can the same outcome be achieved with simpler documented commands?
4. Will Docker reduce onboarding and review risk, or add maintenance burden?
5. Which checks must pass inside the container?
6. Who owns keeping the container setup current?

Add Docker only when the answers show a meaningful benefit.

## Default Policy

- Documentation-first repositories should default to no Docker files.
- `GeoAware-Core` should prefer lightweight devcontainer support only when consistency needs are proven.
- Application repositories should adopt full Docker support when builds, tests, services, or onboarding complexity justify it.
- Docker should serve reproducibility, Codex consistency, build validation, and onboarding.
- Docker should not be added preemptively as unused infrastructure.

## Rollback Guidance

If Docker or devcontainer support is later added and becomes stale, confusing, or unused, it should be simplified or removed. The standard is not whether Docker exists; the standard is whether the development environment improves safety, clarity, and maintainability.
