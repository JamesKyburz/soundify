var hyperquest = require('hyperquest');
var through    = require('through');
var JSONStream = require('JSONStream');

module.exports = search;

function search(options) {
  var tracks = [];
  hyperquest(options.uri)
    .pipe(JSONStream.parse(options.parsingKeys))
    .pipe(through(function toTrack(track) {
      if (tracks.length < 4) {
        track = options.parseTrack(track);
        if (track) tracks.push(track);
      }
    }, end)
  );
  function end() {
    options.callback(tracks);
  }
}

search.msToTime = function (ms) {
  var seconds      = n(ms / 1000 % 60);
  var minutes      = n(ms / 60000 % 60);
  var hours        = n(ms / 3600000 % 24);

  function n(x) {
    x = parseInt(x, 10);
    return x < 10 ? '0' + x : x;
  }

  return (hours + ":" + minutes + ":" + seconds).replace(/^00:/, '');
}
