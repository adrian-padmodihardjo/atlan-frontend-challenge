/**
 * A simple check whether an object is instanceof Axios
 * @returns {boolean}
 */
export function isAxios (obj) {
  return !!obj
    && 'defaults' in obj
    && 'interceptors' in obj
}
