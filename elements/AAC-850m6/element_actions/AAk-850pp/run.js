function(instance, properties, context) {


	// Get the list of triggered event
    // and store it in sorted values
    if (!properties.triggered_event) {
        var triggered_event_list = properties.triggered_event.get(0, properties.triggered_event.legnth());
        instance.data.triggerList = triggered_event_list.sort(function(a, b){return a - b});
        instance.data.triggerId = 0;
        instance.data.triggerShown = false;
        instance.data.vjsPlayer.currentTime(0);
        }
    
}