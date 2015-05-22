var config = require('../config');
var search = require('./search-service');

module.exports = function(term, cb) {
  var options = {
    callback: cb,
    parsingKeys: ['items', true],
    uri: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=' + config.youtube_api_key + '&maxResults=' + search.maxResults + '&q=' + term,
    parseTrack: function(item) {
      return {
        uri: 'https://www.youtube.com/watch?v=' + item.id.videoId,
        title: item.snippet.title,
        source: 'youtube',
        durationMs: 0,
        duration: 0
      };
    }
  };
  search(options);
}
