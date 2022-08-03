<template>
  <div class="phone">
    <NavMenu></NavMenu>
    <div class="list">
      <div class="list-bd">
        <div class="search">
          <div class="input">
            <el-input type="text" v-model="searchWord" placeholder="请输入搜索关键词" @keyup.enter.native="search"></el-input>
          </div>
          <div class="btn">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </div>
        <div class="order">
          <el-table
          border
            :data="showList"
            style="width: 100%"
            :default-sort="{prop: 'orderId', order: 'ascending'}"
          >
            <el-table-column fixed prop="orderId" label="订单号" sortable width="180"></el-table-column>
            <el-table-column prop="name" label="收货人" width="100"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
            <el-table-column prop="address" label="收货地址" width="220"></el-table-column>
            <el-table-column prop="price" label="订单总额" :formatter="priceFormat" width="180"></el-table-column>
            <el-table-column prop="productList" label="商品列表" :formatter="productFormat" width="600"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteOrder(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu";
export default {
  name: "order",
  components: {
    NavMenu
  },
  data() {
    return {
        userId: '',
        orderList: [],
        searchWord: '',
        showList: []
    };
  },
  mounted() {
    this.userId = this.$route.query.userId
    this.$axios.get("/orders").then(res => {
        this.orderList = res
        this.showList = this.orderList
    })
  },
  methods: {
    search() {
      if(this.searchWord == '') {
        this.showList = this.orderList
        return
      }
      let result = []
      for (let i = 0; i < this.orderList.length; i++) {
        let order = this.orderList[i]
        Object.getOwnPropertyNames(order).forEach(key => {
          if(order[key] == this.searchWord) {
            result.push(order)
          }
        })
      }
      this.showList = result
    },
    reset() {
      this.showList = this.orderList
      this.searchWord = ''
    },
    priceFormat(row) {
      return '￥' + row.price.toFixed(2)
    },
      productFormat(row) {
          let arr = []
          row.productList.forEach((item, index) => {
              arr.push(item.name + ' ' + item.version + ' ' + item.color + ' ×' +item.num + '件')
          });
          return arr.join(' / ')
      },
      deleteOrder(row) {
          console.log(row);
          let orderId = row.orderId
          this.$axios.delete("/orders/delete", {params: {orderId}})
            .then(() => {
            location.reload()
            this.$message({
                type: "success",
                message: "订单已删除",
                duration: 1000
            });
          })
      }
  }
};
</script>

<style lang="scss" scoped>
.phone {
  display: flex;
  justify-content: flex-start;
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px;
    .list-hd {
      overflow: hidden;
      .addbtn {
        float: right;
      }
    }
    .list-bd {
      margin-top: 10px;
      width: 1000px;
      .search {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0;
        .input {
          margin-right: 10px;
          width: 300px;
        }
      }
    }
  }
}
</style>