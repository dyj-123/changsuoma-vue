<template>


  <div class="error-page">
    <div class="error-container">
      <div class="error-img"></div>
      无预约信息
    </div>
    <div class="footer">
      <img src="../../assets/shu-watermark.png" alt="logo" class="footer-logo">
    </div>
  </div>

</template>

<script>
</script>

<style>
body,html {
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
background-image: url("../../assets/bg.png");
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
background-image: url("../../assets/noData.png");
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