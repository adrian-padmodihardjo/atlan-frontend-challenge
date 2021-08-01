import { request } from '@/api-client/main'

export function getTableHeaders (tableName) {
  return request.call(this, {
    method: 'get',
    url: '/table-headers',
    params: {
      table: tableName,
    },
  })
}

export function getTableData (tableName, params) {
  return request.call(this, {
    method: 'get',
    url: `/feature/${tableName}`,
    params: {
      table: tableName,
      ...params,
    },
  })
}
