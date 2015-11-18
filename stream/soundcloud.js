var request = require('hyperdirect')()

module.exports = function (uri) {
  return request(uri + '?client_id=' + process.env.SOUNDCLOUD_CLIENT_ID)
}
