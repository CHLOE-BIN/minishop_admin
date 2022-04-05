<template>
  <!-- 公共服务组件 -->
  <div class="service">
    <div class="container">
      <a href="javascript:;" class="repair">
        <span></span>预约维修服务
      </a>
      <a href="javascript:;" class="day7">
        <span></span>7天无理由退货
      </a>
      <a href="javascript:;" class="day15">
        <span></span>15天免费换货
      </a>
      <a href="javascript:;" class="freemail">
        <span></span>满69包邮
      </a>
      <a href="javascript:;" class="location">
        <span></span>520余家售后网点
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "service-bar"
};
</script>

<style scoped lang="scss">
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.service {
  text-align: center;
  font-size: $fontI;
  height: 80px;
  line-height: 80px;
  background-color: $colorG;
  .container {
    @include flex(space-around);
    position: relative;
    a {
      @include menu-a($colorC);
      &:after {
        content: "";
        position: absolute;
        top: 23px;
        margin-left: 60px;
        width: 1px;
        height: 34px;
        border-left: 1px solid $colorH;
      }
      &:last-child:after {
        // 删掉最后一个li的border线
        display: none;
      }
    }
    .repair {
      span {
        @include bgImg(20px, 20px, "/imgs/repair.png");
        vertical-align: middle;
        margin-right: 8px;
      }
      &:hover {
        color: $colorA;
        span {
          @include bgImg(20px, 20px, "/imgs/repair-hover.png");
        }
      }
    }
    .day7 {
      span {
        @include bgImg(20px, 20px, "/imgs/7day.png");
        vertical-align: middle;
        margin-right: 8px;
      }
      &:hover {
        color: $colorA;
        span {
          @include bgImg(20px, 20px, "/imgs/7day-hover.png");
        }
      }
    }
    .day15 {
      span {
        @include bgImg(20px, 20px, "/imgs/15day.png");
        vertical-align: middle;
        margin-right: 8px;
      }
      &:hover {
        color: $colorA;
        span {
          @include bgImg(20px, 20px, "/imgs/15day-hover.png");
        }
      }
    }
    .freemail {
      span {
        @include bgImg(20px, 20px, "/imgs/freemail.png");
        vertical-align: middle;
        margin-right: 8px;
      }
      &:hover {
        color: $colorA;
        span {
          @include bgImg(20px, 20px, "/imgs/freemail-hover.png");
        }
      }
    }
    .location {
      span {
        @include bgImg(20px, 20px, "/imgs/location.png");
        vertical-align: middle;
        margin-right: 8px;
      }
      &:hover {
        color: $colorA;
        span {
          @include bgImg(20px, 20px, "/imgs/location-hover.png");
        }
      }
    }
  }
}
</style>