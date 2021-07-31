const fs = require('fs')
const path = require('path')
const { parse } = require('../../webpacks/csv-to-json.parser')

function prepareTest (csvFilenameToTest) {
  const filePath = path.join(process.cwd(), `/mocks/${csvFilenameToTest}`)
  const fileContent = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })

  const parsed = parse(fileContent)
  const rows = fileContent.split('\n') || []
  const headers = rows.shift().split(',') || []

  return {
    parsed,
    headers,
    rows
  }
}

describe('csv to json parser', () => {
  const csvDirs = path.join(process.cwd(), '/mocks')
  const filenames = fs.readdirSync(csvDirs).map((path) => {
    return path.replace('./', '')
  })
  filenames.forEach((name) => {
    test(`it correctly parse ${name} data to JSON`, () => {
      const {
        parsed: jsonArray,
        headers,
        rows
      } = prepareTest(name)

      for (const obj of jsonArray) {
        expect(Object.keys(obj)).toEqual(headers)
      }
      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          return
        }
        const json = jsonArray[rowIndex]
        const values = row.split(',')
        for (const [index, val] of Object.entries(values)) {
          const key = headers[+index]
          expect(json[key]).toEqual(val)
        }
      })
    })
  })
})
