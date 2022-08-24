<template>
  <div>
    <div class="menubar" @touchmove.prevent>
      <div class="menubar-bg" :class="xd_flag&&'xd-active'"></div>
      <div class="logo">
        <!-- <img src="../../public/images/logo.png" alt="" height="36px" style="margin-top:12px"> -->
        <!--      <img src="https://gitee.com/static/images/logo.svg?t=158106664" alt="" height="30px" style="margin-top:15px">-->

      </div>

      <ul style="margin:0;padding:0;">

        <div class="xys-info">
          <img src="http://ccnuer114282.gitee.io/education_platform/dist/static/img/login.d0fc2f12.png" alt="">
          <div>未登录</div>
          <hr>
        </div>
        <li><a style="color: white!important;" disabled>
          <span class="icon"><i aria-hidden="true"></i></span>
          <span style="font-size: 24px;font-weight: bold" >后台管理系统</span>
        </a></li>
        <li><a href="#/accessmanage">
          <span class="icon"><i aria-hidden="true"></i></span>
          <span class="title" :class="index=='1'&&'nav-active'">进出管理</span>
        </a></li>
        <li><a href="#/usermanage">
          <span class="icon"><i aria-hidden="true"></i></span>
          <span class="title" :class="index=='2'&&'nav-active'">人员管理</span>
        </a></li>
        <li><a href="#/phone">
          <span class="icon"><i aria-hidden="true"></i></span>
          <span class="title" :class="index=='3'&&'nav-active'">等</span>
        </a></li>

      </ul>
      <div class="user">
        <div class="userimg">
          <img src="http://ccnuer114282.gitee.io/education_platform/dist/static/img/login.d0fc2f12.png" alt="">
        </div>
        <div class="username">未登录</div>
      </div>
      <div id="toggleBar" class="bar"><img src="http://ccnuer114282.gitee.io/education_platform/dist/static/img/nav.b716be73.png" alt="" class="nav-logo"></div>
    </div>
    <div style="">

    </div>
  </div>






</template>
<script>
export default {
  data(){
    return{
      xd_flag:false,
    }
  },
  computed:{
    index(){
      // vue-router 激活css高亮属性.nav-active
      //事先要根据自己的需求定义好路由
      let path = this.$route.name;
      console.log(path)
      switch(path){
        case 'accessmanage':
          return 1;
        case 'usermanage':
          return 2;
        case 'PaperList':
          return 3;
        case 'SubPaper':
          return 3;
        case 'Journal':
          return 4;
        case 'Policy':
          return 5;
        case 'Patent':
          return 6;
        case 'Conference':
          return 7;
        case 'Recommendation':
          return 9;
      }
      return 0;
    }
  },
  mounted(){
    let that = this;

    let toggleBar = document.getElementById('toggleBar');
    let MenubarUl = document.querySelector('.menubar ul');
    let LeftSildeMenubar = document.querySelector('.menubar ul');

    //显示侧滑导航栏
    toggleBar.onclick = function() {
      LeftSildeMenubar.classList.toggle('active');
      document.body.style.overflow = 'hidden';
    }

    //隐藏策划导航栏
    MenubarUl.onclick = function() {
      LeftSildeMenubar.classList.remove('active');
      document.body.style.overflow = 'scroll';
    }

    //吸顶
    window.onscroll = function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop==0){
        that.xd_flag = false;
      }else{
        that.xd_flag = true;
      }
    }
  },
}
</script>
<style lang="scss" scoped>

.nav-active{
  color: white !important;
  font-weight: bold !important;
  border-bottom: 2px solid white !important;
  box-sizing: border-box !important;
  height: 60px;
  transition: none !important;
}
.nav-logo{
  display: none;
  width: 30px;
  margin-top: 15px;
  vertical-align: middle;
  margin-left: 15px;
}
.xd-active{
  opacity: 1 !important;
  box-shadow: 0 0 6px #0d0d0dab;
}
.xys-info{
  display: none;
}
.content {
  width: 100%;
  height: 100%;
  text-align: center;
}

