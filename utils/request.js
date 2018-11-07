
var utils = require('./util.js');
var md5s = require('./md5.js')
var url = require('./url.js')

// 正则表达式
const reg  = {
  phone: /^1[3|4|5|7|8]\d{9}$/
}
// 登陆调取接口
const get_login = (data, success, fail, app) => {
  let self = this
  let oldData = {
    eqt_name: 'weixin',
    phone_sn: '123456',
    openid_sign: md5s.md5('It is better to depend on oneself than to others' + data.openid).toLowerCase()
  }
  var Obj = utils.deepCopy(data, oldData)
  utils.http(url.dataUrl.wx_quick_load, Obj, 'POST', (res, resData) => {
      if (res.result == 'ok') {
        Obj.to_ken = resData
        let newObjs = utils.deepCopy(Obj, res.data.data)
        wx.setStorageSync('loginUser', newObjs)
        if (app) {
          app.globalData.loginUser = newObjs
          app.globalData.loginUser.to_ken = resData.header.authorization
          app.globalData.to_ken = resData.header.authorization
        }
        
      }
      success && success(res, resData)
    }, function () {
      fail ? fail() : wx.showToast({title: '数据请求失败，请刷新重试',icon: 'none'})
    })
}
// 领取优惠券接口
const get_doujiang = (data = {}, success, fail) => {
  utils.http(url.dataUrl.doujiang, data, 'POST', function (res) {
    success && success(res)
  }, function () {   
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 获取最近VIP店铺ID接口
const get_getNearVipShopId = (data = {}, success, fail) => {
  utils.http(url.dataUrl.getNearVipShopId, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 查询助力列表和判断是否本人打开 接口
const get_getSoybeanList = (data = {}, success, fail) => {
  utils.http(url.dataUrl.getSoybeanList, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 查询助力列表和判断是否本人打开 接口
const get_getSoybeanWxUser = (data = {}, success, fail) => {
  utils.http(url.dataUrl.getSoybeanWxUser, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 助力券，一次领取一张（有效期7天 接口
const get_zhuli = (data = {}, success, fail) => {
  utils.http(url.dataUrl.zhuli, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 添加助力信息
const get_setSoybeanSata = (data = {}, success, fail) => {
  utils.http(url.dataUrl.setSoybeanSata, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 助力的和被助力的,返回分享信息 接口
const get_getSoybeanId = (data = {}, success, fail) => {
  utils.http(url.dataUrl.getSoybeanId, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}
// 重新支付
const get_payOrderData = (data = {}, success, fail) => {
  utils.http(url.dataUrl.payOrderData, data, 'POST', function (res) {
    success && success(res)
  }, function () {
    fail ? fail() : wx.showToast({ title: '数据请求失败，请刷新重试', icon: 'none' })
  })
}

module.exports = {
  reg: reg,
  sendAuthCode: url.dataUrl.send_auth_code,
  loginUser: url.dataUrl.wx_quick_load,
  login: get_login,
  doujiang: get_doujiang,
  getNearVipShopId: get_getNearVipShopId,
  getSoybeanList: get_getSoybeanList,
  xiaoUserInfo: url.dataUrl.xiao_user_info,
  getSoybeanWxUser: get_getSoybeanWxUser,
  zhuli: get_zhuli,
  setSoybeanSata: get_setSoybeanSata,
  getSoybeanId: get_getSoybeanId,
  payOrderData: get_payOrderData
}



// const send_auth_code = (data, successCallback, errorCallback, errCall) => {
//   utils.http(url.dataUrl.baseUrl + '/customer/public/send_auth_code', data, 'POST', function (res) {
//     if (res.code == 0) {
//       successCallback && successCallback(res)
//     } else {
//       errorCallback && errorCallback(res)
//     }
//   }, function () {   
//     errCall && errCall()
//   })
// }

// let appGlo = app.globalData.code.data.data
// let userInfos = app.globalData.userInfo
// let data = {
//   mobile: phone,
//   code: self.data.useryz,
//   openid: appGlo.openid,
//   unionid: appGlo.unionid,
//   nickname: userInfos.nickName,
//   avatar: userInfos.avatarUrl,
//   eqt_name: 'weixin',
//   phone_sn: '123456',
//   openid_sign: md5s.md5('It is better to depend on oneself than to others' + appGlo.openid).toLowerCase()
// }

// utils.http(url.dataUrl.request.loginUser, data, 'POST', function (res, resData) {
//   app.globalData.loginUser = data
//   app.globalData.loginUser.to_ken = resData.header.authorization
//   wx.setStorage({
//     key: "loginUser",
//     data: data
//   })
//   if (res.result == 'ok') {
//     self.setData({
//       maskShow: true,
//       loginUser: data
//     })
//     wx.showToast({
//       title: '登陆成功',
//       icon: 'none'
//     })
//   } else {
//     wx.showToast({
//       title: res.data.msg,
//       icon: 'none'
//     })
//   }
// }, function () { })