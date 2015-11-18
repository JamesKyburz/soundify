var Spotify = require('spotify-web')
var through = require('through2')

module.exports = function (uri) {
  var stream = through()
  Spotify.login(process.env.SPOTIFY_USER, process.env.SPOTIFY_PASSWORD, function (err, spotify) {
    if (err) throw err
    spotify.get(uri, function (err, track) {
      if (err) throw err
      track
        .play()
        .pipe(stream)
        .on('finish', spotify.disconnect.bind(spotify))
    })
  })
  return stream
}
