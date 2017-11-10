<template>
    <f7-page :pull-to-refresh-layer="false" navbar-fixed navbar-through toolbar-fixed>
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
        <f7-card style="text-align: center">
            <f7-card-content>
                <img :src="this.$store.state.curHear" style="width:80%;position:relative;right:5%">
            </f7-card-content>
        </f7-card>
        <f7-button style='width:70%;margin:0px auto 0px auto;background: linear-gradient(to right, #5dc9b7 , #6fdcc0)' big fill @click="onShare">分享</f7-button>
        <f7-toolbar tabbar style='background-color:#ffffff;height:50px;overflow:hidden'>
            <f7-link>
                <span style="color:#515151;font-size:12px">首页</span>
            </f7-link>
            <f7-link @click.native="$router.push('/userInfo')">
                <span style="color:#515151;font-size:12px">精选</span>
            </f7-link>
            <f7-link @click.native="$router.push('/userInfo')">
                <span style="color:#515151;font-size:12px">个人中心</span>
            </f7-link>
        </f7-toolbar>
    </f7-page>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            isMan: false,
            color: 0, // 0 , 正常 ，1 偏白，2偏黑
        }
    },
    computed: {
    },
    methods: {
        onShare() {
        },
    },
    mounted() {
        // console.log("imgData :"+this.$store.state.curHear)
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
</style>
