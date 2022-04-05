<template>
  <div>
    <div class="nav-bar">
      <div class="container">
        <div class="pro-title">
          <span>{{productName}}</span>
        </div>
        <div class="params">
          <div class="left">
            <a href="https://www.mi.com/redminote11">Note 11 5G</a>
            <a href="https://www.mi.com/redminote9-4g">Note 9 4G</a>
          </div>
          <div class="right">
            <ul>
              <li>
                <a href="javacript:;">概述页</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">参数页</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">F码通道</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">咨询客服</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">用户评价</a>
              </li>
              <li>
                <slot name="buy"></slot>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-bar hide-nav-bar" :class="{is_Fixed:isFixed}">
      <div class="container">
        <div class="pro-title">
          <span>{{productName}}</span>
        </div>
        <div class="params">
          <div class="left">
            <a href="https://www.mi.com/redminote11">Note 11 5G</a>
            <a href="https://www.mi.com/redminote9-4g">Note 9 4G</a>
          </div>
          <div class="right">
            <ul>
              <li>
                <a href="javacript:;">概述页</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">参数页</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">F码通道</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">咨询客服</a>
                <span>|</span>
              </li>
              <li>
                <a href="javacript:;">用户评价</a>
              </li>
              <li>
                <slot name="buy"></slot>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-params",
  data() {
    return {
      isFixed: false,
      productName: ""
    };
  },
  mounted() {
    // 添加滚动条事件
    window.addEventListener("scroll", this.initHeight);
    // 获取当前商品
    this.getProductInfo();
  },
  methods: {
    // 判断组件是否吸顶, 加载动画效果
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 251 ? true : false;
    },
    getProductInfo() {
      let productId = this.$route.params.id;
      console.log("id=>", productId);
      this.$axios.get(`/products/${productId}`).then(product => {
        this.productName = product.name;
      });
    }
  },
  destroyed() {
    // 销毁页面时也销毁initHeight事件, 防止在其他页面也不停的计算scroll
    window.removeEventListener("scroll", this.initHeight, false);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.hide-nav-bar {
  position: absolute;
  top: -64px;
  left: 0px;
  width: 100%;
  transition: top 0.3s linear;
  &.is_Fixed {
    position: fixed;
    top: 0px;
    width: 100%;
    margin-top: 0;
    opacity: 1;
    box-shadow: 0 5px 5px rgb(0 0 0 / 7%);
  }
}
.nav-bar {
  height: 63px;
  line-height: 63px;
  border-top: 1px solid $colorE;
  box-shadow: 0 5px 5px rgb(0 0 0 / 7%);
  background-color: $colorG;
  z-index: 10;
  .container {
    .pro-title {
      float: left;
      font-size: $fontH;
    }
    .params {
      .left {
        float: left;
        a {
          margin-left: 20px;
          color: $colorC;
          position: relative;
          font-size: $fontK;
          &:before {
            content: "";
            position: absolute;
            top: 2px;
            left: -10px;
            background-color: $colorC;
            width: 1px;
            height: 10px;
          }
          &:hover {
            color: $colorA;
          }
        }
      }
      .right {
        float: right;
        ul {
          li {
            float: left;
            font-size: $fontJ;
            position: relative;
            a {
              color: $colorC;
              margin-left: 30px;
              &:hover {
                color: $colorA;
              }
            }
            span {
              position: absolute;
              top: -2px;
              right: -15px;
              color: $colorF;
            }
          }
        }
      }
    }
  }
}
</style>