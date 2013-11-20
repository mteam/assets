module.exports = function(url, context) {
  var container = { buffer: null };

  function load(done) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        container.buffer = buffer;
        done();
      });
    };

    request.send();
  }

  return {
    container: container,
    load: load
  };
};
