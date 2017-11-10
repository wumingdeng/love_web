const errorTitle = 'error'
const emptyInput = '杈撳叆涓嶈兘涓虹┖'
var webConfig
if (process.env.NODE_ENV == 'development')
  webConfig = require('../../static/webConfig_local')
else   
  webConfig = require('../../static/webConfig')
export const ERROR_EMPTY_INPUT = 1
export const ERROR_MSG = {
  1: emptyInput
}
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
            trident: u.indexOf('Trident') > -1, //IE鍐呮牳
            presto: u.indexOf('Presto') > -1, //opera鍐呮牳
            webKit: u.indexOf('AppleWebKit') > -1, //鑻规灉銆佽胺姝屽唴鏍�
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //鐏嫄鍐呮牳
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //鏄惁涓虹Щ鍔ㄧ粓绔�
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴杣c娴忚鍣�
            iPhone: u.indexOf('iPhone') > -1, //鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
            iPad: u.indexOf('iPad') > -1, //鏄惁iPad
            webApp: u.indexOf('Safari') == -1 //鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var _imgData =  require( "../../static/json/img.json")
var _imgCfg =  require( "../../static/json/imgConfig.json")
var _imgCfg_w =  require( "../../static/json/imgcfg_w.json")
var _imgData_w =  require( "../../static/json/img_w.json")
export default {
  debugServerAddress: webConfig.debugServerAddress,
  serverAddress: webConfig.serverAddress,
  adminServerAddress: webConfig.adminServerAddress,
  machineServerAddress: webConfig.machineServerAddress,
  wechatServerAddress: webConfig.wechatServerAddress,
  appId:webConfig.appId,
  webAddress:webConfig.webAddress,
  webPath:webConfig.webPath,
  version:webConfig.version,
  isInWeiXin:function() {
    if (browser.versions.mobile) {
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    }
    return false
  },
  isIphone:function() {
    return browser.versions.ios
  },
  isAndroid:function() {
    return browser.versions.android
  },
  isInpay:false, //鏄惁鐐瑰嚮鏀粯
  imgData:_imgData,
  imgCfg:_imgCfg,
  imgData_w:_imgData_w,
  imgCfg_w:_imgCfg_w
}

export function timeToDate(time,showTime) {
  if (String(time).length <= 10) {
    time = time * 1000
  }
  var date = new Date(time);
  time = date.toLocaleDateString();
  var year = date.getFullYear();
  var month = ~~date.getMonth() + 1;
  var day = date.getDate();
  if (showTime) {
    var hour =  date.getHours() > 9 ?  date.getHours() : "0" + date.getHours();
    var minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
    var second = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
    time = time + " " + hour + ":" + minute + ":" + second;
  } else {
    time = year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day);
  }
  time = time.split('/').join('-')
  return time
}