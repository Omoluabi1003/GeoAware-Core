function normalizeQuery(query) {
  return String(query || '').trim().toLowerCase();
}

function liveRadioDocument(station) {
  return {
    id: station.id,
    sourceType: station.sourceType || 'radio',
    section: 'Live Radio',
    title: station.name || station.title,
    label: 'Live Radio',
    source: station,
    searchText: [station.name, station.title, station.city, station.country, station.genre, station.language, ...(station.tags || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

function geoAudioDocument(channel) {
  return {
    id: channel.id,
    sourceType: 'geoaudio',
    section: 'GeoAudio Channels',
    title: channel.title,
    label: 'GeoAudio Channel',
    badge: 'GeoAudio Channel',
    source: channel,
    searchText: channel.searchText,
  };
}

function buildUniversalDiscoveryIndex({ liveRadioStations = [], geoAudioChannels = [] } = {}) {
  return [
    ...geoAudioChannels.map(geoAudioDocument),
    ...liveRadioStations.map(liveRadioDocument),
  ];
}

function searchUniversalDiscovery(index, query) {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return { sections: {}, results: [], message: '' };
  const results = index.filter((doc) => doc.searchText.includes(normalizedQuery));
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
