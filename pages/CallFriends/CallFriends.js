// pages/CallFriends/CallFriends.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonCount:6,
  },

  onShareAppMessage: function (options) {
    console.log('转发');
    　　var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
      　　　　title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
      　　　　path: '/pages/share/share',        // 默认是当前页面，必须是以‘/’开头的完整路径
          imgUrl: '../CallFriends/CallFriends',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      　　　　success(res) {
        　　　　　　// 转发成功之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:ok') {
        　　　　　　}
      　　　　},
      　　　　fail() {
        　　　　　　// 转发失败之后的回调
        　　　　　　if (res.errMsg == 'shareAppMessage:fail cancel') {
          　　　　　　　　// 用户取消转发
        　　　　　　} else if (res.errMsg == 'shareAppMessage:fail') {
          　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
        　　　　　　}
      　　　　},
      　　　　complete(){
        　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
              console.log('111')
      　　　　}
  　　};
  　　// 来自页面内的按钮的转发
  　　if(options.from == 'button') {
          wx.showModal({
            title: '111',
            content: 'fenxiang',
          })
    　　　　var eData = options.target.dataset;
    　　　　console.log(eData.name);     // shareBtn
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/btnname/btnname?btn_name=' + eData.name;
  　　}
　　// 返回shareObj
　　return shareObj;
},

  /**
   * 看看其他活动
   */
  lookOther(){
    // wx.navigateTo({
    //   url: '../CommodityDetails/CommodityDetails',
    // })
   var n = this.formatNumber(8);
   console.log(n);
  },

 formatNumber(n) {
    n = n.toString()
  return n[1] ? n : '0' + n
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.hideShareMenu();
     
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