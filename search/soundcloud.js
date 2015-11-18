var search = require('./search-service')
module.exports = function (term, cb) {
  var options = {
    callback: cb,
    parsingKeys: ['collection', true],
    uri: 'https://api.soundcloud.com/search.json?client_id=' + process.env.SOUNDCLOUD_CLIENT_ID + '&q=' + term + '&limit=4',
    parseTrack: function (track) {
      var ms = parseInt(track.duration, 10)
      if (track.kind === 'track' && track.stream_url) {
        return {
          uri: track.stream_url,
          title: track.title,
          source: 'soundcloud',
          durationMs: ms,
          duration: search.msToTime(ms)
        }
      }
    }
  }
  search(options)
}
