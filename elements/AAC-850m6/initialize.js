function(instance, context) {

    // Generate a random ID for the element and add the video.js div
    var randomId = Math.floor((Math.random() * 100000) + 1);
    var elementId = 'vjsElement_' + randomId;
    instance.canvas.append("<div style='width:100%;height:100%'><video id='" + elementId + "' class='video-js' style='width:100%!important;height:100%!important;'></video></div>");
    instance.data.elementId = elementId;

    // Include CSS file
    function addCSS(filename) {
        var head = document.getElementsByTagName('head')[0];

        var style = document.createElement('link');
        style.href = filename;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append(style);
    }
    
    $(document).ready(function() {

      // Load skin file
        if (instance.data.skin) {
          addCSS(instance.data.skin);
        }
        
      // Load video.js
        var vjsPlayer;
        vjsPlayer = videojs(elementId, instance.data.options);
        
        
      // Trigger events
        vjsPlayer.on('ended', function() {
            instance.triggerEvent('ended');
            instance.publishState("status", "ended");
        });

        vjsPlayer.on('play', function() {
            instance.triggerEvent('play');
            instance.publishState("status", "playing");
            
        });
        
        // Need to evaluate TimedEvent if seeked
        vjsPlayer.on('seeked', function() {
            var currentTime = vjsPlayer.currentTime(),
                ratioPlayed = currentTime / instance.data.durationTime * 100;
            let seekId = 0;
            while ((instance.data.triggerList[seekId] < ratioPlayed) & (seekId + 1 < instance.data.triggerList.length)) {
                seekId = seekId + 1;
            }
            if (instance.data.triggerId != seekId) {
                instance.data.triggerShown = false;
                instance.data.triggerId = seekId;
                console.log("new time event: " + instance.data.triggerList[seekId] );
            }
        });
        

        vjsPlayer.on('pause', function() {
            instance.triggerEvent('pause');
            instance.publishState("status", "pause");
        });
        
    	vjsPlayer.on('timeupdate', function() {
            
            durationTime = vjsPlayer.duration();
      		instance.publishState("duration_time", durationTime.toFixed(2));
      		instance.data.durationTime = durationTime;
            
            var currentTime = vjsPlayer.currentTime(),
                ratioPlayed = currentTime / instance.data.durationTime * 100;
            ratioPlayed = Math.round((ratioPlayed + Number.EPSILON) * 100) / 100
            instance.publishState("current_time", currentTime.toFixed(2));
            instance.publishState("remaining_time", vjsPlayer.remainingTime().toFixed(2));
            instance.publishState("ratio_played", ratioPlayed);
            // Check if we are an alert
            if (instance.data.triggerList) {
            	if ((instance.data.triggerList[instance.data.triggerId] < ratioPlayed) & (!instance.data.triggerShown)) {
                    console.log("Trigger an event:" + instance.data.triggerList[instance.data.triggerId])
                    instance.triggerEvent('timed_event');
                    instance.publishState("last_timed_event", instance.data.triggerList[instance.data.triggerId]);
                    instance.data.triggerShown = true;
                    if (instance.data.triggerId +1 < instance.data.triggerList.length ) {
                        instance.data.triggerId = instance.data.triggerId +1 ;
                        instance.data.triggerShown = false;
                        }
                }
            }
            
        });
        
        
        instance.data.vjsPlayer = vjsPlayer;
        instance.data.id = elementId;

    });

}