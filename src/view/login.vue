<template>
	<f7-page>
	
	</f7-page>
</template>

<script>
// import wxAuth from '@/utils/wxAuth.js'
export default {
	data() {
		return {

		}
	},
	mounted() {
		//验证登录
		// var wxid = this.$route.query.wxid;
		// console.log('授权code:' + this.$route.query.code)
		// if (this.$route.query.code) {
		// 	alert(this.$route.query.code)
		// 	return;
		// }
		var code = this.$route.query.code
		var page = this.$route.query.page || localStorage.page;	//跳转的页面
		console.log("page is :"+page)
		if (page == undefined || page == "undefined") page = 'home'
		var rid = this.$route.query.rid || localStorage.rid	//足部报告id
		if (rid == "undefined") rid = null;
		// var oid = this.$route.query.oid;
		// localStorage.code = code;
		localStorage.page = page;
		localStorage.rid = rid;
		// this.$store.commit('GET_WXID',wxid)
		
		var isTest = process.env.NODE_ENV == 'development'
		if (isTest) {
			code = 'heheda'
		}
		this.$router.push("/" + page);
		// if (!this.$store.state.isLogin) {
		// 	if (code && code != 'undefined') {
		// 		//登录
		// 		this.$store.commit("LOADING", true)
		// 		this.$store.dispatch('quickloginwxUser', {
		// 			self: this,
		// 			info: {
		// 				code: code
		// 			},
		// 			callback: function (self, res) {
		// 				if (res.body.ok) {
		// 					self.$store.commit('USERINFO', res.body.ok);
		// 					self.$store.commit('GET_WXID', res.body.ok.wxid);
		// 					self.$store.state.token = res.body.token;
		// 					if (isTest) {
		// 						self.$router.push('/' + page)
		// 					} else {
		// 						if (page == 'home' && rid) {
		// 							self.$router.push({
		// 								path: '/' + page,	//默认跳到卖鞋页
		// 								query: {
		// 									rid: rid
		// 								}
		// 							});
		// 							localStorage.rid = null;
		// 						} else {
		// 							console.log("什么鬼")
									
		// 						}
		// 					}
		// 				} else if (res.body.err) {
		// 					//授权失败
		// 					// wxAuth.auth();
		// 				} else {
		// 					console.log('holy shit:'+page)
		// 					self.$router.push('/' + page)
		// 				}
		// 			}
		// 		})
		// 	} else {
		// 		// wxAuth.auth();
		// 		return
		// 	}
		// } else {
		// 	//关闭页面
		// 	if (WeixinJSBridge) {
		// 		WeixinJSBridge.invoke("closeWindow")
		// 	} else {
		// 		this.$router.push('/' + page);
		// 	}
		// }
	}
}

</script>