// pages/helpActivity/helpActivity.js
var utils = require('../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },
  bindGetMsg(e) {
    console.log(e.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = options.url
    console.log(url)
    let go = app.globalData
    var newData = {
      x: go.location.location.lng,
      y: go.location.location.lat,
      district: go.location.formatted_address,
      city_id: go.location.cityCode
    }
    var newData2 = {
      to_ken: go.to_ken,
      user_id: go.loginUser.user_id,
      user_avatar: go.loginUser.user_avatar,
      mobile: go.loginUser.mobile
    }
    var newData4 = {
      openid: go.loginUser.openid,
      unionid: go.loginUser.unionid,
      nickname: go.loginUser.nickname,
      avatar: go.loginUser.avatar
    }
    let base1 = utils.setBase64(newData)
    let base2 = utils.setBase64(newData2)
    let base4 = utils.setBase64(newData4)
    let base3 = options.datas
    let CurUrl = url + '?xyc=' + base1 + '&user_data=' + base2 + '&url=' + base3 + '&wx_data=' + base4
    this.setData({
      url: CurUrl
    })
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

  }
})