<template>
  <div class="left">
    <div class="title">EASY购管理系统</div>
    <div class="options">
      <el-row>
        <el-col>
          <el-menu :default-openeds="['2']">
            <router-link to="/home">
              <el-menu-item index="1">
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            </router-link>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <router-link to="/phone">
                  <el-menu-item index="2-1">
                    <i class="el-icon-mobile-phone"></i>
                    <template slot="title">手机</template>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
              <router-link to="/tv">
                <el-menu-item index="2-2">
                  <i class="el-icon-s-platform"></i>
                  <template slot="title">电视</template>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <router-link to="/user">
              <el-menu-item index="3">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/allOrders">
              <el-menu-item index="4">
                <i class="el-icon-document"></i>
                <span slot="title">订单管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-menu",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.left {
  width: 200px;
  height: 500px;
  .title {
    margin: 10px;
    text-align: center;
    width: 90%;
    height: 50px;
    line-height: 50px;
    background-color: #ff66001d;
  }
  .options {
    margin-top: 20px;
    .el-menu-item {
      padding-left: 0;
    }
  }
}
</style>