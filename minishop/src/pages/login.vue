<template>
  <div class="index">
    <div class="container">
      <div class="box-hd">
        <a href="javascript:;" @click="goToIndex" class="logo"></a>
        <!-- <div class="title">EASY购商城</div> -->
      </div>
      <div class="box-bd">
        <div class="left">
          <img src="/imgs/login.png" alt />
        </div>
        <div class="right">
          <div class="login" v-if="change">
            <el-form
              :model="loginForm"
              status-icon
              :rules="loginRules"
              ref="loginForm"
              label-width="100px"
              hide-required-asterisk
            >
              <el-form-item label="用户名" prop="l_username" key="login_username">
                <el-input type="text" v-model="loginForm.l_username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" key="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  show-password
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="changeTab">去注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="register" v-if="!change">
            <el-form
              :model="registerForm"
              status-icon
              :rules="registerRules"
              ref="registerForm"
              label-width="100px"
              hide-required-asterisk
            >
              <el-form-item label="邮箱" prop="email" key="email">
                <el-input type="text" v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="r_username" key="register_username">
                <el-input type="text" v-model="registerForm.r_username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password1" key="password1">
                <el-input type="password" v-model="registerForm.password1" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2" key="password2">
                <el-input type="password" v-model="registerForm.password2" placeholder="再次输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="register-btn"
                  @click="submitForm('registerForm')"
                >注册</el-button>
                <el-button @click="changeTab">去登陆</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    // 验证password2是否等于password
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // publicURL: "http://localhost:8081",
      change: true,
      loginForm: {
        l_username: "",
        password: ""
      },
      loginRules: {
        l_username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      registerForm: {
        email: "",
        r_username: "",
        password1: "",
        password2: ""
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        r_username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password1: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "密码长度应在6-20之间"
          }
        ],
        password2: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.change = this.$route.query.change == 'true' || !this.$route.query.change ? true : false
    console.log(this.change);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === "loginForm") {
            let obj = {
              username: this.loginForm.l_username,
              password: this.loginForm.password,
            }
            // 请求登录接口
            this.$axios.post("/users/login", obj).then(res => {
              // 1. 将用户名和token存放入sessionStorge
              sessionStorage.setItem("username", res.username);
              sessionStorage.setItem("token", res.token);
              // 2. 将用户和token存放入vuex
              this.$store.dispatch("setUser", res);
              // 登录状态打印
              console.log("token: ", this.$store.state.token);
              // 返回上一页
              this.$message({
                type: "success",
                message: "登录成功",
                duration: 1000
              });
              this.$router.back(-1);
            });
          } else if (formName === "registerForm") {
            let obj = {
              username: this.registerForm.r_username,
              password: this.registerForm.password1,
              email: this.registerForm.email
            }
            // 请求注册接口
            this.$axios.post("/users/register", obj).then(() => {
              this.$message({
                type: "success",
                message: "注册成功",
                duration: 1000
              });
              this.change = !this.change;
            });
          }
        }
      });
    },
    changeTab() {
      this.change = !this.change;
    },
    goToIndex() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.index {
  .container {
    width: 100%;
    .box-hd {
      display: flex;
      .logo {
        @include bgImg(150px, 50px, "/imgs/minishopName.png");
      }
      .title {
        text-align: center;
        padding-top: 10px;
        margin-bottom: 20px;
        font-size: $fontD;
      }
    }
    .box-bd {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #eeeeee;
      .left {
        width: 50%;
      }
      .right {
        width: 50%;
        .login {
          width: 70%;
          .login-btn {
            width: 50%;
            margin: 0 auto;
          }
        }
        .register {
          width: 70%;
          .register-btn {
            width: 50%;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>