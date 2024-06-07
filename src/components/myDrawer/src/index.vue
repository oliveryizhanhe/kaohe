<template>

  <transition :name="computedName">
    
    <div
      @click="clickMaskCloseFn"
      class="myDrawerWrap"
      :class="{ isShowDrawerMask: mask }"
      v-show="isShowDrawer"
    >
      <div
        ref="drawerContentRef"
        :class="['drawerContent']"
        :style="computedDrawerPosition"
        @click.stop
      >
        <header v-show="isShowHeader" class="drawerHeader">
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
          <i class="el-icon-close" @click="closeDrawer" v-show="showCloseIcon">
          </i>
        </header>
        <section class="drawerBody">
          <slot></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
const directionArr = ["top", "bottom", "left", "right"]; 
const moveObj = {
  top: "topMove",
  bottom: "bottomMove",
  left: "leftMove",
  right: "rightMove",
};
export default {
  name: "myDrawer",
  props: {
  
    isShowDrawer: {
      type: Boolean,
      default: false,
    },
 
    isShowHeader: {
      type: Boolean,
      default: true,
    },
   
    title: {
      type: String,
      default: "我是title",
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
      default: true,
    },
   
    direction: {
      type: String,
      default: "right",
      validator(val) {
        return directionArr.includes(val);
      },
    },
    
    beforeClose: {
      type: Function,
    },
  },
  computed: {
    
    computedDrawerPosition() {
      let positionObj = {
        width:
          (this.direction == "left") | (this.direction == "right")
            ? "30%"
            : "100%",
        height:
          (this.direction == "top") | (this.direction == "bottom")
            ? "30%"
            : "100%",
      };
      positionObj[this.direction] = 0;
      return positionObj;
    },
   
    computedName() {
      return moveObj[this.direction]; 
    },
  },
  methods: {
   
    clickMaskCloseFn() {
      if (this.clickMaskClose == true) {
        this.closeDrawer();
      } else {
        
        return;
      }
    },
    
    closeDrawer() {
      console.log(888);
      
      if (this.beforeClose) {
        this.beforeClose(this.close);
      }
    
      else {
        this.close();
      }
    },
   
    close() {
      this.$emit("update:isShowDrawer", false); 
      this.$emit("shutDown"); 
    },
  },
};
</script>

<style lang='less' scoped>

.myDrawerWrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1200;
  overflow: hidden;
  .drawerContent {
   
    position: absolute;
    background-color: #fff;
    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.24);
    display: flex;
    flex-direction: column;
    
    .drawerHeader {
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bolder;
      color: #333;
      i {
        cursor: pointer;
      }
    }
   
    .drawerBody {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      flex: 1;
      overflow-y: auto;
    }
  }
}

.isShowDrawerMask {
  background-color: rgba(0, 0, 0, 0.3);
}


.topMove-enter-active,
.topMove-leave-active {
  transition: all 0.36s ease-in-out;
  transform: translateY(0%);
  opacity: 1;
}
.topMove-enter,
.topMove-leave {
  transform: translateY(-100%);
  opacity: 0;
}
.topMove-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.bottomMove-enter-active,
.bottomMove-leave-active {
  transition: all 0.36s ease-in-out;
  transform: translateY(0);
  opacity: 1;
}
.bottomMove-enter,
.bottomMove-leave {
  transform: translateY(100%);
  opacity: 0;
}
.bottomMove-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.leftMove-enter-active,
.leftMove-leave-active {
  transition: all 0.36s ease-in-out;
  transform: translateX(0%);
  opacity: 1;
}
.leftMove-enter,
.leftMove-leave {
  transform: translateX(-100%);
  opacity: 0;
}
.leftMove-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
// 右侧进入和退出
.rightMove-enter-active,
.rightMove-leave-active {
  transition: all 0.36s ease-in-out;
  transform: translateX(0);
  opacity: 1;
}
.rightMove-enter,
.rightMove-leave {
  transform: translateX(100%);
  opacity: 0;
}
.rightMove-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>