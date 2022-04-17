<template>
  <div class="order-header">
    <div class="container">
      <div class="left">
        <div class="logo">
          <a @click="goHome">
            <img src="/imgs/icon-shoplogo.png" alt />
          </a>
        </div>
        <div class="title">
          <h3>{{title}}</h3>
          <span v-if="title != '支付订单'">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
      </div>
      <div class="right">
        <div class="user-info">
          <el-dropdown>
            <span>
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-goods"
                class="el-dropdown-item"
                @click.native="goToOrderList"
              >我的订单</el-dropdown-item>
              <el-dropdown-item
                icon="el-icon-back"
                class="el-dropdown-item"
                @click.native="logout"
              >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span>|</span>
        <div class="myorder">
          <a @click="goToOrderList">我的订单</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-header",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    username() {
      return this.$store.getters.currentUser;
    },
    userShow() {
      return this.show
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if(sessionStorage.getItem('username') == 'null') {
        this.$router.push({
          path: '/login',
          query: {
            change: true
          }
        })
      }
      if (this.$route.path === "/confirm") {
        this.title = "确认订单";
      } else if (this.$route.path === "/cart") {
        this.title = "我的购物车";
      } else {
        this.title = "支付订单"
      }
    },
    goHome() {
      this.$router.push("/");
    },
    goToOrderList() {
      this.$router.push("/list");
    },
    logout() {
      // 1. 清除sessionStorge和vuex中的用户名和token
      this.$store.dispatch("setUser", null);
      // 返回上一页
      this.$message({
        type: "success",
        message: "退出登录",
        duration: 1000
      });
      this.$router.push('/')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.order-header {
  background-color: $colorG;
  height: 102px;
  line-height: 102px;
  width: 100%;
  border-bottom: 2px solid $colorA;
  .container {
    @include flex();
    .left {
      @include flex(flex-start);
      .logo {
        margin-top: 20px;
        cursor: pointer;
        img {
          width: 48px;
          height: 48px;
          border-radius: 10px;
        }
      }
      .title {
        @include flex(flex-start, flex-end);
        padding: 0 0 20px 40px;
        h3 {
          font-size: $fontC;
          font-weight: 400;
        }
        span {
          font-size: $fontK;
          margin-left: 15px;
          color: #757575;
          margin-bottom: -7px;
        }
      }
    }
    .right {
      @include flex(flex-start);
      padding-bottom: 20px;
      color: #757575;
      .user-info {
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: $colorA;
        }
      }
      span {
        margin-right: 20px;
      }
      .myorder {
        cursor: pointer;
        margin-right: 20px;
        &:hover {
          color: $colorA;
        }
      }
    }
  }
}
</style>