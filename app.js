//app.js
var utils = require('./utils/util.js')
var bmap = require('./libs/bmap-wx.js');
var request = require('./utils/request.js');
App({
  onLaunch: function () {
    let to_ken = wx.getStorageSync('to_ken')
    if (to_ken) {
      this.globalData.to_ken = to_ken
    }
    let zhuliLoginUser = wx.getStorageSync('zhuliLoginUser')
    if (zhuliLoginUser) {
      this.globalData.zhuliLoginUser = zhuliLoginUser
    }
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
    }
    let location = wx.getStorageSync('location')
    if (location) {
      this.globalData.location = location
    }
    var self = this;
    var a = wx.getStorageSync('loginUser')
    self.globalData.loginUser = a
    // 登录
    wx.login({
      success: res => {
        let baseUrl = this.globalData.baseUrl
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        utils.http(baseUrl+'/customer/user/xiao_user_info', { js_code: res.code}, 'POST', function(res){
          self.globalData.code = res
        })
      },
      fail: res => {
      }
    })
  },
  // 百度地图定位
  locations: (successs, fails) => {
    let self = this
    var BMap = new bmap.BMapWX({
      ak: 'ldbKHkQNoDxcBdWitGv3gBtok40tnv4O'
    });
    var fail = function (data) {
      if (fails) {
        wx.showModal({
          title: '提示',
          content: '请打开地理位置授权，授权后使用改功能',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (data) {
                  if (data.authSetting["scope.userLocation"] == true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 5000
                    })
                    //再次授权，调用getLocationt的API
                    BMap.regeocoding({
                      fail: fail,
                      success: success
                    });
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 5000
                    })
                  }
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    };
    var success = function (data) {
      var originalData = data.originalData.result;
      wx.setStorageSync('location', originalData)
      successs && successs(originalData)
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  getLogin: (success) => {
    let that = this
    wx.login({
      success: res => {
        utils.http(request.xiaoUserInfo, { js_code: res.code }, 'POST', function (res) {
          success && success(res)
        })
      },
      fail: res => {
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
             // console.log(res)
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function (res) {
             // console.log(res)
            }
          })
        },
        fail: function(){
          // console.log(666)
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    code: {},
    baseUrl: 'https://testapi.hahajing.com',
    baseUrl2: 'https://testtp.hahajing.com',
    loginUser: null,
    location: null,
    to_ken: null,
    zhuliLoginUser: null,
    zhuliUserInfo: null
  }
})