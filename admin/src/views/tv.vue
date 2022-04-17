<template>
  <div class="phone">
    <NavMenu></NavMenu>
    <div class="list">
      <div class="list-hd">
        <div class="addbtn">
          <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        </div>
      </div>
      <div class="list-bd">
        <div class="products">
          <el-table
            :data="tvList"
            style="width: 150%"
            :default-sort="{prop: 'productId', order: 'ascending'}"
          >
            <el-table-column prop="productId" label="商品ID" sortable width="180"></el-table-column>
            <el-table-column prop="name" label="商品名称" sortable width="180"></el-table-column>
            <!-- <el-table-column prop="subtitle" label="商品介绍" sortable width="180"></el-table-column> -->
            <el-table-column prop="mainImage" label="商品图片" sortable width="180">
              <template slot-scope="scope">
               <img class="mainImage" :src="require('../../../minishop/public'+scope.row.mainImage)" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="price" label="商品价格" sortable width="180">
              <template slot-scope="scope">
                <span>{{scope.row.price | price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reserve" label="商品库存" sortable width="180">
              <template slot-scope="scope">
                <span>{{scope.row.reserve | num}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <DialogBox :dialogBox="dialogBox" :productsForm="productsForm"></DialogBox>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu";
import DialogBox from "../components/DialogBox";
export default {
  name: "tv",
  components: {
    NavMenu,
    DialogBox
  },
  data() {
    return {
      tvList: [],
      dialogBox: {
        show: false,
        title: "",
        option: ""
      },
      productsForm: {
        categoryId: "",
        productId: "",
        name: "",
        subtitle: "",
        mainImage: "",
        price: "",
        reserve: ""
      }
    };
  },
  filters: {
    price(val) {
      if (!val) return "￥0.00 元";;
      return "￥" + val.toFixed(2) + " 元";
    },
    num(val) {
      if (!val) return "0 件";
      return val + " 件";
    }
  },
  mounted() {
    this.getProductsList();
  },
  methods: {
    getProductsList() {
      this.$axios.get("/products").then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].categoryId == 2) {
            this.tvList.push(res[i]);
          }
        }
        console.log(this.tvList);
      });
    },
    handleEdit(row) {
      this.dialogBox = {
        show: true,
        title: "修改商品信息",
        option: "edit"
      };
      this.productsForm = {
        categoryId: row.categoryId,
        productId: row.productId,
        name: row.name,
        subtitle: row.subtitle,
        mainImage: row.mainImage,
        price: row.price,
        reserve: row.reserve
      };
    },
    handleDelete(row) {
      this.$axios.delete(`/products/delete/${row.productId}`).then(res => {
        this.$message({
          message: "商品删除成功",
          type: "success",
          duration: 1000
        });
        location.reload();
      });
    },
    handleAdd() {
      this.dialogBox = {
        show: true,
        title: "添加商品信息",
        option: "add"
      };
      this.productsForm = {
        categoryId: "",
        productId: "",
        name: "",
        subtitle: "",
        mainImage: "",
        price: "",
        reserve: ""
      };
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
      .mainImage {
        width: 100px;
        height: 90px;
      }
    }
  }
}
</style>