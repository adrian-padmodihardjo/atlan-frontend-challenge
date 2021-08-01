import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
/**
 * Refer to available CSV file at '@/mocks/*.csv'
 * @typedef {string} TableName
 */

/**
 * Available endpoint for mocks
 * @typedef {'/table-headers'} APIEndpoint
 */

/**
 * Handle GET request to /table-headers?table=
 * @param {TableName} tableName
 */
async function handleGetTableHeaders (config) {
  const { table } = config.params
  const data = await import(`@/mocks/${table}.csv?headers`)
    .then(m => m.default || m)
  return [
    200,
    data,
  ]
}

async function handleGetTableData (config) {
  const { page = 1, limit = 10 } = config.params
  const paths = config.url.split('/')
  const tableName = paths[paths.length - 1]
  const rows = await import(`@/mocks/${tableName}.csv`)
    .then(m => m.default || m)

  const data = rows.filter((_, index) => {
    const start = (page - 1) * limit
    const end = (page * limit) - 1
    return start <= index && index <= end
  })
  return [
    200,
    data,
  ]
}

const mockApiClient = new MockAdapter(axios.create({}))
mockApiClient.onGet('/table-headers').reply(handleGetTableHeaders)
mockApiClient.onGet(/\/feature\/.*/).reply(handleGetTableData)

export {
  mockApiClient,
}
