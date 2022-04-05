<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      // res: {}
    };
  },
  mounted() {
    this.getUser();
    // this.getCartCount();
  },
  methods: {
    getUser() {
      let username = sessionStorage.getItem("username");
      this.$axios
        .post("/users", {
          username
        })
        .then(res => {
          // 通过sessionStorage获取vuex中的isLogin状态
          if (
            res &&
            sessionStorage.getItem("username") &&
            sessionStorage.getItem("token")
          ) {
            this.$store.commit(
              "userStatus",
              sessionStorage.getItem("username")
            );
          } else {
            this.$store.commit("userStatus");
          }
        });
    }
    // getCartCount() {
    //   this.$axios.get("/carts/products/sum").then(res => {
    //     // 保存到vuex里
    //     this.$store.dispatch("saveCartCount", res.sum);
    //   });
    // }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
</style>
