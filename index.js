var Asset = require('./asset');

function Loader() {
  this.reset();
}

module.exports = Loader;

Loader.prototype.get = function(base) {
  if (base == null)
    throw new Error('url is not specified');

  var exts = Array.prototype.slice.call(arguments, 1);

  if (assets[base] == null) {
    var asset = new Asset(base, exts);
    this.assets[base] = asset;
    this.queue.push(asset);
  }

  return this.assets[base];
};

Loader.prototype.add = function() {
  this.get.apply(this, arguments);
};

Loader.prototype.load = function(done) {
  var queue = this.queue;

  if (queue.length == 0) {
    done();
    return;
  }

  var count = 0;
  function loaded() {
    if (++count === queue.length) {
      queue.length = 0;
      done();
    }
  }

  queue.forEach(function(asset) {
    asset.onLoad = loaded;
    asset.load();
  });
};

Loader.prototype.reset = function() {
  this.assets = {};
  this.queue = [];
};
