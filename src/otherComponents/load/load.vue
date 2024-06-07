<template>
  <transition name="animation">
    <div
      class="loadindWrap"
      v-if="showLoading"
      :style="{ background: backgroundColor }"
    >
      <div class="loadingContent">
        <div class="iBox">
          <i class="el-icon-loading"></i>
        </div>
        <div class="text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showLoading: false, 
      backgroundColor: "rgba(0, 0, 0, 0.5)", 
      text: "加载中...", 
    };
  },
};
</script>

<style lang="less" scoped>
.loadindWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  .loadingContent {
    color: rgb(77, 245, 178);
    text-align: center;
    .iBox {
      margin-bottom: 6px;
      i {
        font-size: 20px;
        color: rgb(77, 245, 178);
      }
    }
  }
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.5s;
}
</style>