var Spotify = require('spotify-web');
var config  = require('../config');
var through = require('through');

module.exports = function(uri) {
  var stream = through();
  Spotify.login(config.spotify_user, config.spotify_password, function (err, spotify) {
    if (err) throw err;
    spotify.get(uri, function(err, track) {
      if (err) throw err;
      track
        .play()
        .pipe(stream)
        .on('finish', spotify.disconnect.bind(spotify))
      ;
    });
  });
  return stream;
}
