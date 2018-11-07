// pages/helpIndex/helpwx2/helpwx2.js
var utils = require('../../../utils/util.js');
var request = require('../../../utils/request.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    useryz: '',
    imageUrl: '',
    userName: '',
    arrInfo: '',
    userInfo: '',
    codeDis: false,
    codeTxt: '获取验证码'
  },
  onGotUserInfo(e) {
    var usrIn = e.detail.userInfo
    console.log(usrIn)
    if (usrIn) {
      this.setData({
        userInfo: usrIn
      })
      app.globalData.userInfo = usrIn
      wx.setStorageSync('userInfo', usrIn)
      console.log(app.globalData.userInfo)
    }
  },
  bindButtonGet: function () {
    // 点击获取验证码
    let reg = request.reg.phone
    let phone = this.data.userPhone
    let self = this
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false;
    }
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return false;
    }
    utils.http(request.sendAuthCode, { mobile: phone, type_id: 3 }, 'POST', function (res) {
      if (res.result == 'ok') {
        wx.showToast({
          title: '验证码已发送',
          icon: 'none'
        })
        utils.countDown_60(function (times) {
          if (times > 0) {
            self.setData({
              codeDis: true,
              codeTxt: times + 's后重发'
            })
          } else {
            self.setData({
              codeDis: false,
              codeTxt: '获取验证码'
            })
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }, function () { })
  },
  useryzInput: function (e) {
    this.data.useryz = e.detail.value;
  },
  userPhoneInput: function (e) {
    this.data.userPhone = e.detail.value;
  },
  bindButtonTap: function () {
    if (!this.data.userInfo) {
      return false
    }
    let reg = request.reg.phone
    let phone = this.data.userPhone
    let self = this
    if (!this.data.userPhone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false;
    }
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return false;
    }
    if (!this.data.useryz) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return false
    }
    let appGlo = app.globalData.code.data.data
    let appGloUserInfo = app.globalData.userInfo
    console.log(appGloUserInfo)
    let arr = this.data.arrInfo
    let data = {
      openid: appGlo.openid,
      unionid: appGlo.unionid,
      nickname: appGloUserInfo.nickName,
      avatar: appGloUserInfo.avatarUrl,
      mobile: phone,
      code: self.data.useryz
    }
    // 用户登录
    request.login(data, function (res) {
      if (res.result == 'ok') {
        // 登录成功 保存用户信息
        console.log(res)
        let das = res.data.data
        
        let newAr = das
        newAr.phone = phone
        app.globalData.zhuliLoginUser = newAr
        wx.setStorageSync('zhuliLoginUser', newAr)
        wx.redirectTo({
          url: '/pages/helpIndex/helpwx3/helpwx3?phone=' + self.data.userPhone + '&user_id=' + das.user_id + '&arr=' + JSON.stringify(arr),
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        // wx.redirectTo({
        //   url: '/pages/helpIndex/helpwx3/helpwx3?phone=' + self.data.userPhone + '&user_id=' + das.user_id,
        // })
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    this.data.arrInfo = JSON.parse(options.arr)
    console.log(this.data.arrInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})