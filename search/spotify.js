var search = require('./search-service');
module.exports = function(term, cb) {
  var options = {
    callback: cb,
    parsingKeys: ['tracks', true],
    uri: 'http://ws.spotify.com/search/1/track.json?q=' + term,
    parseTrack: function(track) {
      var title = track.artists.map(function(x) { return x.name; }).join(', ');
      title += ' ' + track.name;
      var ms = parseInt(track.length, 10) * 1000;
      return {
        uri: track.href,
        title: title,
        source: 'spotify',
        durationMs: ms,
        duration: search.msToTime(ms)
      };
    }
  };
  search(options);
}
