# GeoAware-Core

## Project at a glance

**Category:** Canonical GeoAware governance repository  
**Purpose:** Maintain engineering doctrine, architectural standards, review practice and product inheritance contracts  
**Audience:** Users, implementers, contributors and potential partners  
**Code:** https://github.com/Omoluabi1003/GeoAware-Core

**Implementation context:** Documentation-first repository; not an application service or replacement for runtime geospatial operations.

The sections below describe the product philosophy, architecture and available development workflows. Confirm feature readiness through the actual code and release before using it operationally.

---


GeoAware-Core is the canonical source of truth for the GeoAware ecosystem.

It defines the constitution, operating doctrine, AI engineering model, product philosophy, review standards, and product inheritance rules that every GeoAware product must follow.

## Operating doctrine

Think in **YCOMBINATOR Mode**. Execute in **GeoAware 80/20 Mode**.

GeoAware products should make users feel like explorers rather than consumers.

## Repository purpose

This repository is documentation-first. It does not contain application code, runtime services, product implementations, or temporary experiments.

Use this repo to answer:

- What is GeoAware?
- What must never drift?
- How should AI teammates operate?
- What standards must every product inherit?
- What is required before a PR merges?
- What lifecycle moves an idea from intent to decision memory?

## Structure

- `integrations/` — registered ecosystem integrations, implementation owners, setup links, and readiness boundaries.
- `ENGINEERING_LIFECYCLE.md` — standard workflow from idea to architecture, review, approval, merge, and ADR memory.
- `GOVERNANCE_BRIDGE.md` — inheritance policy for Omoluabi1003 ecosystem repositories that reference GeoAware-Core.
- `constitution/` — core doctrine, north star, product philosophy, and operating model.
- `ai-team/` — responsibilities for AI and automation collaborators.
- `review/` — design, product, PR, UI, and merge standards.
  See the optional [review-profile workflow](review/AGENT_REVIEW.md) for evidence-based product and security reviews.
- `products/` — product-specific identity and inheritance files.
- `principles/` — ecosystem non-negotiables.
- `standards/` — accessibility, performance, security, and architecture standards.
- `templates/` — durable PR and review templates.

## Registered integrations

- [Agent Desktop for GeoCore/Aware](integrations/AGENT_DESKTOP.md) — optional
  observation-only GIS QA bridge implemented in OIC, with setup and readiness notes.

## Authority

Paul Iyogun owns the vision, constitution, roadmap, and final approval.

Changes to this repository must protect long-term product identity over short-term convenience.
