<template>
  <div class="myProgressWrap">
    <div class="progressBar">
      <div :class="['progressBarBg', status]" :style="barStyle"></div>
    </div>
    <div class="progressText" v-if="showText">
      
      <span v-if="!$slots.text">{{ percentage }}%</span>
      <slot v-else name="text"></slot>
    </div>
  </div>
</template>

<script>

const statusArr = ["success", "fail", "normal"];
export default {
  name: "myProgress1",
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator: (val) => {
        return (val >= 0) & (val <= 100);
      },
    },
    status: {
      type: String,
      validator: (val) => {
        return statusArr.includes(val);
      },
    },
  
    color: {
      type: [String, Function],
    },

    showText: {
      type: Boolean,
      default: true,
    },
 
    showDongHua: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    showDongHua: {
      handler(newVal) {
        if (newVal) {
          this.displayVal = "";
        } else {
          this.displayVal = "none"; 
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      displayVal: "", 
    };
  },
  computed: {
    barStyle() {
      
      return {
        width: this.percentage + "%",
        backgroundColor: this.setBg(),
        
        "--displayVal": this.displayVal,
      };
    },
  },
  methods: {
    setBg() {
      if (typeof this.color === "string") {
        return this.color;
      }
      if (typeof this.color === "function") {
       
        return this.color(this.percentage);
      }
    },
  },
};
</script>

<style ref='xxx' lang='less' scoped>
.myProgressWrap {
  width: 100%;
  display: flex;
  align-items: center;
  .progressBar {
    flex: 1;
    height: 6px;
    background-color: #f3f3f3;
    border-radius: 6px;
    overflow-x: hidden;
    .progressBarBg {
      height: 100%;
      border-radius: 6px;
      // 默认normal
      background-color: #1677ff;
     
      transition: width 0.36s ease;
      position: relative;
    }
    .progressBarBg::before {
      display: var(--displayVal);
      content: "";
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 10px;
      animation: donghua 2s infinite;
    }
    .success {
      background-color: #52c41a;
    }
    .fail {
      background-color: #ff4d4f;
    }
  }
  .progressText {
    margin-left: 6px;
    width: fit-content;
  }
}

@keyframes donghua {
  0% {
    opacity: 0.5;
    width: 0;
  }
  100% {
    opacity: 0;
    width: 100%;
  }
}
</style>