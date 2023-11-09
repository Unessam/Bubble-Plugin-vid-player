function(instance, properties, context) {

    // Get all audio tracks for the current player.
    var tracks = instance.data.vjsPlayer.audioTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      // Find the track and mark it as enabled
      if (track.kind === properties.kind && track.language === properties.language) {
        track.enabled = true ;
      }
    }


}