// pages/helpIndex/helpwx3/helpwx3.js
var request = require('../../../utils/request.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [{}, {}, {}, {}, {}, {}],
    phone: '',
    shareData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    let das = app.globalData.zhuliLoginUser
    console.log(das)
   
    let phone = options.phone
    let user_id = options.user_id // 被分享者id
    let curArr = JSON.parse(options.arr)
    this.setData({
      phone: options.phone
    })

    


    let datas = app.globalData.zhuliUserInfo
    let self = this
    let arr = {
      id: datas.id, // 分享着的参数
      unionid: datas.unionid
    }
    let appGlo = app.globalData.code.data.data
    let setDatas = {
      id: curArr.id,
      user_id: das.user_id,
      user_wx_unionid: appGlo.unionid
    }
    // 添加助力信息
    request.setSoybeanSata(setDatas, function (res1) {
      if (res1.result == 'ok') {
        // 发券
        request.zhuli({ main_uid: curArr.user_id }, function (res2) {
          self.getAjaxs(arr)
        })
      } else {
        // 已助力 直接跳转
        self.getAjaxs(arr)
      }
    })    
    // 请求分享信息
    request.getSoybeanId({ user_id: user_id }, function (res) {
      console.log(res)
      if (res.result == 'ok') {
        let dat = res.data.data
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
  getAjaxs (arr) {
    let self = this
    request.getSoybeanList(arr, function (res) {
      console.log(res)
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
          datas: ars
        })
      } else {
        wx.showToast({
          title: '请求失败',
        })
      }
    })
  },
  shereBindTap () {
    
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