function normalizeQuery(query) {
  return String(query || '').trim().toLowerCase();
}

function liveRadioDocument(station) {
  const safeStation = station && typeof station === 'object' ? station : {};
  return {
    id: safeStation.id,
    sourceType: safeStation.sourceType || 'radio',
    section: 'Live Radio',
    title: safeStation.name || safeStation.title,
    label: 'Live Radio',
    source: safeStation,
    searchText: [safeStation.name, safeStation.title, safeStation.city, safeStation.country, safeStation.genre, safeStation.language, ...(Array.isArray(safeStation.tags) ? safeStation.tags : [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

function geoAudioDocument(channel) {
  const safeChannel = channel && typeof channel === 'object' ? channel : {};
  return {
    id: safeChannel.id,
    sourceType: 'geoaudio',
    section: 'GeoAudio Channels',
    title: safeChannel.title,
    label: 'GeoAudio Channel',
    badge: 'GeoAudio Channel',
    source: safeChannel,
    searchText: safeChannel.searchText || '',
  };
}

function buildUniversalDiscoveryIndex({ liveRadioStations = [], geoAudioChannels = [] } = {}) {
  const safeGeoAudioChannels = Array.isArray(geoAudioChannels) ? geoAudioChannels : [];
  const safeLiveRadioStations = Array.isArray(liveRadioStations) ? liveRadioStations : [];
  return [
    ...safeGeoAudioChannels.map(geoAudioDocument),
    ...safeLiveRadioStations.map(liveRadioDocument),
  ];
}

function searchUniversalDiscovery(index, query) {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return { sections: {}, results: [], message: '' };
  const safeIndex = Array.isArray(index) ? index : [];
  const results = safeIndex.filter((doc) => String(doc?.searchText || '').includes(normalizedQuery));
  const sections = results.reduce((grouped, doc) => {
    grouped[doc.section] ||= [];
    grouped[doc.section].push(doc);
    return grouped;
  }, {});
  return {
    sections,
    results,
    message: results.length ? '' : 'No radio stations or GeoAudio Channels matched your search. Try a location, artist, producer, album, studio, genre, or language.',
  };
}

module.exports = { buildUniversalDiscoveryIndex, searchUniversalDiscovery };
