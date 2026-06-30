const ariyoAlbums = require('../data/ariyo-albums.json');
const { loadAriyoGeoAudioChannels } = require('./geoaudio/ariyoProvider');
const { buildUniversalDiscoveryIndex, searchUniversalDiscovery } = require('./geoaudio/discoveryIndex');

function diagnosticsEnabled(options = {}) {
  return Boolean(options?.developmentDiagnostics || process.env.WAVEATLAS_DISCOVERY_DIAGNOSTICS === '1');
}

function sanitizeLiveRadioStations(liveRadioStations) {
  if (!Array.isArray(liveRadioStations)) return [];
  return liveRadioStations.filter((station) => station && typeof station === 'object');
}

function countBySourceType(index) {
  const safeIndex = Array.isArray(index) ? index : [];
  return safeIndex.reduce((counts, doc) => {
    const safeDoc = doc && typeof doc === 'object' ? doc : {};
    const sourceType = safeDoc.sourceType || 'unknown';
    counts[sourceType] = (counts[sourceType] || 0) + 1;
    return counts;
  }, {});
}

function safeMatchedDiagnostics(response) {
  const results = Array.isArray(response?.results) ? response.results : [];
  return results.map((doc) => ({
    id: doc?.id,
    sourceType: doc?.sourceType,
    section: doc?.section,
    title: doc?.title,
  }));
}

function createWaveAtlasDiscoveryPipeline({ liveRadioStations = [], geoAudioSource = ariyoAlbums, developmentDiagnostics = false } = {}) {
  const safeLiveRadioStations = sanitizeLiveRadioStations(liveRadioStations);
  const geoAudioChannels = loadAriyoGeoAudioChannels(geoAudioSource);
  const index = buildUniversalDiscoveryIndex({ liveRadioStations: safeLiveRadioStations, geoAudioChannels });

  if (diagnosticsEnabled({ developmentDiagnostics })) {
    console.info('[WaveAtlas discovery] registered providers', { geoaudio: geoAudioChannels.length ? ['AriyoGeoAudio'] : [] });
    console.info('[WaveAtlas discovery] document counts by source type', countBySourceType(index));
  }

  function search(query) {
    const response = searchUniversalDiscovery(index, query);
    if (diagnosticsEnabled({ developmentDiagnostics })) {
      console.info('[WaveAtlas discovery] search', {
        query,
        matched: safeMatchedDiagnostics(response),
      });
    }
    return response;
  }

  return { index, geoAudioChannels, liveRadioStations: safeLiveRadioStations, safeLiveRadioStations, search };
}

module.exports = { createWaveAtlasDiscoveryPipeline, countBySourceType, sanitizeLiveRadioStations };
