<template>
    <div class="pay">
        <div class="container">
            <div class="goods">
                <div class="success-img">
                    <img src="/imgs/buy/success.png" alt />
                </div>
                <div class="pay-info">
                    <h3>订单提交成功! 去付款咯~</h3>
                    <span>{{info}}</span>
                </div>
            </div>
            <div class="actions">
                <div class="price">
                    应付总额: <span>{{price}}</span>元
                </div>
                <div class="pay">
                    <a @click="wxPay">点击支付</a>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <div v-if="showPay" class="qrcode-box">
            <div class="overlay" v-if="slideShow"></div>
            <div class="slide-box"  :class="{slide:slideShow}">
                <div class="title">
                    微信支付
                    <span class="icon-close" @click="closePay"></span>
                </div>
                <div class="img">
                    <img :src="qrcode" alt="">
                </div>
                <div class="tip">
                    请使用<span @click="goList">微信</span>扫一扫二维码完成支付
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import ServiceBar from "../components/ServiceBar.vue";
export default {
    name:'order-pay',
    components: {
        ServiceBar
    },
    data(){
        return{
            orderId: '',
            cart: [],
            info: '',
            price: 0,
            qrcode: '',
            showPay: true,
            slideShow: false,
            timer:null,
        }
    },
    mounted(){
        this.orderId = this.$route.query.orderId
        this.init()
        let that = this
        //定时请求二维码: 隔5s刷新一次
        this.timer = setInterval(function(){
            that.getQrCode(that.random_orderId(20));
        },5000)

    },
    beforeDestroy() {
        //页面销毁前，清除定时器
        clearInterval(this.timer);//清除timer定时器    
    },
    methods: {
        init() {
            this.$axios.get("/orders/pay", { params: { orderId: this.orderId } })
                .then(order => {
                    console.log("order=>", order);
                    this.info = order.name + " " + order.phone + " " + order.address
                    this.price = order.price
                    this.cart = order.productList
                })
        },
        getQrCode(str) {
            QRCode.toDataURL(str)
            .then(url => {
                console.log(url);
                this.qrcode = url
            })
            .catch(err => {
                console.error(err)
            })
        },
        wxPay() {
            let qrcodeStr = this.random_orderId(20);
            this.getQrCode(qrcodeStr)
            this.slideShow = true
        },
        closePay() {
            this.slideShow = false
        },
        // 时间戳生成随机二维码字符串
        random_orderId(j) {
            let random_no = "";
            //j位随机数，用以加在时间戳后面。
            for (let i = 0; i < j; i++) {
                random_no += Math.floor(Math.random() * 10);
            }
            random_no = new Date().getTime() + random_no;
            return random_no;
        },
        goList() {
            this.$axios.get("/orders/list", {params: { orderId: this.orderId }})
                .then(order => {
                    console.log("order=>", order);
                    // 删除购物车
                    for (let i = 0; i < order.productList.length; i++) {
                        this.$axios.delete("/carts/delete", {params: {cartId: order.productList[i].cartId}})
                    }
                    this.$message({
                        type: "success",
                        message: "支付成功",
                        duration: 1000
                    });
                    this.$router.push("/list");
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.pay {
  position: relative;
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
      .pay-info {
        margin-left: 20px;
        h3 {
          font-size: $fontE;
          font-weight: 400;
        }
        span {
          font-size: $fontJ;
          color: #757575;
          display: inline-block;
          margin-top: 10px;
          padding-left: 3px;
        }
      }
    }
    .actions {
      padding-right: 20px;
      a {
        @include menu-a();
        width: 180px;
        height: 38px;
        line-height: 38px;
        font-size: $fontJ;
        border: 1px solid #b0b0b0;
        cursor: pointer;
      }
      .price{
          text-align: right;
          color: #757575;
          span {
              padding-left: 5px;
              font-size: $fontD;
              color: $colorA;
          }
      }
      .pay {
        margin-top: 20px;
        a {
          background-color: #ff660012;
          color: $colorA;
          border-color: $colorA;
          transition: 0.3s all;
          &:hover {
              background-color: $colorA;
              color: $colorG;
              border-color: $colorA;
          }
        }
      }
    }
  }
  .qrcode-box {
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
      .slide-box {
        width: 400px;
        height: 400px;
        background-color: #fff;
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
        .title {
            background-color: #b0b0b029;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            font-size: $fontI;
            .icon-close {
                @include bgImg(24px, 24px, "/imgs/close-333.png");
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
        }
        .img {
            width: 300px;
            height: 300px;
            margin: 0 auto;
            img {
                width: 100%;
            }
        }
        .tip {
            text-align: center;
            span {
                color: $colorA;
            }
        }
      }
  }
}
</style>