var md5 = require('md5.js')
var app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 多个倒计时
const countDown = (i, times, endCallback) => {
  if (!times) {
    return;
  }
  var time = times.replace(/-/g, "/"),
    end_time = new Date(time).getTime(),//月份是实际月份-1
    NowTime = new Date().getTime(),
    sys_second = (end_time - NowTime) / 1000;
  var timer = setInterval(function () {
    if (sys_second > 1) {
      sys_second -= 1;
      var day = Math.floor((sys_second / 3600) / 24);
      var hour = Math.floor((sys_second / 3600) % 24);
      var minute = Math.floor((sys_second / 60) % 60);
      var second = Math.floor(sys_second % 60);
      endCallback && endCallback('还剩' + day + '天' + hour + '时' + minute + '分' + second + '秒')
    } else {
      clearInterval(timer);
      endCallback && endCallback('已结束');
    }
  }, 1000);
}
/*
  调取方法
  * for (let i in data) {
  *    utils.countDown(i, data[i].goods_book_date, function (text){
  *       console.log(text) // 返回的时间 再此做处理
  *     }）
  *  }
*/
// http 请求时 create_sign
const lists = {
  create_sign(data) {
    if (data) {
      // 数组下标排序
      data = this.objKeySort(data)
      // 生成拼接字符串
      let prestr = this.create_link_string(data)
      if (this.isEmpty(prestr)) {
        return ''
      } else {
        prestr += 'hhjdu4iekro0810jdh6d'
        return md5(prestr)
      }
    }
  },
  objKeySort(arr) {
    var newkey = Object.keys(arr).sort()
    var newObj = {}
    for (var i = 0; i < newkey.length; i++) {
      newObj[newkey[i]] = arr[newkey[i]]
    }
    return newObj
  },
  create_link_string(para) {
    var arg = ''
    for (var x in para) {
      arg += x + '=' + para[x] + '&'
    }
    if (arg.length > 0) {
      // 去掉最后一个&字符
      var len = arg.length - 1
      arg = (arg.substring(len) === '&') ? arg.substring(0, len) : arg
    }
    return arg
  },
  isEmpty(obj) {
    // 判断字符是否为空的方法
    if (typeof obj === 'undefined' || obj === null || obj === '') {
      return true
    } else {
      return false
    }
  }
}

// http请求 get post
const http = (url = '', data = {}, type = 'POST', successCallback, errorCallback) => {
  let newUid = ''
  let newTo_ken = ''
  let loginUser = wx.getStorageSync('loginUser')
  let newTo_kens = wx.getStorageSync('to_ken')
  if (loginUser) { 
    newUid = loginUser.user_id
  }
  if (newTo_kens){
    newTo_ken = newTo_kens
  }
  wx.request({
    url: url,
    method: type,
    data: data,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Accept-Encoding': '000',
      'Client-Version': '1.0.8',
      'Lang': 'zn',
      'Os': 'weixin',
      'Tok': '000',
      'Uid': newUid,
      'Token': newTo_ken,
      'Authorization': '',
      'eqt-name': 'weixin',
      'phone-sn': '123456'
    },
    success: function (res) {
      if (res.header.authorization) {
        wx.setStorageSync('to_ken', res.header.authorization)
      }
      let re = res.data
      if (res.statusCode == 200) {
        successCallback && successCallback(res.data, res)
      }
    },
    fail: function () {
      errorCallback && errorCallback()
    }
  })
}

// 倒计时 60 秒
const countDown_60 = (callback) => {
  var s = 60, t
  function times() {
    s--;
    callback(s)
    t = setTimeout(times, 1000);
    if (s <= 0) {
      s = 60;
      clearTimeout(t);
      callback(0)
    }
  }
  times();
}
/*
  调取方法
  *  utils.countDown_60(function(times){
  *    console.log(times) // 秒数  在此做处理
  *  })
*/
// 对象浅拷贝
const deepCopy = (newValue, usedValue) => {
  let cloneObj = JSON.parse(JSON.stringify(usedValue))
  for (var key in newValue) {
    cloneObj[key] = newValue[key]
  }
  return cloneObj
}
/*
  调取方法
  * var obj = utils.deepCopy(newObj, oldObj)
  * console.log(obj)
*/

// base64 加密
const Base64 = () => {
  // private property  
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding  
  var encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding  
  var decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding  
  function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding  
  function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = 0
    var c1 = 0
    var c2 = 0
    var c3 = 0
    var c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
  return {
    encode: encode,
    decode: decode
  } 
}
// base64 加密
const set_base64 = (obj) => {
  let objs
  if (typeof (obj) == 'string') {
    objs = obj
  } else {
    objs = JSON.stringify(obj)
  }
  var base = Base64();
  var result = base.encode(objs);
  let newStr = setBaseStr_replace(result)
  return newStr
}

const setBaseStr_replace = (str) => {
  var newStr = ''
  var r1 = str.replace(/\+/g, '-')
  var r2 = r1.replace(/\//g, '_')
  newStr = r2
  return newStr
}

/*
  调取方法
  * let aa = utils.setBase64({ "aaa": "1231", "cccc": "333" })
  * console.log(aa)
*/
// base64 解密
const get_base64 = (obj) => {
  let objs
  if (typeof (obj) == 'string') {
    objs = obj
  } else {
    objs = JSON.stringify(obj)
  }
  var base = Base64();
  var result = base.encode(objs);
  var result2 = base.decode(result); 
  return result2
}
/*
  调取方法
  * let aa = utils.getBase64({ "aaa": "1231", "cccc": "333" })
  * console.log(aa)
*/
// let aa = set_base64({ "aaa": "1231", "cccc": "333" })
// console.log(aa)

// let bb = get_base64({ "aaa": "1231", "cccc": "333" })
// console.log(bb)

module.exports = {
  formatTime: formatTime,
  countDown: countDown,
  http: http,
  countDown_60: countDown_60,
  deepCopy: deepCopy,
  setBase64: set_base64,
  getBase64: get_base64
}
