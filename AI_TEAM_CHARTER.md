# GeoAware AI Team Charter

## Purpose
This charter defines how human and AI collaborators support GeoAware without confusing assistance for authority. The Project Architect owns the vision, constitution, roadmap, and final approval. AI systems help preserve momentum, memory, quality, and clarity.

## Operating Doctrine
Think in YCOMBINATOR Mode. Execute in GeoAware 80/20 Mode.

## Roles

### Project Architect
- **Authority:** Final owner of vision, product identity, constitution, roadmap, prioritization, and approval.
- **Responsibilities:** Define the mission, accept or reject constitutional changes, approve roadmap direction, and resolve conflicts.
- **Limits:** Should not rely on AI output as a substitute for final judgment.
- **Inputs:** User needs, ecosystem strategy, product evidence, reviews, ADRs, and contributor proposals.
- **Outputs:** Direction, approvals, amendments, product decisions, and final calls.

### ChatGPT
- **Authority:** Advisory and drafting authority only.
- **Responsibilities:** Explore strategy, clarify scope, draft documentation, evaluate tradeoffs, and help encode institutional memory.
- **Limits:** Does not approve final product direction or override the Constitution.
- **Inputs:** Project context, product goals, user prompts, repository documents, and decision records.
- **Outputs:** Drafts, analyses, summaries, review comments, and proposed next steps.

### Gemini
- **Authority:** Advisory and comparative review authority only.
- **Responsibilities:** Provide alternate reasoning, critique assumptions, review language, and identify blind spots.
- **Limits:** Does not own final approval or product identity.
- **Inputs:** Shared context, draft decisions, product proposals, and review requests.
- **Outputs:** Critiques, comparisons, risk lists, and recommendations.

### Codex
- **Authority:** Repository execution authority within assigned scope.
- **Responsibilities:** Edit files, implement approved changes, run available checks, prepare commits, and preserve documentation quality.
- **Limits:** Must not add application code or tooling when the task is documentation-first. Must not override constitutional intent.
- **Inputs:** Issues, PR instructions, repository files, AGENTS.md instructions, and validation results.
- **Outputs:** Patches, commits, PR summaries, test results, and implementation notes.

### QA Bots
- **Authority:** Automated verification authority only.
- **Responsibilities:** Run checks, identify regressions, flag policy or quality risks, and report results consistently.
- **Limits:** May block on configured failures, but should distinguish blockers from non-blocking nits.
- **Inputs:** Repository state, CI configuration, test suites, lint rules, and policy checks.
- **Outputs:** Pass/fail results, warnings, logs, and risk annotations.

### Vercel
- **Authority:** Deployment and preview authority only.
- **Responsibilities:** Build previews, surface deployment status, and expose runtime or configuration failures.
- **Limits:** Deployment success does not equal product approval.
- **Inputs:** Branches, builds, environment configuration, and deployment settings.
- **Outputs:** Preview URLs, build logs, deployment status, and runtime diagnostics.

## Review Rules
- Product identity issues are more important than implementation preferences.
- Non-blocking reviewer nits are bundled into meaningful PRs unless they are blockers.
- Blockers are issues that materially affect correctness, safety, product identity, governance, user trust, or delivery risk.
