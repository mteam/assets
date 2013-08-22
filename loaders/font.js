var URL = window.URL || window.webkitURL;

module.exports = function(name, url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';

  return function(done) {
    xhr.onload = function() {
      var url = URL.createObjectURL(xhr.response);
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
