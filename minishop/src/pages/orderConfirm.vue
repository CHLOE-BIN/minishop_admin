<template>
  <div class="orderConfirm">
    <!-- 确认订单信息 地址等 -->
    <div class="container">
      <div class="confirm-box">
        <div class="address">
          <div class="title">收货地址</div>
          <div class="addrList">
            <ul>
              <li class="item" v-for="(item, index) in addr" :key="index"  @click="selectAddr">
                <div class="receiver">{{item.name}}</div>
                <div class="phone">{{item.phone}}</div>
                <div class="address">{{item.address}}</div>
              </li>
              <li class="add" @click="add">
                <div class="add-btn"></div>
                <div class="option">添加新地址</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods">
          <div class="title">商品详情</div>
          <div class="goodList">
            <ul>
              <li v-for="(item, index) in orderForm.productList" :key="index" class="goodItem">
                <span class="detail">
                  <i class="img">
                    <img :src="item.mainImg" alt="">
                  </i>
                  {{item.name}} {{item.version}} {{item.color}}
                </span>
                <span class="price">{{item.price}}元</span>
                <span class="num">{{item.num}}件</span>
                <span class="total">{{item.price*item.num}}元</span>
              </li>
            </ul>
            <div class="line"></div>
          </div>
        </div>
        <div class="confirm">
          <ul>
            <li>
              商品件数:
              <span class="red">{{totalNum}}件</span>
            </li>
            <li>
              应付总额:
              <span class="red">{{totalPrice}}元</span>
            </li>
          </ul>
          <div class="line"></div>
        </div>
      </div>
      <div class="option-btn">
        <div class="btn">
          <button class="goback" @click="goBack">返回购物车</button>
          <button class="goPay" @click="goPay">去支付</button>
        </div>
      </div>
    </div>
    <DialogBox :dialogBox="dialogBox" :orderForm="orderForm" @createAddr="createAddr"></DialogBox>
  </div>
</template>

