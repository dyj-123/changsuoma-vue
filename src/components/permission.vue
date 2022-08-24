<template>


  <div class="error-page">
    <div class="error-container">
      <div class="error-img"></div>
      <el-button type="primary" @click="allow">允许应用获取信息</el-button>
    </div>
    <div class="footer">
      <img src="../assets/shu-watermark.png" alt="logo" class="footer-logo">
    </div>
  </div>

</template>

<script>

export default {
  name:'permission',
  data() {
    return{

    }
  },
  methods:{

    allow(){
      // alert(this.link)
      // if(this.link!=null&&this.usertoken!=null){
        this.$router.push({path: '/jinchu/scan',query:{ link:this.link,access_token:this.usertoken}});
      // }


    }

  },
  mounted() {
    this.link  = this.$route.query.link;
    this.usertoken = this.$route.query.access_token;
  }

}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.error-page {
  min-height: 100vh;
  background-color: rgb(1, 83, 191);
  padding-top: 80px;
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.error-container {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  max-width: 400px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: rgb(1, 83, 191);
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  padding: 40px 0;
}

.error-img {
  background-image: url("../assets/permission.svg");
  background-repeat: no-repeat;
  background-size: contain;
  max-width: 85%;
  height: 300px;
  margin: 0 auto 40px auto;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  text-align: center;
}
</style>