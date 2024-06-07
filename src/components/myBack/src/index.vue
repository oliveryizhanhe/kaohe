<template>
  <transition name="fade-transform">
    <div
      v-show="visible"
      class="backWrap"
      :style="{
        bottom: bottom + 'px',
        right: right + 'px',
      }"
      @click="goToTop"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "myBack",
  props: {
    bottom: {
      type: Number,
      default: 72,
    },
    right: {
      type: Number,
      default: 72,
    },
  
    showHeight: {
      type: Number,
      default: 240,
    },

    scrollBarDom: String,
  },
  data() {
    return {
      visible: false,
      scrollDom: null,
    };
  },
  mounted() {
    if (document.querySelector(this.scrollBarDom)) {
      this.scrollDom = document.querySelector(this.scrollBarDom);

      this.scrollDom.addEventListener("scroll", this.isShowGoToTop, true);
    }
  },
  beforeDestroy() {

    this.scrollDom.removeEventListener("scroll", this.isShowGoToTop, true);
  },
  methods: {
    isShowGoToTop() {
 
      if (this.scrollDom.scrollTop > 20) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    },
    goToTop() {
    
      let scrollDom = document.querySelector(this.scrollBarDom);
  
      let scrollDistance = scrollDom.scrollTop;

  
      if (window.requestAnimationFrame) {
        let fun = () => {
          scrollDom.scrollTop = scrollDistance -= 36;
          if (scrollDistance > 0) {
            window.requestAnimationFrame(fun);
          } else {
            scrollDom.scrollTop = 0;
          }
        };
        window.requestAnimationFrame(fun);
        return;
      }

      let timer2 = setInterval(() => {
        scrollDom.scrollTop = scrollDistance -= 36;
        if (scrollDistance <= 0) {
          clearInterval(timer2);
          scrollDom.scrollTop = 0;
        }
      }, 17);
    },
  },
};
</script>

<style lang='less' scoped>
.backWrap {
  position: fixed;
  cursor: pointer;
  width: 42px;
  height: 42px;
  background: #9cc2e5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}

// 过渡效果
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.36s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>