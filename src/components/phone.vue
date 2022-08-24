<template>
  <div class="login">
    <h2>手机号绑定</h2>
    <div class="account">
      <phone-login
          :rule-form="phoneForm"
          @send="send"
          @submit="submit"
          @errHandle="errHandle">
      </phone-login>
    </div>
  </div>
</template>

<script>
import PhoneLogin from '../components/InputGroup'
import {getPhoneCode, validPhone} from "@/api/api";

export default {
  name: 'Login',
  components: { PhoneLogin},
  props:{},
  data(){
    return{
      phoneForm: {
        phone: '',
        code: ''
      }
    }
  },
  methods:{
    async getCode(){
      var data =(await getPhoneCode(this.phoneForm.phone)).data;
      this.$message.info(data.msg)

    },

   async submit(){
     var formdata={
       "phone":this.phoneForm.phone,
       "code":this.phoneForm.code,
       "openid":localStorage.getItem("openid"),
       "access_token":localStorage.getItem("access_token")
     };

      var data = (await validPhone(formdata)).data
      if(data.code===200){
        localStorage.setItem("telephone",this.phoneForm.phone)
        this.$message.success(data.msg)
        window.location.href="https://demo.shu.edu.cn:8080/#/wxtest"
      }

    },
    errHandle(){
      this.$message.error('表单填写有误，请检查')
      console.log("失败")
    },
    send(){
      this.getCode();
    }
  },
  mounted(){

  }
}
</script>

<style scoped lang="less">

@media screen and (max-width: 500px) {
  .login {
    width: 90% !important;

  }
  .account{
    width: 100%!important;
  }
}
.login{
  margin: 5%;
}

</style>

