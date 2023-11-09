function(instance, properties, context) {
    
    
   if (!properties.video_url && properties.video_file) {
       var track = new videojs.VideoTrack({
        	src: properties.video_file,
            kind: "main"
        });
   };
    if (properties.video_url) {        
        var parsedURL = urlParser.parse(properties.video_url);
        var videoType = 'video/' + parsedURL.provider;
        var track = new videojs.VideoTrack({
              src: properties.video_url,
              type: videoType,
              kind: "main"
          });
	}

	// Add the track to the player's video track list.
	if (track) {
        instance.data.vjsPlayer.videoTracks().addTrack(track);
	}

}