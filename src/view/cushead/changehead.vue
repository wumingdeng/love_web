<template>
    <f7-page navbar-fixed navbar-through toolbar-fixed>
        <f7-navbar sliding style='background: linear-gradient(to right, #5dc9b7 , #6fdcc0);color:#ffffff;height:38px'>
            <f7-grid style="width:100%">
                <f7-col style="text-align:left" @click.native="onSelectAdd">
                </f7-col>
                <f7-col style="text-align:center">
                    <label style="font-weight:100;font-size:18px">首页</label>
                </f7-col>
                <f7-col style="text-align:right" @click.native="goUserinfo">
                </f7-col>
            </f7-grid>
        </f7-navbar>
        <f7-card style="text-align: center;padding:0px 0px;margin:-5px 0px 0px 0px"> 
            <f7-card-content>
                <f7-grid >
                    <f7-col width='75' style="margin-top:-20px;overflow:hidden" >
                        <div id="headImg" style="position:relative;margin:40px auto 0px auto;text-align:center">
                            <img id='hl' :style="hlStylel()" src="static/assets/head_icons_png/man/faxing_0/1050830.svg">
                            <img style="width:50%;position:absolute;top:3%;left:25%" src="static/assets/head_icons/man/lianxing/1.png">
                            <div id="J" style="position:relative;width:62%;margin:15px auto 0px auto">
                                <img id='lianxing' style="transform:scale(1,1);width:100%;z-index:100" :src="headUrl()">
                                <img id='eye' :style="eyeStylel()" :src="eyeUrl()">
                                <img id='eyeclone' :style="eyeCloneStylel()" :src="eyeUrl()">
                                <img id='mouth' :style="zbStylel()" :src="zuibaUrl()">
                                <img id='bizi' :style="biziStyle()" :src="biziUrl()">
                                <img id='meimao' :style="meimaoStylel()" :src="meimaoUrl()">
                                <img id='meimaoclone' :style="meimaoCloneStylel()" :src="meimaoUrl()">
                                <img id='faxing' :style="faxingStyle()" :src="faxingUrl()">
                            </div>
                        </div>
                    </f7-col>
                    <f7-col width='25'>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(0)" :fill="sltItem(0)">眼睛</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(1)" :fill="sltItem(1)">眼镜</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(2)" :fill="sltItem(2)">鼻子</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(3)" :fill="sltItem(3)">头发</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(4)" :fill="sltItem(4)">脸型</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(5)" :fill="sltItem(5)">眉毛</f7-button>
                        </f7-grid>
                        <f7-grid class="grid_place">
                            <f7-button @click="selPart(6)" :fill="sltItem(6)">嘴巴</f7-button>
                        </f7-grid>
                    </f7-col>
                </f7-grid>
                <f7-grid>
                    <f7-list class="category-head" id="category-head">
                        <li v-for="(item,index) in items" :key="index">
                            <div style="background:rgba(255,255,255,1)">
                                <f7-col style="border:1px solid;width:90%">
                                    <img name="img" class="swipeImg" :data-src="getSwipeUrl(item[0])" src="static/assets/empty_mid.jpg" alt="" @click="onSelectItem">
                                </f7-col>
                                <f7-col style="border:1px solid;width:90%;margin:10px 0px 0px 0px">
                                    <img name="img" class="swipeImg" :data-src="getSwipeUrl(item[1])" src="static/assets/empty_mid.jpg" alt="" @click="onSelectItem">
                                </f7-col>
                            </div>
                        </li>
                    </f7-list>
                </f7-grid>
            </f7-card-content>
        </f7-card>
        <canvas style="position:absolute;top:0px;display:none"></canvas>
        <f7-button @click="onSaveHead" big fill round style="width:80%;margin:-20px auto 0px auto;position:relvative;top:30px">保存</f7-button>
   </f7-page>
</template>
<script>

