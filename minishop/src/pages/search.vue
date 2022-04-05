<template>
    <div class="search">
        <div class="container">
            <div class="find" v-if="!is_find">
                没有搜索到对应商品，不如看看其他的吧！
                <div class="line"></div>
            </div>
            <div class="products">
                <div class="product-list">
                    <ul>
                        <li v-for="(sub,j) in searchList" :key="j">
                            <a :href="'/#/product/'+sub.productId">
                                <img v-lazy="sub.mainImage" alt />
                                <p class="sub-name">{{sub.name}}</p>
                                <p class="sub-subtitle">{{sub.subtitle}}</p>
                                <p class="sub-price">{{sub.price | currency}}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar.vue";
export default {
  name: "search",
  data() {
    return {
      searchList: [],
      keyword: this.$route.query.keyword,
      is_find: ''
    };
  },
  components: {
    ServiceBar
  },
  filters: {
    currency(val) {
        if (!val) return "0.00";
        return val.toFixed(2) + "元";
    }
  },
  mounted() {
      this.init()
  },
  methods: {
    init() {
      this.$axios.get("/products").then(res => {
        const reg = new RegExp(`\\${this.keyword}`, 'i');
        for (let i = 0; i < res.length; i++) {
          if (reg.test(res[i].name)) {
              console.log("商品: ", res[i].name);
              this.searchList.push(res[i])
          } else if (/手机/.test(this.keyword)) {
              if (res[i].categoryId == 1) {
                  this.searchList.push(res[i])
              }
          }
        }
        if (this.searchList.length == 0) {
            this.is_find = false
            this.searchList = res
        } else {
            this.is_find = true
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.search {
    background-color: #f5f5f5;
    padding-top: 10px;
    .container {
        margin-bottom: 60px;
        .line {
          margin-top: 20px;
          border-bottom: 1px solid $colorH;
        }
        .products {
            margin-top: 30px;
            .product-list {
                display: block;
                margin-top: 20px;
                overflow: hidden;
                li {
                    float: left;
                    width: 290px;
                    height: 300px;
                    margin: 0 0 18px 14px;
                    background-color: $colorG;
                    transition: all 0.3s;
                    text-align: center;
                    a {
                        display: inline-block;
                        width: 290px;
                        height: 300px;
                        padding: 30px 0;
                        img {
                            height: 160px;
                        }
                        .sub-name {
                            margin-top: 20px;
                            font-size: $fontJ;
                            color: $colorB;
                        }
                        .sub-subtitle {
                            margin-top: 6px;
                            font-size: $fontK;
                            color: $colorD;
                        }
                        .sub-price {
                            margin-top: 15px;
                            font-size: $fontJ;
                            color: $colorA;
                        }
                    }
                    &:hover {
                        box-shadow: 0 0 15px #88888899;
                        transform: translate3d(0, -2px, 0);
                    }
                }
            }
        }
    }
}
</style>