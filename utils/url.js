const baseUrl = 'https://testapi.hahajing.com'
const baseUrl2 = 'https://testtp.hahajing.com'

var url = {
  xiao_user_info: baseUrl + '/customer/user/xiao_user_info', // 登陆授权
  send_auth_code: baseUrl + '/customer/public/send_auth_code', // 获取验证码 url
  wx_quick_load: baseUrl + '/customer/user/wx_quick_load', // 登录 url
  doujiang: baseUrl + '/customer/coupon/doujiang10', // 一次领取10张豆浆券（有效期1天） url
  getNearVipShopId: baseUrl + '/customer/shop/get_near_vip_shop_id', // 获取最近VIP店铺ID url
  getSoybeanList: baseUrl + '/customer/act_hele/get_soybean_list', // 查询助力列表和判断是否本人打开 url
  getSoybeanWxUser: baseUrl + '/customer/act_hele/get_soybean_wx_user', //根据id获取微信头像和微信昵称来显示 url
  zhuli: baseUrl + '/customer/coupon/zhuli', // 助力券，一次领取一张（有效期7天） url
  setSoybeanSata: baseUrl + '/customer/act_hele/set_soybean_data', // 添加助力信息
  getSoybeanId: baseUrl + '/customer/act_hele/get_soybean_id', // 助力的和被助力的,返回分享信息
  payOrderData: baseUrl + '/customer/order/pay_order_data'  // 重新支付 
}
module.exports = {
  dataUrl: url
}