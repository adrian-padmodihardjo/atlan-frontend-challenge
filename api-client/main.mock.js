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

/**
 *
 * @param {MockAdapter} mockAdapter
 * @param {APIEndpoint} endpoint
 */
export function setupMockAdapter (mockAdapter) {
  if (mockAdapter instanceof MockAdapter) {
    mockAdapter.onGet('/table-headers').reply(handleGetTableHeaders)
  }
}
