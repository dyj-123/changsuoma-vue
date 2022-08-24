import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import weui from 'weui.js'
import 'weui'
Vue.prototype.$weui = weui
Vue.use(ElementUI);
Vue.config.productionTip = false
import wx from "weixin-jsapi";
// 在man.js中注册 weixin-jsapi
Vue.prototype.wx = wx
var axios = require('axios');
axios.defaults.baseURL = 'https://demo.shu.edu.cn/api';
// axios.defaults.baseURL = 'http://127.0.0.1:8081';
//日期时间格式化
import moment from 'moment'
Vue.prototype.$moment = moment

import VueTimepicker from 'vue2-timepicker'
Vue.use(VueTimepicker)
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem("access_token")) {
        console.log(localStorage.getItem("token"));
        config.headers.Authorization = localStorage.getItem("access_token");
        config.headers.OpenId = localStorage.getItem("openid");
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// axios.interceptors.response.use(
//     response => {
//       //当返回信息为未登录或者登录失效的时候重定向为登录页面
//       if (response.status === 401) {
//           localStorage.clear();
//           window.location.href="https://demo.shu.edu.cn:8080"
//        //   window.location.reload();
//       //   router.push({
//       //     path: "/",
//       //     query: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
//       //   })
//       }
//       return response;
//     },
//     error => {
//         localStorage.clear();
//          window.location.href="https://demo.shu.edu.cn:8080"
//         //window.location.reload();
//       return Promise.reject(error)
//     }
// );
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

