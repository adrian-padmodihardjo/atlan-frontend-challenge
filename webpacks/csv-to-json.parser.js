const Papa = require('papaparse')

function parse (inputString) {
  const { data } = Papa.parse(inputString, {
    encoding: 'utf-8',
    delimiter: ',',
    header: true,

  })
  return data
}

function parseHeaders (inputString) {
  const headerRow = inputString.split('\n')[0]
  return headerRow.split(',')
}

module.exports = {
  parse,
  parseHeaders,
}
