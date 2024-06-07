<template functional>
 
  <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[data.staticClass, `${props.direction}`, `${props.lineType}`]"
  >
    
    <div
      v-if="props.direction === 'horizontal' && slots().default"
      :class="['text', `${props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "myDivider",
  props: {
   
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      },
    },
   
    contentPosition: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].includes(val);
      },
    },
   
    lineType: {
      type: String,
      default: "solid",
      validator(val) {
        return ["solid", "dashed", "dotted"].includes(val);
      },
    },
  },
};
</script>
<style lang="less" scoped>

.horizontal {
  width: 100%;
  border-bottom: 1px solid #333; 
  display: block;
  margin: 16px 0;
  position: relative;
 
  transform: scaleY(0.95);
}

.dashed {
  border-bottom: 1px dashed #333;
}

.dotted {
  border-bottom: 1px dotted #333;
}
// 垂直样式
.vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  background-color: #333;
  vertical-align: middle;
  position: relative;
  top: -1px; 
  
  transform: scaleX(0.95);
}

.text {
  position: absolute;
  padding: 0 12px;
  color: #777; 
  font-size: 14px;
  transform: translateY(-50%); 
  background-color: #fff; 
}

.text.left {
  left: 36px;
}

.text.right {
  right: 36px;
}

.text.center {
  left: 50%;
 
  transform: translateX(-50%) translateY(-50%);
}
</style>
