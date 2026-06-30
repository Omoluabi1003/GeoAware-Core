const ariyoAlbums = require('../data/ariyo-albums.json');
const { loadAriyoGeoAudioChannels } = require('./geoaudio/ariyoProvider');
const { buildUniversalDiscoveryIndex, searchUniversalDiscovery } = require('./geoaudio/discoveryIndex');

function diagnosticsEnabled(options = {}) {
  return Boolean(options.developmentDiagnostics || process.env.WAVEATLAS_DISCOVERY_DIAGNOSTICS === '1');
}

function countBySourceType(index) {
  return index.reduce((counts, doc) => {
    const sourceType = doc.sourceType || 'unknown';
    counts[sourceType] = (counts[sourceType] || 0) + 1;
    return counts;
  }, {});
}

function createWaveAtlasDiscoveryPipeline({ liveRadioStations = [], geoAudioSource = ariyoAlbums, developmentDiagnostics = false } = {}) {
  const geoAudioChannels = loadAriyoGeoAudioChannels(geoAudioSource);
  const index = buildUniversalDiscoveryIndex({ liveRadioStations, geoAudioChannels });

  if (diagnosticsEnabled({ developmentDiagnostics })) {
    console.info('[WaveAtlas discovery] registered providers', { geoaudio: geoAudioChannels.length ? ['AriyoGeoAudio'] : [] });
    console.info('[WaveAtlas discovery] document counts by source type', countBySourceType(index));
  }

  function search(query) {
    const response = searchUniversalDiscovery(index, query);
    if (diagnosticsEnabled({ developmentDiagnostics })) {
      console.info('[WaveAtlas discovery] search', {
        query,
        matched: response.results.map((doc) => ({ id: doc.id, sourceType: doc.sourceType, section: doc.section, title: doc.title })),
      });
    }
    return response;
  }

  return { index, geoAudioChannels, liveRadioStations, search };
}

module.exports = { createWaveAtlasDiscoveryPipeline, countBySourceType };
