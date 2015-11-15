var stream = require('youtube-audio-stream')

module.exports = function (uri) {
  uri = uri.match(/youtube.*/)[0]
  return stream(uri.match(/youtube.*/)[0])
}
