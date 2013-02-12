var bind = require('bind');

function Asset(base, exts) {
  this.base = base;
  this.exts = exts;
  this.loaded = false;
  this.content = null;
}

Asset.loaders = {
  image: require('./image'),
  audio: require('./audio')
};

Asset.extensions = {
  jpg: 'image',
  png: 'image',

  mp3: 'audio',
  ogg: 'audio'
};

Asset.prototype.getUrl = function() {
  return this.base + (this.exts[0] ? this.exts[0] : '');
};

Asset.prototype.getUrls = function() {
  var base = this.base;

  return this.exts.map(function(ext) {
    return base + ext;
  });
};

Asset.prototype.getContent = function() {
  return this.content;
};

Asset.prototype.isLoaded = function() {
  return this.loaded;
};

Asset.prototype.getExtension = function() {
  var url = this.getUrl(),
      result = /\.(\w+)$/.exec(url);

  if (result) {
    return result[1];
  } else {
    throw new Error('url does not have an extension: ' + url);
  }
};

Asset.prototype.getLoader = function() {
  var ext = this.getExtension(),
      loader = Asset.extensions[ext];

  if (loader != null) {
    return Asset.loaders[loader];
  } else {
    throw new Error('could not identify extension: ' + ext);
  }
};

Asset.prototype.load = function(done) {
  var self = this,
      load = this.getLoader();

  load(this, function(result) {
    self.loaded = true;
    self.content = result;

    done();
  });
};

module.exports = Asset;
