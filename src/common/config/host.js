/* eslint-disable */

let baseURL

const host = window.location.host

// 本地环境
if (/(127.0.0.1|localhost|192.168.)/.test(host)) {

  baseURL = 'http://test.aibaoxian.com:8929'
} else if (/(liangxing)/.test(host)) {
  baseURL = 'http://test.aibaoxian.com:8929'
// 测试环境
} else if (/(houchaowei)/.test(host)) {
  baseURL = 'http://test.aibaoxian.com:8929'
// 测试环境
} else if (/test.aibaoxian.com/.test(host)) {

  baseURL = 'http://test.aibaoxian.com:8929'

// 生产环境
} else {

  baseURL = ''

}

export default baseURL
