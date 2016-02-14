var search = require('./search-service')
module.exports = function (term, cb) {
  var options = {
    callback: cb,
    parsingKeys: ['tracks', 'items', true],
    uri: 'https://api.spotify.com/v1/search?q=' + term + '&type=track',
    parseTrack: function (track) {
      var title = track.artists.map(function (x) { return x.name }).join(', ')
      title += ' ' + track.name
      var ms = track.duration_ms
      return {
        uri: track.uri,
        title: title,
        source: 'spotify',
        durationMs: ms,
        duration: search.msToTime(ms)
      }
    }
  }
  search(options)
}
