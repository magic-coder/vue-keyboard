import axios from 'axios'
import {router} from '@/router'
import baseURL from '@/common/config/host'
import {commonUtils} from '@/common/libs/common'
import moment from 'moment'
import _ from 'lodash'
import store from '@/store'

// create an axios instance
const http = axios.create({
  baseURL: baseURL, // api的base_url
  withCredentials: true,
  timeout: 1000 * 60 * 30 // request timeout
})

http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求前预处理
http.interceptors.request.use(config => {
  let localTransactionNo = router.currentRoute.query.ltsNo || store.state.common.ltsNo
  let token = commonUtils.getSearchParamsArr()['token'] || void 0
  let timeStamp = moment().format('YYYY-MM-DD HH:mm:ss')
  
  config.data = config.data || {}

  let head = _.defaultsDeep(config.data._head, {
        platform: 'ABX',
        timeStamp,
        localTransactionNo,
        token: token,
        systemId: 'S10000025'
      })
    
  delete config.data._head

  config.data = {
    head: head,
    body: config.data
  }

  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone interceptor
http.interceptors.response.use(
  response => {
    if (response['status'] === 200) { // 请求响应成功
      let data = response['data']

      // 对响应数组做点什么
      if (response.config.url.indexOf('/checkToken') === -1 && ( ~['7999', '8001'].indexOf(data.head.errorCode) )) {
        router.push({path: '/login'})
      }

      if(data.head.localTransactionNo){
        store.commit('common/setLtsNo', data.head.localTransactionNo)
      }
      return data
    } else {
      return response
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
