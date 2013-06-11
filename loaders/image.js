module.exports = function(url) {
  var image = new Image();

  return {
    asset: image,
    load: function(done) {
      image.onload = function() { done(); };
      image.src = url;
    }
  };
};
