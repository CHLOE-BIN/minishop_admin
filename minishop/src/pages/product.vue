// 商品目录
<template>
  <div class="products-menu">
    <!-- 1. 顶部参数组件 -->
    <product-params>
      <template v-slot:buy>
        <button class="buy" @click="goToDetail">立即购买</button>
      </template>
    </product-params>
    <!-- 2. 商品展示 -->
    <div class="product-bd">
      <div class="container">
        <div class="box1">
          <div class="bg-1">
            <!-- 背景图 -->
            <img v-lazy="'/imgs/product-show/bg-1/bg-1.png'" alt />
            <!-- 商品大图 -->
            <div class="pro-item">
              <div class="pro-content" :class="{activeShow:active}">
                <span class="pro-name"></span>
                <p class="pro-info">品质小金刚 90Hz高刷屏</p>
              </div>
              <div class="pro-img">
                <img src="/imgs/product-show/bg-1/pro-1.png" alt />
              </div>
              <span class="pro-tips">*机身在不同光线和角度下会与图片有色差，以实物为准。</span>
            </div>
            <!-- 商品参数 -->
            <div class="pro-params">
              <ul>
                <li>
                  <span>90Hz 变速高刷屏</span>
                  <img v-lazy="'/imgs/product-show/bg-1/params-1.jpg'" alt />
                </li>
                <li>
                  <span>5000mAh 大电量</span>
                  <img v-lazy="'/imgs/product-show/bg-1/params-2.jpg'" alt />
                </li>
                <li>
                  <span>5000万超清三摄</span>
                  <img v-lazy="'/imgs/product-show/bg-1/params-3.jpg'" alt />
                </li>
                <li>
                  <span>Helio G88 高性能芯片</span>
                  <img v-lazy="'/imgs/product-show/bg-1/params-4.jpg'" alt />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="box2">
          <div class="bg-2">
            <div class="pro-info">
              <p>时尚外观设计</p>
              <p>三款经典配色</p>
              <span>
                清新的时光独白，典雅的神秘黑境，
                <br />时尚的梦幻晴空，款款新潮更耐看。
              </span>
            </div>
            <div class="swiper-box">
              <swiper :options="swiperOptions">
                <swiper-slide>
                  <img src="/imgs/product-show/bg-2/slide-1.jpg" alt />
                </swiper-slide>
                <swiper-slide>
                  <img src="/imgs/product-show/bg-2/slide-2.jpg" alt />
                </swiper-slide>
                <swiper-slide>
                  <img src="/imgs/product-show/bg-2/slide-3.jpg" alt />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="box3">
          <div class="video-box">
            <span @click="videoPlay"></span>
            <video src="/videos/RedmiNote11Pro.mp4" muted autoplay loop></video>
          </div>
        </div>
        <div class="box4">
          <div class="bg-4">
            <img v-lazy="'/imgs/product-show/bg-3/ads.png'" alt />
            <div class="ads">
              <img class="ads-logo" v-lazy="'/imgs/product-show/bg-3/redmi.png'" alt />
              <p class="ads-info">Redmi 是小米集团旗下，面向年轻人的科技品牌。旨在为全球年轻人打造高品质，且拥有旗舰体验、超预期的手机与智能硬件产品。</p>
              <p class="ads-info">坚持「不顾一切的热爱」的品牌理念，与全球年轻人站在一起。拥有同样热爱精神的王一博，是 Redmi 手机品牌全球代言人。</p>
              <div class="pro-tips">
                <span>
                  备注：
                  <br />*5000mAh&nbsp;为&nbsp;Redmi&nbsp;Note&nbsp;11&nbsp;4G版电池容量典型值。
                  <br />*按照标准矩形测量时，屏幕的对角线长度是&nbsp;6.5&nbsp;英寸&nbsp;(实际可视区域稍小)。
                  <br />*续航数据来自小米实验室，Note&nbsp;11&nbsp;4G&nbsp;在&nbsp;60Hz下重度使用，可使用&nbsp;1.3天，实际情况会因测试软件版本、具体测试环境、具体版本不同而略有差异，最终以实际使用时长为准。
                  <br />*Note&nbsp;11&nbsp;4G，在关闭数据、屏幕、自动亮度、Wi-Fi、同步等条件下，待机时长为&nbsp;
                  <br />24&nbsp;天。续航数据来自小米实验室，实际情况会因测试环境等原因略有差异，最终以实际使用时长为准。
                  <br />*Note&nbsp;11&nbsp;4G&nbsp;比&nbsp;Note&nbsp;9&nbsp;4G&nbsp;版本轻&nbsp;17g。
                  <br />*Note&nbsp;11&nbsp;4G&nbsp;整机厚度为&nbsp;8.92mm，各厂商测量标准不同，最终以实物为准。
                  <br />*所有质量相关测试数据，均来自小米实验室。
                  <br />*最高&nbsp;9W&nbsp;反向充功能，需要对应设备和线材充电支持，并非所有设备和线材都可达到最大充电功率。
                  <br />*反向充数据线，不随机附送，用户需要自行选配数据线。
                  <br />*全站所展示结构图片，均为功能示意图；产品图片和显示内容仅供参考，实际产品功能和规格（包括但不限于外观，颜色和尺寸）以及实际显示内容可能有所不同，最终以实物为准。
                  <br />*内存与容量方面，实际可用容量会由于诸多因素而减少并有所差异：由于操作系统运行占据了部分内存（RAM），
                  <br />实际可用空间小于标识内存容量；由于安装操作系统和预装的程序占据部分闪存（ROM），实际可用存储空间小于标识闪存容量。
                  <br />*产品图片以及型号、数据、功能、性能、规格参数、用户界面和其他产品信息等仅供参考，小米有可能对上述内容进行改进，
                  <br />具体信息请参照产品实物、产品说明书。除非经特殊说明，本网站中所涉及的数据均为小米内部测试结果。
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3. 服务组件 -->
    <service-bar></service-bar>
    <!--隐藏的视频盒子 -->
    <div class="hide-box">
      <div class="box3-video">
        <div class="overlay" v-if="slideShow"></div>
        <div class="video-sliderbox" :class="{slide:slideShow}">
          <span class="icon-close" @click="videoClose"></span>
          <video id="hideVideo" src="/videos/RedmiNote11Pro.mp4" muted autoplay controls></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductParams from "../components/ProductParams.vue";
