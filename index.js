var Batch = require('batch'),
    loadImage = require('./loaders/image.js'),
    loadSound = require('./loaders/sound.js'),
    loadFont = require('./loaders/font.js');

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

  sound: function(url, context) {
    if (this.assets[url] == null) {
      var sound = loadSound(url, context);

      if (sound) {
        this.queue.push(sound.load);
        this.assets[url] = sound.container;
      }
    }

    return this.assets[url];
  },

  font: function(name, url) {
    if (this.assets[url]) return;

    var load = loadFont(name, url);
    this.queue.push(load);
    this.assets[url] = true;
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
