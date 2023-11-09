function(instance, properties, context) {

    if (properties.texttrack_file) {
        // get the video element
        var video = document.getElementById(instance.data.id),
            vjsPlayer =  instance.data.vjsPlayer,
            newTextTrack;
        video.addEventListener("loadedmetadata", function() {
        	newTextTrack = vjsPlayer.addRemoteTextTrack({kind: properties.kind, label: properties.label, language: properties.language, src: properties.texttrack_file, default: properties.default}, false);
        	if (properties.create_cue_events) {
            	// Add the event listener and fires events
            	newTextTrack.oncuechange = function () {
                   	if (newTextTrack.activeCues[0] !== undefined) {
                		// We have an active Cue
                		instance.triggerEvent('cue_start');
            			instance.publishState("active_cue", newTextTrack.activeCues[0].id);
            			}
            		else {
             			instance.triggerEvent('cue_stop');
            			instance.publishState("active_cue", "");   
            		}
                }
            }
        });
    }
}	