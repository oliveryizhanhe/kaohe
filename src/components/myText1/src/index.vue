<template>
  <div
    class="scrollWrap"
    :style="{
      backgroundColor: bgColor,
      color,
    }"
    v-if="closeText"
  >
    <span class="bellContent" v-show="showBell">
      <i class="el-icon-bell"></i>
    </span>
    <div
      class="scrollContent"
      :style="{
        animationDuration: speed + 'ms',
        cursor: url ? 'pointer' : 'auto',
      }"
      @click="jump"
    >
      <slot></slot>
    </div>
    <span class="closeContent" v-show="showClose">
      <i class="el-icon-circle-close" @click="closeText = false"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "myText1",
  props: {
   
    speed: {
      type: Number | String,
      default: 6000,
    },
   
    showBell: {
      type: Boolean,
      default: true,
    },
  
    showClose: {
      type: Boolean,
      default: true,
    },
   
    url: {
      type: String,
      default: "",
    },

    bgColor: {
      type: String,
      default: "#fdf6ec",
    },

    color: {
      type: String,
      default: "#f9ae3d",
    },
  },
  data() {
    return {
      closeText: true,
    };
  },
  mounted() {
    this.setKeyframes();
  },
  methods: {
    
    setKeyframes() {
      this.$nextTick(() => {
        let scrollContentWidth = document.querySelector(".scrollContent");
        let width = scrollContentWidth.offsetWidth; 
        let style = document.createElement("style"); 
        style.setAttribute("type", "text/css"); 
        document.head.appendChild(style); 
        let sheet = style.sheet; 
        sheet.insertRule(
          `
            @keyframes scrollText {
              from {
                left: 100%;
              }
              to {
                left: -${width}px;
              }
            }
          `
        );
      });
    },
    jump() {
      if (this.url) {
        this.$router.push({
          path: this.url,
        });
        
      }
    },
  },
};
</script>

<style lang='less' scoped>
.scrollWrap {
  width: 100%;
  height: 36px;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 2px;
  .bellContent {
    display: inline-block;
    width: 28px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit; 
    position: absolute;
    left: 0;
    z-index: 6;
  }
  .scrollContent {
    position: absolute;
    left: 100%;
    white-space: nowrap;
    display: inline-block;
    animation-iteration-count: infinite;
    animation-name: scrollText;
    animation-timing-function: linear;
  }
  .closeContent {
    display: inline-block;
    width: 28px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit;
    position: absolute;
    right: 0;
    z-index: 6;
    i {
      cursor: pointer;
    }
  }
}

.scrollWrap:hover .scrollContent {
  animation-play-state: paused;
}
</style>