var Batch = require('batch');
    Asset = require('./asset');

function Loader() {
  this.reset();
}

Loader.prototype.get = function(base) {
  if (base == null) {
    throw new Error('url is not specified');
  }

  if (this.assets[base] == null) {
    var exts = [].slice.call(arguments, 1),
        asset = new Asset(base, exts);

    this.assets[base] = asset;
    this.queue.push(asset);
  }

  return this.assets[base];
};

Loader.prototype.add = function() {
  this.get.apply(this, arguments);
};

Loader.prototype.load = function(done) {
  var batch = new Batch;

  this.queue.forEach(function(asset) {
    batch.push(function(done) {
      asset.load(done);
    });
  });

  if (done != null) {
    batch.end(done);
  } else {
    return batch;
  }
};

Loader.prototype.reset = function() {
  this.assets = {};
  this.queue = [];
};

module.exports = Loader;
