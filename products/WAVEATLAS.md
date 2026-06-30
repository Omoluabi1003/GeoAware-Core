# WaveAtlas

WaveAtlas is the canonical audio and radio engine for the GeoAware ecosystem.

## Identity

WaveAtlas connects sound, station, place, movement, language, worship, and discovery.

## Inheritance

Other GeoAware products should not create competing audio engines when WaveAtlas can serve the need.

## GeoAudio Channels

WaveAtlas supports curated GeoAudio Channels alongside live radio stations. GeoAudio Channels are place-aware audio queues with station-like selection, beacon, search, and metadata behavior, but they remain distinct from live radio because their source is curated track content instead of a continuous external broadcast stream.

Ariyo AI Studio albums are the first required GeoAudio Channel source. Each Ariyo album should appear as a selectable Florida, United States-anchored channel with `sourceType: geoaudio`, album-level identity, Omoluabi Productions attribution, and track-level playback metadata. See `products/waveatlas/ARIYO_GEOAUDIO_CHANNELS.md` for the adapter contract.


## Universal GeoAware Discovery

WaveAtlas discovery must use one shared Discovery Index for Live Radio, GeoAudio Channels, Editorial, and future content types. Results should be grouped and clearly labeled as GeoAudio Channels, Live Radio, Countries, Cities, Genres, Languages, and Editorial when those groups have matches.

GeoAudio Channel records must index provider, producer, studio, location, album titles, track titles, genre, curator, and tags so searches for Omoluabi Productions, Ariyo AI Studio, album titles, or track titles return the parent Ariyo AI Studio GeoAudio Channel. If nothing matches, WaveAtlas must show: “No radio stations or GeoAudio Channels matched your search. Try a location, artist, producer, album, studio, genre, or language.”
