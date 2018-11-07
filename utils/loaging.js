/**
 * 加载提示: 文本提示
 * tips：提示
 */
function prompts(tips) {
  wx.hideLoading()
  wx.showToast({
    title: tips,
    icon: 'none',
    duration: 2000
  })
}
/**
 * 加载中
 */
function init() {
  wx.hideLoading()
  wx.showLoading({
    icon: 'loading',
    title: '全力加载中',
    mask: true
  })
}
/**
 * 隐藏加载
 */
function close() {
  wx.hideLoading()
}
/**
 * 模态框
 */
function confirm(content = '', callback, title = '') {
  wx.hideLoading()
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: "知道了",
    success: function () {
      callback && callback()
    }
  })
}
/**
 * 模态框
 */
function btn(content = '', success, fail, title = '') {
  wx.hideLoading()
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelText: "取消",
    success: function (res){
      if (res.confirm) {
        success && success()
      } else if (res.cancel) {
        fail && fail()
      }
    }
  })
}

module.exports = {
  init: init,
  prompts: prompts,
  close: close,
  confirm: confirm,
  btn: btn
}