module.exports = function(name, url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  return function(done) {
    xhr.onload = function() {
      addFont(name, url);
      done();
    };

    xhr.send();
  };
};

function addFont(name, url) {
  var style = document.createElement('style');

  style.innerHTML = [
    "@font-face {",
    "  font-family: '" + name + "';",
    "  src: url(" + url + ");",
    "}"
  ].join('\n');

  document.head.appendChild(style);
}
