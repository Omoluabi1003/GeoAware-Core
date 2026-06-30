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
  if (!track || typeof track !== 'object') return '';
  return track.audioUrl || track.url || track.src || track.streamUrl || track.filePath || '';
}

function normalizeTrack(track, index, albumSlug) {
  const safeTrack = track && typeof track === 'object' ? track : {};
  const audioUrl = playableUrl(safeTrack);
  return {
    id: String(safeTrack.id || `${albumSlug}-track-${index + 1}`),
    title: String(safeTrack.title || safeTrack.name || `Track ${index + 1}`),
    audioUrl,
    durationSeconds: safeTrack.durationSeconds || safeTrack.duration || undefined,
    artworkUrl: safeTrack.artworkUrl || safeTrack.coverUrl || undefined,
    tags: normalizeArray(safeTrack.tags || safeTrack.moods || safeTrack.themes),
  };
}

function toAriyoGeoAudioChannel(album) {
  if (!album || typeof album !== 'object') return null;

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
  const safeChannel = channel && typeof channel === 'object' ? channel : {};
  const tags = Array.isArray(safeChannel.tags) ? safeChannel.tags : [];
  const tracks = Array.isArray(safeChannel.tracks) ? safeChannel.tracks : [];

  return [
    safeChannel.provider,
    safeChannel.producer,
    safeChannel.studio,
    safeChannel.region,
    safeChannel.country,
    safeChannel.label,
    safeChannel.title,
    safeChannel.genre,
    safeChannel.curator,
    ...tags,
    ...tracks.flatMap((track) => {
      const safeTrack = track && typeof track === 'object' ? track : {};
      return [safeTrack.title, ...normalizeArray(safeTrack.tags)];
    }),
  ].filter(Boolean).join(' ').toLowerCase();
}

function resolveAriyoAlbums(source) {
  return Array.isArray(source) ? source : Array.isArray(source?.albums) ? source.albums : [];
}

function loadAriyoGeoAudioChannels(source) {
  return resolveAriyoAlbums(source).map(toAriyoGeoAudioChannel).filter(Boolean);
}

module.exports = { FLORIDA_ANCHOR, LABEL, PROVIDER, STUDIO, loadAriyoGeoAudioChannels, resolveAriyoAlbums, toAriyoGeoAudioChannel };
