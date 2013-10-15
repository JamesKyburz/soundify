var http          = require('http');
var fs            = require('fs');
var hyperglue     = require('hyperglue');
var cookieCutter  = require('cookie-cutter');
var stack         = require('stack');
var route         = require('tiny-route');
var indexHtml     = fs.readFileSync('index.html');
var tracksHtml    = fs.readFileSync('tracks.html');
var registerHtml  = fs.readFileSync('register.html');
var searchTrack   = require('./search/search');
var config        = require('./config');

http.createServer(stack(
  authenticate,
  route.get(/^\/play\/(.*)/, play),
  route.get('/favicon.ico', emptyFavicon),
  route.get('/app.css', appCss),
  route.post('/register', register),
  route.post('/search', search),
  route.get('/', main)
)).listen(1338);

function emptyFavicon(q, r, next) {
  r.writeHead(200, {'Content-Type': 'image/x-icon'});
  r.end();
}

function main(q, r, next) {
  var cookie = cookieCutter(q.headers.cookie);
  var partyUser;
  r.writeHead(200, {'Content-Type': 'text/html'});
  if (partyUser = cookie.get('party-user')) {
    var searchTerm = cookie.get('search-track');
    if (searchTerm) return addTracksToResponse(searchTerm, r);
    fs.createReadStream('index.html').pipe(r);
  } else {
    r.end(
      hyperglue(indexHtml, {
        'body': {_html: registerHtml}
      }).innerHTML
    );
  }
}

function addTracksToResponse(searchTerm, r) {
  searchTerm = encodeURIComponent(searchTerm);
  searchTrack(searchTerm, function(tracks) {
    var trackResponse = hyperglue(tracksHtml, {
      '.track': tracks.map(function(x) {
        return {
          'source': {src: '/play/' + new Buffer(JSON.stringify(x)).toString('base64')},
          '.track-title': x.title,
          '.track-duration': x.duration,
          '.track-source': x.source
        };
      })
    }).innerHTML;
    r.end(
      hyperglue(indexHtml, {
        '#content': {_html: trackResponse}
      }).innerHTML
    );
  });
}

function appCss(q, r, next) {
  r.writeHead(200, {'Content-Type': 'text/css'});
  return fs.createReadStream('app.css').pipe(r);
}

function register(q, r, next) {
  var partyUser = '';
  q
    .on('data', data)
    .on('end', end)
  ;

  function data(x) {
    partyUser += x.toString();
  }

  function end() {
    partyUser = partyUser.replace(/^partyUser=/i, '');
    r.writeHead(302, {'Location': '/', 'Set-Cookie': 'party-user=' + partyUser + '; path=/; HttpOnly'});
    r.end();
  }
}

function search(q, r, next) {
  var track = '';
  q
    .on('data', data)
    .on('end', end)
  ;

  function data(x) {
    track += x.toString();
  }

  function end() {
    track = track.replace(/^track=/i, '');
    r.writeHead(302, {'Location': '/', 'Set-Cookie': 'search-track=' + track + '; path=/; HttpOnly'});
    r.end();
  }
}

function authenticate(q, r, next) {
  console.log(q.url, q.headers.cookie);
  var credentials;
  if (credentials = q.headers.authorization) {
    credentials = new Buffer(credentials.slice(6), 'base64').toString();
    if (credentials === config.service_credentials) return next();
  }
  r.writeHead(401, {'WWW-Authenticate': 'Basic realm=""'});
  r.end('authentication required');
}

function play(q, r, next) {
  var track = JSON.parse(new Buffer(q.params[0], 'base64').toString());
  require('./stream/' + track.source)(track.uri).pipe(r);
}
