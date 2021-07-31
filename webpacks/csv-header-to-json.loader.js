const { parseHeaders } = require('./csv-to-json.parser')

module.exports = function (source) {
  const headers = parseHeaders(source)
  return `module.exports = ${JSON.stringify(headers)}`
}
