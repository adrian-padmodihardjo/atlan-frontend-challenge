import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { request, defaultInstance } from '@/api-client/main'

describe('API Client', () => {
  describe('request() method correctly pick which instance to use', () => {
    test('use mocked instance', (done) => {
      const response = Symbol('response')
      const mock = new MockAdapter(axios.create({}))
      mock.onAny().reply(200, response)

      request.call(mock, '/abcde')
        .then((res) => {
          expect(res.data).toBe(response)
          done()
        })
        .catch(done)
    })
    test('use provided axios instance within arguments', (done) => {
      const headerKey = 'x-unit-test'
      const instance = axios.create({
        headers: {
          [headerKey]: true,
        },
      })
      const mock = new MockAdapter(instance)
      mock.onAny().networkErrorOnce()
      request.call(instance, '/abcde')
        .then(done)
        .catch((e) => {
          expect(e.config?.headers || {}).toEqual(
            expect.objectContaining({
              [headerKey]: expect.any(Boolean),
            }),
          )
          done()
        })
    })

    test('use default axios instance', (done) => {
      const response = Symbol('response')
      const mock = new MockAdapter(defaultInstance)
      mock.onAny().reply(200, response)
      request('/abcde')
        .then((res) => {
          expect(res.data).toBe(response)
          done()
        })
        .catch(done)
    })
  })
})
