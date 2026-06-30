const FLORIDA_ANCHOR = Object.freeze({ lat: 27.6648, lng: -81.5158 });
const PROVIDER = 'Omoluabi Productions';
const STUDIO = 'Ariyo AI Studio';
const LABEL = 'GeoAudio Channel';

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

function normalizeArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (!value) return [];
  return [String(value)];
}

function playableUrl(track) {
  return track.audioUrl || track.url || track.src || track.streamUrl || track.filePath || '';
}

function normalizeTrack(track, index, albumSlug) {
  const audioUrl = playableUrl(track);
  return {
    id: String(track.id || `${albumSlug}-track-${index + 1}`),
    title: String(track.title || track.name || `Track ${index + 1}`),
    audioUrl,
    durationSeconds: track.durationSeconds || track.duration || undefined,
    artworkUrl: track.artworkUrl || track.coverUrl || undefined,
    tags: normalizeArray(track.tags || track.moods || track.themes),
  };
}

function toAriyoGeoAudioChannel(album) {
  const title = String(album.title || album.albumTitle || 'Untitled Ariyo Album');
  const slug = String(album.slug || album.id || slugify(title));
  const tags = normalizeArray(album.tags || album.moods || album.themes);
  const tracks = (Array.isArray(album.tracks) ? album.tracks : []).map((track, index) => normalizeTrack(track, index, slug));
  const genre = String(album.genre || (Array.isArray(album.genres) && album.genres[0]) || 'AI Afrobeats / GeoAudio');
  const curator = String(album.curator || album.artist || album.studio || STUDIO);
  const channel = {
    id: `ariyo:${slug}`,
    sourceType: 'geoaudio',
    channelType: 'curated_album',
    label: LABEL,
    provider: PROVIDER,
    producer: PROVIDER,
    studio: STUDIO,
    title,
    curator,
    genre,
    region: 'Florida',
    country: 'United States',
    coordinates: album.coordinates || FLORIDA_ANCHOR,
    tags,
    tracks,
  };
  channel.searchText = buildAriyoSearchText(channel);
  return channel;
}

function buildAriyoSearchText(channel) {
  return [
    channel.provider,
    channel.producer,
    channel.studio,
    channel.region,
    channel.country,
    channel.label,
    channel.title,
    channel.genre,
    channel.curator,
    ...channel.tags,
    ...channel.tracks.flatMap((track) => [track.title, ...track.tags]),
  ].filter(Boolean).join(' ').toLowerCase();
}

function loadAriyoGeoAudioChannels(albums) {
  return albums.map(toAriyoGeoAudioChannel);
}

module.exports = { FLORIDA_ANCHOR, LABEL, PROVIDER, STUDIO, loadAriyoGeoAudioChannels, toAriyoGeoAudioChannel };
