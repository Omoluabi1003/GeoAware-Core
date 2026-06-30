const { createWaveAtlasDiscoveryPipeline } = require('./discoveryPipeline');
const { selectGeoAudioChannel } = require('./geoaudio/selectGeoAudioChannel');

function defaultSelectLiveRadio(station) {
  return {
    sourceType: 'radio',
    station,
    playback: {
      streamUrl: station?.streamUrl || station?.url || station?.audioUrl,
    },
  };
}

function createWaveAtlasSearchController({
  liveRadioStations = [],
  geoAudioSource,
  developmentDiagnostics = false,
  selectLiveRadio = defaultSelectLiveRadio,
} = {}) {
  const pipeline = createWaveAtlasDiscoveryPipeline({ liveRadioStations, geoAudioSource, developmentDiagnostics });

  function search(query) {
    return pipeline.search(query);
  }

  function selectResult(result) {
    const sourceType = result?.sourceType || result?.source?.sourceType;
    if (sourceType === 'geoaudio') {
      return selectGeoAudioChannel(result.source || result);
    }
    return selectLiveRadio(result?.source || result);
  }

  return {
    pipeline,
    search,
    selectResult,
    noResultsMessage: 'No radio stations or GeoAudio Channels matched your search. Try a location, artist, producer, album, studio, genre, or language.',
  };
}

module.exports = { createWaveAtlasSearchController, defaultSelectLiveRadio };
