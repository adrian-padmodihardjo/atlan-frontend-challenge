const Papa = require('papaparse')

function parse (inputString) {
  const { data } = Papa.parse(inputString, {
    encoding: 'utf-8',
    delimiter: ',',
    header: true
  })
  return data
}

module.exports = {
  parse
}
