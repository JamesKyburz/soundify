var through = require('through2')
var decoder = require('lame').Decoder()
var request = require('hyperquest')
var stream = require('./routes').stream

process.on('message', function (uri) {
  var speakerUrl = process.env.REMOTE_SPEAKER
  var track = through()
  stream({params: [uri]}, track)
  track
    .pipe(decoder)
    .pipe(speakerUrl ? request.post(speakerUrl) : require('speaker')())
})
