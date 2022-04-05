<template>
  <div>
    <order-header></order-header>
    <div class="cartList" v-show="has_cart">
      <div class="container">
        <div class="cart-wrap">
          <div class="goods-list">
            <div class="list-hd">
              <div class="col col-checkbox" @click="selectAll">
                <input type="checkbox" class="all" />
                <label for="all">全选</label>
              </div>
              <div class="col col-name">商品名称</div>
              <div class="col col-price">单价</div>
              <div class="col col-num">数量</div>
              <div class="col col-total">小计</div>
              <div class="col col-action">操作</div>
            </div>
            <div class="list-bd">
              <div class="list-item">
                <ul>
                  <li v-for="(item,index) in cartList" :key="index" :id="`item${index}`">
                    <div class="item-box">
                      <div class="col-checkbox" @click="selectOne">
                        <input type="checkbox" class="item" :id="`item${index}`" />
                      </div>
                      <div class="col-img">
                        <img :src="item.mainImg" alt />
                      </div>
                      <div class="col-name">{{item.name}} {{item.version}} {{item.color}}</div>
                      <div class="col-price">{{item.price}}元</div>
                      <div class="col-num" :id="`num${index}`">
                        <span class="minus" @click="minusNum">-</span>
                        <input type="text" :value="num[index]" />
                        <span class="add" @click="addNum">+</span>
                      </div>
                      <div class="col-total">{{goodNum[index]*item.price |currency}}</div>
                      <div class="col-action">
                        <span class="delete" @click="deleteGood"></span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="cart-bar">
            <div class="left">
              <a class="back-shopping" @click="backShopping">继续购物</a>
              <span>|</span>
              <div class="cart-total">已选择 {{totalNum}} 件</div>
            </div>
            <div class="right">
              <span class="total-price">
                合计：
                <i>{{totalPrice}}</i>元
              </span>
              <a class="go-orderList" @click="goOrderConfirm">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="noCart" v-show="!has_cart">
        <img src="/imgs/noCart.png" alt />
        <button @click="backShopping">马上去购物</button>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue";
