<template>
  <transition name="animation">
    <div
      class="dialogBox"
      :class="{ isShowMask: mask == true }"
      v-show="isShowDialog"
      @click="clickMaskCloseFn"
    >
      <div class="dialogBoxContent" @click.stop>
        <div class="headhead">
         
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
          <i class="el-icon-close" @click="close" v-show="showCloseIcon"> </i>
        </div>
        <div class="bodybody">
          
          <slot></slot>
        </div>
        <div class="footfoot" v-if="isShowFoot">
          
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "myDialog",
  props: {
    
    isShowDialog: {
      type: Boolean,
      default: false,
    },
 
    title: {
      type: String,
      default: "",
    },
 
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
   
    mask: {
      type: Boolean,
      default: true,
    },
    
    clickMaskClose: {
      type: Boolean,
      default: false,
    },
   
    isShowFoot: {
      type: Boolean,
      default: true,
    },
    beforeClose: {
      type: Function,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
   
    async close() {
      const flag = await this.beforeClose(); 
      if (flag) {
        this.$emit("update:isShowDialog", false);
        this.$emit("hasClosed");
      }
    },
   
    clickMaskCloseFn() {
      if (this.clickMaskClose == true) {
        this.close();
      } else {
       
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dialogBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999999999;
  .dialogBoxContent {
    width: 600px;
    height: 400px;
    border: 1px solid #e9e9e9;
    border-radius: 6px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    .headhead {
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e9e9e9;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: bold;
      }
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .bodybody {
      flex: 1;
      overflow-y: auto;
    }
    .footfoot {
      width: 100%;
      height: 48px;
      line-height: 48px;
      box-sizing: border-box;
      border-top: 1px solid #e9e9e9;
      padding: 0 20px;
    }
  }
}
.isShowMask {
  background-color: rgba(0, 0, 0, 0.3);
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}
.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.3s;
}
</style>
