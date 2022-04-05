<template>
  <!-- 公共底部组件 -->
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/icon-shoplogo.png" alt />
      <p>EASY购商城</p>
    </div>
    <div class="aboutUs">
      <a href="javascript:;">关于我们</a>
      <span>|</span>
      <a href="javascript:;">联系我们</a>
      <span>|</span>
      <a href="javascript:;">联系客服</a>
      <span>|</span>
      <a href="javascript:;">合作招商</a>
    </div>
    <div class="copyright">Copyright ©Chloe_minishop.com 版权所有</div>
  </div>
</template>

<script>
export default {
  name: "nav-footer"
};
</script>

<style scoped lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.footer {
  height: 233px;
  color: $colorG;
  background-color: $colorB;
  border-top: 5px solid $colorA;
  .footer-logo {
    @include flex(center);
    flex-direction: column;
    img {
      margin-top: 46px;
      margin-bottom: 13px;
      border-radius: 10px;
    }
  }
  .aboutUs {
    @include flex(center);
    margin-top: 31px;
    a {
      @include menu-a($colorG);
      margin: 0 10px;
      &:hover {
        color: $colorA;
      }
    }
  }
  .copyright {
    @include flex(center);
    margin-top: 10px;
  }
}
</style>