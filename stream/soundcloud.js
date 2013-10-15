var config  = require('../config');
var request = require('hyperdirect')();

module.exports = function(uri) {
  return request(uri + '?client_id=' + config.soundcloud_client_id);
}
