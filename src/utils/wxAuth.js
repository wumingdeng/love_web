import g from '../globals/global.js'

var wxAuth = {    
	isweixin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
	auth:function() {
        var authPath = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + g.appId + '&redirect_uri=' + encodeURIComponent(g.webAddress) + '?page=' + localStorage.page + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        console.log('授权appid:' + g.appId)
        console.log('授权:' + encodeURIComponent(g.webAddress))
        console.log('授权地址:' + localStorage.page)
        console.log('授权地址:' + authPath)
        window.location.href = authPath
	}
}

export default wxAuth;