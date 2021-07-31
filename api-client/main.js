import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { isAxios } from './api-client.utils'

export const defaultInstance = axios.create({
  // intentionally empty
})

/**
 * Perform network request using axios
 * @param {import('axios').AxiosRequestConfig} config
 * @returns
 */
export function request (config) {
  const self = this
  if (self instanceof MockAdapter) {
    return self.axiosInstance(config)
  }
  if (isAxios(self)) {
    return self(config)
  }

  return defaultInstance(config)
}
