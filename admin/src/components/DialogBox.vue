<template>
  <div class="dialogBox">
    <el-dialog :title="dialogBox.title" :visible.sync="dialogBox.show" :before-close="handleClose">
      <div class="form">
        <el-form :model="productsForm" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="商品类型" prop="categoryId">
            <el-input disabled v-model.number="productsForm.categoryId"></el-input>
          </el-form-item>
          <el-form-item label="商品编号" prop="productId">
            <el-input disabled v-model.number="productsForm.productId"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="productsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="subtitle">
            <el-input v-model="productsForm.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="mainImage">
            <el-input v-model="productsForm.mainImage"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="productsForm.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品库存" prop="reserve">
            <el-input v-model.number="productsForm.reserve">
              <template slot="append">件</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
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
        categoryId: [
          {
            required: true,
            message: "商品类型不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "商品种类必须是数字: 1手机 2电视 3笔记本 4耳机 5穿戴"
          }
        ],
        productId: [
          {
            required: true,
            message: "商品编号不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "商品编号必须是数字"
          }
        ],
        name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur"
          }
        ],
        mainImage: [
          {
            required: true,
            message: "商品图片不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "商品价格不能为空",
            trigger: "blur"
          },
          { 
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, 
            message: '请输入数字,可保留两位小数' 
          }
        ],
        reserve: [
          {
            required: true,
            message: "商品库存不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "商品库存必须是数字"
          }
        ]
      }
    };
  },
  props: {
    dialogBox: Object,
    productsForm: Object
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url =
            this.dialogBox.option == "add"
              ? "add"
              : `edit/${this.productsForm.productId}`;
          this.productsForm.price = +this.productsForm.price
          console.log('productsForm=>', this.productsForm);
          this.$axios.post(`/products/${url}`, this.productsForm).then(res => {
            console.log('res=>', res);
            if (url == "add") {
              this.$message({
                message: "商品添加成功",
                type: "success",
                duration: 1000
              });
            } else {
              this.$message({
                message: "商品修改成功",
                type: "success",
                duration: 1000
              });
            }
            // 关闭弹窗并刷新
            this.dialogBox.show = false;
            location.reload();
          });
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
</style>