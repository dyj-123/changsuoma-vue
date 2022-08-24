<template>


  <div :style="backgroundDiv">
<!--    <img style="width: 100%;z-index: -1" src="../../../src/assets/shu.png">-->
    <div class="main">
      <el-card  class="card" style="padding: 0;margin-left:auto; margin-right:auto; width: 90%;max-width: 400px">
        <h3 :style="fontcolor">{{curusername}}</h3>
        <div style="border-top:1px dashed #cccccc;height: 1px;overflow:hidden;margin-top:5px;margin-bottom: 5px"></div>
        <h2 style="color: #454448">{{ $moment(date).format('YYYY-MM-DD HH:mm:ss') }}</h2>
        <el-row style="margin-top: 10px;"  >
          <div v-if="pass===1">
<!--            <span style="font-size: 14px">请长按识别二维码跳转至随申办</span>-->
<!--            <div  id="qrcode" ref="qrcode" class="qrcode"></div>-->
            <img :src="passimgs"  style="width: 90%;">
          </div>

          <img v-else :src="forbidimgs" style="width: 90%"/>
        </el-row>
        <el-row class="address">
          <span class="time">{{curaddress}}</span>
          <br>
          <span style="font-size: 14px;color: orangered" v-if="reason!=''"> <i class="el-icon-warning"></i> {{reason}}</span>
          <span style="font-size: 14px;color: #22b073" v-else> <i class="el-icon-success"></i> 允许通行</span>
        </el-row>
        <!--      <el-row class="">-->
        <!--        <span style="font-size: 14px;" v-if="reason!=''"> <i class="el-icon-warning"></i> {{reason}}</span>-->
        <!--      </el-row>-->

      <el-row style="padding: 0;margin-top: 30px ">
        <el-col :span="12">
          <el-card class="code">
            <h4 >健康码</h4>
            <el-row>
              <h3 v-if="color==='绿'" style="color: #22b073;">{{color}}色</h3>
              <h3 v-if="color==='红'" style="color: #cb1414;">{{color}}色</h3>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="rightbox">
            <h4 >核酸检测</h4>
            <el-row>
              <span style="font-size: 12px">{{hesuanresult}}</span>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
        <div class="bottom clearfix">
          <span >上海大学进出通行卡</span>
        </div>
      </el-card>
    </div>
  </div>


</template>

<script>
import {getPass, getUserInfoByPhone, getUserInfoByToken} from "@/api/api";
// import QRCode from 'qrcodejs2';
export default {
  name: "pass",

  // props: ['username','address'],
  // watch:{
  //   username:{
  //     handler:function (val){
  //       this.curusername = val;
  //     }
  //   },
  //   address:{
  //     handler:function (val){
  //       this.curaddress = val;
  //     }
  //   }
  // },

  data(){
    return{
      fontcolor:{
        color:'#454448'
      },
      usertoken:'',
      hesuanresult:'48小时阴性',
      appSrc: '',
      pass:2,
      phone:'',
      username:'',
      link:'',
      cardId:'',
      color:'绿',
      reason:'',
      backgroundDiv : {
        width:'100%',
        height:'100%',
        backgroundColor:'rgb(1, 83, 191)',
        backgroundRepeat : 'no-repeat',
        backgroundSize : 'contain',
        position:'fixed',
        backgroundImage: "url(" + require("../../../src/assets/shu.png") + ")",
        display: 'table'
      },

      passimgs: require("../../../src/assets/shulab.png"),
      forbidimgs: require("../../../src/assets/shulabno.png"),
      warnimg:require("../../../src/assets/warn.svg"),
      curusername:'',
      curaddress:'',
      date:new Date(),
      formdata:{
        "name":'',
        "phone":'',
        "link":''
      }
    }
  },
  methods:{
    async getUserInfo(){
      var data = (await getUserInfoByPhone(this.phone)).data;
      if(data.code===200){
        this.curusername = data.data.username;
        this.color = data.data.color;
        this.hesuanresult=data.data.hesuanresult;
        if(this.hesuanresult==="72小时无核酸记录"){
          this.reason="近72小时无核酸记录"
          this.passimgs = require("../../../src/assets/shulabno.png")
        }

      }else {
        this.curusername = "您是非授权用户，请先授权";
        this.fontcolor.color = "#bf3737"
        // this.$router.push('/forbid')
      }
    },
    async getUserInfoToken(){
      var data = (await getUserInfoByToken(this.usertoken)).data;
      if(data.code===200){
        this.curusername = data.data.username;
        this.color = data.data.color;
        this.hesuanresult=data.data.hesuanresult;
        this.phone = data.data.telephone;
        if(this.hesuanresult==="72小时无核酸记录"){
          this.reason="近72小时无核酸记录"
          this.passimgs = require("../../../src/assets/shulabno.png")
        }
      }else {
        this.curusername = data.msg;
        this.fontcolor.color = "#bf3737"
        // this.$router.push('/forbid')
      }
      this.jinchu();
    },
    async jinchu(){
      var formdata={
        "phone":this.phone,
        "link":this.link,
        "cardId":this.cardId
      };
      var data = (await getPass(formdata)).data;
      if(data.code===200){
        this.pass = 1;
        this.curaddress = data.data[0].address
        // this.getCoed(this.link)
      }else{

        if(data.data.length===0){
          this.curaddress="没有这个地址"
        }else {
          if(data.data[0].address!=undefined){
            this.curaddress = data.data[0].address
          }else {
            this.curaddress = data.data[0].companyremark
          }

        }
        this.reason = data.msg ;
        this.pass = 0;
      }
    }

  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000),

    // this.phone  = this.$route.query.phone;
    // this.username  = this.$route.query.name;
    // this.cardId = this.$route.query.cardId;
    this.link  = this.$route.query.link;

    this.usertoken = this.$route.query.access_token;
    // this.cardId = this.$route.query.cardId;
    // alert(this.$route.query.cardId)


    this.getUserInfoToken();
    // this.jinchu();

  }
}
</script>

<style lang="less">
#app{
  margin-top: 0!important;
}
.code{
  margin-right: 5px;padding: 0!important;
  background-repeat: no-repeat;
  background-image: url("../../assets/code.svg");
  height: 94px;

}
.rightbox{
  margin-left: 5px;
  background-repeat: no-repeat;
  background-image: url("../../assets/hesuan.svg");
  height: 94px;

}

.address{
  margin-top: 30px;
  padding: 15px;
  background: #d6edfd;
  border-radius:5px;
  margin-bottom: 10px;
}
.qrcode{
  display:flex;
  justify-content: center;
  align-items: center;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin:  0!important;
}
@media screen and (max-height: 610px){
  .card{
    margin-top: 30px!important;

  }
  .el-card__body{
    padding: 15px!important;
  }
  .passicon{
    height: 180px;
  }

}
//@media screen and (max-height: 510px){
//  .card{
//    margin-top: 20px!important;
//
//  }
//  .el-card__body{
//    padding: 15px!important;
//  }
//  .passicon{
//    height: 150px;
//  }
//
//}
@media screen and (max-width: 500px) {


  .time{
    color: #182067;
    font-size: 15px;
  }
  .spanstyle{
    color: dimgrey;
    font-size: 15px;
    line-height: 35px;
  }
  .passicon{
    width: 70%;
  }
  .row{
    margin-top: 20px;
  }
}
.main{

  width: 100%;
  height: 100%;
  display: table-cell;
  vertical-align: middle;


}


 .time {
   font-size: 13px;
   color: rgba(9, 10, 12, 0.7);
 }

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>