import ServiceBar from "../components/ServiceBar.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "product",
  components: {
    ProductParams,
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      active: false,
      slideShow: false,
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  mounted() {
    let that = this;
    window.setTimeout(function() {
      that.active = true;
    }, 500);
  },
  methods: {
    goToDetail() {
      let productId = this.$route.params.id;
      // 打开一个新窗口进行路由跳转
      let detail = this.$router.resolve({
        path: `/detail/${productId}`
      });
      window.open(detail.href, "_self");
      // this.$router.push(detail.href);
    },
    videoPlay() {
      this.slideShow = true;
      let video = document.querySelector("#hideVideo");
      video.muted = false; // 解除静音
      video.play(); //视频播放
    },
    videoClose() {
      this.slideShow = false;
      let video = document.querySelector("#hideVideo");
      // video.muted = true;
      video.pause(); //视频暂停
      video.currentTime = 0; // 视频播放时长归零
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.products-menu {
  .buy {
    @include menu-a($colorG);
    vertical-align: middle;
    margin-left: 10px;
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: $fontK;
    border: none;
    background-color: $colorA;
    cursor: pointer;
  }
  .product-bd {
    .container {
      width: 1250px;
      .box1 {
        .bg-1 {
          position: relative;
          img {
            width: 100%;
          }
          .pro-item {
            position: absolute;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            width: 754px;
            height: 450px;
            text-align: center;
            margin-bottom: 58px;
            @include flex(flex-start, center);
            .pro-content {
              width: 40%;
              height: 70%;
              opacity: 0;
              transition: all 0.5s;
              &.activeShow {
                opacity: 1;
                height: 100%;
              }
              .pro-name {
                @include bgImg(
                  150px,
                  23px,
                  "/imgs/product-show/bg-1/pro-name.png"
                );
                margin-top: 100px;
              }
              .pro-info {
                margin-top: 20px;
                font-size: $fontE;
              }
            }
            .pro-img {
              width: 60%;
              height: 100%;
              img {
                width: 100%;
              }
            }
            .pro-tips {
              position: absolute;
              bottom: 100px;
              opacity: 0.3;
              font-size: $fontK;
            }
          }
          .pro-params {
            width: 100%;
            height: 236px;
            position: absolute;
            top: 608px;
            left: 0;
            @include flex(center, flex-start);
            ul {
              li {
                float: left;
                margin-right: 13px;
                position: relative;
                span {
                  position: absolute;
                  top: 15px;
                  left: 0;
                  display: inline-block;
                  height: 23px;
                  width: 145px;
                  text-align: center;
                  font-size: $fontK;
                }
                img {
                  width: 145px;
                  height: 165px;
                  border-radius: 5px;
                }
              }
            }
          }
        }
      }
      .box2 {
        .bg-2 {
          width: 738px;
          height: 686px;
          margin: 0 auto;
          .pro-info {
            margin-left: 70px;
            p {
              font-size: $fontC;
            }
            span {
              display: block;
              margin-top: 20px;
              font-size: $fontK;
            }
          }
          .swiper-box {
            margin-top: 30px;
            .swiper-container {
              width: 738px;
              height: 500px;
              .swiper-slide {
                img {
                  width: 100%;
                  border-radius: 5px;
                }
              }
              .swiper-pagination {
                bottom: -20px;
                height: 40px;
              }
            }
          }
        }
      }
      .box3 {
        .video-box {
          height: 536px;
          text-align: center;
          background-color: #00000080;
          position: relative;
          span {
            @include bgImg(55px, 55px, "/videos/play.png");
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 2;
          }
          video {
            height: 100%;
            z-index: 1;
          }
        }
      }
      .box4 {
        .bg-4 {
          position: relative;
          width: 100%;
          height: 1190px;
          img {
            width: 100%;
          }
          .ads {
            position: absolute;
            top: 83px;
            left: 320px;
            .ads-logo {
              width: 48px;
              height: 14px;
              margin-bottom: 15px;
            }
            .ads-info {
              font-size: $fontJ;
              color: $colorI;
            }
            .pro-tips {
              position: absolute;
              top: 700px;
              width: 100%;
              height: 500px;
            }
          }
        }
      }
    }
  }
  .hide-box {
    .box3-video {
      text-align: center;
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $colorB;
        opacity: 0.6;
        z-index: 10;
      }
      .video-sliderbox {
        z-index: 11;
        position: fixed;
        top: -100%;
        left: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: top 0.8s, opacity 0.3s;
        &.slide {
          top: 50%;
          opacity: 1;
        }
        .icon-close {
          @include bgImg(24px, 24px, "/videos/video-close.png");
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
          z-index: 12;
          opacity: 0.5;
          &:hover {
            opacity: 1;
          }
        }
        video {
          height: 550px;
          object-fit: cover;
          outline: none;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>