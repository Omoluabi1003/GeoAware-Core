# WaveAtlas

WaveAtlas is the canonical audio and radio engine for the GeoAware ecosystem.

## Identity

WaveAtlas connects sound, station, place, movement, language, worship, and discovery.

## Inheritance

Other GeoAware products should not create competing audio engines when WaveAtlas can serve the need.

## GeoAudio Channels

WaveAtlas supports curated GeoAudio Channels alongside live radio stations. GeoAudio Channels are place-aware audio queues with station-like selection, beacon, search, and metadata behavior, but they remain distinct from live radio because their source is curated track content instead of a continuous external broadcast stream.

Ariyo AI Studio albums are the first required GeoAudio Channel source. Each Ariyo album should appear as a selectable Florida, United States-anchored channel with `sourceType: geoaudio`, album-level identity, Omoluabi Productions attribution, and track-level playback metadata. See `products/waveatlas/ARIYO_GEOAUDIO_CHANNELS.md` for the adapter contract.