.menubar {
  background-color: #2c3e50;
  position: fixed;
  width: 100%;
  top: 0;
  height: 60px;
  display: flex;
  flex-direction: row;
  user-select: none;
  z-index: 100;
}

.menubar-bg{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  z-index: -1;
  background: linear-gradient(-150deg, #389c8d, #3c4f7e);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.menubar .logo {
  min-width: 80px;
  width: 5%;
  text-align: center;
}

.menubar .logotitle {
  width: 100%;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
}

.menubar .user {
  width: 20%;
  min-width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 30px;
  align-items: center;
  cursor: pointer;
}

.menubar .user .userimg {
  width: 60px;
  height: 60px;
}

.menubar .user .userimg img {
  width: 36px;
  height: 36px;
  margin-top: 12px;
  margin-right: 0px;
  border-radius: 50%;
}

.menubar .user .username {
  font-size: 14px;
  color: #eee;
  height: 60px;
  line-height: 60px;
}

.menubar ul {
  position: relative;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  text-align: center;
}

.menubar ul li {
  min-width: 50px;
  list-style: none;
  margin-left: 20px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.menubar ul li a {
  position: relative;
  display: block;
  width: 100%;
  line-height: 60px;
  text-decoration: none;
}

.menubar ul li a:hover span{
  transition: all 0.3s ease;
  color: #eee;
}

.menubar ul li a .icon {
  display: none;
}

.menubar ul li a .title {
  position: relative;
  display: block;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  color: #bbb;
}

.list {
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
  align-items: center;
}

.list .item {
  flex-basis: 23%;
  margin-top: 22px;
  height: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: .314s;
  cursor: pointer;

}

.list .item:hover{
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.list .item .desc {
  width: 90%;
  margin: 16px;
  flex-basis: 80%;
  background-color: #f5f5f5;
}

.list .item .title {
  width: 90%;
  margin: auto 16px;
  margin-bottom: 16px;
  flex-basis: 20%;
  background-color: #f5f5f5;
}

.footer{
  position: relative;
  bottom: 0;
  height: 172px;
  color: #a5a5a5;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  line-height: 36px;
}

/* 响应式 */
@media (max-width:1060px) {
  .nav-logo{
    display:block;
  }
  .nav-active{
    color: white !important;
    font-weight: bold !important;
    border-bottom: none !important;
    box-sizing: border-box !important;
    height: 60px;
    transition: all 0.1s ease-in;
  }
  .xys-info{
    display: block;
    margin-top: 20px;
    color: #aaa;
    img{
      width: 60px;
      margin-bottom: 10px;
    }
    hr{
      width: 80%;
      margin-left: 10%;
      margin-top: 20px;
      margin-bottom: 20px;
      border: none;
      height: 2px;
      border-radius: 10rem;
      background: #ccc;
    }
    div{
      cursor: pointer;
    }
  }
  .menubar {
    position: fixed;
    top: 0;
    display: block;
    height: 60px;
    transition: .321s;
  }

  .menubar .logo {
    position: absolute;
    width: 100%;
    top: 0;
    text-align: center;
  }

  .menubar .logotitle {
    width: 100%;
    line-height: 60px;
    font-size: 20px;
    color: #fff;
  }

  .menubar ul {
    width: 0px;
    position: fixed;
    height: 100vh;
    left: -60px;
    display: flex;
    flex-direction: column;
    background-color: #282c34;
    overflow: hidden;
    transition: .141s;
    z-index: 10;
    box-shadow: 6px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }

  .menubar ul.active {
    left: 0;
    width: 260px;
    transition: .314s;
  }

  .menubar ul.active::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    z-index: -1;
  }

  .menubar ul li {
    width: 100%;
  }

  .menubar ul li a {
    display: flex;
    flex-direction: row;
  }

  .menubar ul li a .icon {
    position: relative;
    display: block;
    min-width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    display: block;
  }

  .menubar ul li a .title {
    position: relative;
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }

  .menubar .bar {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

  .menubar .user .username {
    display: none;
  }

  .list .item {
    flex-basis: 45%;
    margin-top: 12px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
}

@media (max-width:480px) {
  .list .item {
    flex-basis: 100%;
    margin-top: 12px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
}

</style>
