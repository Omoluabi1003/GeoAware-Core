function firstValidTrack(channel) {
  return (channel.tracks || []).find((track) => Boolean(track.audioUrl));
}

function selectGeoAudioChannel(channel) {
  const track = firstValidTrack(channel);
  if (!track) {
    return {
      sourceType: 'geoaudio',
      unavailable: true,
      message: 'This GeoAudio Channel is temporarily unavailable.',
      flyTo: channel.coordinates,
      beacon: { coordinates: channel.coordinates, sourceType: 'geoaudio', label: channel.label },
      metadata: channel,
      track: null,
    };
  }
  return {
    sourceType: 'geoaudio',
    unavailable: false,
    message: '',
    flyTo: channel.coordinates,
    beacon: { coordinates: channel.coordinates, sourceType: 'geoaudio', label: channel.label },
    metadata: {
      title: channel.title,
      provider: channel.provider,
      producer: channel.producer,
      studio: channel.studio,
      region: channel.region,
      country: channel.country,
      label: channel.label,
      curator: channel.curator,
      genre: channel.genre,
    },
    track,
    playback: { audioUrl: track.audioUrl, startsAtTrackId: track.id },
  };
}

module.exports = { selectGeoAudioChannel };
