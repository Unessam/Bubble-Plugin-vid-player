function(instance, properties, context) {


// Get all text tracks for the current player.
var tracks = instance.data.vjsPlayer.textTracks();

for (var i = 0; i < tracks.length; i++) {
  var track = tracks[i];

  // Find the track and mark it as "showing".
  if (track.kind === properties.kind && track.language === properties.language) {
    track.mode = 'showing';
  }
}


}