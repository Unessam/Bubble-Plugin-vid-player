function(instance, properties, context) {


  let videoTrackList = instance.data.vjsPlayer.videoTracks();
  let textTrackList =  instance.data.vjsPlayer.textTracks();
  let audioTrackList =  instance.data.vjsPlayer.audioTracks();
    
  
  // Loop on videotracklist
  for (let i = 0; i < videoTrackList.length; i++) {
      	let myVideoTrack = videoTrackList[i];
    	instance.data.vjsPlayer.removeTrack(myVideoTrack);  
  }
  
  // Loop on textTrackList
  for (let i = 0; i < textTrackList.length; i++) {
      	let myTextTrack = textTRackList[i];
    	instance.data.vjsPlayer.removeTextTrack(myTextTrack); 
  }
  
  // Loop on audioTrackList
  for (let i = 0; i < audioTrackList.length; i++) {
      	let myAudioTrack = audioTrackList[i];
    	instance.data.vjsPlayer.removeTrack(myAudioTrack); 
  }
    
    instance.data.vjsPlayer.removeTextTrack(myTextTrack);


}