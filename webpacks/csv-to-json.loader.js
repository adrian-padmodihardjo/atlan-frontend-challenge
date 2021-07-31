const { parse } = require('./csv-to-json.parser')

module.exports = function (source) {
  const json = parse(source)
  return `module.exports = ${JSON.stringify(json)}`
}
