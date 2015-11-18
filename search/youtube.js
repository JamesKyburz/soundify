var search = require('./search-service')
var through = require('through2')
var request = require('hyperquest')
var JSONStream = require('JSONStream')

module.exports = function (term, cb) {
  var options = {
    callback: decorate(cb),
    parsingKeys: ['items', true],
    uri: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=' + process.env.YOUTUBE_API_KEY + '&maxResults=' + search.maxResults + '&q=' + term,
    parseTrack: function (item) {
      return {
        id: item.id,
        uri: 'https://www.youtube.com/watch?v=' + item.id.videoId,
        title: item.snippet.title,
        source: 'youtube',
        durationMs: 0,
        duration: 0
      }
    }
  }
  search(options)
}

function decorate (cb) {
  return function (tracks) {
    var pending = tracks.length
    tracks.forEach(addDetail)
    function addDetail (item, i) {
      var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=' + item.id.videoId +
        '&key=' + process.env.YOUTUBE_API_KEY
      return request(url).pipe(JSONStream.parse('items.*')).pipe(
        through.obj(function (data, enc, cb2) {
          pending--
          tracks[i].duration = (data.contentDetails.duration || '').match(/\d+/g).join(':')
          if (!pending) cb(tracks)
          cb2()
        }))
    }
  }
}
