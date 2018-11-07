// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    useryz: ''
  },
  bindButtonGet: function(){
    if (!this.data.userPhone) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return false;
    }
    console.log(66)
  },
  useryzInput: function(e) {
    this.data.useryz = e.detail.value;
  },
  userPhoneInput: function(e){
    this.data.userPhone = e.detail.value;
  },
  bindButtonTap: function(){
    // wx.redirectTo({
    //   url: '/pages/CommodityDetails/CommodityDetails',
    // })
    if (!this.data.userPhone || !this.data.useryz ) {
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
      return false;
    }
    wx.navigateTo({
      url: '/pages/CommodityDetails/CommodityDetails'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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