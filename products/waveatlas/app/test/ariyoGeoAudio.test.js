const assert = require('node:assert/strict');
const test = require('node:test');
const albums = require('../../data/ariyo-albums.json');
const { loadAriyoGeoAudioChannels } = require('../geoaudio/ariyoProvider');
const { buildUniversalDiscoveryIndex, searchUniversalDiscovery } = require('../geoaudio/discoveryIndex');
const { selectGeoAudioChannel } = require('../geoaudio/selectGeoAudioChannel');

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
