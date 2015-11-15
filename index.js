var http = require('http')
var stack = require('stack')
var routes = require('./routes')
var route = require('tiny-route')
var debug = require('debug')('index.js')

if (!module.parent) {
  start(require((process.env.CONFIG || '.') + '/config'))
} else {
  module.exports = start
}

function start (config) {
  http.createServer(stack(
    routes.authenticate,
    route.get(/^\/play\/(.*)/, routes.play),
    route.get(/^\/stream\/(.*)/, routes.stream),
    route.get('/favicon.ico', routes.emptyFavicon),
    route.get('/app.css', routes.appCss),
    route.post('/search', routes.search),
    route.get('/', routes.main)
  )).listen(config.port, started)

  function started () {
    debug('running on http://localhost:%s', config.port)
  }
}
