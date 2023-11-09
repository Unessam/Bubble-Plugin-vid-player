function(instance, properties, context) {


   instance.data.vjsPlayer.pause();
    instance.publishState("status", "pause");

}