import axios from 'axios'
import { isAxios } from '@/api-client/api-client.utils'

describe('api client utility methods', () => {
  test('correctly guess that an object is an instanceof Axios', () => {
    const instance = axios.create({})
    const emptyObj = {}

    expect(isAxios(instance)).toBeTruthy()
    expect(isAxios(emptyObj)).not.toBeTruthy()
  })
})
