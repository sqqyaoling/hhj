var utils = require('../../../utils/util.js');
var request = require('../../../utils/request.js');
var app = getApp()
Page({
  data: {
    userInfo: '',
    loginUser: '',
    location: '',
    phone: '',
    classStyle: 'in',
    classStyle2: 'out'
  },
  onLoad: function (options) {
    if (options.phone) {
      this.setData({
        phone: options.phone
      })
    }
    let self = this
    if (app.globalData.location) {
      this.setData({
        location: app.globalData.location
      })
    }
  },
  imgClick(e) {
    let datas = this.data.location
    let data = {
      lng: datas.location.lng,
      lat: datas.location.lat
    }
    let goodsid = e.currentTarget.dataset.goodsid
    request.getNearVipShopId(data, function (res) {
      if (res.result == 'ok') {
        let shopId = res.data.data.shop_id
        console.log(shopId, goodsid)
        let base3 = utils.setBase64('/Order/book_confirm?shop_id=' + shopId + '&goods_id=' + goodsid + '&goods_count=1&rule_id=84')
        // let base3 = utils.setBase64('/Order/book_confirm?shop_id=5055&goods_id=13337&goods_count=1&rule_id=84')
        let url = 'https://test.hahajing.com/DouJang/url_jump'
        wx.navigateTo({
          url: '/pages/pageInteractive/pageInteractive?datas=' + base3 + '&url=' + url
        })
      } else {

      }
    })
  },
  ReceiveBindTap () {
    let base3 = utils.setBase64('/index/index')
    let url = 'https://test.hahajing.com/DouJang/url_jump'
    wx.navigateTo({
      url: '/pages/pageInteractive/pageInteractive?datas=' + base3 + '&url=' + url
    })
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
  }
})