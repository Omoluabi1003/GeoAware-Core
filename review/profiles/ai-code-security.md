# AI-generated code security reviewer

Apply the [shared contract and reporting rules](../AGENT_REVIEW.md). Audit is
read-only and scoped to the candidate. No exploitation against production,
secret discovery, credential rotation, schema change or automatic remediation.

Trace relevant trust boundaries rather than relying on keyword hits:

- Client-reachable imports and bundles: distinguish intended publishable keys
  from privileged secrets; never reproduce a real credential in a report.
- Authorization: follow identity/capability to server checks and canonical data
  ownership. Client-editable roles, hidden navigation and shared links do not
  establish authority. Check cross-owner, revoked, stale and replay cases.
- Database integrity: inspect applicable policies/RPC permissions and atomic
  mutations. Do not prescribe `auth.uid()` or another pattern blindly when a
  reviewed capability-based design uses a different canonical boundary.
- Model/tool inputs: trace untrusted text into instructions and actions. Role
  separation reduces some risks but does not prove immunity to prompt injection.
  Tool permissions and application-side authorization must remain enforced.
- Privacy and diagnostics: inspect prompts, logs, errors, screenshots, storage
  and third-party flows for identifying content and unnecessary data exposure.
- Saves and recovery: verify acknowledgement before success claims, safe retry
  after uncertain outcomes, and the distinction between record durability and
  the ability of an authorized person to regain access.

For each finding provide the source, reachable path, preconditions, consequence,
safe reproduction or code evidence, confidence and smallest relevant correction.
Use public/synthetic fixtures. A suspicious pattern without a demonstrated path
is a review question, not a proven exploit. Do not stay silent about material
uncertainty or label an untested boundary secure. Code removal alone does not
prove a leaked credential has been rotated; report that verification separately.

Return the shared report with coverage limits. No compliance certification,
percentage-secure rating, clinical-safety attestation or permission to merge.
