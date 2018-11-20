import moment from 'moment'
// import { Toast } from 'mint-ui'
export const commonUtils = {

  /**
   * 获取url参数
   * @returns {Array}
   */
  getUrlParamsArr() {
    var name, value
    var str = window.location.href
    var num = str.indexOf('?')
    str = str.substr(num + 1)

    var arr = str.split('&')
    var returnData = []
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        returnData[name] = value
      }
    }
    return returnData
  },
  /**
   * 获取search参数
   * @returns {Array}
   */
  getSearchParamsArr() {
    var name, value
    var str = window.location.search
    var num = str.indexOf('?')
    str = str.substr(num + 1)

    var arr = str.split('&')
    var returnData = {}
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        returnData[name] = value
      }
    }
    return returnData
  },

  /**
   * 获取url参数orderNo
   * @returns {Object}
   */
  getUrlParamOrderNo(name) {
    let url = window.location.hash
    return url.substring(url.indexOf('?') + 9, url.length)
  },

  /**
   * 判断空字符串
   * @param str
   * @returns {boolean}
   */
  isEmptyString(str) {
    return str === '' || str === undefined ||
      str === null || str === 'null' || str === '0'
  },

  /**
   * 判断空对象
   * @param obj
   * @returns {boolean}
   */
  isEmptyObject(obj) {
    for (var key in obj) {
      return false
    }

    return true
  },

  /**
   * 判断对象value
   * @param obj
   * @returns {boolean}
   */
  isEmptyObjectValue(obj) {
    for (var key in obj) {
      if (obj[key]) {
        return true
      }
      return false
    }

    return true
  },

  /**
   * 判断是否是移动端
   */
  isMobile () {
    var u = navigator.userAgent
    return !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('QIHU') > -1 && u.indexOf('Chrome') < 0
  },
  /**
   * textarea自适应伸缩
   * @param elem
   * @param extra
   * @param maxHeight
   */
  autoTextarea (elem, extra, maxHeight) {
    // 判断elem是否为数组
    if (elem.length > 0) {
      for (var i = 0; i < elem.length; i++) {
        e(elem[i])
      }
    } else {
      e(elem)
    }

    function e(elem) {
      extra = extra || 0
      var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window
      var isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
      var addEvent = function (type, callback) {
        elem.addEventListener ? elem.addEventListener(type, callback, false) : elem.attachEvent('on' + type, callback)
      }
      var getStyle = elem.currentStyle ? function (name) {
        var val = elem.currentStyle[name]
        if (name === 'height' && val.search(/px/i) !== 1) {
          var rect = elem.getBoundingClientRect()
          return rect.bottom - rect.top -
            parseFloat(getStyle('paddingTop')) -
            parseFloat(getStyle('paddingBottom')) + 'px'
        }

        return val
      } : function (name) {
        return getComputedStyle(elem, null)[name]
      }
      var minHeight = parseFloat(getStyle('height'))

      elem.style.resize = 'none'

      var scrollTop
      var height
      var padding = 0
      var style = elem.style
      var change = function () {
        if (elem._length === elem.value.length) return
        elem._length = elem.value.length

        if (!isFirefox && !isOpera) {
          padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'))
        }
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop

        elem.style.height = minHeight + 'px'
        if (elem.scrollHeight > minHeight) {
          if (maxHeight && elem.scrollHeight > maxHeight) {
            height = maxHeight - padding
            style.overflowY = 'auto'
          } else {
            height = elem.scrollHeight - padding
            style.overflowY = 'hidden'
          }
          style.height = height + extra + 'px'
          scrollTop += parseInt(style.height) - elem.currHeight
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          elem.currHeight = parseInt(style.height)
        }
      }

      addEvent('propertychange', change)
      addEvent('input', change)
      addEvent('focus', change)
      change()
    }
  },
  /**
   * ocr注册日期处理
   * @param registerDate
   * @returns {string}
   */
  registerDateHandle (registerDate) {
    let returnDate = ''
    if (registerDate.length > 8) {
      returnDate = registerDate.substring(0, 8)
    } else if (registerDate.length < 8) {
      let addStr = ''
      for (let i = 0; i < (8 - registerDate.length); i++) {
        addStr += +0
      }
      returnDate = registerDate + addStr
    } else {
      returnDate = registerDate
    }
    let arr = returnDate.split('')
    arr.splice(4, 0, '-')
    arr.splice(7, 0, '-')
    let str = arr.join('')
    return str
  },
  /**
   * 输出中英文字符串长度
   * @param str
   * @returns {number}
   */
  getStrLength(str) {
    let len = 0
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2
      } else {
        len++
      }
    }
    return len
  },
  /**
   * 时间差，格式：xxxx-xx-xx
   * @param startDate
   * @param endDate
   * @returns {number}
   */
  diffDateTime(startDate, endDate) {
    return moment(startDate).diff(moment(endDate), 'days', true)
  },
  /**
   * 数组对象去重
   * @param array
   */
  arrayObjUnique(array) {
    let hash = {}
    array = array.reduce(function(item, next) {
      hash[next.name] ? '' : hash[next.name] = true && item.push(next)
      return item
    }, [])
    return array
  },
  /**
   * 原生时间差，格式：xxxx-xx-xx
   * @param d1
   * @param d2
   * @returns {*}
   * @constructor
   */
  DateDiff(d1, d2) {
    var day = 24 * 60 * 60 * 1000
    try {
      var dateArr = d1.split('-')
      var checkDate = new Date()
      checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2])
      var checkTime = checkDate.getTime()
      var dateArr2 = d2.split('-')
      var checkDate2 = new Date()
      checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2])
      var checkTime2 = checkDate2.getTime()
      var cha = (checkTime - checkTime2) / day
      return cha
    } catch (e) {
      return false
    }
  },

  /**
   * 姓名管控
   */
  // idNameRegVerify(cityCode, name) {
  //   const provinceCode = cityCode.replace(/(\d{1,2})(\d+)/g, '$10000')
  //   const maxLenReg = new RegExp('(^[\u4E00-\u9FA5·]{16,}$)|(^[a-zA-Z]{31,}$)')
  //   const minLenReg = new RegExp('(^[\u4E00-\u9FA5·]{0,1}$)|(^[a-zA-Z]{0,3}$)')
  //   const reg = new RegExp('(^[\u4E00-\u9FA5·]{1,}$)|(^[a-zA-Z]{1,}$)')
  //   if (!reg.test(name)) {
  //     Toast(`姓名不允许录入特殊字符`)
  //     return false
  //   } else {
  //     if (maxLenReg.test(name)) {
  //       Toast(`姓名最长15个汉字，30个英文`)
  //       return false
  //     }
  //     if (minLenReg.test(name)) {
  //       Toast(`姓名最短2个汉字，4个英文`)
  //       return false
  //     }
  //   }
  //   // 4、北京
  //   const bjReg = new RegExp('(出租)|(租赁)')
  //   if (provinceCode === '110000' && bjReg.test(name)) {
  //     Toast('北京地区姓名不允许包含“出租”、“租赁”字样')
  //     return false
  //   }
  //   // 5、云南
  //   const ynReg = new RegExp('([^\u4e00-\u9fa5·])', 'g')
  //   if (provinceCode === '530000' && ynReg.test(name)) {
  //     Toast('云南地区姓名仅允许录入汉字')
  //     return false
  //   }
  //   // 6、新疆
  //   // const xjReg = new RegExp('([a-zA-Z\\d.])', 'g')
  //   const xjReg = new RegExp('([^\u4e00-\u9fa5·])', 'g')
  //   if (provinceCode === '650000' && xjReg.test(name)) {
  //     Toast('新疆地区姓名仅允许录入汉字')
  //     return false
  //   }

  //   return true
  // },

  /**
   * 组织机构代码验证
   * @param value
   * @returns {boolean}
   */
  orgCodeValidate(value) {
    if (value) {
      var reg = /^([0-9A-Z]){9}$/
      console.log(reg.test(value))
      if (!reg.test(value)) {
        return false
      }
    }
  },

  /**
   * 统一社会信用代码校验
   * @param value
   * @returns {boolean}
   */
  socialCreditCodeValidate(value) {
    if (value) {
      var reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g
      return reg.test(value)
    }
  },

  /**
   * iphone 11 手机号正则过滤
   * @param mobile
   * @returns {*}
   */
  iphoneMobileCopyFilter (mobile) {
    let specialCodeStart = decodeURIComponent('%E2%80%AD')
    let specialCodeEnd = decodeURIComponent('%E2%80%AC')
    let regStr = `^${specialCodeStart}(\\d{11})${specialCodeEnd}$`
    let codeReg = new RegExp(regStr)
    return mobile.replace(codeReg, '$1')
  }
}
