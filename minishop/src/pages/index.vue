<template>
  <!-- 首页页面 -->
  <div class="index">
    <!-- 1. 主页顶部内容 -->
    <div class="nav-bar">
      <div class="container">
        <div class="swiper-box">
          <!-- 左侧导航 -->
          <div class="side-menu-bar">
            <div class="menu-item">
              <a href>手机</a>
              <div class="menu-item-list">
                <ul v-for="(item, i) in phoneMenu" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub?'/#/product/'+sub.productId:'/#/product/10017'">
                      <img v-lazy="sub?sub.mainImage:'/imgs/item-box-1.png'" alt />
                      <span>{{sub?sub.name:'Note 11 Pro系列'}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="menu-item">
              <a href>电视</a>
              <div class="menu-item-list">
                <ul v-for="(item, i) in tvMenu" :key="i">
                  <li v-for="(sub, j) in item" :key="j">
                    <a :href="sub?'/#/product/'+sub.productId:'/#/product/10017'">
                      <img v-lazy="sub?sub.mainImage:'/imgs/navheader/3-5.webp'" alt />
                      <span>{{sub?sub.name:'小米透明电视'}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="menu-item">
              <a href>笔记本 平板</a>
            </div>
            <div class="menu-item">
              <a href>家电</a>
            </div>
            <div class="menu-item">
              <a href>出行 穿戴</a>
            </div>
            <div class="menu-item">
              <a href>智能 路由器</a>
            </div>
            <div class="menu-item">
              <a href>电源 配件</a>
            </div>
            <div class="menu-item">
              <a href>健康 儿童</a>
            </div>
            <div class="menu-item">
              <a href>耳机 音箱</a>
            </div>
            <div class="menu-item">
              <a href>生活 箱包</a>
            </div>
          </div>
          <!-- 轮播图 -->
          <swiper :options="swiperOptions">
            <swiper-slide v-for="(item,index) in slideList" :key="index">
              <a :href="'/#/product/'+item.productId">
                <img :src="item.img" />
              </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <!-- 广告位 -->
        <div class="ads-box">
          <div class="sprite-menu">
            <ul>
              <li v-for="(item,index) in spriteList" :key="index">
                <a href="javascript:;">
                  <img v-lazy="item.img" alt />
                  <p>{{item.name}}</p>
                </a>
              </li>
            </ul>
          </div>
          <div class="ads-item">
            <ul>
              <li v-for="(item,index) in adsList" :key="index">
                <img v-lazy="item.img" alt />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 2. 主页商品内容 -->
    <div class="products-list">
      <div class="container">
        <!-- 横幅 -->
        <div class="banner-box">
          <a href="javascript:;">
            <img v-lazy="'/imgs/banner.jpg'" />
          </a>
        </div>
        <!-- 商品 -->
        <div class="products">
          <div class="products-hd">
            <h2>手机</h2>
            <a @click="more(1)">查看更多</a>
          </div>
          <div class="products-bd">
            <div class="left-bar">
              <img v-lazy="'/imgs/products-leftbar-1.png'" alt />
            </div>
            <div class="product-list">
              <ul v-for="(item,i) in [this.phone.slice(0, 4), this.phone.slice(4, 8)]" :key="i">
                <li v-for="(sub,j) in item" :key="j">
                  <a :href="'/#/product/'+sub.productId">
                    <img v-lazy="sub.mainImage" alt />
                    <p class="sub-name">{{sub.name}}</p>
                    <p class="sub-subtitle">{{sub.subtitle}}</p>
                    <p class="sub-price">{{sub.price | currency}}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="products">
          <div class="products-hd">
            <h2>智能穿戴</h2>
            <a @click="more(2)">查看更多</a>
          </div>
          <div class="products-bd">
            <div class="left-bar">
              <img v-lazy="'/imgs/products-leftbar-2.png'" alt />
            </div>
            <div class="product-list">
              <ul v-for="(item,i) in [this.tv.slice(0, 4), this.tv.slice(4, 8)]" :key="i">
                <li v-for="(sub,j) in item" :key="j">
                  <a :href="'/#/product/'+sub.productId">
                    <img v-lazy="sub.mainImage" alt />
                    <p class="sub-name">{{sub.name}}</p>
                    <p class="sub-subtitle">{{sub.subtitle}}</p>
                    <p class="sub-price">{{sub.price | currency}}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 2. 服务板块 -->
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      slideList: [
        {
          productId: "10017",
          img: "/imgs/slider/slide-1.jpg"
        },
        {
          productId: "10017",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          productId: "10017",
          img: "/imgs/slider/slide-3.jpg"
        }
      ],
      spriteList: [
        {
          img: "/imgs/sprite/sprite-1.png",
          name: "保障服务"
        },
        {
          img: "/imgs/sprite/sprite-2.png",
          name: "企业团购"
        },
        {
          img: "/imgs/sprite/sprite-3.png",
          name: "F码通道"
        },
        {
          img: "/imgs/sprite/sprite-4.png",
          name: "米粉卡"
        },
        {
          img: "/imgs/sprite/sprite-5.png",
          name: "以旧换新"
        },
        {
          img: "/imgs/sprite/sprite-6.png",
          name: "话费充值"
        }
      ],
      adsList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.jpg"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.jpg"
        }
      ],
      phone: [],
      tv: [],
      phoneMenu: [[], [], [], [], [], []],
      tvMenu: [[], [], [], [], [], []]
    };
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return val.toFixed(2) + "元";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.get("/products").then(res => {
        console.log("res:", res);
        // 1. 获取所有商品并分类
        for (let i = 0; i < res.length; i++) {
          if (res[i].categoryId == 1) {
            this.phone.push(res[i]);
          } else if (res[i].categoryId == 2) {
            this.tv.push(res[i]);
          }
        }
        console.log("全部手机: ", this.phone);
        console.log("全部电视: ", this.tv);

        // 2. 左侧导航栏
        let index = 0;
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 4; j++) {
            this.phoneMenu[i][j] = this.phone[index];
            this.tvMenu[i][j] = this.tv[index];
            index++;
          }
        }
        console.log("左侧phone导航栏: ", this.phoneMenu);
        console.log("左侧tv导航栏: ", this.tvMenu);
      });
    },
    more(categoryId) {
      if (categoryId == 1) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: '手机'
          }
        });
      } else if (categoryId == 2) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: '电视'
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.index {
  .nav-bar {
    .container {
      position: relative;
      .swiper-box {
        .side-menu-bar {
          position: absolute;
          width: 234px;
          height: 451px;
          background-color: #66666680;
          z-index: 9;
          padding: 15px 0;
          box-sizing: border-box;
          .menu-item {
            a {
              display: inline-block;
              height: 42px;
              line-height: 42px;
              width: 204px;
              color: $colorG;
              font-size: $fontJ;
              padding-left: 30px;
              position: relative;
              &:after {
                content: "";
                position: absolute;
                top: 11px;
                right: 30px;
                @include bgImg(20px, 20px, "/imgs/right-arrow.png");
              }
            }
            &:hover {
              background-color: $colorA;
              .menu-item-list {
                display: block;
              }
            }
            .menu-item-list {
              display: none;
              position: absolute;
              top: 0;
              left: 234px;
              width: 992px;
              height: 451px;
              background-color: $colorG;
              border: 1px solid $colorH;
              ul {
                @include flex();
                height: 75px;
                padding-left: 23px;
                li {
                  flex: 1;
                  height: 75px;
                  line-height: 75px;
                  a {
                    padding: 0 0 0 12px;
                    img {
                      width: 40px;
                      height: 40px;
                      vertical-align: middle;
                    }
                    span {
                      font-size: $fontJ;
                      color: $colorB;
                      padding-left: 15px;
                    }
                  }
                  &:hover {
                    span {
                      color: $colorA;
                    }
                  }
                }
              }
            }
          }
        }
        --swiper-navigation-color: #cccccc; /* 单独设置按钮颜色 */
        --swiper-navigation-size: 30px; /* 设置按钮大小 */
        .swiper-container {
          height: 451px;
          img {
            width: 100%;
            height: 100%;
          }
          .swiper-button-prev {
            left: 274px;
          }
        }
      }
      .ads-box {
        margin-top: 14px;
        .sprite-menu {
          display: block;
          width: 234px;
          height: 170px;
          background-color: #5f5750;
          overflow: hidden;
          float: left;
          li {
            position: relative;
            float: left;
            padding-top: 18px;
            padding-left: 3px;
            a {
              display: block;
              color: #ffffff85;
              text-align: center;
              width: 73px;
              height: 70px;
              img {
                width: 24px;
                height: 24px;
                opacity: 0.5;
              }
            }
            &:before {
              content: "";
              width: 60px;
              border-top: 1px solid #665e57;
              position: absolute;
              top: -1px;
              left: 12px;
            }
            &:after {
              content: "";
              height: 70px;
              border-left: 1px solid #665e57;
              position: absolute;
              top: 6px;
            }
            &:hover {
              a {
                color: $colorG;
                img {
                  opacity: 1;
                }
              }
            }
          }
        }
        .ads-item {
          height: 190px;
          overflow: hidden;
          cursor: pointer;
          li {
            float: left;
            margin-left: 15.5px;
            transition: all 0.3s;
            height: 170px;
            img {
              width: 315px;
              height: 170px;
            }
            &:hover {
              box-shadow: 0 10px 10px #88888845;
            }
          }
        }
      }
    }
  }
  .products-list {
    background-color: $colorJ;
    margin-top: 13px;
    .container {
      .banner-box {
        padding-top: 30px;
        a {
          img {
            height: 120px;
          }
        }
      }
      .products {
        margin-top: 30px;
        .products-hd {
          position: relative;
          h2 {
            display: inline-block;
            color: $colorB;
            font-size: $fontF;
            font-weight: 200;
          }
          a {
            position: absolute;
            top: 0;
            right: 0;
            font-size: $fontI;
            color: $colorB;
            cursor: pointer;
            &:after {
              content: "";
              @include bgImg(18px, 18px, "/imgs/more-right-arrow.png");
              margin: 0 0 4px 5px;
              vertical-align: middle;
            }
            &:hover {
              color: $colorA;
              &:after {
                @include bgImg(18px, 18px, "/imgs/more-right-arrow-hover.png");
              }
            }
          }
        }
        .products-bd {
          @include flex(flex-start, flex-start);
          padding-bottom: 50px;
          .left-bar {
            width: 224px;
            margin-top: 20px;
            img {
              width: 224px;
              height: 619px;
              transition: all 0.3s;
              &:hover {
                box-shadow: 0 0 15px #88888899;
                transform: translate3d(0, -2px, 0);
              }
            }
          }
          .product-list {
            height: 600px;
            margin-top: 20px;
            li {
              float: left;
              width: 236px;
              height: 300px;
              margin: 0 0 18px 14px;
              background-color: $colorG;
              transition: all 0.3s;
              text-align: center;
              a {
                display: inline-block;
                width: 236px;
                height: 300px;
                padding: 30px 0;
                img {
                  height: 160px;
                }
                .sub-name {
                  margin-top: 20px;
                  font-size: $fontJ;
                  color: $colorB;
                }
                .sub-subtitle {
                  margin-top: 6px;
                  font-size: $fontK;
                  color: $colorD;
                }
                .sub-price {
                  margin-top: 15px;
                  font-size: $fontJ;
                  color: $colorA;
                }
              }
              &:hover {
                box-shadow: 0 0 15px #88888899;
                transform: translate3d(0, -2px, 0);
              }
            }
          }
        }
      }
    }
  }
}
</style>