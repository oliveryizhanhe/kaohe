<template>
  <div class="my-badge">
    <slot></slot>
    
    <transition name="el-zoom-in-center">
     
      <sup
        v-show="showSup"
        :class="[
          'fixedRightTop',
          typeArr.includes(type) ? type : '',
          isDot ? 'isDotClass' : '',
        ]"
        v-text="showValue"
      ></sup>
    </transition>
  </div>
</template>

<script>

const typeArr = ["primary", "success", "warning", "info", "danger"];
export default {
  name: "myBadge",
  props: {
    value: [String, Number],
    type: {
      type: String,
      validator(val) {
       console.log("校验参数", val);
    
        if (typeArr.includes(val)) {
          return true;
        } else {
          return false;
        }
      },
    },
    max: {
      type: Number,
      validator(val) { 
        if (val) {
          if (typeof val === "number") {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
    },
    isDot: Boolean,
    isShow: {
  
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      typeArr,
    };
  },
  computed: {
    showValue() {
   
      if (this.isDot) {
        return;
      }
     
      if (this.max) {
        return this.value > this.max ? `${this.max}+` : this.value;
      }
      
      else {
        return this.value;
      }
    },
    showSup() {
      
      if (!this.isShow) {
        return false;
      }
     
      if (this.value === "") {
        return false;
      }
   
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
.my-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block; 
  
  .fixedRightTop {
    position: absolute; 
    top: 0;
    right: 3px; 
  }
  sup {
    color: #fff;
    background-color: #f56c6c;
    border-radius: 10px; 
    padding: 1px 4px;
    font-size: 12px;
    transform: translate(100%, -50%); 
    white-space: nowrap;
  }

  .primary {
    background-color: #409eff;
  }
  .success {
    background-color: #6c9359;
  }
  .warning {
    background-color: #bc8737;
  }
  .info {
    background-color: #909399;
  }
  .danger {
    background-color: #f56c6c;
  }
  .isDotClass {
    height: 8px;
    width: 8px;
    right: 1px;
    border-radius: 50%;
  }
}
</style>