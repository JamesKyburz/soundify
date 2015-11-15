module.exports = function (term, cb) {
  var results = {}
  var result = []
  var sources = require('../config').sources
  var pending = sources.length
  sources.forEach(search)
  function search (source) {
    require('./' + source)(term, complete)
    function complete (data) {
      results[source] = data
      if (!--pending) {
        sources.forEach(add)
        cb(result)
      }
    }
    function add (source) {
      result = result.concat(results[source])
    }
  }
}
