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
        <div class="users">
          <el-table
            :data="showList"
            style="width: 150%"
            :default-sort="{prop: '_id', order: 'ascending'}"
          >
            <el-table-column prop="_id" label="用户ID" sortable width="180"></el-table-column>
            <el-table-column prop="username" label="用户名称" sortable width="180"></el-table-column>
            <!-- <el-table-column prop="password" label="用户密码" sortable width="180"></el-table-column> -->
            <el-table-column prop="email" label="用户邮箱" sortable width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="checkOrder(scope.row)" type="text">查看订单</el-button>
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
  name: "user",
  components: {
    NavMenu
  },
  data() {
    return {
      userList: [],
      searchWord: '',
      showList: []
    };
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      this.$axios.get("/users/all").then(res => {
        for (let i = 0; i < res.length; i++) {
          this.userList.push(res[i]);
          let id = res[i]._id
          this.getUserOrder(id, i)
        }
        this.showList = this.userList
      });
    },
    search() {
      if(this.searchWord == '') {
        this.showList = this.userList
        return
      }
      let result = []
      for (let i = 0; i < this.userList.length; i++) {
        let user = this.userList[i]
        Object.getOwnPropertyNames(user).forEach(key => {
          if(user[key] == this.searchWord) {
            result.push(user)
          }
        })
      }
      this.showList = result
    },
    reset() {
      this.showList = this.userList
      this.searchWord = ''
    },
    getUserOrder(id, i) {
      this.$axios.get("/orders/user", {params: {userId: id}}).then(res => {
        this.userList[i].orderList = res
      })
    },
    checkOrder(row) {
      console.log(row);
      let id = row._id
      this.$router.push({ 
        name: 'order', 
        query: { 
           userId: id
        } 
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
      // margin-top: 10px;
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