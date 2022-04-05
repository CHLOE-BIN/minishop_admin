<template>
  <div class="dialogBox">
    <el-dialog title="添加收货地址" :visible.sync="dialogBox.show" :before-close="handleClose">
      <div class="form">
        <el-form
          :model="orderForm"
          :rules="rules"
          ref="form"
          label-width="70px"
          hide-required-asterisk
        >
          <el-form-item label="收件人" prop="name">
            <el-input v-model.number="orderForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="orderForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="所在地" prop="location">
            <el-cascader
              placeholder="省/市/区"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detail">
            <el-input v-model.number="orderForm.detail" type="textarea"></el-input>
          </el-form-item>
          <div class="btn">
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">确定</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogBox",
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "收件人不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        detail: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ]
      },
      // 省市区选择
      options: [],
      selectedOptions: [],
      cityArr: [], //城市列表
      areaArr: [], //区县列表
      province: "", //省
      city: "", //市
      area: "", // 区县,
      provinceCityArea: "", //选择器选择的省市区
      // 收件人详情
      addrInfo: {
        name: '',
        phone: '',
        address: ''
      },
    };
  },
  props: {
    dialogBox: Object,
    orderForm: Object
  },
  mounted() {
    this.initDistPicker();
  },
  methods: {
    // 所在地
    initDistPicker() {
      console.log("initDistrictsPicker");
      let self = this;
      this.$axios.get("/districts").then(res => {
        console.log("res==>", res);
        let distData = res.data;
        let options = [];
        // 省
        for (var provinceKy in distData["100000"]) {
          let optProvinceItem = {
            value: provinceKy,
            label: distData["100000"][provinceKy]
          };
          if (distData[provinceKy]) {
            // 市
            for (var cityKy in distData[provinceKy]) {
              optProvinceItem.children = optProvinceItem.children
                ? optProvinceItem.children
                : [];
              let optCityItem = {
                value: cityKy,
                label: distData[provinceKy][cityKy]
              };
              if (distData[cityKy]) {
                // 区
                for (var areaKy in distData[cityKy]) {
                  optCityItem.children = optCityItem.children
                    ? optCityItem.children
                    : [];
                  let optAreaItem = {
                    value: areaKy,
                    label: distData[cityKy][areaKy]
                  };
                  optCityItem.children.push(optAreaItem);
                }
              }
              optProvinceItem.children.push(optCityItem);
            }
          }
          options.push(optProvinceItem);
        }
        self.distData = distData;
        self.options = options;
      });
    },
    handleChange(value) {
      let self = this;
      console.log("value=>", value);
      //获取省名
      self.options.map(item => {
        if (item.value == value[0]) {
          self.cityArr = item.children; //存储城市列表
          self.province = item.label;
        }
      });
      //获取市名
      self.cityArr.map(item => {
        if (item.value == value[1]) {
          self.areaArr = item.children; //存储区县列表
          self.city = item.label;
        }
      });
      //获取区县名
      self.areaArr.map(item => {
        if (item.value == value[2]) {
          self.area = item.label;
        }
      });
      self.provinceCityArea = self.province + self.city + self.area;
      console.log("所在地: ", self.provinceCityArea);
      this.orderForm.location = self.provinceCityArea;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 在sessionStorage中存储当前收货人信息
          // 1. 收件人信息
          this.addrInfo.name = this.orderForm.name;
          sessionStorage.setItem("receiver", this.addrInfo.name);
          // 2. 收件人手机号
          this.addrInfo.phone = this.orderForm.phone;
          sessionStorage.setItem("phone", this.addrInfo.phone);
          // 3. 拼接完整地址
          this.addrInfo.address = this.orderForm.location + this.orderForm.detail;
          sessionStorage.setItem("address", this.addrInfo.address);
          console.log("addrInfo=>", this.addrInfo);
          this.cancel()
          this.$emit('createAddr')
        }
      });
    },
    cancel() {
      this.dialogBox.show = false;
      this.$refs.form.clearValidate();
    },
    handleClose() {
      this.dialogBox.show = false;
      this.$refs.form.clearValidate();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
::v-deep .el-dialog__header {
  background-color: $colorJ;
}
::v-deep .el-dialog__body {
  background-color: #fff;
  .el-button {
    width: 200px;
    margin-right: 30px;
  }
}
</style>