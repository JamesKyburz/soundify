var search = require('./search-service');
module.exports = function(term, cb) {
  var options = {
    callback: cb,
    parsingKeys: ['feed', 'entry', true],
    uri: 'https://gdata.youtube.com/feeds/api/videos?max-results=' + search.maxResults + '&q=' + term + '&v=2&alt=json',
    parseTrack: function(track) {
      var ms = parseInt(track.media$group.yt$duration.seconds * 1000, 10);
      return {
        uri: track.media$group.media$player.url,
        title: track.media$group.media$title.$t,
        source: 'youtube',
        durationMs: ms,
        duration: search.msToTime(ms)
      };
    }
  };
  search(options);
}
