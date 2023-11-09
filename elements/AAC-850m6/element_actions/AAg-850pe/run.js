function(instance, properties, context) {

    // Load the source video or Youtube URL
    if (!properties.video_url && properties.video_file) { 
        instance.data.vjsPlayer.src(properties.video_file);
    } else if (properties.video_url) {
        var parsedURL = urlParser.parse(properties.video_url);
        var videoType = 'video/' + parsedURL.provider;
        var SourceObject = {src: properties.youtube_url, type: videoType};
        instance.data.vjsPlayer.src(SourceObject);
    }
    instance.data.last_triggerred_event = 0;

}