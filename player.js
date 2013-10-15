var through = require('through');
var speaker = require('speaker')();
var decoder = require('lame').Decoder();
var stream  = require('./routes').stream;

process.on('message', function(uri) {
 var track = through();
   stream({params:[uri]}, track);
   track
     .pipe(decoder)
     .pipe(speaker)
   ;
});



