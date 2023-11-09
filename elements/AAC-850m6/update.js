function(instance, properties, context) {

    var preload = properties.preload.toLowerCase();
    var options = {
        controls: properties.controls,
        autoplay: properties.autoplay,
        loop: properties.loop,
        preload: preload,
        muted: properties.muted,
        fluid: properties.fluid
    }

    instance.data.options = options;
    
    // store the css skin
    instance.data.skin = properties.skin_file;
    
    function formatTimeStamp(myTime) {
      // Timestamp
      // hh:mm:ss.tttt
      let hours = Math.floor((myTime % (60 * 60)) / (60 * 60));  
      let minutes = Math.floor((myTime % (60 * 60)) / 60);
      let seconds = myTime % 60; // Modulus 60
      let milliseconds = ((myTime % 1).toFixed(4)) * 10000 // The decimal part in milliseconds
      

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }        
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      if (milliseconds < 10) {
        milliseconds = `000${milliseconds}`;
      }
      else if (milliseconds < 100) {
        milliseconds = `00${milliseconds}`;
      }
      else if (milliseconds < 1000) {
        milliseconds = `0${milliseconds}`;
      }
        
      let returnValue = `${hours}:${minutes}:${seconds}.${milliseconds}`;
      console.log(returnValue)
      return returnValue;
    }

	function parseURL (url) {
        if(!url) return {type:null}
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        //   - https://m.youtube.com/watch?v=My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        if (RegExp.$3.indexOf('youtu') > -1) {
            var type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            var type = 'vimeo';
        }

        return {
            type: type,
            id: RegExp.$6
        };
    }
    
    function getThumbnail(videoURL){
  		var videoDetails = parseURL(videoURL);
        var videoType = videoDetails.type;
        var videoID = videoDetails.id;

        if (videoType == 'youtube') {
            var thumbSRC = 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
        }
        else if (videoType == 'vimeo') {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://vimeo.com/api/v2/video/"+ videoID +".json", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = xhr.responseText;
                        var parsedData = JSON.parse(data);
                        thumbSRClarge = parsedData[0].thumbnail_large;
                        // split url of large thumbnail at 640
                        thumbSplit = thumbSRClarge.split(/\d{3}(?=.jpg)/);
                        // add 1280x720 to parts and get bigger thumbnail
                        thumbSRC = thumbSplit[0] + '1280x720' + thumbSplit[1];
                        thumbIMG.src = thumbSRC;
                        thumbLINK.href = thumbSRC;
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
		}
        return thumbSRC;
    }

    $(document).ready(function() {

        var vjsPlayer = instance.data.vjsPlayer;
      	// vjsPlayer.options.techOrder =  ['html5','youtube','vimeo'];
        // Load the source video or Youtube URL
        if (!properties.video_url && properties.video_file) { 
          vjsPlayer.src(properties.video_file);
        }
        if (properties.video_url) {
          var parsedURL = urlParser.parse(properties.video_url);
          var videoType = 'video/' + parsedURL.provider;
          var SourceObject = {src: properties.video_url, type: videoType};
          vjsPlayer.src(SourceObject);
        }
        
        
        vjsPlayer.ready(function () {
            /*
            // If there's a list of triggered event, we create a metadata texttrack and add the cue events.
            if (properties.timed_cue_event) {
                // Get the event list
                var triggeredEventList = properties.timed_cue_event .get(0, properties.timed_cue_event .length());
                
                // Sort the event list
                triggeredEventList.sort(function(a, b){return a-b});
                

                // Create the texttrack, addRemoteTextTrack returns a HTMLTrackElement (and not a TextTrack)
                var timedEventTrack = vjsPlayer.addRemoteTextTrack({kind: 'metadata', label: 'TimedCuePoint', mode: 'hidden'}, false);
                
                console.log(timedEventTrack);
                timedEventTrack.track.default = true;
                console.log("creating metadatrack" + timedEventTrack.label);
                
                // Loop on event to create cues
                for (let i = 0; i < triggeredEventList.length; i++) {
                    
                    let startTime = triggeredEventList[i];
                    let endTime = startTime + 0.1;
                    var newCue = new VTTCue(startTime, endTime, '');
                    newCue.id = 'TimedCuePoint_' + triggeredEventList[i];
                    newCue.label = 'TimedCuePoint_' + triggeredEventList[i];
                    newCue.pauseOnExit = false;
                    
                    timedEventTrack.track.addCue(newCue);
                    
                    console.log("creating cue: "+ triggeredEventList[i]);
                    };
                
                // manage the cuechange event
                timedEventTrack.track.oncuechange = function() {
            		if (this.activeCues[0] !== undefined) {
                		// We have an active Cue
                		instance.triggerEvent('cue_start');
            			instance.publishState("active_cue", this.activeCues[0].id);
                        console.log("trigger cue: "+  this.activeCues[0].id);
            			}
            		else {
             			instance.triggerEvent('cue_stop');
            			instance.publishState("active_cue", "");   
            		}
                };
                

                }
                */
            if (properties.timed_cue_event) {
            	// Get the list of cue event
                var triggeredEventList = properties.timed_cue_event .get(0, properties.timed_cue_event .length());
                triggeredEventList.sort(function(a, b){return a-b});
                instance.data.triggerList = triggeredEventList;
                instance.data.triggerId = 0;
                instance.data.triggerShown = false;
            }

        });
        
        if (properties.poster) {
        	vjsPlayer.poster(properties.poster);
        }
        else {
            // Get the poster from YouTube, Vimeo
            var videoDetails = parseURL(properties.video_url);
        	var videoType = videoDetails.type;
        	var videoID = videoDetails.id; 
            if ((videoType == 'vimeo') || (videoType == 'youtube')) {
            	vjsPlayer.poster(getThumbnail(properties.video_url));
                }
        }
               
    });

}