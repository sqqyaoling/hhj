// pages/helpIndexs/helpIndexs.js
var utils = require('../../utils/util.js');
var request = require('../../utils/request.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    options: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo
    let ids = options.id
    if (!userInfo) {
      return false
    }
    let code = app.globalData.code
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
    this.setData({
      options: options
    })
    this.getAjaxs()
  },
  getAjaxs(){
    let options = this.options
    app.getLogin(function (res) {
      let curData = res.data.data.unionid
      let arr = {
        id: options.id, //96  //options.id
        unionid: curData
      }
      app.globalData.zhuliUserInfo = arr
      wx.setStorageSync('zhuliUserInfo', arr)
      request.getSoybeanList(arr, function (res) {
        if (res.result == 'ok') {
          let das = res.data.data
          // 不是本人打开页面
          if (das.is_own == 0) {
            let arrInfo = {
              id: arr.id,
              unionid: curData
            }
            wx.redirectTo({
              url: '/pages/helpIndex/helpwx1/helpwx1?arr=' + JSON.stringify(arrInfo)
            })
          } else {
            request.getSoybeanWxUser(arr, function (rs) {
              if (rs.result == 'ok') {
                let rsData = rs.data.data
                wx.redirectTo({
                  url: '/pages/helpIndex/helpwx4/helpwx4?phone=' + rsData.user_account + '&user_id=' + arr.id
                })
              }
            })

          }
        } else {

        }
      })


    })
  },
  onGotUserInfo(e) {
    var usrIn = e.detail.userInfo
    if (usrIn) {
      this.setData({
        userInfo: usrIn
      })
      app.globalData.userInfo = usrIn
      wx.setStorageSync('userInfo', usrIn)
      this.getAjaxs()
    }
  },
  imgClick() {
    if (!this.data.userInfo) {
      return false
    }
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