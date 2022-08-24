<template>
  <div :style="backgroundDiv">

    <h2 style="color: #182067;margin-top: 30%">上海大学进出扫码</h2>
    <img src="../../src/assets/scan.svg" class="scanbtn" type="primary" @click="scan">
<!--    <el-button type="success" @click=toPath>后台管理</el-button>-->
<!--    <el-dialog-->
<!--        title="提示"-->
<!--        :visible.sync="passVisible"-->
<!--       >-->
<!--      <pass :username="curUser.name" :address="address"/>-->

<!--      <span slot="footer" class="dialog-footer">-->
<!--      <el-button  @click="window.location.href=this.link">{{link}}</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
<!--    <el-dialog-->
<!--        title="提示"-->
<!--        :visible.sync="forbidVisible"-->
<!--    >-->
<!--&lt;!&ndash;      <forbid :username="curUser.name" :address="address" :reason="forbidreason"/>&ndash;&gt;-->
<!--      <a :href="link">跳转</a>-->
<!--      <span slot="footer" class="dialog-footer">-->

<!--&lt;!&ndash;    <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>&ndash;&gt;-->
<!--  </span>-->
<!--    </el-dialog>-->

  </div>
</template>


<script>
// import pass from "@/components/passcard/pass"
// import forbid from '@/components/passcard/forbid'
import {getTrueInfo} from "@/api/api";
import wx from "weixin-jsapi";

export default {
  components:{},
  data(){
    return {
      backgroundDiv : {
        width:'100%',//大小设置为100%
        height:'100%',
        // backgroundColor:'#2356dd',
        backgroundImage: 'url('+require('../../src/assets/shu1.jpeg')+')',
        backgroundRepeat : 'no-repeat',
        backgroundSize : '100% 100%',
        position:'fixed',
      },
      forbidVisible:false,
      passVisible: false,
      curUser:{
        name:'丁玉洁',
        phone:'17717052039'
      },
      address:'XXXX',
      forbidreason:''
    }

  },
  mounted() {
   this.forbidVisible = true;

    this.setWxConfig();
    this.getUserInfo();
  },
  methods : {
    toPath(){

      this.$router.push({path:'/accessmanage'})


    },
    async getUserInfo(){
      var data = (await getTrueInfo(localStorage.getItem("openid"))).data;
      if(data.code===200){
        this.curUser.phone=data.data[0].telephone;
        this.curUser.name = data.data[0].username;
      }
    },

    jinchu(placelink){
      // var formdata={
      //   "name":this.curUser.name,
      //   "phone":this.curUser.phone,
      //   "link":placelink
      // };
    //  placelink = "http://zwdt.sh.gov.cn/smzy/gbm/qiye?f=1&m=%2FfD0bkLLBIXXfRiWh0VlgqupBAVraDm0fdou1lPD%2FAwM95lqCJuxs4Na3Y1L%2F5ZL0xaM4BuPIlUWZzQlB8%2F3Eg%3D%3D"
        this.$router.push({path:'/pass',query:{phone:this.curUser.phone,link:placelink,name:this.curUser.nam}})
    },
    scan() {
      var placelink = "http://zwdt.sh.gov.cn/smzy/gbm/qiye?f=1&m=%2FfD0bkLLBIXXfRiWh0VlgqupBAVraDm0fdou1lPD%2FAwM95lqCJuxs4Na3Y1L%2F5ZL0xaM4BuPIlUWZzQlB8%2F3Eg%3D%3D"
      var phone = 17717052039
      var cardId = 3426231999032640
      var name = "丁玉洁"
      this.jinchu(placelink,phone,cardId,name)
       const self = this
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
           // 当needResult 为 1 时，扫码返回的结果
         //   alert(res.resultStr);
            self.jinchu(res.resultStr);

          },
          error: function(res) {
            console.log(res);
          }
        });

    },
  }
}
</script>

<style lang="less">
.scanbtn{
  position: absolute;
  left: 50%;
  top: 30%;
  width: 150px;
  height: 150px;
  transform: translateY(-50%);
  transform: translateX(-50%);
}
@media screen and (max-width: 500px) {
  .el-message-box {
    width: 60% !important;
  }

  .el-dialog__body{
    padding: 0 20px!important;
  }
  .el-dialog__header {
    padding: 10px 20px 10px!important;
  }

  .el-dialog{
    width:80%!important;
    //height: 55%!important;
    //display: flex;
    //flex-direction: column;
    //margin: 0 !important;
    //position: absolute;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
    //max-height: calc(100% - 30px);
    //max-width: calc(100% - 30px);


  }

}



</style>