<template>
<div>

</div>
</template>

<script>
import {auth,  IsPhoneBound} from "@/api/api";

export default {
  name: "login",
  data() {
    return{
      accesstoken: '',
      openid:'',
      refresh_token:''
    }
  },
created() {


    //let code = this.GetParam(window.location.href, "code");

    var code = this.getQueryVariable("code");

    if (code!=undefined) {
      //这里可以进行后续操作 已经能出现code了 一般是调用接口发送给后台这个code码以换取openid或者token码
     // alert(code)
      this.getOpenId(code)
    }else {
      this.toWx()
    }
  },

  methods:{
    //验证token是否过期
    //获取openid
    async getOpenId(code){
      var data = (await auth(code)).data;
      if(data.code===200){
        //  alert('openid='+data.data.openid)
        this.openid = data.data.openid;
        this.accesstoken = data.data.access_token;
        this.refresh_token = data.data.refresh_token
        localStorage.setItem("openid",this.openid);
        localStorage.setItem("access_token",this.accesstoken);
        localStorage.setItem("refresh_token",this.refresh_token);
        this.getUserInfo()

      }
    },

    async getUserInfo(){
      var data =(await IsPhoneBound(this.openid)).data;
      if(data.code===200){
      //  alert('name='+data.data.nickname)
        //先通过openid判断该用户是否已绑定，若已绑定则不进行操作，直接进入扫码页面，若未绑定则弹出窗口要用户绑定
        //alert(data.count)
        if(data.count>0){//已经绑定
          //alert("已经绑定")
          localStorage.setItem("telephone",data.data[0].telephone);
          window.location.href = "https://demo.shu.edu.cn:8080/#/wxtest";
        }else {
         // alert("尚未绑定")
       //   window.location.href = "http://dyjdtc.nat300.top/#/phone";
          this.$router.push('/phone')
        //  window.location.reload();
        }

      }
    },

    //拿到微信code
    async toWx() {
      // 授权回调
     // let local = window.location.href.split("#")[0];
      let redirect_uri =  encodeURI('https://demo.shu.edu.cn:8080')
      let url =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe159154b9c18e5df&redirect_uri=" +
          redirect_uri+"&response_type=code&scope=snsapi_base"+
         '&state=1#wechat_redirect';
      console.log("window.location.href", window.location.href);
      //let code = this.GetParam(window.location.href.split("#")[0], "code");
      var code = this.getQueryVariable("code");
      if (!code) {
        window.location.href = url;
        // console.log("code", code);
      } else {
        code = this.getQueryVariable("code");
     //   console.log("code", code);
      }
    },

    getQueryVariable (variable) {
   //   alert(window.location.href)
      const after1 = window.location.href.split('?', 2)[1];
      if(after1){
        const after = after1.split('#/')[0];
        console.log(after)
        if (after) {
          const reg = new RegExp('(^|&)' + variable + '=([^&]*)(&|$)')
          const r = after.match(reg)
          if (r != null) {
            return decodeURIComponent(r[2])
          } else {
            return false
          }
        }
      }
    }
  },




}
</script>

<style scoped>

</style>