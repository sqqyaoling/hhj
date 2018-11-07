// pages/helpIndex/helpwx1/helpwx1.js
var request = require('../../../utils/request.js');
var app = getApp()
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '',
    userName: '',
    arrInfo: ''
  },
  isLogin() {
    let isLogin = app.globalData.zhuliLoginUser
    let isInfo = app.globalData.zhuliUserInfo
    let arr = this.data.arrInfo
    console.log(isLogin)
    console.log(isInfo)
    if (isLogin) {}
    wx.navigateTo({
      url: isLogin ? '/pages/helpIndex/helpwx3/helpwx3?phone=' + isLogin.phone + '&user_id=' + isLogin.user_id + '&arr=' + JSON.stringify(arr) : '/pages/helpIndex/helpwx2/helpwx2?arr=' + JSON.stringify(arr)
    })
  },
 onLoad: function (options) {
    let that = this
    let data = JSON.parse(options.arr)
    this.data.arrInfo = data
    request.getSoybeanWxUser(data, function(res){
      console.log(res)
      let datas = res.data.data
      if (res.result == 'ok') {
        that.setData({
          imageUrl: datas.avatar,
          userName: datas.nickname,
          arrInfo: utils.deepCopy(that.data.arrInfo, datas)
        })
        console.log(that.data.arrInfo)
      } else {

      }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})