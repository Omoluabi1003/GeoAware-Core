function firstValidTrack(channel) {
  const tracks = Array.isArray(channel?.tracks) ? channel.tracks : [];
  return tracks.find((track) => Boolean(track?.audioUrl));
}

function selectGeoAudioChannel(channel) {
  const safeChannel = channel && typeof channel === 'object' ? channel : {};
  const track = firstValidTrack(safeChannel);
  if (!track) {
    return {
      sourceType: 'geoaudio',
      unavailable: true,
      message: 'This GeoAudio Channel is temporarily unavailable.',
      flyTo: safeChannel.coordinates,
      beacon: { coordinates: safeChannel.coordinates, sourceType: 'geoaudio', label: safeChannel.label },
      metadata: safeChannel,
      track: null,
    };
  }
  return {
    sourceType: 'geoaudio',
    unavailable: false,
    message: '',
    flyTo: safeChannel.coordinates,
    beacon: { coordinates: safeChannel.coordinates, sourceType: 'geoaudio', label: safeChannel.label },
    metadata: {
      title: safeChannel.title,
      provider: safeChannel.provider,
      producer: safeChannel.producer,
      studio: safeChannel.studio,
      region: safeChannel.region,
      country: safeChannel.country,
      label: safeChannel.label,
      curator: safeChannel.curator,
      genre: safeChannel.genre,
    },
    track,
    playback: { audioUrl: track.audioUrl, startsAtTrackId: track.id },
  };
}

module.exports = { firstValidTrack, selectGeoAudioChannel };
