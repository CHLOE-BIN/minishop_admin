// 商品详情
<template>
  <div class="detail">
    <!-- 1. 参数组件 -->
    <product-params></product-params>
    <!-- 2. 商品详情 -->
    <div>
      <div class="pro-detail">
        <div class="container">
          <div class="left">
            <div class="swiper-box">
              <swiper :options="swiperOptions">
                <swiper-slide v-for="(item,index) in productInfo.showImg" :key="index">
                  <img :src="item" alt />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
          <div class="right">
            <h2>{{productInfo.name}}</h2>
            <p class="description">
              <span>「全版本优惠30元，活动到手价969元起；购机赠小米定制聚酯纤维双肩包，数量有限，赠完即止」</span>
              5000万AI三摄 | Helio G88 高性能芯片 | 5000mAh 大电量 | 18W快充 | 支持最高9W反向充电 | 立体声双扬声器 | 90Hz变速高刷屏
            </p>
            <p class="company-info">小米自营</p>
            <p class="price-info">
              {{productInfo.price}} 元
              <del>1099 元</del>
            </p>
            <div class="line"></div>
            <div class="activities">
              <span>赠品</span>
              <p>满1件赠价值99元定制聚酯纤维双肩包 单品二灰色 赠完即止</p>
            </div>
            <div class="line"></div>
            <div class="address-box">
              <div class="address-info">
                <span>广东</span>
                <span>广州市</span>
                <span>番禺区</span>
                <span>市桥街道</span>
              </div>
              <a href="javascript:;" class="modify-info">修改</a>
              <div class="rest-info">有现货</div>
            </div>
            <div class="buy-options">
              <div class="buy-options-item">
                <div class="item-title">选择版本</div>
                <div class="item-options" id="version">
                  <ul>
                    <li
                      v-for="(item, index) in productInfo.version"
                      :key="index"
                      @click="selectedOption('version')"
                      :class="[index==0?'active':'']"
                    >
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="buy-options-item">
                <div class="item-title">选择颜色</div>
                <div class="item-options" id="color">
                  <ul>
                    <li
                      v-for="(item, index) in productInfo.color"
                      :key="index"
                      @click="selectedOption('color')"
                      :class="[index==0?'active':'']"
                    >
                      <a>{{item}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- <div class="service-box">
              <div class="service-item" id="service1">
                <div class="item-hd">
                  <span class="title">选择轻松购提供的意外保护</span>
                  <span class="more">
                    <a href="javascript:;">了解意外保护 ></a>
                  </span>
                </div>
                <div class="item-bd" @click="selectedOption('service1')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-service.jpg" alt />
                      <div class="box">
                        <h3>
                          碎屏保障服务
                          <span>碎屏免费修</span>
                        </h3>
                        <div class="description">1年1次碎屏 官方原厂 免费维修</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">服务条款</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">99元</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="item-bd" @click="selectedOption('service1')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-service.jpg" alt />
                      <div class="box">
                        <h3>
                          意外保险服务
                          <span>意外损免费修</span>
                        </h3>
                        <div class="description">1年1次意外损坏 官方原厂 免费维修</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">服务条款</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">149元</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="service-item" id="service2">
                <div class="item-hd" @click="selectedOption('service2')">
                  <span class="title">选择轻松购提供的延长保修</span>
                  <span class="more">
                    <a href="javascript:;">了解延长保修 ></a>
                  </span>
                </div>
                <div class="item-bd" @click="selectedOption('service2')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-service.jpg" alt />
                      <div class="box">
                        <h3>
                          延长保修服务
                          <span>质保延长1年</span>
                        </h3>
                        <div class="description">性能故障 官方原厂 多次免费维修</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">服务条款</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">49元</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="service-item" id="service3">
                <div class="item-hd" @click="selectedOption('service3')">
                  <span class="title">选择轻松购提供的云空间服务</span>
                  <span class="more">
                    <a href="javascript:;">了解云空间服务 ></a>
                  </span>
                </div>
                <div class="item-bd" @click="selectedOption('service3')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-cloud.jpg" alt />
                      <div class="box">
                        <h3>
                          云空间年卡200G
                          <span>208元</span>
                        </h3>
                        <div class="description">主商品签收后，自动激活至下单帐号</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">注意事项</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">208元</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="item-bd" @click="selectedOption('service3')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-cloud.jpg" alt />
                      <div class="box">
                        <h3>
                          云空间年卡50G
                          <span>58元</span>
                        </h3>
                        <div class="description">主商品签收后，自动激活至下单帐号</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">注意事项</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">58元</div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="item-bd" @click="selectedOption('service3')">
                  <ul>
                    <li>
                      <span class="radio">
                        <span></span>
                      </span>
                      <img src="/imgs/product-detail/icon-cloud.jpg" alt />
                      <div class="box">
                        <h3>
                          云空间月卡50G
                          <span>6元</span>
                        </h3>
                        <div class="description">主商品签收后，自动激活至下单帐号</div>
                        <div class="agreement-box">
                          <span class="checkbox">
                            <span></span>
                          </span>
                          我已阅读
                          <a href="javascript:;">注意事项</a>
                          <span>|</span>
                          <a href="javascript:;">常见问题</a>
                        </div>
                        <div class="price">6元</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>-->
            <div class="selected-list">
              <ul>
                <li>
                  <div class="info">
                    <ul>
                      <li>
                        {{selectedInfo.name}} {{selectedInfo.version}} {{selectedInfo.color}}
                        <span>{{selectedInfo.price}}元</span>
                      </li>
                      <li v-for="(item,index) in selectedInfo.service" :key="index">
                        {{item.info}}
                        <span>{{item.price}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="total-price">总计：{{productInfo.price}}元</div>
                </li>
              </ul>
            </div>
            <div class="btn-box">
              <a class="addCart" @click="addCart">加入购物车</a>
              <a class="favorite">
                <span></span>
                喜欢
              </a>
            </div>
            <div class="after-sale-info">
              <ul>
                <li>
                  <span></span>小米自营
                </li>
                <li>
                  <span></span>小米发货
                </li>
                <li>
                  <span></span>7天无理由退货
                </li>
                <li>
                  <span></span>运费说明
                </li>
                <li>
                  <span></span>企业信息
                </li>
                <li>
                  <span></span>7天价格保护
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="price-detail">
        <div class="container">
          <div class="title">价格说明</div>
          <div class="description">
            <img src="/imgs/product-detail/description.png" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- 3, 服务组件 -->
    <service-bar></service-bar>
  </div>
</template>

<script>
import ProductParams from "../components/ProductParams.vue";
import ServiceBar from "../components/ServiceBar.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "detail",
  components: {
    ProductParams,
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
          prevEl: ".swiper-button-prev",
          clickable: true
        }
      },
      productInfo: {
        name: "",
        mainImg: "",
        price: "",
        showImg: [],
        version: [],
        color: []
      },
      selectedInfo: {
        cartId: "",
        userId: "",
        productId: "",
        name: "",
        mainImg: "",
        price: "",
        version: "",
        color: "",
        num: "",
        // service: [{}, {}, {}]
      }
    };
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      let productId = this.$route.params.id;
      this.$axios.get(`/products/${productId}`).then(product => {
        // 获取当前商品的信息
        this.productInfo.productId = product.productId;
        this.productInfo.name = product.name;
        this.productInfo.mainImg = product.mainImage;
        this.productInfo.price = product.price;
        this.productInfo.showImg = product.showImg;
        this.productInfo.version = product.version;
        this.productInfo.color = product.color;
        console.log("product:", product);

        // 商品选中选项默认值
        let cartId = "";
        for (let i = 0; i < 6; i++) {
          cartId += Math.floor(Math.random() * 10);
        }
        cartId = new Date().getTime() + cartId; //时间戳，用来生成订单号。
        this.selectedInfo.cartId = cartId;
        this.selectedInfo.productId = this.productInfo.productId;
        this.selectedInfo.name = this.productInfo.name;
        this.selectedInfo.mainImg = this.productInfo.mainImg;
        this.selectedInfo.price = this.productInfo.price;
        this.selectedInfo.version = this.productInfo.version[0];
        this.selectedInfo.color = this.productInfo.color[0];
        this.selectedInfo.num = 1;
      });
    },
    selectedOption(id) {
      // 1. 给每个选项绑定一个点击事件, 当点击时选中的选项绑定active类, 其余选项类名为""
      // 2. 选中的选项保存到selectedInfo中
      let lis = document.querySelector(`#${id}`).querySelectorAll("li");
      console.log(lis);
      let event = window.event || arguments.callee.caller.arguments[0];
      let selected = event.target;
      while (selected.tagName != "LI") {
        selected = selected.parentNode;
      }
      console.log("selected=>", selected);

      // 排他有两种情况: 1. 单选不可选空  2. 再次点击可以取消选中
      if (id == "version" || id == "color") {
        for (let i = 0; i < lis.length; i++) {
          lis[i].className = "";
        }
        selected.className = "active";
        if (id == "version") {
          this.selectedInfo.version = selected.firstChild.innerHTML;
        } else {
          this.selectedInfo.color = selected.firstChild.innerHTML;
        }
      } else {
        // 保存选中的li的选择状态
        let selectAgain = selected.className;
        for (let i = 0; i < lis.length; i++) {
          lis[i].className = "";
        }
        // 判断是否是再次选中的li
        if (selectAgain) {
          selected.className = "";
          switch (id) {
            case "service1":
              this.selectedInfo.service[0] = {};
              break;
            case "service2":
              this.selectedInfo.service[1] = {};
              break;
            case "service3":
              this.selectedInfo.service[2] = {};
              break;
            default:
              break;
          }
        } else {
          selected.className = "active";
          let serviceList = {};
          let service = selected.querySelector("h3").innerText.split(" ");
          serviceList.info = service.slice(0, 1).toString();
          serviceList.price = selected.querySelector(".price").innerText;
          switch (id) {
            case "service1":
              this.selectedInfo.service[0] = serviceList;
              break;
            case "service2":
              this.selectedInfo.service[1] = serviceList;
              break;
            case "service3":
              this.selectedInfo.service[2] = serviceList;
              break;
            default:
              break;
          }
        }
      }
    },
    addCart() {
      // to-do: 添加购物车
      // 获取用户ID
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        this.selectedInfo.userId = user._id;
        this.$axios.post("/carts/add", this.selectedInfo).then((res) => {
          console.log('res=>', res);
          this.$message({
            type: "success",
            message: "添加购物车成功",
            duration: 1000
          });
        });
      });
      console.log("this.selectedInfo=>", this.selectedInfo);
      // 路由跳转时传递当前选中的信息
      this.$router.push({
        path: "/buy",
        query: {
          info:
            this.selectedInfo.name +
            " " +
            this.selectedInfo.version +
            " " +
            this.selectedInfo.color
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.detail {
  .pro-detail {
    .container {
      @include flex(flex-start, flex-start);
      padding-top: 32px;
      .left {
        width: 50%;
        .swiper-box {
          width: 560px;
          height: 566px;
          --swiper-navigation-size: 40px;
          .swiper-button-next,
          .swiper-button-prev {
            color: $colorD;
            height: 60px;
            width: 40px;
            &:hover {
              background-color: $colorD;
              color: $colorG;
            }
          }
          ::v-deep .swiper-pagination-bullet {
            width: 50px;
            height: 3px;
            border-radius: 0px;
            background-color: $colorD;
            margin: 0 5px;
            &:hover {
              opacity: 0.8;
            }
          }
          .swiper-container {
            img {
              width: 560px;
              height: 560px;
              background-color: $colorG;
            }
          }
        }
      }
      .right {
        width: 50%;
        margin-left: 20px;
        font-size: $fontJ;
        h2 {
          font-size: $fontE;
          font-weight: 400;
        }
        .description {
          margin-top: 10px;
          color: $colorL;
          span {
            color: $colorA;
          }
        }
        .company-info {
          margin-top: 20px;
          color: $colorA;
        }
        .price-info {
          margin-top: 20px;
          font-size: $fontH;
          color: $colorA;
          del {
            font-size: $fontJ;
            color: $colorL;
          }
        }
        .line {
          margin-top: 20px;
          border-bottom: 1px solid $colorH;
        }
        .activities {
          @include flex(flex-start);
          margin-top: 20px;
          span {
            display: inline-block;
            width: 80px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background-color: $colorA;
            color: $colorG;
          }
          p {
            margin-left: 10px;
          }
        }
        .address-box {
          position: relative;
          width: 600px;
          height: 104px;
          border: 1px solid $colorH;
          background-color: #fafafa;
          margin-top: 20px;
          padding: 30px 50px;
          box-sizing: border-box;
          &:before {
            content: "";
            @include bgImg(20px, 20px, "/imgs/product-detail/icon-locate.png");
            vertical-align: middle;
            position: absolute;
            top: 30px;
            left: 20px;
          }
          .address-info {
            display: inline-block;
            span {
              display: inline-block;
              margin-right: 15px;
            }
          }
          .modify-info {
            @include menu-a($colorA);
          }
          .rest-info {
            margin-top: 5px;
            color: $colorA;
          }
        }
        .buy-options {
          width: 600px;
          margin-top: 20px;
          .buy-options-item {
            margin-top: 10px;
            .item-title {
              font-size: $fontH;
            }
            .item-options {
              margin-top: 10px;
              .active {
                a {
                  border-color: $colorA;
                  color: $colorA;
                }
              }
              ul {
                @include flex();
                flex-wrap: wrap;
                li {
                  cursor: pointer;
                  margin-bottom: 10px;
                  a {
                    @include menu-a();
                    width: 292px;
                    height: 44px;
                    line-height: 44px;
                    border: 1px solid $colorE;
                    font-size: $fontI;
                  }
                }
              }
            }
          }
        }
        .service-box {
          margin-top: 20px;
          .service-item {
            margin-top: 20px;
            .item-hd {
              height: 18px;
              line-height: 18px;
              margin-bottom: 15px;
              @include flex();
              .title {
                font-size: $fontH;
              }
              .more {
                a {
                  font-size: $fontJ;
                  color: $colorA;
                }
              }
            }
            .item-bd {
              .active {
                border-color: $colorA;
                z-index: 2;
                .box {
                  h3 {
                    color: $colorA;
                  }
                  .agreement-box {
                    .checkbox {
                      span {
                        border-color: $colorA;
                        background-color: $colorA;
                      }
                    }
                  }
                }
                .radio {
                  span {
                    border-color: $colorA;
                    background-color: $colorA;
                  }
                }
              }
              ul {
                li {
                  position: relative;
                  width: 600px;
                  height: 140px;
                  border: 1px solid $colorH;
                  margin-top: -1px;
                  padding: 30px 0;
                  box-sizing: border-box;
                  cursor: pointer;
                  @include flex(flex-start, flex-start);
                  .radio {
                    display: inline-block;
                    margin: 10px 0 0 30px;
                    width: 36px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    span {
                      @include bgImg(
                        15px,
                        15px,
                        "/imgs/product-detail/icon-selected.png"
                      );
                      border: 1px solid $colorL;
                      border-radius: 50%;
                    }
                  }
                  img {
                    width: 50px;
                    height: 50px;
                    margin: 0 15px 0 10px;
                  }
                  .box {
                    h3 {
                      font-size: $fontH;
                      margin-bottom: 10px;
                      span {
                        font-size: $fontJ;
                        color: $colorG;
                        background-color: $colorA;
                        padding: 4px 6px;
                        border-radius: 20px;
                      }
                    }
                    .description {
                      font-size: $fontJ;
                      color: $colorL;
                    }
                    .agreement-box {
                      margin-top: 10px;
                      .checkbox {
                        span {
                          border: 1px solid $colorL;
                          @include bgImg(
                            15px,
                            15px,
                            "/imgs/product-detail/icon-selected.png"
                          );
                          border-radius: 2px;
                          vertical-align: text-top;
                        }
                      }
                      a,
                      span {
                        color: $colorA;
                        margin-right: 5px;
                      }
                    }
                    .price {
                      position: absolute;
                      bottom: 30px;
                      right: 20px;
                      color: $colorC;
                    }
                  }
                }
              }
            }
          }
        }
        .selected-list {
          width: 600px;
          margin: 20px 0 30px 0;
          padding: 30px;
          box-sizing: border-box;
          background-color: #f9f9fa;
          .info {
            margin-top: 5px;
            ul {
              li {
                @include flex();
                margin-bottom: 10px;
              }
            }
          }
          .total-price {
            font-size: $fontE;
            color: $colorA;
            margin-top: 20px;
          }
        }
        .btn-box {
          width: 600px;
          height: 54px;
          a {
            @include menu-a($colorG);
            height: 54px;
            line-height: 54px;
            font-size: $fontI;
            cursor: pointer;
          }
          .addCart {
            width: 300px;
            background-color: $colorA;
          }
          .favorite {
            margin-left: 10px;
            width: 142px;
            background-color: $colorL;
            &:before {
              content: "";
              @include bgImg(
                20px,
                20px,
                "/imgs/product-detail/icon-favorite.png"
              );
              vertical-align: middle;
              margin-bottom: 5px;
            }
          }
        }
        .after-sale-info {
          margin-top: 25px;
          color: $colorL;
          font-size: $fontJ;
          ul {
            li {
              float: left;
              margin: 0 15px 15px 0;
              span {
                @include bgImg(22px, 22px, "/imgs/product-detail/icon-dui.png");
                vertical-align: middle;
                margin-right: 2px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
    }
  }
  .price-detail {
    width: 100%;
    background-color: #f5f5f5;
    .title {
      font-size: $fontF;
      padding: 22px 0;
    }
    .description {
      padding-bottom: 50px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
