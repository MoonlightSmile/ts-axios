import { AxiosRequestConfig } from './types'
export default (config: AxiosRequestConfig): void => {
  const { data = null, method = 'get', url } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
