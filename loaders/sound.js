var AudioContext = window.AudioContext || window.webkitAudioContext;
var supported = AudioContext != null && location.protocol != 'file:';

if (supported) {
  var context = new AudioContext();
}

module.exports = function(url) {
  if (!supported) return null;

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
