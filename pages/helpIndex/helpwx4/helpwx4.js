// pages/helpIndex/helpwx4/helpwx4.js
var request = require('../../../utils/request.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0,
    datas: [{}, {}, {}, {}, {}, {}],
    phone: '',
    shareData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let phone = options.phone
    let user_id = options.user_id
    this.setData({
      phone: options.phone
    })
    let datas = app.globalData.zhuliUserInfo
    let self = this
    let arr = {
      id: user_id,
      unionid: datas.unionid
    }
    request.getSoybeanList(arr, function (res) {
      if (res.result == 'ok') {
        let list = res.data.data.list
        let len = list.length
        let ars = []
        if (len == 0) {
          ars = [{}, {}, {}, {}, {}, {}]
        } else if (len < 6) {
          let num = 6 - len
          let newA = list
          for (let i = 0; i < num; i++) {
            newA.push({})
          }
          ars = newA
        } else {
          ars = list
        }
        self.setData({
          datas: ars,
          length: len
        })
      } else {
        wx.showToast({
          title: '请求失败',
        })
      }
    })
    request.getSoybeanId({ id: user_id }, function (res) {
      
      if (res.result == 'ok') {
        let dat = res.data.data
        console.log(dat)
        let ars = {
          title: dat.share_title,
          desc: dat.share_str,
          path: dat.url,
          imageUrl: dat.url
        }
        self.setData({
          shareData: ars
        })
      } else {
        wx.showToast({
          title: '请求失败',
        })
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
    console.log(this.data.shareData)
    return this.data.shareData
  }
})