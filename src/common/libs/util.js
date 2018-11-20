/**
 * 时间格式
 **/
import moment from 'moment'
import { router } from '@/router'

import { cityInfos } from '@/common/libs/json_regions'
// import { commonUtils } from './common'
import { constants } from '@/common/libs/constants'

export const formatTime = function (d) {
  return moment(d).format('YYYY-MM-DD')
}
export const formatTimeMin = function (d) {
  return moment(new Date(d)).format('YYYY-MM-DD HH:MM')
}

/* 正则验证 */
export const regTest = {
  // 手机号
  // phoneReg: /^1[34578]\d{9}$/,
  phoneReg: /^1\d{10}$/,
  // 身份证号验证
  IdentityCodeValid(code) {
    var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    // var tip = ''
    var pass = true
    var idNum = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/ // 15位身份证
    if (idNum.test(code) && code.length === 15) { // 15校验
      pass = true
    } else {
      if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) { // 18校验
        // tip = '身份证号格式错误'
        pass = false
      } else if (!city[code.substr(0, 2)]) {
        // tip = '地址编码错误'
        pass = false
      } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
          code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
          var sum = 0
          var ai = 0
          var wi = 0
          for (var i = 0; i < 17; i++) {
            ai = code[i]
            wi = factor[i]
            sum += ai * wi
          }
          if (!isNaN(parseInt(code[17]))) {
            code[17] = parseInt(code[17])
          } else {
            code[17] = code[17]
          }
          if (parity[sum % 11] !== code[17]) {
            // tip = '校验位错误'
            pass = false
          }
        }
      }
    }
    return pass
  },
  // 车牌号
  // licenseNoReg: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  // licenseNoReg: /^(([\u4e00-\u9fa5]{1}[A-Z]{1})[-]?|([wW][Jj][\u4e00-\u9fa5]{1}[-]?)|([a-zA-Z]{2}))([A-Za-z0-9]{4}|[DdFf][A-HJ-NP-Za-hj-np-z0-9][0-9]{4}|[0-9]{5}[DdFf])$/,
  licenseNoReg: /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{7}$)/,
  // 发票号码
  invoiceNoReg: /^\d{8}$/,
  // 姓名
  idNameReg: /(^[\u4E00-\u9FA5.]{2,5}$)|(^[a-zA-Z.]{2,10}$)/,
  specialIdNameReg: /(^[\u4E00-\u9FA5·]{2,14}[\u4E00-\u9FA5]{2}$)/,
  addressName: /^[\u4E00-\u9FA5.]{2,15}$/,
  firstBeneficiaryName: /^.{1,50}$/,
  // 密码
  passwordReg: /^[0-9A-Za-z_]{6,20}$/,
  emailReg: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,}){1,})$/,
  numAndLetter: /^[a-zA-Z0-9]{6,20}$/,
  frameNoLetter: /^[a-zA-Z0-9]{17}$/,
  frameNoReg: function (val) {
    var Arr = []
    var Brr = []
    Arr['A'] = 1
    Arr['B'] = 2
    Arr['C'] = 3
    Arr['D'] = 4
    Arr['E'] = 5
    Arr['F'] = 6
    Arr['G'] = 7
    Arr['H'] = 8
    Arr['J'] = 1
    Arr['K'] = 2
    Arr['L'] = 3
    Arr['M'] = 4
    Arr['N'] = 5
    Arr['P'] = 7
    Arr['R'] = 9
    Arr['S'] = 2
    Arr['T'] = 3
    Arr['U'] = 4
    Arr['V'] = 5
    Arr['W'] = 6
    Arr['X'] = 7
    Arr['Y'] = 8
    Arr['Z'] = 9
    Arr['1'] = 1
    Arr['2'] = 2
    Arr['3'] = 3
    Arr['4'] = 4
    Arr['5'] = 5
    Arr['6'] = 6
    Arr['7'] = 7
    Arr['8'] = 8
    Arr['9'] = 9
    Arr['0'] = 0
    Brr[1] = 8
    Brr[2] = 7
    Brr[3] = 6
    Brr[4] = 5
    Brr[5] = 4
    Brr[6] = 3
    Brr[7] = 2
    Brr[8] = 10
    Brr[9] = 0
    Brr[10] = 9
    Brr[11] = 8
    Brr[12] = 7
    Brr[13] = 6
    Brr[14] = 5
    Brr[15] = 4
    Brr[16] = 3
    Brr[17] = 2
    function getCheckCode(sVIN) {
      var sKYZF = 'ABCDEFGHJKLMNPRSTUVWXYZ1234567890'
      var sJYW = ''
      var bl = false
      var blKYZF = false
      if (sVIN.length === 17) {
        var iJQS = 0
        var intTemp = 0
        var ht = Arr
        var htZM = Brr
        try {
          for (var i = 0; i < sVIN.length; i++) {
            if (sKYZF.indexOf(sVIN.substr(i, 1)) !== -1) {
              blKYZF = true
              iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)])
            } else {
              blKYZF = false
              break
            }
          }
          if (blKYZF) {
            intTemp = iJQS % 11
            if (intTemp === 10) {
              sJYW = 'X'
            } else {
              sJYW = intTemp.toString()
            }
            if (sJYW === sVIN.substr(8, 1)) bl = true
          } else {
            bl = false
          }
        } catch (err) {
          bl = false
        }
      }
      return bl
    }
    return getCheckCode(val)
  }
}

