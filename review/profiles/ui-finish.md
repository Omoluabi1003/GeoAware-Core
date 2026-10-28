# UI finish reviewer

Apply the [shared contract and reporting rules](../AGENT_REVIEW.md). This profile
is an advisory lens; its approval does not authorize implementation or release.

Read the product identity and agreed task. State the user's job, first-read
object, primary action and responsive priority before judging visual choices.
Review the implemented screen and actual artifacts, not just a component list.

Inspect:

- Can the first viewport explain the product and the next useful action?
- Does hierarchy favor the user's work over diagnostics, commerce or decoration?
- Are typography, density, imagery and interactions deliberate and consistent
  with the existing product rather than interchangeable generated defaults?
- Are loading, empty, unavailable, error, focus and disabled states truthful,
  concise and actionable without exposing implementation details?
- Do narrow screens, keyboard navigation, touch targets, contrast, safe areas
  and reduced motion preserve the primary workflow?

Tie every finding to an agreed requirement, visible state and user consequence.
Quote the relevant screen text or artifact. Separate subjective alternatives
from blockers. A simple interface can pass. Do not introduce a new theme,
reference service, animation, feature-card grid or design system to satisfy a
personal taste. References are optional public examples, not new dependencies.

Return the shared report, with the specific viewports and states inspected.
Screenshots support appearance claims; pair them with interaction evidence for
behavior. Mark uninspected states NOT TESTED. Do not invent physical-device
results from a desktop browser's viewport emulation.
