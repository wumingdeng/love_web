// const jsSHA = require('jssha');

// const APP_ID = 'wx09f7d37254dfa4d6';

// const createNonceStr = function () {
//   return Math.random().toString(36).substr(2, 15);
// };

// const createTimestamp = function () {
//   return parseInt(new Date().getTime() / 1000) + '';
// };

// const raw = function (args) {
//   let keys = Object.keys(args);
//   keys = keys.sort()
//   let newArgs = {};
//   keys.forEach(function (key) {
//     newArgs[key.toLowerCase()] = args[key];
//   });

//   let string = '';
//   for (let k in newArgs) {
//     string += '&' + k + '=' + newArgs[k];
//   }
//   string = string.substr(1);
//   return string;
// };

// let timestamp = createTimestamp();
// let nonceStr = createNonceStr();

// *
// * @synopsis 签名算法 
// *
// * @param jsapi_ticket 用于签名的 jsapi_ticket
// * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
// *
// * @returns

// const sign = function (jsapi_ticket, url) {
//   let ret = {
//     jsapi_ticket: jsapi_ticket,
//     nonceStr: nonceStr,
//     timestamp: timestamp,
//     url: url
//   };

//   let shaObj = new jsSHA(raw(ret), 'TEXT');

//   ret.signature = shaObj.getHash('SHA-1', 'HEX');

//   return ret;
// };

// function wxConfig(ticket) {
//   wx.config({
//     appId: APP_ID, // 必填，公众号的唯一标识
//     timestamp: timestamp, // 必填，生成签名的时间戳
//     nonceStr: nonceStr, // 必填，生成签名的随机串
//     signature: sign(ticket, location.href.split('#')[0]),// 必填，签名，见附录1
//     jsApiList: [
//       'chooseImage',
//       'uploadImage',
//       'downloadImage',
//       'openLocation',
//       'getLocation',
//       'chooseWXPay',
//       'addCard',
//       'chooseCard',
//       'openCard',
//       'closeWindow'
//     ] 
//   });
// }

import cfg from '../../static/webConfig.json'
function shareAppMessage(link) {
  var url = cfg.webAddress
  var route = location.href.split('#')[0].substring(url.length + 1)
  url = url + '/?page=' + route;
  // console.log('link:' + url)
  wx.onMenuShareAppMessage({
    title: '快来孕小岛看看～！', // 分享标题
    desc: '这是一个分享页', // 分享描述
    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
  });
}
function shareTimeline(link) { 
  var url = cfg.webAddress
  var route = location.href.split('#')[0].substring(url.length + 1)
  url = url + '/?page=' + route;
  // console.log('link timeline:' + url)
  wx.onMenuShareTimeline({
      title: '快来孕小岛看看～！', // 分享标题
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
  });
}
function hideMenu(arr) {
  arr = arr || []
  arr = arr.concat(["menuItem:share:qq","menuItem:share:QZone","menuItem:readMode"]);
  wx.hideMenuItems(
    {
      menuList: arr, // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      success: function (res) {
        console.log('隐藏部分菜单')
      },
      fail: function (res) {
        console.log('隐藏菜单失败')
      }
    }
  );
}
function setWxConfig() {
  wx.showOptionMenu();
  shareAppMessage();
  shareTimeline();
  hideMenu()
}


export default {
  init(isShare) {
    var vue = window.Global.Vue
    var url = location.href.split('#')[0]
    // var url = 'http://yzxs.sujudao.com/yxd/shoeDetail'
    // console.log('发送页面' + url)
    window.Global.s.dispatch('signature',{
      self:vue,
      info:{
        url:url,
      },
      callback(self,res) {
        let data = res.body;
        // console.log(data)
        // console.log('当前页面：' + location.href.split('#')[0])
        wx.config({
          // debug:true,
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.ts, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.sig,// 必填，签名，见附录1
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'hideMenuItems',
            'hideOptionMenu',
            'showOptionMenu'
          ] 
        });
        // wxApi.init();
        wx.ready(function(){
          console.log('app.vue wxapi ready')
          if (isShare) { //页面是否可分享
            //设置分享功能
            console.log('set share..')
            setWxConfig()
          } else {
            // hideMenu(['menuItem:share:appMessage','menuItem:share:timeline'])
            console.log('hide all...')
            wx.hideOptionMenu();
          }
        });
      }
    })
  }
}