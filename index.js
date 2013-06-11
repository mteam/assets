var Batch = require('batch'),
    loadImage = require('./loaders/image.js'),
    loadAudio = require('./loaders/audio.js');

function Loader() {
  this.assets = {};
  this.queue = [];
}

Loader.prototype = {

  image: function(url) {
    if (this.assets[url]) return this.assets[url];

    var image = loadImage(url);
    this.queue.push(image.load);
    this.assets[url] = image.asset;

    return image.asset;
  },

  audio: function(url, exts) {
    var key = url + exts;
    if (this.assets[key]) return this.assets[key];

    var audio = loadAudio(url, exts.split(' '));
    this.queue.push(audio.load);
    this.assets[key] = audio.asset;

    return audio.asset;
  },

  load: function(cb) {
    var batch = new Batch();

    for (var i = 0, len = this.queue.length; i < len; i++) {
      batch.push(this.queue.shift());
    }

    if (cb) batch.end(cb);
    else return batch;
  }

};

module.exports = Loader;
