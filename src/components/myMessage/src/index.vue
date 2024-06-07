<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'messageBox',
        center ? 'horizontal' : '',
        typeArr.includes(type) ? type : '',
      ]"
      :style="controlTop"
      v-show="isShowMyMessage"
      @mouseenter="clearTimerFn"
      @mouseleave="startTimerFn"
    >
      <span> {{ iconObj[type] }} {{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "myMessage",
  props: {
    count: {
      
      type: Number,
      default: 1,
    },
    cutCount: {
      
      type: Function,
    },
  },
  data() {
    return {
      isShowMyMessage: false, 
      message: "",
      timer: null, 
      duration: 3000, 
      center: false,
      type: "info",
      typeArr: ["info", "success", "warning", "error"], 
      iconObj: {
       
        info: "♥",
        success: "♠",
        warning: "♦",
        error: "♣",
      },
    };
  },
  computed: {
    controlTop() {
      return {
        
        top: `${12 + (this.count - 1) * 60}px`,
      };
    },
  },
  mounted() {
    this.startTimerFn();
  },
  methods: {
  
    startTimerFn() {
      
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.close(); 
        }, this.duration);
      }
    },
    
    clearTimerFn() {
      clearTimeout(this.timer);
    },
   
    handleAfterLeave() {
      
      this.cutCount();
      
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    
    close() {
      this.isShowMyMessage = false;
      
    },
  },
};
</script>

<style lang="less" scoped>

.messageBox {
  min-width: 320px;
  height: auto; 
  padding: 16px; 
  border: 1px solid #e9e9e9;
  position: fixed; 
  z-index: 9999999999;
  top: 20px;
  left: 50%;
  transform: translateX(-50%); 
  box-sizing: border-box;
  border-radius: 4px; 
  background-color: #edf2fc;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  display: flex; 
  align-items: center;
}

.horizontal {
  justify-content: center;
}

.success {
  color: #67c23a;
  background-color: #f0f9eb;
}

.warning {
  color: #e6a23c;
  background-color: #fdf6ec;
}

.error {
  color: #f56c6c;
  background-color: #fef0f0;
}

.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
</style>