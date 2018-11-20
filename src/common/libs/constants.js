export const constants = {
  // message config
  duration: 2, // 默认自动关闭延时，单位秒
  top: '200px', // message消息距离顶部的位置
  maxCount: 3, // 最大显示数, 超过限制时，最早的消息会被自动关闭
  // login
  channelCodeLength: '', // 渠道编码长度
  passwordLength: 6, // 密码长度
  cookieExpires: 30, // 天
  // res
  responseSuccessCode: '0000', // 请求成功code
  autoTextareaContentLength: 200, // 我要合作字数限制
  firstShowAddressListLength: 5, // 提交订单页配送地址的默认显示次数

  defaultStartDate: new Date('2018', '0', '01'),
}
