<template>
    <div class="order-list">
        <div class="container">
          <div class="empty" v-if="!show">
            <img src="/imgs/emptyOrder.png" alt="">
          </div>
          <div class="mylist" v-if="show">
            <div class="list-hd">
              <div class="title">我的订单</div>
                <div class="option"><a @click="goShopping">继续购物</a></div>
            </div>
            <div class="list-bd">
              <div class="item" v-for="(item, index) in myOrder" :key="index">
                <div class="item-hd">
                  <div class="state">
                    <span v-if="item.is_pay">已付款</span>
                    <span v-else>等待付款</span>
                    <div class="delete">
                        <a @click="deleteOrder(item.orderId)">取消订单</a>
                    </div>
                  </div>
                  <div class="orderInfo">
                    <span>{{item.date}}</span>
                    <span>{{item.name}}</span>
                    <span>订单号: {{item.orderId}}</span>
                    <span>在线支付</span>
                  </div>
                  <div class="price">
                    应付金额： <span class="big"> {{item.price}} </span>元
                    </div>
                </div>
                <div class="item-bd">
                  <div class="product" v-for="(sub, index) in item.productList" :key="index">
                    <div class="proInfo">
                      <div class="img">
                        <img class="mainImg" :src="sub.mainImg" alt="">
                      </div>
                      <div class="info">
                        <div class="detail">{{sub.name}} {{sub.version}} {{sub.color}}</div>
                        <div class="price">{{sub.price}} × {{sub.num}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name:'order-list',
  data() {
    return {
      show: true,
      myOrder: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const username = sessionStorage.getItem("username");
      this.$axios.post("/users", { username }).then(user => {
        const userId = user._id;
        this.$axios.get("/orders/user", { params: {userId}})
          .then(order => {
            if(order.length != 0) {
              this.show = true
            } else {
              this.show = false
            }
            this.myOrder = order
            for (let i = 0; i < this.myOrder.length; i++) {
                let date = this.myOrder[i].date
                let dateFormat = this.format(Date.parse(date))
                this.myOrder[i].date = dateFormat
            }
            console.log('myOrder=>', this.myOrder);
          })
      })
    },
    add0(m) {
      return m<10?'0'+m:m 
    },
    format(date) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(date); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      // var s = time.getSeconds();
      return y+'年'+this.add0(m)+'月'+this.add0(d)+'日 '+this.add0(h)+':'+this.add0(mm);
    },
    goShopping() {
      this.$router.push("/")
    },
    deleteOrder(orderId) {
      this.$axios.delete("/orders/delete", {params: {orderId}})
        .then(() => {
          location.reload()
          this.$message({
              type: "success",
              message: "订单已取消",
              duration: 1000
          });
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.order-list {
  background-color: #f5f5f5;
  .container {
    padding-top: 40px;
    padding-bottom: 40px;
    .empty {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .mylist {
      background-color: #fff;
      padding: 50px 20px 20px 40px;
      .list-hd {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: $fontD;
          color: $colorC;
        }
      }
      .list-bd {
        margin-top: 30px;
        margin-bottom: 20px;
        .item {
          width: 100%;
          margin-top: 50px;
          border: 1px solid $colorA;
          box-sizing: border-box;
          .item-hd {
            position: relative;
            height: 100px;
            background-color: #ff660008;
            border-bottom: 1px solid #ff6600b1;
            padding: 30px 10px 0px 25px;
            .state {
              display: flex;
              justify-content: space-between;
              color: $colorA;
              font-size: $fontG;
              .delete {
                font-size: $fontK;
                a {
                  display: inline-block;
                  margin-bottom: 10px;
                  padding: 10px 20px;
                  background-color: $colorA;
                  color: $colorG;
                  border: 1px solid $colorA;
                  cursor: pointer;
                }
              }
            }
            .orderInfo {
              display: inline-block;
              margin-top: 20px;
              font-size: $fontJ;
              color: $colorC;
              span:not(:last-child) {
                &:after {
                  content: '';
                  border-left: 1px solid #ddd;
                  width: 1px;
                  height: 5px;
                  margin-left: 5px;
                  margin-right: 5px;
                }
              }
            }
            .price {
              display: inline-block;
              position: absolute;
              right: 20px;
              bottom: 10px;
              font-size: $fontJ;
              .big {
                font-size: $fontD;
              }
            }
          }
          .item-bd {
            padding: 30px 10px 10px 25px;
            .product {
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              .proInfo {
                height: 100px;
                display: flex;
                align-items: center;
                .img {
                  width: 100px;
                  height: 100px;
                  margin-right: 10px;
                  img {width: 100%; height: 100%;}
                }
                .info {
                  font-size: $fontJ;
                  .detail {
                    padding-bottom: 5px;
                  }
                }
              }
              .option {
                a {
          display: inline-block;
          margin-bottom: 10px;
          padding: 10px 20px;
          background-color: #ff660012;
          color: $colorA;
          border: 1px solid $colorA;
          cursor: pointer;
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
        }
      }
      .option {
        a {
          display: inline-block;
          margin-bottom: 10px;
          padding: 10px 20px;
          background-color: #ff660012;
          color: $colorA;
          border: 1px solid $colorA;
          cursor: pointer;
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
}
</style>