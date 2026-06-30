# Ariyo GeoAudio Channels Adapter

## Purpose

Ariyo AI Studio albums are integrated into WaveAtlas as curated **GeoAudio Channels**: album-backed, place-aware audio queues that behave like radio-style stations without being live radio stations.

## Source model

The adapter uses the Ariyo AI album model from `Omoluabi1003/Ariyo-AI:data/albums.json` as its source shape. WaveAtlas must treat each Ariyo album as immutable source content and map it into a WaveAtlas channel at runtime or build time without mutating the live radio station dataset.

Expected source fields are intentionally tolerant so the adapter remains reversible if Ariyo changes field names:

- album identity: `id`, `slug`, or a stable generated slug from `title`
- album title: `title` or `albumTitle`
- curator: `curator`, `artist`, `studio`, or default `Ariyo AI Studio`
- genre: `genre`, `genres[0]`, or default `AI Afrobeats / GeoAudio`
- tags: `tags`, `moods`, `themes`, or an empty list
- tracks: `tracks[]`, where each valid track has a playable `url`, `audioUrl`, `src`, or `streamUrl`

## Channel mapping

Each album becomes one selectable WaveAtlas channel with this normalized shape:

```json
{
  "id": "ariyo:<album-slug>",
  "sourceType": "geoaudio",
  "channelType": "curated_album",
  "label": "GeoAudio Channel",
  "provider": "Ariyo AI Studio",
  "title": "<album title>",
  "curator": "<album curator>",
  "genre": "<album genre>",
  "city": "Lagos",
  "country": "Nigeria",
  "coordinates": { "lat": 6.5244, "lng": 3.3792 },
  "tracks": ["<normalized playable track objects>"],
  "searchText": "<album, track, curator, genre, Lagos, Nigeria, tags>"
}
```

The adapter must set `sourceType: geoaudio`. It must never coerce Ariyo channels into `sourceType: radio`, because live radio stations represent external streams while GeoAudio Channels represent curated album queues.

## Playback behavior

When a user selects an Ariyo GeoAudio Channel, WaveAtlas starts the first valid playable track in that album queue. The selected channel identity remains stable for the session while the current track changes underneath it.

Playback rules:

1. Filter out tracks without a playable audio URL before playback begins.
2. Start at the first valid track when selected.
3. Auto-advance to the next valid track when a track ends.
4. If a track fails to load or errors during playback, skip to the next valid track in the same album queue.
5. Stop at the end of the album unless the user or product configuration enables repeat.
6. Do not fall through from a failed Ariyo track into a live radio station or another album.

## Metadata behavior

The metadata panel must keep the channel identity stable while updating per-track fields.

Stable channel metadata:

- album title
- curator
- genre
- city
- country
- `GeoAudio Channel` label
- provider: `Ariyo AI Studio`

Per-track metadata:

- current track title
- current track index and total valid tracks, when available
- current artwork, duration, and tags, when available

## Beacon behavior

WaveAtlas should render the active map beacon for a selected Ariyo GeoAudio Channel the same way it renders an active station beacon, using the channel coordinates. Lagos, Nigeria is the default anchor for Ariyo channels unless an album explicitly provides a more precise supported place.

## Search behavior

WaveAtlas search must index Ariyo GeoAudio Channels by:

- album title
- current and queued track titles
- curator
- genre
- city: Lagos
- country: Nigeria
- tags, moods, and themes
- provider: Ariyo AI Studio
- label: GeoAudio Channel

Search results should show Ariyo albums as GeoAudio Channels, not live stations.

## Wanderer and startup rules

Ariyo GeoAudio Channels are curated content and must not enter Wanderer by default. Wanderer may include them only when `includeCuratedChannels` is explicitly enabled.

WaveAtlas must not autoplay Ariyo channels on startup unless the user explicitly selected one as the Home Station or Resume Last Station target. Existing live radio startup behavior must remain unchanged.

## Live radio preservation

This adapter is additive. It must not rewrite station loading, alter live radio station records, or change radio playback semantics. Code implementations should keep the Ariyo adapter behind a separate import, feature flag, or content pipeline step so it can be removed without corrupting the radio dataset.