import domtoimage from 'dom-to-image';
export default {
    name: 'home',
    data() {
        return {
            partIdx: '', //当前选择的局部序号
            sex: 0,
            color: 0, // 0 , 正常 ，1 偏白，2偏黑
            imgDataUrl:'',
            items:[],
            hasMm:true,
            hasYj:false,
            hasEye:true,
            hasZb:true,
            hasBz:true,
            hasFx:true,
            hasLx:true,
            _has:false, // 局部部件是否有存在的中间变量
            curHearSrc:'', // 当前局部的src
            curYjSrc:'',
            imgcfg:{},
            imgdata:{},
            scale:1
        }
    },
    computed: {
    },
    methods: {
        //遍历加载局部选项的图片的异常，不显示
        lstImgError(e){
            e.target.style.display='none'
        },
        withoutImg(e){
            console.log('加载不出图片:'+e.target.src)
            document.getElementById('hl').style.display='none'
            document.getElementById('hl').src=''
            document.getElementById('hl').onerror = null;
        },
        zbStylel(){
            return "width:"+(this.sex==0?"37%":"32%")+";position:Absolute;"+(this.sex==0?"top:71%;left:33%":"top:73%;left:36%")+";z-index:500"
        },
        eyeStylel(){
            return "width:"+(this.sex==0?"43%":"40%")+";position:Absolute;"+(this.sex==0?"top:25%;left:12%":"top:32%;left:10%")+";z-index:300"
        },
        eyeCloneStylel(){
            return "width:"+(this.sex==0?"43%":"40%")+";position:Absolute;"+(this.sex==0?"top:25%;left:46%":"top:32%;left:47%")+";transform:scale(-1,1);z-index:301"
        },
        meimaoStylel(){
            return "width:"+(this.sex==0?"45%":"45%")+";position:Absolute;"+(this.sex==0?"top:15%;left:10%":"top:21.5%;left:8%")+";z-index:400"
        },
        meimaoCloneStylel(){
            return "width:"+(this.sex==0?"45%":"45%")+";position:Absolute;"+(this.sex==0?"top:15%;left:47%":"top:21.5%;left:45%")+";transform:scale(-1,1);z-index:401"
        },
        hlStylel(){
            return "transform:scale("+6.9*this.scale+","+6.9*this.scale+");position:absolute;top:45%;left:46.5%;display:none"
        },
        biziStyle(){
            return "transform:scale("+6.9*this.scale+","+6.9*this.scale+");position:Absolute;"+(this.sex==0?"top:58%;left:50%":"top:59%;left:45%")+";z-index:200"
        },
        faxingStyle(){
            return "transform:scale("+7.2*this.scale+","+7.2*this.scale+");position:absolute;"+(this.sex==0?"top:20%;left:43%":"top:4%;left:42%")+";z-index:900"
        },
        //默认的局部地址
        faxingUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/faxing/'+(this.sex==0?'1047118.svg':'1048056.svg')+Global.verStr
        },
        headUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/lianxing/'+this.color+'/'+(this.sex==0?'1039523.svg':'1037543.svg')+Global.verStr
        },
        biziUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/bizi/'+(this.sex==0?'1036857.svg':'1035929.svg')+Global.verStr
        },
        zuibaUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/mouth/'+(this.sex==0?'1039482.svg':'1040438.svg')+Global.verStr
        },
        eyeUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/eye/'+(this.sex==0?'1026229.png':'1040500.png')+Global.verStr
        },
        meimaoUrl(){
            return 'static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/meimao/'+(this.sex==0?'1026422.png':'1037594.png')+Global.verStr
        },
        //设置按钮样式
        sltItem(idx){
            return idx == this.partIdx
        },
        //通过用 embed 标签,用的是不同dom处理，
        fixPartWithSvg(e,idStr,styleStr,_imgcfg){
            if (!this._has) {
                this._has = true
                var _taget = e.target
                var s_src = _taget.src.substr(_taget.src.lastIndexOf('/'), _taget.src.indexOf('?'))
                s_src = s_src.replace('jpg', 'svg')
                let img = document.createElement('img')
                img.src='static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/')+idStr+s_src
                img.style=styleStr
                img.id = idStr
                document.getElementById('J').appendChild(img)
                //发型局部，还需要判断是否有后面的图片
                if(this.partIdx == 3){
                    let hlimg = document.getElementById('hl')
                    hlimg.src='static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/')+idStr+'_0'+s_src
                    hlimg.style.top=_imgcfg.top_h
                    hlimg.style.left=_imgcfg.left_h
                    hlimg.onerror = this.withoutImg
                }
                this.curHearSrc = _taget.src
            } else if (this.curHearSrc == e.target.src) {
                if(this.partIdx==4){
                    document.getElementById(idStr).src='static/assets/head_icons_png/'+(this.sex==0?'man':'woman')+'/lianxing/'+this.color+(this.sex==0?'/1039509.svg':'/1037543.svg')+Global.verStr
                }else{
                    this._has = false
                    let img = document.getElementById(idStr)
                    document.getElementById('J').removeChild(img)
                }
                if(this.partIdx == 3){
                    let hlimg = document.getElementById('hl')
                    hlimg.onerror = null
                    hlimg.src=''
                }
                this.curHearSrc = ''
            } else {
                this._has = true
                let mm = document.getElementById(idStr);
                var s_src = e.target.src.substr(e.target.src.lastIndexOf('/'), e.target.src.indexOf('?'))
                s_src = s_src.replace('jpg', 'svg')
                if(this.partIdx == 2 || this.partIdx == 3 || this.partIdx == 6){
                    mm.style=styleStr
                }
                if(this.partIdx == 4){ // 脸型局部涉及到肤色，需要特殊处理
                    mm.src = 'static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/') +idStr+"/"+this.color+s_src
                }else{
                    mm.src = 'static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/')+idStr+s_src
                }
                if(this.partIdx == 3){
                     document.getElementById('hl').style.top=_imgcfg.top_h
                     document.getElementById('hl').style.left=_imgcfg.left_h
                     document.getElementById('hl').style.display='block'
                     document.getElementById('hl').src='static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/')+idStr+'_0'+s_src
                     document.getElementById('hl').onerror = this.withoutImg
                }
                this.curHearSrc = e.target.src
            }
        },
        fixPart(e,clone,idStr,styleStr,cloneStyleStr){
            if (!this._has) {
                this._has = true
                var _taget = e.target
                var s_src = _taget.src.substr(_taget.src.lastIndexOf('/'), _taget.src.indexOf('?'))
                s_src = s_src.replace('jpg', 'png')
                let img = document.createElement('img')
                img.src = 'static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/')+idStr+'/'+s_src
                img.style = styleStr
                this.curHearSrc = _taget.src
                img.id = idStr
                document.getElementById('J').appendChild(img)
                if(clone){
                    let imgClone = img.cloneNode(false)
                    imgClone.id = idStr+"clone"
                    imgClone.style=cloneStyleStr
                    document.getElementById('J').appendChild(imgClone)
                }
            } else if (this.curHearSrc == e.target.src) {
                if(this.partIdx == 4){ //脸型的话重置为默认的脸型
                    document.getElementById(idStr).src = this.headUrl()
                }else{
                    this._has = false
                    document.getElementById('J').removeChild(document.getElementById(idStr))
                    if(clone)
                        document.getElementById('J').removeChild(document.getElementById(idStr+"clone"))
                }
            } else {
                this._has = true
                let mm = document.getElementById(idStr);
                var s_src = e.target.src.substr(e.target.src.lastIndexOf('/'), e.target.src.indexOf('?'))
                s_src = s_src.replace('jpg', 'png')
                if(this.partIdx == 4){ // 脸型局部涉及到肤色，需要特殊处理
                    s_src = 'static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/') +idStr+"/"+this.color+"/"+s_src
                }else{
                    s_src = 'static/assets/head_icons_png/'+(this.sex==0?'man/':'woman/') +idStr+"/"+s_src
                }
                mm.src = s_src
                if(clone){
                    let mmclone = document.getElementById(idStr+"clone");
                    mmclone.src = s_src
                }
                this.curHearSrc = e.target.src
            }
        },
        newImg(cb) {
            var handleDom = document.getElementById('headImg')
            var newDom = handleDom.cloneNode(true)
            var self = this
            var getPixelRatio=function(content){
                var backingStore=content.backingStorePixelRatio||content.webkitBackingStorePixelRatio||content.mozBackingStorePixelRati||content.msBackingStorePixelRatio||content.oBackingStorePixelRatio||1;
                return (window.devicePixelRatio||1)/backingStore
            }
            var canvas = document.querySelector("canvas");
            var ctx = canvas.getContext('2d');
            var ratio = getPixelRatio(ctx);
            console.log("ratio:"+ratio)
            canvas.width = handleDom.clientWidth*ratio;
            canvas.height = handleDom.clientHeight*ratio*1.5;
            ctx.scale(ratio,ratio)
            html2canvas(handleDom, {
                canvas:canvas,
                timeout:100,
                onrendered: function(canvas) {
                    self.imgDataUrl = canvas.toDataURL("png");
                    cb();
                },
            });
        },
        resetItem(){
            var imgs = document.getElementsByName("img")
            let num = document.getElementsByName('img').length;
            for (let i = 0; i < num; i++) {
                let img = imgs[i]
                img.src = 'static/assets/empty_mid.jpg'
            }
        },
        //选择局部的时候，切换数据已经复制中间变量
        selPart(idx) {
            if(this.partIdx === idx) return
            this.partIdx = idx
            document.getElementById("category-head").scrollLeft = 0
            switch (this.partIdx) {
                case 0:
                    this._has=this.hasEye
                    this.curHearSrc = document.getElementById('eye')?document.getElementById('eye').src:''
                    console.log(this.imgdata)
                    this.items = this.imgdata.eyeData
                    break;
                case 1:
                    this._has=this.hasYj
                    this.curHearSrc = document.getElementById('yanjing')?document.getElementById('yanjing').src:''
                    this.items = this.imgdata.yanjingData
                    break;
                case 2:
                    this._has=this.hasBz
                    this.curHearSrc = document.getElementById('bizi')?document.getElementById('bizi').src:''
                    this.items = this.imgdata.biziData
                    break;
                case 3:
                    this._has=this.hasFx
                    this.curHearSrc = document.getElementById('faxing')?document.getElementById('faxing').src:''
                    this.items = this.imgdata.faxingData
                    break;
                case 4:
                    this._has=this.hasLx
                    //初始的默认脸型src
                    this.curHearSrc = document.getElementById('lianxing').src
                    this.items = this.imgdata.lianxingData[this.color]
                    break;
                case 5:
                    this._has=this.hasMm
                    this.curHearSrc = document.getElementById('meimao')? document.getElementById('meimao').src:''
                    this.items = this.imgdata.meimaoData
                    break;
                case 6:
                    this._has=this.hasZb
                    this.curHearSrc = document.getElementById('mouth')? document.getElementById('mouth').src:''
                    this.items = this.imgdata.mouthData
                    break;
                default:
                    break;
            }
            this.resetItem()
            this.$nextTick(() => {
                this.onLoadImg()
            })
        },
        getSwipeUrl(url) {
            if(this.partIdx == 4){
                return "static/assets/head_icons/"+(this.sex==0?'man':'woman') + "/lianxing/"+this.color+"/"+url + Global.verStr
            }else{
                return "static/assets/head_icons/"+(this.sex==0?'man':'woman') + url + Global.verStr
            }
        },
        onSelectItem(e) {
            console.log("selected item:"+this.partIdx)
            var fileName = e.target.src.substring(e.target.src.lastIndexOf('/')+1, e.target.src.indexOf('?'))
            fileName = fileName.replace('.jpg', '')
            console.log(fileName)
            switch (this.partIdx) {
                case 0:
                    var styleStr = "width:"+(this.sex==0?'43%':'40%')+";position:Absolute;"+(this.sex==0?"top:25%;left:12%":"top:32%;left:10%")+";z-index:300"
                    var cloneStyleStr = "width:"+(this.sex==0?'43%':'40%')+";position: Absolute;"+(this.sex==0?"top:25%;left:46%":"top:32%;left:47%")+";transform:scale(-1,1);z-index:301"
                    this.fixPart(e,true,'eye',styleStr,cloneStyleStr)
                    this.hasEye = this._has
                    break;
                case 1:
                    var styleStr = "transform:scale("+7*this.scale+","+7*this.scale+");position:absolute;top:"+(this.sex==0?"50%":"55%")+";left:44%;z-index:1000"
                    this.fixPartWithSvg(e,'yanjing',styleStr)
                    this.hasYj = this._has
                    break;
                case 2:
                    var imgcfg = this.imgcfg.bz[fileName]
                    var _scale = imgcfg.scale || 6.9
                    // var styleStr = "transform:scale("+6.9*this.scale+","+6.9*this.scale+");position:Absolute;top:+"+imgcfg.top+";left:"+imgcfg.left+";z-index:200"
                    var styleStr = "transform:scale("+_scale*this.scale+");position:Absolute;top:+"+imgcfg.top+";left:"+imgcfg.left+";z-index:200"
                    this.fixPartWithSvg(e,'bizi',styleStr)
                    this.hasBz = this._has
                    break;
                case 3:
                    var imgcfg = this.imgcfg.faxing[fileName]
                    var styleStr = "transform:scale("+7*this.scale+","+7*this.scale+");position:absolute;top:"+imgcfg.top+";left:"+imgcfg.left+";z-index:900"
                    this.fixPartWithSvg(e,'faxing',styleStr,imgcfg)
                    this.hasFx = this._has
                    break;
                case 4:
                    this.fixPartWithSvg(e,'lianxing')
                    this.hasLx = this._has
                    break;
                case 5:
                    var styleStr = "width:40%;position:Absolute;"+(this.sex==0?"top:15%;left:10%":"top:21.5%;left:8%")+";z-index:400"
                    var cloneStyleStr = "width:40%;position: Absolute;"+(this.sex==0?"top:15%;left:47%":"top:21.5%;left:45%")+";transform:scale(-1,1);z-index:400"
                    this.fixPart(e,true,'meimao',styleStr,cloneStyleStr)
                    this.hasMm = this._has
                    break;
                case 6:
                    var imgcfg = this.imgcfg.zb[fileName]
                    var styleStr = "position:Absolute;top:"+imgcfg.top+";left:"+imgcfg.left+";width:"+(this.sex==0?"37%":"32%")+";z-index:500"
                    this.fixPartWithSvg(e,'mouth',styleStr)
                    this.hasZb = this._has
                    break;
                default:
                    break;
            }
        },
        onLoadImg() {
            var self = this
            let _viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            function isOnHorizontalViewPort(ele) {
                let rect = ele.getBoundingClientRect();
                return rect.left > 0 && rect.left <= _viewPortWidth;
            };
            let num = document.getElementsByName('img').length; let img = document.getElementsByName("img"); let n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历 
            lazyload(); //页面载入完毕加载可是区域内的图片 
            function lazyload() { //监听页面滚动事件 
                let seeHeight = document.documentElement.clientHeight; //可见区域高度 
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度 
                for (let i = n; i < num; i++) { // 图片未出现时距离顶部的距离大于滚动条距顶部的距离+可视区的高度 
                    var curimg = img[i]
                    if (img[i] && (img[i].offsetTop < seeHeight + scrollTop) && isOnHorizontalViewPort(img[i])) {
                        if (img[i].getAttribute("src") == "static/assets/empty_mid.jpg") {
                            img[i].src = img[i].getAttribute("data-src");
                            // img[i].onerror=self.lstImgError
                        } n = i + 1;
                    }
                } 
            }
            //采用了节流函数 
            function throttle(fun, delay, time) {
                let timeout, startTime = new Date(); return function() {
                    let context = this, args = arguments, curTime = new Date(); clearTimeout(timeout); // 如果达到了规定的触发时间间隔，触发 handler 
                    if (curTime - startTime >= time) {
                        fun.apply(context, args); startTime = curTime; // 没达到触发间隔，重新设定定时器 
                    } else { timeout = setTimeout(fun, delay); }
                };
            };
            let myswiper = document.getElementById("category-head")
            myswiper.addEventListener('scroll', throttle(lazyload, 500, 100));
        },
        onSaveHead() {
            document.documentElement.scrollTop = 0
            this.$f7.confirm("", "确定保存形象?", () => {
                this.newImg(()=>{
                    this.$store.state.curHear = this.imgDataUrl
                    this.$router.push({path:'/share'})
                })
			}, () => {
			})
        }
    },
    mounted() {
        this.sex = this.$store.state.sex || 1
        this.color = this.$store.state.color || 0
        if(this.sex == 0){
            this.imgdata =  window.Global.imgData
            this.imgcfg =  window.Global.imgCfg
        }else{
            this.imgdata =  window.Global.imgData_w
            this.imgcfg =  window.Global.imgCfg_w
            console.log(this.imgcfg.bz)
        }
        this.selPart(2)
        this.$nextTick(() => {
            this.onLoadImg()
        })
        let _viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.scale = _viewPortWidth/417
    }
}
</script>
<style scoped>
.navFooter {
    height: 50px;
    line-height: 50px;
    background: #fff;
    position: fixed;
    width: 100%;
    min-width: 320px;
    bottom: 0;
    left: 0;
    z-index: 900;
    border-top: 1px solid rgba(170, 170, 170, 0.5);
}

.navFooter span {
    margin: 0;
    display: inline-block;
    float: left;
}

.navFooter span img {
    height: 100%;
}

.pre {
    width: 30%;
    height: 50px;
    line-height: 50px;
    border: none;
    color: #ffffff;
    font-size: 20px;
    margin: 0;
    padding: 0;
    background-color: #fa7699;
    border-radius: 0;
}

.grid_place {
    margin-bottom: 8px;
}

#category-head {
    width: 100%;
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden;
    z-index: 1000;
}

#category-head li {
    display: inline-block;
    width: 80px;
}

.swipeImg {
    width: 70%
}

.card-content-inner{
    padding: 0px 15px 0px 15px;
}
</style>
