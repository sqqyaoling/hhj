// pages/planIndex/planIndex.js
var utils = require('../../utils/util.js');
var request = require('../../utils/request.js');
var loaging = require('../../utils/loaging.js');
var app = getApp()
Page({
  data: {
    maskShow: true,
    goTxt: '立即领取',
    userPhone: '',
    useryz: '',
    codeDis: false,
    codeTxt: '获取验证码',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    loginUser: '',
    animationCloudData: '',
    classStyle: 'in',
    classStyle2: 'out'
  },
  closeBindTap () {
    this.setData({ maskShow: true })
  },
  imgClick(e) {
    if (!this.data.userInfo) {
      return false
    }
    if (!this.data.loginUser != {} && !this.data.loginUser) {
      this.setData({ maskShow: false, goTxt: '立即购买' })
      return false
    }
    let goodsid = e.currentTarget.dataset.goodsid
    let locations = app.globalData.location
    let self = this
    if (!locations) {
      app.locations(function (res){
        self.getShopId(res, goodsid)
      }, function(){})
    } else {
      let los = app.globalData.location
      self.getShopId(los, goodsid)
    }
  },
  getShopId(datas, goodsid) {
    let data = {
      lng: datas.location.lng,
      lat: datas.location.lat
    }
    request.getNearVipShopId(data, function (res) {
      if (res.result == 'ok') {
        let shopId = res.data.data.shop_id
        console.log(shopId, goodsid)
        let base3 = utils.setBase64('/Order/book_confirm?shop_id=' + shopId + '&goods_id=' + goodsid + '&goods_count=1&rule_id=84')
        let url = 'https://test.hahajing.com/DouJang/url_jump'
        wx.navigateTo({
          url: '/pages/pageInteractive/pageInteractive?datas=' + base3 + '&url=' + url
        })
      } else {

      }
    })
  },
  onGotUserInfo (e) {
    var usrIn = e.detail.userInfo
    if (usrIn) {
      this.setData({
        userInfo: usrIn
      })
      app.globalData.userInfo = usrIn
      wx.setStorageSync('userInfo', usrIn)
    }
  },
  ReceiveBindTap (e) {
    let self = this
    if (!this.data.userInfo) {
      return false
    }
    if (!this.data.loginUser != {} && !this.data.loginUser) {
      this.setData({ maskShow: false, goTxt: '立即领取' }) 
      return false
    }
    request.doujiang({}, function(res){
      if (res.result == 'ok') {
        wx.navigateTo({
          url: '/pages/planIndex/planSuccess/planSuccess?phone=' + self.data.userPhone,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
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
        utils.countDown_60(function(times){
          if (times > 0) {
            self.setData({
              codeDis: true,
              codeTxt: times +'s后重发'
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
    }, function () {})
  },
  useryzInput: function (e) {
    this.data.useryz = e.detail.value;
  },
  userPhoneInput: function (e) {
    this.data.userPhone = e.detail.value;
  },
  bindButtonTap: function () {
    
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
    let userInfos = app.globalData.userInfo

    let data = {
      openid: appGlo.openid,
      unionid: appGlo.unionid,
      nickname: userInfos.nickName,
      avatar: userInfos.avatarUrl,
      mobile: phone,
      code: self.data.useryz
    }
    request.login(data, function(res){
      if (res.result == 'ok') {
        self.setData({
          maskShow: true,
          loginUser: data
        })
        wx.showToast({
          title: '登陆成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }, null, app)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let self = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    if (app.globalData.loginUser) {
      this.setData({
        loginUser: app.globalData.loginUser
      })
    }
    let location = wx.getStorageSync('location')
    if(!location){
      app.locations(function (originalData){
        app.globalData.location = originalData
      })
    }
  },
  onReady: function () {
    let i = 0;
    let set
    set = setInterval(() => {
      var ins = this.data.classStyle == 'out' ? 'in' : 'out'
      var ins2 = this.data.classStyle == 'in' ? 'out' : 'in'
      this.setData({
        classStyle: ins,
        classStyle2: ins === 'out' ? 'in' : 'out'
      })
      i++
      // if (i > 5) {
      //   clearInterval(set)
      //   return false
      // }
    }, 3000);
  },
  onShow: function () {
    
  }
})