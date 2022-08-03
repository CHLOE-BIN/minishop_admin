<template>
  <div class="phone">
    <NavMenu></NavMenu>
    <div class="list">
      <div class="list-hd">
        <div class="addbtn">
          <el-button type="primary" @click="handleAdd">添加</el-button>
          <el-button type="primary" @click="handleDeleteMany">批量删除</el-button>
        </div>
        <div class="search">
          <div class="input">
            <el-input type="text" v-model="searchWord" placeholder="请输入搜索关键词" @keyup.enter.native="search"></el-input>
          </div>
          <div class="btn">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </div>
      </div>
      <div class="list-bd">
        <div class="products">
          <el-table
            :data="showList"
            style="width: 150%"
            :default-sort="{prop: 'productId', order: 'ascending'}"
            @selection-change="handleSelectionChange"
          >
           <el-table-column type="selection" width="55"> </el-table-column>
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
      <!-- 分页 -->
      <div class="pagination" v-if="is_show">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="tablePage.pageNum"
            :page-size="tablePage.pageSize"
            :page-sizes="pageSizes"
            :total="tablePage.total"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
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
      searchWord: '',
      tvList: [],
      showList: [],
      dialogBox: {
        show: false,
        title: "",
        option: ""
      },
      productsForm: {
        categoryId: 2,
        productId: "",
        name: "",
        subtitle: "",
        mainImage: "",
        price: "",
        reserve: ""
      },
      // 选项框
      multipleSelection: [],
      // 分页
      tablePage: {
        pageNum: 1, // 第几页
        pageSize: 5, // 每页多少条
        total: 0 // 总记录数
      },
      pageSizes: [5, 10],
      is_show: true
    };
  },
  filters: {
    price(val) {
      if (!val) return "￥0.00 元";;
      return "￥" + val.toFixed(2);
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
        this.tablePage.total = this.tvList.length
        this.handlePageChange(1)
        console.log('--', this.tvList);
      });
    },
        search() {
      if(this.searchWord == '') {
        this.handlePageChange(1)
        this.is_show = true
        return
      }
      let result = []
      for (let i = 0; i < this.tvList.length; i++) {
        let tv = this.tvList[i]
        Object.getOwnPropertyNames(tv).forEach(key => {
          if(tv[key] == this.searchWord) {
            result.push(tv)
          }
        })
      }
      this.showList = result
      this.is_show = false
    },
    reset() {
      this.handlePageChange(1)
      this.is_show = true
      this.searchWord = ''
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
        categoryId: 2,
        productId: this.tvList.at(-1).productId + 1,
        name: "",
        subtitle: "这是一段描述",
        mainImage: "/imgs/navheader/1-10.webp",
        price: "",
        showImg: ['/imgs/product-detail/slide-1.png', '/imgs/product-detail/slide-2.png', '/imgs/product-detail/slide-3.png', '/imgs/product-detail/slide-4.png'],
        version: ['6GB+128GB', '8GB+256GB'],
        color: ['星空灰', '活力粉', '中国红'],
        reserve: ""
      };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDeleteMany() {
      this.$confirm("此操作将删除选中的内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
            for (let i = 0; i < this.multipleSelection.length; i++) {
              let id = this.multipleSelection[i].productId
              this.$axios.delete(`/products/delete/${id}`).then(res => {
                  this.$message({
                    message: "商品删除成功",
                    type: "success",
                    duration: 1000
                  });
                  location.reload()
                });
            }
        })
    },
    // 分页
    handlePageChange(currentPage) {
      this.tablePage.pageNum = currentPage
      let size = this.tablePage.pageSize
      if(currentPage == 1) {
        let start = 0
        this.showList = this.tvList.slice(start, size)
      } else {
        let start = size * currentPage - size
        let end = size * currentPage
        this.showList = this.tvList.slice(start, end)
      }
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize
      let currentPage = this.tablePage.pageNum
      if(currentPage == 1) {
        let start = 0
        this.showList = this.tvList.slice(start, pageSize)
      } else {
        let start = pageSize * currentPage - pageSize
        let end = pageSize * currentPage
        this.showList = this.tvList.slice(start, end)
      }
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
    margin: 10px;
    .list-hd {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      padding: 20px 0;
      .search {
        display: flex;
        justify-content: flex-end;
        .input {
          margin-right: 10px;
          width: 300px;
        }
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