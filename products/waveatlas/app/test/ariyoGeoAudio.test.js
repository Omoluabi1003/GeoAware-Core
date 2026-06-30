const assert = require('node:assert/strict');
const test = require('node:test');
const albums = require('../../data/ariyo-albums.json');
const { loadAriyoGeoAudioChannels, resolveAriyoAlbums } = require('../geoaudio/ariyoProvider');
const { buildUniversalDiscoveryIndex, searchUniversalDiscovery } = require('../geoaudio/discoveryIndex');
const { selectGeoAudioChannel } = require('../geoaudio/selectGeoAudioChannel');
const { createWaveAtlasDiscoveryPipeline, countBySourceType } = require('../discoveryPipeline');

const liveRadioStations = [{ id: 'radio:miami', name: 'Miami Live', country: 'United States', genre: 'News', streamUrl: 'https://example.com/live.mp3' }];

function setup() {
  const geoAudioChannels = loadAriyoGeoAudioChannels(albums);
  return { geoAudioChannels, index: buildUniversalDiscoveryIndex({ liveRadioStations, geoAudioChannels }) };
}

test('Omoluabi Productions and Ariyo AI Studio searches return GeoAudio Channels without relabeling live radio', () => {
  const { index } = setup();
  for (const query of ['Omoluabi Productions', 'Ariyo AI Studio']) {
    const results = searchUniversalDiscovery(index, query);
    assert.ok(results.sections['GeoAudio Channels'].length >= 2);
    assert.equal(results.sections['GeoAudio Channels'][0].sourceType, 'geoaudio');
    assert.equal(results.sections['GeoAudio Channels'][0].badge, 'GeoAudio Channel');
  }
  assert.equal(searchUniversalDiscovery(index, 'Miami Live').sections['Live Radio'][0].sourceType, 'radio');
});

test('album and track title searches return the parent Ariyo GeoAudio Channel', () => {
  const { index } = setup();
  assert.equal(searchUniversalDiscovery(index, 'Kindness').sections['GeoAudio Channels'][0].id, 'ariyo:kindness');
  assert.equal(searchUniversalDiscovery(index, 'OfficialPaulInspires Welcome').sections['GeoAudio Channels'][0].id, 'ariyo:officialpaulinspires-spoken-word');
});

test('selecting a GeoAudio Channel flies to Florida, renders a beacon, exposes metadata, and plays first valid track', () => {
  const { geoAudioChannels } = setup();
  const selected = selectGeoAudioChannel(geoAudioChannels.find((channel) => channel.title === 'Kindness'));
  assert.equal(selected.sourceType, 'geoaudio');
  assert.deepEqual(selected.flyTo, { lat: 27.6648, lng: -81.5158 });
  assert.equal(selected.beacon.label, 'GeoAudio Channel');
  assert.equal(selected.metadata.provider, 'Omoluabi Productions');
  assert.equal(selected.metadata.studio, 'Ariyo AI Studio');
  assert.equal(selected.playback.startsAtTrackId, 'kindness-opening');
});

test('GeoAudio Channels with no valid track show the unavailable message', () => {
  const [channel] = loadAriyoGeoAudioChannels([{ title: 'Unavailable', tracks: [{ title: 'Missing URL' }] }]);
  assert.equal(selectGeoAudioChannel(channel).message, 'This GeoAudio Channel is temporarily unavailable.');
});


test('resolveAriyoAlbums accepts real object shape, bare arrays, and malformed sources', () => {
  const realShape = { generatedAt: '2026-06-30T00:00:00.000Z', albums };
  assert.equal(resolveAriyoAlbums(realShape), albums);
  assert.equal(resolveAriyoAlbums(albums), albums);
  assert.deepEqual(resolveAriyoAlbums(null), []);
  assert.deepEqual(resolveAriyoAlbums(undefined), []);
  assert.deepEqual(resolveAriyoAlbums({ generatedAt: '2026-06-30T00:00:00.000Z' }), []);
});

test('loadAriyoGeoAudioChannels accepts real object shape, bare arrays, and malformed sources without throwing', () => {
  const realShape = { generatedAt: '2026-06-30T00:00:00.000Z', albums };
  assert.equal(loadAriyoGeoAudioChannels(realShape).length, albums.length);
  assert.equal(loadAriyoGeoAudioChannels(albums).length, albums.length);
  assert.deepEqual(loadAriyoGeoAudioChannels(null), []);
  assert.deepEqual(loadAriyoGeoAudioChannels(undefined), []);
  assert.deepEqual(loadAriyoGeoAudioChannels('not an Ariyo source'), []);
  assert.deepEqual(loadAriyoGeoAudioChannels({ albums: null }), []);
});

test('malformed album and track records do not crash the Ariyo adapter', () => {
  const sourceAlbums = [
    null,
    undefined,
    'not an album',
    { title: 'Malformed Tracks', tracks: [null, undefined, 'not a track', { title: 'Playable', audioUrl: 'https://example.com/playable.mp3' }] },
  ];
  const channels = loadAriyoGeoAudioChannels([
    ...sourceAlbums,
  ]);
  assert.equal(channels.length, 1);
  assert.equal(channels[0].title, 'Malformed Tracks');
  assert.equal(channels[0].tracks.length, 4);
  assert.equal(selectGeoAudioChannel(channels[0]).playback.audioUrl, 'https://example.com/playable.mp3');
  assert.equal(selectGeoAudioChannel(null).message, 'This GeoAudio Channel is temporarily unavailable.');
  assert.equal(sourceAlbums[3].tracks[3].audioUrl, 'https://example.com/playable.mp3');
});

test('real Ariyo object shape produces searchable Omoluabi Productions and Ariyo AI Studio documents', () => {
  const geoAudioChannels = loadAriyoGeoAudioChannels({ generatedAt: '2026-06-30T00:00:00.000Z', albums });
  const index = buildUniversalDiscoveryIndex({ liveRadioStations, geoAudioChannels });
  assert.ok(searchUniversalDiscovery(index, 'Omoluabi Productions').sections['GeoAudio Channels'].some((result) => result.sourceType === 'geoaudio' && result.source.producer === 'Omoluabi Productions'));
  assert.ok(searchUniversalDiscovery(index, 'Ariyo AI Studio').sections['GeoAudio Channels'].some((result) => result.sourceType === 'geoaudio' && result.source.studio === 'Ariyo AI Studio'));
});


test('production WaveAtlas discovery pipeline registers Ariyo GeoAudio in the queried index', () => {
  const pipeline = createWaveAtlasDiscoveryPipeline({ liveRadioStations });

  assert.equal(pipeline.geoAudioChannels.length, albums.length);
  assert.deepEqual(countBySourceType(pipeline.index), { geoaudio: 2, radio: 1 });
  assert.ok(pipeline.index.some((doc) => doc.sourceType === 'geoaudio' && doc.searchText.includes('omoluabi productions')));
  assert.ok(pipeline.search('Omoluabi Productions').sections['GeoAudio Channels'].some((result) => result.source.studio === 'Ariyo AI Studio'));
  assert.equal(pipeline.search('Kindness').sections['GeoAudio Channels'][0].id, 'ariyo:kindness');
  assert.equal(pipeline.search('OfficialPaulInspires').sections['GeoAudio Channels'][0].id, 'ariyo:officialpaulinspires-spoken-word');
  assert.equal(pipeline.search('Miami Live').sections['Live Radio'][0].sourceType, 'radio');
});
