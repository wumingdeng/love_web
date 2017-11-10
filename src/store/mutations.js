const mutations = {
  ['GET_WXID'] (state, value){
    state.wxid = value || state.wxid || 666;
  },  
  ['USERINFO'](state,value) {
    state.userinfo = {...state.userinfo,...value}
    state.userinfo.isFinishInfo = true;
    state.isLogin = true;
  },
  ['SWIPEDATA'] (state, value){
    state.swipeData = value || state.swipeData;
  },
  ['PRODUCTDATA'] (state, value){
    state.productData = value || state.productData;
  },  
  ['PRODUCTDETAIL'] (state, value){
    state.productDetail = value || state.productDetail;
  }, 
  ['PRO_NAME'] (state, value){
    state.pro_name = value || state.pro_name;
  }, 
  ['PRO_DATE'] (state, value){
    state.pro_date = value || state.pro_date;
  }, 
  ['PRO_PRICE'] (state, value){
    state.pro_price = value || state.pro_price;
  },
  ['LOADING'] (state, value){
    state.isloading = value || state.isloading;
  },
}

export default mutations
