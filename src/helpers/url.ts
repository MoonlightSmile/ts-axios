import { isDate, isObject } from './util'
const encode = (val: string): string =>
  encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')

const computedValue = (value: any, key: string): string => {
  let res = ''
  if (Array.isArray(value)) {
    res = value.map(el => `${key}[]=${el}`).join('&')
  } else if (isDate(value)) {
    res = value.toISOString()
  } else if (isObject(value)) {
    res = JSON.stringify(value)
  } else {
    res = value
  }
  return `${encode(key)}=${encode(res)}`
}

export function bulidURL(url: string, params?: any) {
  if (!params) return url
  const computedParams = Object.keys(params)
    .reduce<string[]>((res, key) => {
      const value = params[key]
      if (value === null || value === undefined) return res
      res.push(computedValue(value, key))
      return res
    }, [])
    .join('&')

  if (computedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.includes('?') ? '&' : '?') + computedParams
  }
  console.log(url)

  return url
}
