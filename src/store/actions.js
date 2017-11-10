// import g from '../globals/global'
import g from '../globals/global'

var serverAddress
if (process.env.NODE_ENV == 'development') {
  serverAddress = g.debugServerAddress;
} else {
  serverAddress = g.serverAddress;
}

function onErrorRefresh(vue, err) {
  // vue.$f7.params.modalButtonOk = '刷新'
  alert(err || '刷新重试', () => {
    // window.location.reload(); 
  })
}

function onErrorHandler(errCode) {
  if (errCode == 99) {
    //token过期了
    Global.s.state.isLogin = false; //重新登录
    Global.v.$router.push('/')
  } else if (errCode == 100) {
    Global.v.$f7.alert('', '无效的优惠码')
  }
}

export function quickloginwxUser({ commit, state }, data) {
  var self = data.self;
  data.info.token = self.$store.state.token  //带上token
  console.log(self)
  self.$http.post(serverAddress + '/api/quickloginwxUser', data.info)
    // self.$http.post(g.wechatServerAddress + '/api/auth', data.info)
    .then((response) => {
      // success callback
      self.$f7.hidePreloader()
      self.$store.state.isloading = false;
      console.log(response)
      data.callback(self, response)
    }, (response) => {
      // error callback
      self.$f7.alert('登录失败')
      onErrorRefresh(self);
    });
}

//保存用户资料
export function updateInfo({ commit, state }, data) {
  var self = data.self;
  data.info.token = self.$store.state.token  //带上token
  console.log(self)
  self.$http.post(serverAddress + '/api/updateInfo', data.info)
    .then((response) => {
      // success callback
      self.$f7.hidePreloader()
      console.log(response)
      if (response.body.err) {
        onErrorHandler(response.body.err)

      } else {
        if (data.callback) {
          data.callback(self, response)
        }
      }
    }, (response) => {
      // error callback
      onErrorRefresh(self);
    });
}

//取我的管家信息
export function mgrlistUser({ commit, state }, data) {
  var self = data.self;
  self.$http.post(serverAddress + '/api/getMrgs', data.info)
    .then((response) => {
      self.$f7.hidePreloader()
      console.log(response)
      if (response.body.err) {
        onErrorHandler(response.body.err)
      } else {
        if (data.callback) {
          data.callback(self, response)
        }
      }
    }, (response) => {
      onErrorRefresh(self);
    });
}

//用户预约
export function userCareConfirm({ commit, state }, data) {
  var self = data.self;
  data.info.token = self.$store.state.token  //带上token
  self.$http.post(serverAddress + '/api/userCareConfirm', data.info)
    .then((response) => {
      self.$f7.hidePreloader()
      console.log(response)
      if (response.body.err) {
        onErrorHandler(response.body.err)
      } else {
        if (data.callback) {
          data.callback(self, response)
        }
      }
    }, (response) => {
      // error callback
      onErrorRefresh(self);
    });
}


//获取某个产检记录
export function getExams({ commit, state }, data) {
  var self = data.self;
  self.$http.post(serverAddress + '/api/getExams', data.info)
    .then((response) => {
      console.log(response)
      self.$f7.hidePreloader()
      if (response.body.err) {
        onErrorHandler(response.body.err)
      } else {
        if (data.callback)
          data.callback(self, response);
      }
    }, (response) => {
      // error callback
      onErrorRefresh(self);
    });
}


//提交产检记录
export function staffSubmitExam({ commit, state }, data) {
  var self = data.self;
  self.$http.post(serverAddress + '/staffSubmitExam', data.info)
    .then((response) => {
      // success callback
      console.log(response)
      self.$f7.hidePreloader()
      if (response.body.err) {
        onErrorHandler(response.body.err)
      } else {
        if (data.callback)
          data.callback(self, response);
      }

    }, (response) => {
      // error callback
      onErrorRefresh(self);
    });
}