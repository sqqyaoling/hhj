// pages/pay/pay.js
var utils = require('../../utils/util.js');
var bmap = require('../../libs/bmap-wx.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opt: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      opt: options
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let opt = this.data.opt
    let data = {
      order_id: opt.order_no,
      open_id: app.globalData.code.data.data.openid
    }
    
    // let data = {
    //   order_id: '6180601145329352614',
    //   open_id: 'oAib60MjFCt-1uBP-RQrxyKo0ofk'
    // }
    utils.http(app.globalData.baseUrl2+'/Home/WXPay/xiao_payment', data, 'POST', function (res) {
      console.log(res)
        wx.requestPayment({
          'timeStamp': res.timeStamp,
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': 'MD5',
          'paySign': res.paySign,
          'success': function (res) {
            let dats = {
              pay_type: 10,
              order_no: data.order_id
            }
            let url = 'https://test.hahajing.com/order/succeed'
            wx.navigateTo({
              url: '/pages/ceshi/ceshi?url=' + url + '&data=' + JSON.stringify(dats)
            })
          },
          'fail': function (res) {
            wx.navigateBack({delta: 1})
          }
        })
 
    }, function () {
      console.log(1)
    })
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