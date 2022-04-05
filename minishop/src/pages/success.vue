<template>
  <div>
    <nav-header></nav-header>
    <div class="success">
      <div class="container">
        <div class="goods">
          <div class="success-img">
            <img src="/imgs/buy/success.png" alt />
          </div>
          <div class="good-info">
            <h3>已成功加入购物车</h3>
            <span>{{info}}</span>
          </div>
        </div>
        <div class="actions">
          <div class="goback">
            <a @click="goBack">返回上一级</a>
          </div>
          <div class="gocart">
            <a @click="goToCart">去购物车结算</a>
          </div>
        </div>
      </div>
      <service-bar></service-bar>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "../components/NavHeader.vue";
import NavFooter from "../components/NavFooter.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  name: "success",
  data() {
    return {
      info: this.$route.query.info
    };
  },
  components: {
    NavHeader,
    NavFooter,
    ServiceBar
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    goToCart() {
      this.$router.push("/cart");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.success {
  background-color: #f5f5f5;
  .container {
    @include flex();
    padding: 38px 20px;
    .goods {
      @include flex(flex-start, flex-start);
      .success-img {
        width: 64px;
        height: 64px;
        img {
          width: 100%;
        }
      }
      .good-info {
        margin-left: 20px;
        h3 {
          font-size: $fontE;
          font-weight: 400;
        }
        span {
          font-size: $fontJ;
          color: #757575;
          display: inline-block;
          margin-top: 5px;
        }
      }
    }
    .actions {
      @include flex(flex-start);
      a {
        @include menu-a();
        width: 180px;
        height: 38px;
        line-height: 38px;
        font-size: $fontJ;
        border: 1px solid #b0b0b0;
        margin-left: 20px;
        cursor: pointer;
      }
      .gocart {
        padding-right: 20px;
        a {
          background-color: $colorA;
          color: $colorG;
          border-color: $colorA;
        }
      }
    }
  }
}
</style>