# GeoAware Engineering Lifecycle

GeoAware repositories follow one operating workflow from idea to decision memory.

Think in **YCOMBINATOR Mode**. Execute in **GeoAware 80/20 Mode**.

This lifecycle protects GeoAware product identity, not implementation details. It keeps repositories lightweight, documentation-first where appropriate, and aligned with the constitution before work becomes permanent.

## Lifecycle stages

| Stage | Owner | Purpose | Required output |
| --- | --- | --- | --- |
| 1. Idea | Project Architect with ChatGPT support | Define the user need, product reason, and GeoAware fit. | Clear intent, expected user value, and reason to proceed. |
| 2. Architecture | ChatGPT and Codex | Shape the smallest durable approach before implementation. | Architecture notes, affected areas, risks, and review plan. |
| 3. Constitution Check | Project Architect with ChatGPT and Gemini support | Confirm the idea protects the north star, product philosophy, and operating doctrine. | Pass, revise, or reject decision. |
| 4. Implementation | Codex | Make the smallest focused repository change. | Reviewable diff with no unrelated work. |
| 5. Pull Request | Codex | Package the change for review. | PR summary, tests or checks, risks, and reviewer context. |
| 6. Preview | Vercel | Expose runnable product changes when the repository has a deployable surface. | Preview URL or deployment status. |
| 7. UI Inspection | ChatGPT, Gemini, QA, and reviewers | Inspect visible product behavior, design, accessibility, and product feel. | UI findings marked blocker or non-blocker. |
| 8. Architecture Review | Gemini, GitHub review bots, and human reviewers | Stress-test structure, maintainability, safety, and drift risk. | Review comments classified by severity. |
| 9. Project Architect Approval | Project Architect | Decide whether the change belongs in GeoAware. | Explicit approval for protected or identity-shaping changes. |
| 10. Merge | Project Architect or authorized maintainer | Make the approved change permanent. | Clean merge after required checks and approvals. |
| 11. ADR Update | ChatGPT and Codex, approved by Project Architect | Preserve decision memory when the change affects durable direction. | New or updated ADR when required. |

## AI and platform roles

### ChatGPT

Use ChatGPT for strategy, synthesis, durable documentation, product framing, constitution interpretation, PR narrative, and decision-memory drafting. ChatGPT is used before implementation when intent is ambiguous and after review when feedback must be turned into durable doctrine.

### Codex

Use Codex for repository edits, implementation planning, documentation updates, mechanical consistency, validation checks, commits, and PR preparation. Codex owns focused diffs and must avoid adding application code or tooling when the task is documentation-first.

### Gemini

Use Gemini for broad critique, alternative analysis, blind-spot detection, research support, multimodal review, and architecture stress-testing. Gemini is especially useful before approval when a change could introduce product drift or hidden complexity.

### GitHub review bots

Use GitHub review bots during pull request review for automated comments about correctness, style, security, test coverage, maintainability, and repository conventions. Bot feedback is advisory unless it identifies a blocker or fails a required check.

### Vercel

Use Vercel when a repository has a deployable product surface and the PR changes visible behavior, routing, UI, performance, or integration behavior. Vercel provides preview confidence, not product approval.

### Project Architect

The Project Architect owns vision, constitution, roadmap, product identity, and final approval. AI teammates and automation may propose, critique, draft, test, and review; they do not decide what GeoAware is.

## Approval requirements

Project Architect approval is required when a PR:

- Changes constitution, operating doctrine, product philosophy, non-negotiables, or product identity.
- Adds, removes, renames, or repositions a GeoAware product.
- Changes architecture standards, review standards, lifecycle rules, or AI role ownership.
- Introduces a visible feature that shapes how users understand GeoAware.
- Requires an ADR or Constitution amendment.
- Resolves a blocker by changing product direction rather than only fixing execution.

## Visible feature rule

Any visible feature must deepen at least one GeoAware dimension:

- Exploration.
- Geography.
- Scripture.
- Journey.
- Language.
- Worship.
- Guidance.

A visible feature that does not deepen one of these dimensions is product drift unless the Project Architect explicitly approves it as enabling infrastructure.

## ADR requirements

A PR requires an ADR when it creates or changes durable decision memory, including when it:

- Establishes a new product direction, architectural pattern, or operating doctrine.
- Chooses one strategic option over credible alternatives.
- Changes how GeoAware repositories inherit standards or product identity.
- Adds, removes, or materially changes a system boundary.
- Introduces a long-lived dependency, platform commitment, or deployment model.
- Reverses, supersedes, or materially narrows a prior ADR.

A PR usually does not require an ADR when it only clarifies wording, fixes spelling, updates local documentation, or makes a narrow implementation change that does not alter durable direction.

## Constitution amendment requirements

A PR requires a Constitution amendment when it:

- Changes the north star, operating doctrine, product philosophy, or non-negotiables.
- Redefines what GeoAware is or is not.
- Changes final authority, approval rights, or governance rules.
- Allows behavior previously prohibited by the constitution.
- Prohibits behavior previously allowed by the constitution.
- Creates a new permanent rule that every GeoAware repository or product must inherit.

When a Constitution amendment is required, implementation waits until the Project Architect approves the amendment path.

## Blockers and non-blockers

### Blockers

A blocker prevents merge. Blockers include:

- Constitution conflict.
- Product identity drift.
- Missing required Project Architect approval.
- Missing required ADR or Constitution amendment.
- Failed required validation check.
- Security, privacy, data-loss, accessibility, or deployment risk that materially harms users.
- Visible feature work that does not deepen exploration, geography, Scripture, journey, language, worship, or guidance.

### Non-blockers

A non-blocker should not prevent merge when the PR is otherwise aligned and safe. Non-blockers include:

- Minor wording preferences.
- Small formatting nits.
- Low-risk refactors unrelated to the PR goal.
- Nice-to-have UI polish that does not affect comprehension, accessibility, or product identity.
- Reviewer suggestions that improve quality but are not required for correctness or alignment.

Non-blocking reviewer nits are bundled into the next meaningful PR. Do not churn a focused PR for low-value polish unless the Project Architect requests it.

## Merge rule

A PR may merge only when:

- The lifecycle stages relevant to the repository have been completed.
- Required checks pass or documented environment limitations are accepted.
- Blockers are resolved.
- Required ADRs or Constitution amendments are included or explicitly deferred by the Project Architect.
- Project Architect approval is present when required.

After merge, decision memory must remain discoverable through ADRs, constitution files, product documents, review standards, or this lifecycle.
