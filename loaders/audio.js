var event = require('event');

module.exports = function(url, exts) {
  var audio = new Audio();
  audio.preload = 'none';

  function load(done) {
    event.bind(audio, 'canplaythrough', function() { done(); });

    exts.forEach(function(ext) {
      var source = document.createElement('source');
      source.src = url + ext;
      audio.appendChild(source);
    });

    audio.load();
  }

  return {
    asset: audio,
    load: load
  };
};
