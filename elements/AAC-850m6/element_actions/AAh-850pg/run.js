function(instance, properties, context) {
    var randomId = Math.floor((Math.random() * 100000) + 1);
    // Source file is appended to the document in videojs
    var myVideoJS = document.getElementById(instance.data.id);

    var myAudioSource = document.createElement("source");
    myAudioSource.id = "audio-track" + randomId;
    myAudioSource.src = properties.file;

    myVideoJS.appendChild(myAudioSource);

    // Create the track object.
    var track = new videojs.AudioTrack({
        id: myAudioSource.id,
        kind: properties.kind,
        label: properties.label,
        language: properties.language,
        enabled: properties.enabled
    });

    // Add the track to the player's audio track list.
    instance.data.vjsPlayer.audioTracks().addTrack(track);
}