// 自定义指令
export const directives = {
  dBlur: function (el, bind) {
    let oInput = el.querySelector('input')
    oInput.onblur = function () {
      let vm = bind.value().vueexample
      let state = bind.value().vuekey
      let reg = bind.value().reg
      let val = bind.value().val
      if (!val) {
        vm[state] = ''
        return
      }
      if (typeof (reg) === 'function') {
        if (!reg(val)) {
          vm[state] = 'error'
        } else {
          vm[state] = 'success'
        }
      } else {
        if (!reg.test(val)) {
          vm[state] = 'error'
        } else {
          vm[state] = 'success'
        }
      }
    }
  },
  dChange: function (el, bind) {
    let vue = bind.value().vueexample
    let key = bind.value().vuekey
    let val = bind.value().val
    if (!val) {
      vue[key] = ''
    }
  },
  dBlurFun: function (el, bind) {
    let fun = bind.value().fun
    let oInput = el.querySelector('input') || el.querySelector('textarea')
    oInput.onblur = function () {
      fun()
    }
  },
  dFocusFun: function (el, bind) {
    let fun = bind.value().fun
    let oInput = el.querySelector('input')
    oInput.onfocus = function () {
      // iphonex bug
      let mbDistance = `${document.getElementById('app').clientHeight - 386}px`
      window.document.body.style.marginBottom = mbDistance
      fun()
    }
    oInput.onblur = function () {
      document.body.style.marginBottom = `0`
    }
  },
  focus: function (el, binding) {
    if (binding.value) {
      el.focus()
    }
  },
  dPasteFun: function (el, bind) { // input复制事件
    let fun = bind.value().fun
    let oInput = el.querySelector('input')
    oInput.onpaste = function () {
      fun()
    }
  },
  mintuiFocus: function (el, pra, a) {
    // let oInput = el.querySelector('input')
    // console.log('oInput', oInput)
    if (isIPhoneX()) {
      document.body.style.marginBottom = `0`
    }
    // oInput.onfocus = function() {
    //   // 创建focus的事件
    //   let mbDistance = `${document.getElementById('app').clientHeight - 386}px`
    //   window.document.body.style.marginBottom = mbDistance
    // }
    //
    // oInput.onblur = function() {
    //   // 创建blur的事件
    //   document.body.style.marginBottom = `0`
    // }
  }
}
function isIPhoneX() {
  var u = navigator.userAgent
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isIOS) {
    if (screen.height === 812 && screen.width === 375) {
      return true
    } else {
      return false
    }
  }
}
/**
 * 解析url参数
 * @example ?id=12345&name=abc
 * @return Object {id:12345,name:abc}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&name=abc']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
export function cityInfoByCode(cityCode) {
  if (cityCode === '' || cityCode === null || cityCode.length < 3) {
    cityCode = '110100'
  }
  let i = 0;
  let order = {
    provinceName: '',
    cityName: '',
    cityCode: '',
    licenseNo: '',
  };
  let DGCReg = /(.{2}).{4}/
    , DGCRArr = [
    '110000', '120000', '310000', '500000'
  ] // directly governed city region (Beijing, Tianjin, Shanghai, and Chongqing)
  for (i = 0; i < cityInfos.length; i++) {
    var cityInfo = cityInfos[i]
    if (cityInfo.regionId.substr(0, 2) === cityCode.substr(0, 2)) {
      var j = 0

      for (j = 0; j < cityInfo.children.length; j++) {
        var children = cityInfo.children[j]

        let res = _.find(children.children, function (o) {
          return o.regionId === cityCode
        })

        if (children.regionId.substr(0, 6) === cityCode.substr(0, 6)) {
          order.provinceName = cityInfo.name
          order.provinceCode = cityInfo.regionId
          order.cityName = children.name
          order.cityCode = children.regionId
          order.townList = children.children
          order.proAndCityName = children.name
          if (!~DGCRArr.indexOf(cityCode.replace(DGCReg, '$10000'))) {
            order.proAndCityName = cityInfo.name + ' ' + children.name
          }
          if (order.licenseNo === '' || order.licenseNo.length < 4) {
            order.licenseNoShort = children.pre
          }
          break
        } else if (res) {
            order.provinceName = cityInfo.name
            order.provinceCode = cityInfo.regionId
            order.cityName = children.name
            order.cityCode = children.regionId
            order.townList = children.children
            order.proAndCityName = children.name
            if (!~DGCRArr.indexOf(cityCode.replace(DGCReg, '$10000'))) {
              order.proAndCityName = cityInfo.name + ' ' + children.name
            }
            if (order.licenseNo === '' || order.licenseNo.length < 4) {
              order.licenseNoShort = children.pre
            }
          break
        }
      }
      break
    }
  }
  return order
}
export function getCityByCityCode (order, cityCode) {
  console.log(order, cityCode)
  if (cityCode === '' || cityCode === null || cityCode.length < 3) {
    cityCode = '110100'
  }
  var i = 0
  for (i = 0; i < cityInfos.length; i++) {
    var cityInfo = cityInfos[i]
    if (cityInfo.regionId.substr(0, 2) === cityCode.substr(0, 2)) {
      var j = 0
      for (j = 0; j < cityInfo.children.length; j++) {
        var children = cityInfo.children[j]
        if (children.regionId.substr(0, 6) === cityCode.substr(0, 6)) {
          order.provinceName = cityInfo.name
          order.cityName = children.name
          order.cityCode = children.regionId
          if (order.licenseNo === '' || order.licenseNo.length < 4) {
            order.licenseNo = children.pre
          }
          break
        }
      }
      break
    }
  }
}
export function getLicensePlateByCityCode(cityCode) {
  if (!cityCode) return
  var i = 0
  var pre
  for (i = 0; i < cityInfos.length; i++) {
    var cityInfo = cityInfos[i]
    if (cityInfo.regionId.substr(0, 2) === cityCode.substr(0, 2)) {
      var j = 0
      for (j = 0; j < cityInfo.children.length; j++) {
        var children = cityInfo.children[j]
        if (children.regionId === cityCode) {
          pre = children.pre
          break
        }
      }
      break
    }
  }
  return pre
}

function formatCurrency(num) {
  num = num.toString().replace(/\$| ,/g, '')
  if (isNaN(num)) {
    num = '0'
  }
  num = Math.floor(num * 100 + 0.50000000001)
  var cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  return num + '.' + cents
}

// 自定义filter
import _ from 'lodash'
export const filters = {
  numShow: function (val) {
    if (val !== null && val !== '') {
      return val > 9999 ? (val / 10000).toFixed(1) + '万' : val
    }
  },
  getContent: function (val) {
    if (val !== null) {
      if (val.data != null) {
        var dataArr = val.data.split(';')
        var data = []
        dataArr.forEach((item) => {
          let obj = {}
          let tempArr = item.split(':')
          let val1 = tempArr[0]
          let val2 = tempArr[1]
          obj['id'] = val2
          obj['label'] = val1
          data.push(obj)
        })
        // var isInclude = _.find(data, ['id', val.amount])
        // if (isInclude) {
        //   return _.result(isInclude, 'label')
        // } else {
        //   return val.amount
        // }
        return _.result(_.find(data, ['id', val.amount]), 'label') || val.amount
      } else {
        return ''
      }
    } else {
      return ''
    }
  },
  currency: function (val) {
    if (val === '0' || val === 0 || val === '') {
      return '0'
    } else {
      return formatCurrency(val)
    }
  },
  idNumberFormat: function (val) {
    if (val !== null && val !== '') {
      var diff = val.substr(6, 1)
      if (diff === '1' || diff === '2') {
        return val.replace(/\s/g, '').replace(/(^\d{6})(?=\d)/g, '$1 ').replace(/(\d{8})(?=\d)/g, '$1 ')
      } else {
        return val.replace(/\s/g, '').replace(/(^\d{6})(?=\d)/g, '$1 ').replace(/(\d{6})(?=\d)/g, '$1 ')
      }
    }
  },
  mobilePhoneNumberFormat: function (val) {
    if (val !== null && val !== '') {
      return val.replace(/\s/g, '').replace(/(^\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  spliceStringLen(val, len = 8) {
    if (!!val) {
      let reg = new RegExp("(.{" + len + "}).*")
      return val.replace(reg, '$1...')
    }
  },
  addNewCarSign(val, licenseNoFlag) {
    if (licenseNoFlag === '1') {
      return `${val}***`
    } else {
      return val
    }
  }
}
export function upMyKeybord(className, idName, flag, num, top = 5.32) { // 模拟键盘弹起页面
  let classNames = document.getElementsByClassName(className)
  let personInfo = document.getElementById(idName)
  let clickFun = () => {
    if (flag) {
      personInfo.style.marginTop = -1 * top + num + 'rem'
    } else {
      personInfo.style.marginTop = '0'
    }
  }
  for (let i = 0; i < classNames.length; i++) {
    classNames[i].onclick = clickFun()
  }
}

export function frameNoHandle(frameNo) { // 车架号加隔断
  let str = frameNo.replace(/\s+/g, '')
  let arr = str.split('')
  let len = arr.length
  let time = 0

  for (let i = 0; i < len; i++) {
    let num = i + 1
    if (num % 4 === 0) {
      arr.splice(num + time, 0, ' ')
      time += 1
    }
  }

  return arr.join('')
}

export function idNoHandle(idNo) { // 身份证加隔断
  if (idNo.indexOf(' ') === -1) {
    let diff = idNo.substr(6, 1)
    if (diff === '1' || diff === '2') {
      return idNo.replace(/\s/g, '').replace(/(^\d{6})(?=\d)/g, '$1 ').replace(/(\d{8})(?=\d)/g, '$1 ')
    } else {
      return idNo.replace(/\s/g, '').replace(/(^\d{6})(?=\d)/g, '$1 ').replace(/(\d{6})(?=\d)/g, '$1 ')
    }
  } else {
    return idNo
  }
}
export function mobileNoHandle(mobileNo) { // 手机号加隔断
  if (mobileNo.indexOf(' ') === -1) {
    return mobileNo.replace(/\s/g, '').replace(/(^\d{3})(?=\d)/g, '$1 ').replace(/(\d{4})(?=\d)/g, '$1 ')
  } else {
    return mobileNo
  }
}

export const cityTools = {
  getProvince() {
    return cityInfos
  },
  getProvinceByName(provinceName) {
    return this.getProvince().filter(item => item.name === provinceName)[0]
  },
  getCityByName(provinceName, cityName) {
    return this.getProvinceByName(provinceName).children.filter(item => item.name === cityName)[0]
  },
  getTownByName(provinceName, cityName, townName) {
    return this.getCityByName(provinceName, cityName).children.filter(item => item.name === townName)[0]
  },
  getCityByCode(cityCode) {
    let city
    this.getProvince().forEach(province => {
      let res = province.children.filter(city => city.regionId === cityCode).pop()

      if (res) {
        city = res
        return false
      }
    })
    city = city || {}
    return city.name || ''
  },
}

export const FixedScroll = {
  open() {
    this.Y = window.window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${this.Y}px`
    document.body.style.right = '0'
    document.body.style.bottom = '0'
    document.body.style.left = '0'
  },
  close() {
    document.body.style.position = 'static'
    setTimeout(t => {
      window.scrollTo(0, this.Y)
    }, 40)
  }
}

// message config
export const messageObj = {
  top: constants.top,
  duration: constants.duration,
  maxCount: constants.maxCount
}

export function getVueQueryByName(name) {
  return router.currentRoute.query[name]
}


export const mobileCutOff = function (value) {
  value = value.replace(/\s/g, '')
  let len = value.length
  let finalValue = ''

  if (len <= 3) {
    return value
  } else if (len > 3 && len <= 7) {
    finalValue = value.replace(/^(\d{3})(\d{1,4})$/, '$1 $2')
  } else if (len > 7 && len <= 11) {
    finalValue = value.replace(/^(\d{3})(\d{4})(\d{1,4})$/, '$1 $2 $3')
  } else if (len > 11) {
    finalValue = value.replace(/^(\d{3})(\d{4})(\d{4})(.{1,)$/, '$1 $2 $3')
  }
  return finalValue
}

// 姓名管控
export function idNameRegVerify(cityCode, name, specialControl = false) {

  const provinceCode = cityCode.replace(/(\d{1,2})(\d+)/g, '$10000')
  const maxLenReg = new RegExp('(^[\u4E00-\u9FA5·]{16,}$)|(^[a-zA-Z]{31,}$)')
  const minLenReg = new RegExp('(^[\u4E00-\u9FA5·]{0,1}$)|(^[a-zA-Z]{0,3}$)')
  const reg = new RegExp('(^[\u4E00-\u9FA5·]{1,}$)|(^[a-zA-Z]{1,}$)')

  if (!reg.test(name)) {
    return `姓名不允许录入特殊字符`
  } else {
    if (maxLenReg.test(name)) {
      return `姓名最长15个汉字，30个英文`
    }
    if (minLenReg.test(name)) {
      return `姓名最短2个汉字，4个英文`
    }
  }

  if (specialControl) {
    return false;
  }

  // 4、北京
  const bjReg = new RegExp('(出租)|(租赁)')
  if (provinceCode === '110000' && bjReg.test(name)) {
    return '北京地区姓名不允许包含“出租”、“租赁”字样'
  }
  // 5、云南
  const ynReg = new RegExp('([^\u4e00-\u9fa5])', 'g')
  if (provinceCode === '530000' && ynReg.test(name)) {
    return '云南地区姓名仅允许录入汉字'
  }
  // 6、新疆
  // const xjReg = new RegExp('([a-zA-Z\\d.])', 'g')
  const xjReg = new RegExp('([^\u4e00-\u9fa5·])', 'g')
  if (provinceCode === '650000' && xjReg.test(name)) {
    return '新疆地区姓名仅允许录入汉字'
  }
  return false
}

export const DB = {
  LS: {
    set(key, value) {
      try {
        return localStorage.setItem(key, JSON.stringify(value))
      } catch (err) {
        return null
      }
    },
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch (err) {
        return null
      }
    }
  },
  SS: {
    set(key, value) {
      try {
        return sessionStorage.setItem(key, JSON.stringify(value))
      } catch (err) {
        return null
      }
    },
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key))
      } catch (err) {
        return null
      }
    },
    remove(key) {
      try {
        return sessionStorage.removeItem(key)
      } catch (err) {
        return null
      }
    }
  }
}

export function inputOcclusionKeyboard(el) { // 唤起键盘解决input被遮挡问题(Android)
  let inputs = document.getElementsByTagName(el)
  console.log(1212)
  for (let i = 0, j = inputs.length; i < j; i++) {
    inputs[i].addEventListener('focus', function () {
      let inp = this
      // inp.scrollIntoView(true)
      window.onresize = function () {
        console.log(11)
        inp.scrollIntoView(false)
        let inpPos = inp.getBoundingClientRect()
        if (inpPos.bottom > innerHeight) {
          inp.scrollIntoView(false)
        } else {
          // inp.scrollIntoView()
        }
      }
    }, false)
  }
  // let timer
  // let bfscrolltop = document.body.scrollTop
  // for (let index = 0; index < inputs.length; index++) {
  //   inputs[index].index = index
  //   inputs[index].onfocus = function () {
  //     timer = setInterval(function () {
  //       document.body.scrollTop = document.body.scrollHeight
  //     }, 100)
  //     inputs[index].scrollIntoView()
  //     inputs[index].scrollIntoViewIfNeeded()
  //   }
  //   inputs[index].onblur = function () {
  //     clearInterval(timer)
  //     document.body.scrollTop = bfscrolltop
  //   }
  // }
}

export const browser = {
  versions: (function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0, // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1,  // 是否iPad
      webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
    }
  })()
}
