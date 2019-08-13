import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { bulidURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

export default axios
