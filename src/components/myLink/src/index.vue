<template>
 
  <a
    :href="disabled ? null : href"
    :class="[
      'myLink',
      hideUnderline ? '' : disabled ? '' : 'underline',
      type,
      disabled ? 'toDisabled' : '',
    ]"
    v-bind="$attrs"
    @click="handleClick"
  >
   
    <span class="aContent" :class="{ spaceC: icon, back: back }">
      <i :class="icon" v-if="icon"></i>
      <span><slot></slot></span>
    </span>
  </a>
</template>

<script>
export default {
  name: "myLink",
  props: {
    href: String, 
    disabled: Boolean, 
    type: String, 
    hideUnderline: {
      type: Boolean,
      default: false, 
    },
    icon: String, 
    back: Boolean, 
  },
  methods: {
    handleClick(event) {
     
      if (this.disabled) {
        return;
      }
     
      if (this.href) {
        return;
      }
      
      this.$emit("click", event);
    },
  },
};
</script>

<style lang="less" scoped>

.myLink {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666; 
  text-decoration: none;
  position: relative; // 定位搭配伪元素实现悬浮下划线效果
  margin: 4px;
  .aContent {
    display: flex;
    align-items: center;
  }
  .spaceC > :first-child {
    margin-right: 4px;
  }
  
  .back {
    flex-direction: row-reverse;
  }
 
  .back > :first-child {
    margin: 0 0 0 4px;
  }
}

.underline:hover::after {

  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  bottom: -2px;
  
  border-bottom: 1px solid;
}

.primary {
  color: #2d8cf0;
}
.success {
  color: #19be6b;
}
.warning {
  color: #f90;
}
.danger {
  color: #ed4014;
}

.toDisabled {
  opacity: 0.36;
  cursor: not-allowed;
}
</style>