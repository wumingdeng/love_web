<template>
	<f7-page navbar-fixed>
		<f7-navbar sliding style="background: url('static/client/user/daohanglan.jpg') no-repeat;background-size:cover;">
			<f7-grid style="width:100%">
				<f7-col style="text-align:left;margin-top:7px">
					<f7-link style="position:absolute;top:0;bottom:0;left:auto;right:auto" icon="icon-back color-white" @click="$router.push('/home')"></f7-link>
				</f7-col>
				<f7-col style="text-align:center;margin-top:5px">
					<label style="font-weight:100;font-size:18px;color:#ffffff">个人中心</label>
				</f7-col>
				<f7-col style="text-align:right;margin-top:5px">
					<img style="width:20%;margin-right:5px" src="static/client/assets/modify.png">
				</f7-col>
			</f7-grid>
		</f7-navbar>
		<f7-page-content style="overflow-x: hidden">
			<embed src="static/assets/head_icons_png/yanjing/1038181.svg" style="position:Absolute;top:40%;left:50%;transform:scale(20,20)" type="image/svg+xml"
                            pluginspage="http://www.adobe.com/svg/viewer/install/"/>
		</f7-page-content>
	</f7-page>
</template>

<script>
export default {
	data() {
		return {
			hasEye: false,
			hasHear: false,
			hasMouse: false,
			curEye: '',
			curHear: '',
		}
	},
	methods: {
		fixy(e) {
			if (this.hasEye) {
				this.hasEye = false
				var y = document.getElementById("eye");
				document.getElementById('J').removeChild(y)
			} else {
				this.hasEye = true
				var _taget = e.target
				var img = document.createElement('img')
				img.id = 'eye'
				img.src = _taget.src
				img.style = "width:10%;position:Absolute;bottom:100px;left:135px"
				document.getElementById('J').appendChild(img)
			}
		},
		fixt(e) {
			console.log('fixt:' + e.type)
			if (!this.hasHear) {
				this.hasHear = true
				var _taget = e.target
				var img = document.createElement('img')
				img.src = _taget.src
				this.curHear = _taget.src
				img.id = 'hear'
				img.style = "position:Absolute;top:-40px;left:90px"
				document.getElementById('J').appendChild(img)
				this.newImg(document.getElementById('J'))
			} else if (this.curHear == e.target.src) {
				this.hasHear = false
				var y = document.getElementById("hear");
				console.log('hear')
				document.getElementById('J').removeChild(y)
			} else {
				this.hasHear = true
				var y = document.getElementById("hear");
				y.src = e.target.src
				this.curHear = e.target.src
			}
		},
		newImg(element) {
			setTimeout(function() {
				html2canvas(element, {
					onrendered: function(canvas) {
						var image = new Image();
						image.src = canvas.toDataURL();
						document.getElementById('content_img').appendChild(image)
					},
				});
			}, 0)
		},
		getImgSrc(n) {
			console.log(new Date().getTime())
			return window.Global.serverAddress+"/icons/"+ n + ".png" + Global.verStr;
		},
		gotoAnyWhere(adr) {
			this.$router.push(adr)
		}
	},
	created() {
		console.log("kaishi:"+new Date().getTime())
	},
	mounted() {
		
		this.$f7.resize()
		this.$f7.init()
	}
}
</script>

<style scoped>
.custom {
	width: 70%;
}

.custom input {
	text-align: right;
}

.page-content {
	padding-top: 0px;
}

.datainput {
	margin-right: 100px;
}

.dc_top_per {
	width: 100%;
	height: 160px;
	/*border: 1px solid #d4d4d4;*/
	min-width: 288px;
	text-align: center;
}

.dc_top_per .face {
	width: 17vw;
	height: 17vw;
	/*display: inline-block;*/
	margin: 5px auto 0px auto;
	border: 3px solid rgba(255, 255, 255, 0.3);
	border-radius: 80px;
	-moz-border-radius: 80px;
	-webkit-border-radius: 80px;
	overflow: hidden;
}

.dc_top_per span {
	line-height: 16px;
	height: 100px;
	font-size: 14px;
	width: 50%;
	color: #fff;
	/*display: inline-block;*/
	/*margin-left: 30px;*/
	/*text-align: center;*/
	/*overflow: hidden;*/
}

.jscz {
	background-color: #ffffff;
	width: 95%;
	margin: 0 auto;
	height: 60px;
	border-radius: 5px;
	box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
	position: relative;
	top: -50px;
	text-align: center;
	padding: 10px 0;
}

.shuxian {
	position: absolute;
	left: auto;
	bottom: auto;
	right: auto;
	top: auto;
	width: 1px;
	height: 100%;
	background-color: rgba(100, 100, 100, 0.3);
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	transform: scale(0.3, 1)
}

.heng {
	position: absolute;
	left: auto;
	bottom: auto;
	right: auto;
	top: auto;
	width: 100%;
	height: 1px;
	background-color: rgba(100, 100, 100, 0.3);
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	transform: scale(1, 0.3)
}

.navbar:after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	right: auto;
	top: auto;
	height: 1px;
	width: 100%;
	background-color: rgba(0, 0, 0, 0);
	display: block;
	z-index: 15;
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
}
</style>