import NavFooter from "../components/NavFooter.vue";
export default {
  name: "order",
  components: {
    OrderHeader,
    NavFooter
  },
  data() {
    return {
      cartId: [],
      cartList: [],
      is_all: true,
      checkbox: [],
      has_cart: true,
      price: [],
      goodNum: [],
    };
  },
  computed: {
    num: function() {
      return this.goodNum;
    },
    checked: function() {
      return this.checkbox;
    },
    totalNum: function() {
      let sum = 0;
      if (this.num.length == 0) {
        return 0;
      } else {
        for (let i = 0; i < this.num.length; i++) {
          if(this.checked[i]){
            sum += this.num[i];
          }
        }
        return sum;
      }
    },
    totalPrice: function() {
      let sum = 0;
      for (let i = 0; i < this.num.length; i++) {
        if(this.checked[i]){
          sum += this.num[i] * this.price[i];
        }
      }
      return sum;
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return val.toFixed(0) + "元";
    }
  },
  methods: {
    init() {
      // 获取当前用户购物车信息: 1.用户Id 2.商品详情 3.购物车列表
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        const userId = user._id;
        this.$axios.get("/carts", { params: { userId } }).then(cart => {
          if (cart.length == 0) {
            this.has_cart = false;
            console.log("has_cart=>", this.has_cart);
          }
          this.cartList = cart;
          console.log("cartList=>", this.cartList);
          // 初始化购物车数量
          for (let i = 0; i < this.cartList.length; i++) {
            this.goodNum[i] = 1;
            this.$set(this.goodNum, i, 1);
            this.price[i] = this.cartList[i].price;
            this.cartId[i] = this.cartList[i].cartId;
          }
          console.log("this.price=>", this.price);
          console.log("this.goodNum=>", this.goodNum);
          console.log("this.cartId=>", this.cartId);
        });
      });
    },
    // 全选
    selectAll() {
      console.log("全选啦");
      let all = document.querySelector(".all");
      let checkbox = document.querySelectorAll(".item");
      for (let i = 0; i < checkbox.length; i++) {
        if (all.checked == true) {
          checkbox[i].checked = true;
          this.$set(this.checkbox, i, true);
        } else {
          checkbox[i].checked = false;
          this.$set(this.checkbox, i, false);
        }
      }
      console.log(this.checkbox);
    },
    // 单个选择: 检查所有项控制全选框
    selectOne() {
      let all = document.querySelector(".all");
      let checkbox = document.querySelectorAll(".item");
      let checked = [];
      for (let i = 0; i < checkbox.length; i++) {
        checked[i] = checkbox[i].checked;
        this.is_all = this.is_all && checkbox[i].checked;
      }
      this.is_all = checked.every(flag => flag == true);
      if (this.is_all) {
        all.checked = true;
      } else {
        all.checked = false;
      }
      this.checkbox = checked;
      console.log(this.checkbox);
    },
    // 数量选择
    minusNum(e) {
      let inputVal = document.querySelector(`#${e.target.parentNode.id}`)
        .children[1];
      let index = e.target.parentNode.id.replace(/[^0-9]/gi, "");
      if (this.goodNum[index] == 1) {
        this.$message({
          type: "warning",
          message: "商品数量不可小于0",
          duration: 1000
        });
        inputVal.value = parseInt(inputVal.value) + 1;
      } else {
        let num = this.goodNum[index] - 1;
        this.$set(this.goodNum, index, num);
      }
      inputVal.value = parseInt(inputVal.value) - 1;
      console.log("inputVal=>", inputVal);
      console.log("goodNum=>", this.goodNum);
    },
    addNum(e) {
      let inputVal = document.querySelector(`#${e.target.parentNode.id}`)
        .children[1];
      let index = e.target.parentNode.id.replace(/[^0-9]/gi, "");
      let num = this.goodNum[index] + 1;
      this.$set(this.goodNum, index, num);
      inputVal.value = parseInt(inputVal.value) + 1;
      console.log("inputVal=>", inputVal);
      console.log("goodNum=>", this.goodNum);
    },
    // 删除当前商品
    deleteGood(e) {
      let target = e.target.parentNode.parentNode;
      let parent = target.parentNode;
      let index = parent.id.replace(/[^0-9]/gi, "");
      if (parent.childNodes.length >= 1) {
        // 1. 在购物车页面中移除
        parent.removeChild(target);
        // 2. 重设全选框
        this.selectOne();
        // 3. 从数据库中删除该条数据
        let cartId = this.cartId[index];
        // 4. 更新goodNum和checkbox
        this.goodNum.splice(index, 1);
        console.log("goodNum=>", this.goodNum);
        this.checkbox.splice(index, 1);
        location.reload();
        this.$axios
          .delete("/carts/delete", {
            params: {
              cartId
            }
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
              duration: 1000
            });
            // location.reload();
          });
      } else {
        this.has_cart = false;
      }
    },
    backShopping() {
      window.removeEventListener("scroll", this.cartBarHeight);
      this.$router.push("/");
    },
    goOrderConfirm() {
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i]) {
          // 1. 修改选中商品的数量
          let cartId = this.cartId[i];
          let num = this.num[i];
          this.$axios.post("/carts/edit", {cartId, num}).then(res=>{
            console.log(res);
          })
        }
      }
      // 生成订单
      this.$router.push("/confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.cartList {
  width: 100%;
  background-color: #f5f5f5;
  padding: 38px 0;
  .container {
    .cart-wrap {
      position: relative;
      .goods-list {
        width: 100%;
        background-color: $colorG;
        input[type="checkbox"] {
          -webkit-appearance: none; /*清除复选框默认样式*/
          width: 20px;
          height: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-left: 20px;
        }
        input[type="checkbox"]:checked {
          border: 1px solid $colorA;
          @include bgImg(20, 20, "/imgs/checked.png");
        }
        label {
          margin-left: 20px;
        }
        .list-hd {
          @include flex(flex-start);
          height: 70px;
          line-height: 70px;
          font-size: $fontJ;
          .col-checkbox {
            width: 110px;
            box-sizing: border-box;
            span {
              @include checkbox();
            }
          }
          .col-name {
            width: 380px;
            margin-left: 120px;
          }
          .col-price {
            width: 158px;
            text-align: center;
          }
          .col-num {
            width: 150px;
            text-align: center;
          }
          .col-total {
            width: 210px;
            text-align: center;
          }
          .col-action {
            width: 80px;
            text-align: center;
          }
        }
        .list-bd {
          width: 100%;
          border-top: 1px solid $colorH;
          .list-item {
            padding: 15px 0;
            .item-box {
              @include flex(flex-start);
              height: 87px;
              .col-checkbox {
                display: inline-block;
                width: 110px;
                span {
                  @include checkbox();
                }
              }
              .col-img {
                width: 120px;
                img {
                  width: 60px;
                  height: 60px;
                }
              }
              .col-name {
                display: inline-block;
                width: 380px;
                font-size: $fontH;
                color: #424242;
              }
              .col-price {
                width: 158px;
                font-size: $fontI;
                text-align: center;
              }
              .col-num {
                width: 150px;
                height: 40px;
                border: 1px solid $colorH;
                @include flex();
                .minus,
                .add {
                  display: inline-block;
                  cursor: pointer;
                  user-select: none;
                  width: 38px;
                  height: 40px;
                  line-height: 40px;
                  color: $colorC;
                  text-align: center;
                  font-size: $fontF;
                  font-weight: 500;
                  &:hover {
                    background-color: $colorH;
                  }
                }
                input {
                  width: 72px;
                  height: 38px;
                  border: none;
                  text-align: center;
                }
              }
              .col-total {
                width: 201px;
                text-align: center;
                font-size: $fontI;
                color: $colorA;
              }
              .col-action {
                width: 80px;
                text-align: center;
                .delete {
                  @include bgImg(25px, 25px, "/imgs/buy/icon-delete.png");
                  cursor: pointer;
                  transition: all 0.2s;
                  &:hover {
                    @include bgImg(
                      25px,
                      25px,
                      "/imgs/buy/icon-delete-hover.png"
                    );
                    border-radius: 50%;
                  }
                }
              }
            }
          }
        }
      }
      .hide-cart-bar {
        position: absolute;
        bottom: 0px;
        opacity: 0;
        transition: opacity 0.3s linear;
        &.is_Fixed {
          position: fixed;
          bottom: 0px;
          width: $min-width;
          box-shadow: 0 -5px 5px rgb(0 0 0 / 7%);
          opacity: 1;
        }
      }
      .cart-bar {
        height: 50px;
        line-break: 50px;
        background-color: $colorG;
        margin-top: 30px;
        @include flex();
        font-size: $fontJ;
        width: 100%;
        .left {
          @include flex(flex-start);
          margin-left: 32px;
          color: #757575;
          .back-shopping {
            cursor: pointer;
            &:hover {
              color: $colorA;
            }
          }
          span {
            margin: 0 16px;
            color: $colorH;
          }
        }
        .right {
          @include flex(flex-end);
          .total-price {
            color: $colorA;
            i {
              font-style: normal;
              font-size: $fontC;
            }
          }
          .go-orderList {
            width: 202px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: $colorG;
            background-color: $colorA;
            font-size: $fontH;
            margin-left: 50px;
            cursor: pointer;
            &:hover {
              background-color: #f06000;
            }
          }
        }
      }
    }
  }
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  .noCart {
    img {
      width: 200px;
      padding: 100px;
    }
    button {
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 10px 20px;
      border: 1px solid $colorA;
      color: #fff;
      background-color: $colorA;
      &:hover {
        border: 1px solid #f06000;
        color: #fff;
        background-color: #f06000;
      }
    }
  }
}
</style>