<template>
  <!-- 公共顶部组件 -->
  <div class="header">
    <!-- 顶部菜单、用户信息 start -->
    <div class="site-topbar">
      <div class="container">
        <!-- 1. 菜单栏 -->
        <div class="topbar-menu">
          <a href="javascript:;">EASY购商城</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <!-- 2. 用户信息 -->
        <div class="topbar-user">
          <a class="userCenter" href="javascript:;" v-if="isLogin">
            <el-dropdown>
              <span class="el-dropdown-link">
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
          </a>
          <a href="javascript:;" v-else @click="goToLogin">登录</a>
          <a href="javascript:;" v-if="!isLogin" @click="goToRegister">注册</a>
          <a href="javascript:;" class="mycart" @click="goToCart">
            <span class="icon-mycart"></span>
            购物车 ({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <!-- 顶部菜单以及用户信息 end -->

    <!-- 顶部商城logo、商品导航栏、搜索框 start -->
    <div class="site-header">
      <div class="container">
        <!-- 1. 商城logo -->
        <div class="header-shoplogo">
          <a href="javascript:;" @click="goToIndex"></a>
        </div>
        <!-- 2. 商品导航栏 -->
        <div class="header-menu">
          <div class="item-menu">
            <span>Xiaomi小米</span>
            <div class="item-menu-list">
              <ul>
                <li class="product" v-for="(item, index) in phoneList.slice(0,6)" :key="index">
                  <a :href="'/#/product/'+item.productId">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
            <div class="item-menu-list">
              <ul>
                <li class="product" v-for="(item, index) in phoneList.slice(6,12)" :key="index">
                  <a :href="'/#/product/'+item.productId">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="item-menu-list">
              <ul>
                <li class="product" v-for="(item, index) in tvList.slice(0,6)" :key="index">
                  <a :href="'/#/product/'+item.productId">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle" />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 3. 搜索框 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" autocomplete="off" id="search" :value="keyword"/>
            <div class="icon-search">
              <a @click="goSearch"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 顶部logo、导航栏、搜索框 end -->
  </div>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
      proList: [],
      length: '',
      phoneList: [],
      tvList: [],
      keyword: '',
    };
  },
  computed: {
    // 判读是否登录
    isLogin() {
      // 通过sessionStorage获取vuex中的isLogin状态
      if (
        sessionStorage.getItem("username") &&
        sessionStorage.getItem("token")
      ) {
        this.$store.commit("userStatus", sessionStorage.getItem("username"));
      } else {
        this.$store.commit("userStatus");
      }
      return this.$store.getters.isLogin;
    },
    // 计算属性实时监听username和cartCount的变化
    username() {
      return this.$store.getters.currentUser;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.getProductList();
    this.getCartCount();
    this.changeKeyword();
  },
  methods: {
    getProductList() {
      this.$axios.get("/products").then(res => {
        console.log('res=>', res);
        for (let i = 0; i < res.length; i++) {
          this.proList.push(res[i])
          if (res[i].categoryId == 1) {
            this.phoneList.push(res[i]);
          } else if (res[i].categoryId == 2) {
            this.tvList.push(res[i]);
          }
        }
        this.length = this.proList.length
      });
    },
    getCartCount() {
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        const userId = user._id;
        this.$axios.get("/carts", { params: { userId } }).then(cart => {
          this.$store.dispatch("setCartCount", cart.length);
        })
      })
    },
    changeKeyword() {
      let index = 0
      let that = this
      setInterval(function() {
        if(index >= this.length) {
          index = 0
        } else {
          index += 1
        }
        that.keyword = that.proList[index].name
        console.log(that.keyword);
      }, 3000)
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToIndex() {
      if (this.$router.history.current.path !== "/index") {
        this.$router.push("/");
      } else {
        // 刷新
        location.reload();
      }
    },
    goToOrderList() {
      this.$router.push("/list");
    },
    goToLogin() {
      this.$router.push({
        path: "/login",
        query: {
          change: true
        }
      })
    },
    goToRegister() {
      this.$router.push({
        path: "/login",
        query: {
          change: false
        }
      });
    },
    logout() {
      // 1. 清除sessionStorge和vuex中的用户名和token
      this.$store.dispatch("setUser", null);
      // 返回首页
      this.$message({
        type: "success",
        message: "退出登录",
        duration: 1000
      });
      this.$router.push('/')
    },
    goSearch() {
      this.keyword = document.querySelector("#search").value
      console.log(this.keyword);
      // 路由跳转时传递当前选中的信息
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.keyword
        }
      });
      location.reload()
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
  .site-topbar {
    background-color: $colorB;
    color: $colorL;
    .container {
      position: relative;
      @include flex();
      height: 39px;
      line-height: 39px;
      .topbar-menu {
        a {
          @include menu-a();
          margin-right: 17px;
          font-size: $fontK;
          &:hover {
            color: $colorG;
          }
          &:after {
            content: "";
            border-right: 1px solid $colorL;
            opacity: 0.5;
            margin-left: 15px;
          }
          &:last-child:after {
            display: none;
          }
        }
      }
      .topbar-user {
        a {
          @include menu-a();
          margin-left: 17px;
          &:hover {
            color: $colorG;
          }
          &:after {
            content: "";
            border-right: 1px solid $colorL;
            opacity: 0.5;
            margin-left: 15px;
          }
          &:nth-last-child(1):after {
            display: none;
          }
          &:nth-last-child(2):after {
            display: none;
          }
        }
        .mycart {
          width: 110px;
          background-color: $colorC;
          text-align: center;
          .icon-mycart {
            @include bgImg(16px, 16px, "/imgs/icon-cart.png");
            margin-right: 4px;
            margin-bottom: -3px;
          }
          &:hover {
            background-color: $colorG;
            color: $colorA;
            .icon-mycart {
              @include bgImg(16px, 16px, "/imgs/icon-cart-hover.png");
            }
            .mycart-list {
              height: 100px;
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
    }
  }
  .site-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-shoplogo {
        a {
          @include bgImg(150px, 50px, "/imgs/minishopName.png");
          border-radius: 10px;
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 109px;
        .item-menu {
          display: inline-block;
          cursor: pointer;
          span {
            display: inline-block;
            height: 100px;
            line-height: 100px;
            font-size: $fontI;
            margin-right: 21px;
          }
          &:hover {
            color: $colorA;
            .item-menu-list {
              height: 220px;
              opacity: 1;
              visibility: visible;
            }
          }
          .item-menu-list {
            position: absolute;
            top: 100px;
            left: 0;
            width: $min-width;
            height: 0;
            opacity: 0;
            // overflow: hidden; // 因为该元素只是设置了height为0,虽然看不见但在页面中占位, overflow使得元素不占位, 避免鼠标经过触发hover
            visibility: hidden; // 设置了visibility就不用设置overflow了
            text-align: center;
            background-color: $colorG;
            border: 1px solid $colorH;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            z-index: 10;
            transition: all 0.3s;
            .product {
              float: left;
              position: relative;
              width: 16.6%;
              .pro-img {
                height: 137px;
                img {
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
              }
              .pro-name {
                margin-top: 19px;
                color: $colorB;
                font-size: $fontK;
                line-height: $fontK;
                font-weight: bold;
              }
              .pro-price {
                margin-top: 8px;
                color: $colorA;
                font-size: $fontK;
                line-height: $fontK;
                font-weight: bold;
              }
              &:before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                width: 1px;
                height: 99px;
                border-left: 1px solid $colorF;
              }
              &:last-child:before {
                // 删掉最后一个li的border线
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        cursor: pointer;
        .wrapper {
          @include flex();
          height: 50px;
          width: 320px;
          border: 1px solid $colorH;
          input {
            width: 263px;
            padding-left: 10px;
            border: none;
            border-right: 1px solid $colorH;
            height: 50px;
          }
          .icon-search {
            display: inline-block;
            height: 50px;
            width: 50px;
            a {
              background: url("/imgs/icon-search.png") no-repeat center;
              display: inline-block;
              padding: 25px;
            }
          }
        }
      }
    }
  }
}
</style>