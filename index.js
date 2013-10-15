var http   = require('http');
var stack  = require('stack');
var routes = require('./routes');
var route  = require('tiny-route');
var config = require('./config');

http.createServer(stack(
  routes.authenticate,
  route.get(/^\/play\/(.*)/, routes.play),
  route.get(/^\/stream\/(.*)/, routes.stream),
  route.get('/favicon.ico', routes.emptyFavicon),
  route.get('/app.css', routes.appCss),
  route.post('/register', routes.register),
  route.post('/search', routes.search),
  route.get('/', routes.main)
)).listen(config.port);

