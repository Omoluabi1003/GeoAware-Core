# ADR-0003: Why WaveAtlas Is The Canonical Audio Engine

## Status
Accepted

## Context
Audio, radio, ambient listening, and worship experiences can appear across multiple GeoAware products. Without a canonical engine, the ecosystem risks duplicated patterns, inconsistent behavior, and fragmented identity.

## Decision
WaveAtlas is the canonical audio and radio engine for the GeoAware ecosystem.

## Consequences
- Audio-related product ideas should first consider whether they belong in, depend on, or inherit from WaveAtlas.
- Shared audio identity should be centralized before being reimplemented elsewhere.
- Products may integrate audio differently, but the ecosystem should preserve a coherent audio foundation.

## Review Triggers
Revisit this decision if WaveAtlas no longer provides the best shared foundation for GeoAware audio and radio experiences.
