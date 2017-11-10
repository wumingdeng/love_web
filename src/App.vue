<template>
  <f7-views style='z-index:1000;' id="app">
    <div v-show="showLoading" class="loading">
      <span style="height:100%;vertical-align:middle;display:inline-block;"></span>
      <div style="vertical-align:middle;display:inline-block;">
        <img style="vertical-align:middle" :src="loadingImg"></img>
        <p style="display:block;margin-top:0">载入中...</p>
      </div>
      </img>
    </div>
    <router-view></router-view>
  </f7-views>
</template>

<script>
// import navFooter from './views/navFooter'
import g from './globals/global.js'
import wxApi from './utils/wxApi.js'
export default {
  data() {
    return {

    }
  },
  mounted() {
  },
  created() {
  },
  computed: {
    showLoading() {
      return Global.s.state.isloading
    },
    loadingImg() {
      return "static/assets/loading.gif" + Global.verStr
    }
  }
}
</script>

<style>
.navbar .center {
  font-weight: normal !important;
}

.color-black i.icon,
i.icon.color-black {
  color: #515151;
}

.button.button-fill.color-deepgreen {
  color: #fff;
  background-color: #68cfc1
}

label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox {
  background-color: #fc5475
}

i.icon.icon-back {
  background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%…-8%2C8l8%2C8l-2%2C2L0%2C10L10%2C0z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E);
}

.loading {
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0
}
.card-header {
		padding: 0 15px;
		height: 40px;
		min-height: 40px;
	}
	.card{
    	box-shadow: 0 1px 1px rgba(0,0,0,.3);
	}

  .toolbar-inner{
      position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.swiper-wrapper{
  position: relative;
    width: 100%;
    height: 100%;
    z-index: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    -o-transition-property: -o-transform;
    -ms-transition-property: -ms-transform;
    transition-property: transform;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
}
</style>