<script>
import DialogBox from "../components/DialogBox";
export default {
  name: "order-confirm",
  components: {
    DialogBox
  },
  data() {
    return {
      dialogBox: {
        show: false
      },
      orderForm: {
        name: "",
        phone: "",
        location: "",
        detail: "",
        productList: [],
      },
      totalNum: 0,
      totalPrice: 0,
      // 收件人地址选中
      addrList: [],
      // 订单详情
      orderInfo: {
        orderId: "",
        userId: "",
        productList: [],
        name: "",
        phone: "",
        address: "",
        price: ""
      }
    };
  },
  mounted() {
    // 请求省市区districts.json
    // 在vue.config.js中配置
    this.$axios.get("/districts").then(res => {
      console.log(res);
    });
    // 获取需要结算的购物车信息
    this.getCart();
    // 获取默认收件人
    this.createAddr();
  },
  computed: {
    addr : function() {
      return this.addrList
    }
  },
  methods: {
    getCart() {
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        const userId = user._id;
        this.$axios.get("/carts", { params: { userId } }).then(cart => {
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].selected) {
              this.orderForm.productList.push(cart[i])
            }
          }
          for (let i = 0; i < this.orderForm.productList.length; i++) {
            this.totalNum += this.orderForm.productList[i].num;
            this.totalPrice+= this.orderForm.productList[i].num * this.orderForm.productList[i].price;
          }
          console.log("productList=>", this.orderForm.productList);
        }); 
      });
    },
    // 时间戳生成随机订单号
    random_orderId(j) {
      let random_no = "";
      //j位随机数，用以加在时间戳后面。
      for (let i = 0; i < j; i++) {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    },
    createAddr(addrInfo = {}) {
      if(JSON.stringify(addrInfo) != "{}") {
        this.addrList.push(addrInfo)
      } else {
        const username = sessionStorage.getItem('username')
        this.$axios.post('/users/address', {username, addrInfo}).then(res => {
          // console.log('createAddr=>', res);
          if(res.defaultAddr.name != '' && res.defaultAddr.phone != ''  && res.defaultAddr.address != '') {
            this.addrList.push(res.defaultAddr)
          }
        })
      }
      console.log('this.addrList=>', this.addrList);
    },
    selectAddr(e) {
      // 1. 获取选中的地址
      let selected = e.target;
      while (selected.tagName != "LI") {
        selected = selected.parentNode
      }
      console.log(selected);
      let item = document.querySelectorAll(".item")
      console.log('--', item);
      // 2. 修改样式
      for (let i = 0; i < item.length; i++) {
        item[i].classList.remove("active");
      }
      selected.classList.add("active");
      // 3. 修改sessionStorage中的信息
      const name = selected.children[0].innerHTML
      const phone = selected.children[1].innerHTML
      const address = selected.children[2].innerHTML
      sessionStorage.setItem("receiver", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("address", address);

      // 3. 存到orderInfo中
      this.orderInfo.name = sessionStorage.getItem("receiver");
      this.orderInfo.phone = sessionStorage.getItem("phone");
      this.orderInfo.address = sessionStorage.getItem("address");
    },
    add() {
      this.dialogBox.show = true;
    },
    goBack() {
      this.$router.push("/cart");
    },
    goPay() {
      if(this.orderInfo.address === '') {
        this.$message({
            type: "warning",
            message: "请选择地址",
            duration: 1000
          });
        return
      }
      // 1. 生成订单号
      this.orderInfo.orderId = this.random_orderId(6);
      // 2. 获取商品信息
      this.orderInfo.productList = this.orderForm.productList
      // 3. 订单总额
      this.orderInfo.price = this.totalPrice
      // 4. 获取登录用户ID
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        this.orderInfo.userId = user._id;
        console.log("orderInfo=>", this.orderInfo);
        this.$axios.post("/orders/add", this.orderInfo).then(order => {
          console.log(order);
          this.$message({
            type: "success",
            message: "订单生成",
            duration: 1000
          });
          // 路由跳转时传递当前选中的信息
          this.$router.push({
            path: "/pay",
            query: {
              orderId: this.orderInfo.orderId
            }
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.orderConfirm {
  background-color: $colorJ;
  .container {
    padding-top: 40px;
    .confirm-box {
      overflow: hidden;
      padding: 48px 48px 48px 24px;
      background-color: #fff;
      font-size: $fontH;
      .title {
        margin-bottom: 20px;
      }
      .address {
        .addrList {
          ul {
            display: flex;
            .active {
              border: 1px solid $colorA;
              background-color: #ff66001c;
              backdrop-filter: blur(5px);
            }
            li {
              display: inline-block;
              // float: left;
              box-sizing: border-box;
              margin-right: 25px;
              padding: 20px;
              height: 178px;
              width: 268px;
              border: 1px solid #e0e0e0;
              transition: all 0.4s;
              cursor: pointer;
              &:hover {
                border-color: $colorL;
              }
              .receiver {
                margin-bottom: 20px;
                font-size: $fontE;
                color: $colorC;
              }
              .phone, .address{
                margin-bottom: 10px;
                font-size: $fontJ;
                color: $colorD;
              }
            }
            .add {
              .add-btn {
                width: 30px;
                height: 30px;
                margin-left: 95px;
                margin-top: 30px;
                border-radius: 50px;
                background-color: #fff;
                background-image: url("/imgs/plus.png");
              }
              .option {
                text-align: center;
                margin-top: 10px;
                font-size: $fontI;
                color: $colorL;
              }
            }
          }
        }
      }
      .goods {
        margin-top: 20px;
        .goodList {
          .goodItem {
            height: 30px;
            font-size: $fontJ;
            line-height: 30px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .detail {
              .img {
                img{
                  width: 30px;
                  height: 30px;
                  vertical-align: middle;
                }
              }
            }
            .total {
              color: $colorA;
            }
          }
          .line {
            margin-top: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
        }
      }
      .confirm {
        width: 100%;
        float: right;
        font-size: $fontJ;
        margin-top: 20px;
        color: $colorC;
        ul {
          float: right;
          li {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .red {
              color: $colorA;
              margin-left: 80px;
            }
          }
        }
      }
    }
    .option-btn {
      width: 100%;
      margin-top: 5px;
      padding: 20px 48px 20px 24px;
      background-color: #fff;
      font-size: $fontH;
      box-sizing: border-box;
      overflow: hidden;
      .btn {
        float: right;
        button {
          border: none;
          background-color: #fff;
          width: 200px;
          height: 50px;
          cursor: pointer;
        }
        .goback {
          color: $colorL;
          border: 1px solid $colorH;
          transition: all 0.4s;
          &:hover {
            border: 1px solid $colorD;
            color: $colorD;
          }
        }
        .goPay {
          margin-left: 20px;
          background-color: #ff6600e0;
          color: $colorG;
          border: 1px solid $colorG;
          transition: all 0.4s;
          &:hover {
            background-color: #ff6600;
          }
        }
      }
    }
  }
}
</style>