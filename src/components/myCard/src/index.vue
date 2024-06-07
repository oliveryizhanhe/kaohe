<template>
  <div
    :class="[
      'card-box',
      this.$slots.back ? 'card-reverse' : '',
      zoomCard ? 'card-box-zoom' : '',
    ]"
  >
    <div class="card-content">
      
      <div
        :style="cardStyle"
        :class="[
          this.$slots.back ? 'frontReverse' : 'front-side',
          shadow,
          isHoverUp ? 'isHoverUp' : '',
        ]"
      >
       
        <slot></slot>
      </div>
      <div :style="backCardStyle" class="backReverse" v-if="this.$slots.back">
        
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script>
const shadowArr = ["hover", "always", "none"]; 
export default {
  name: "myCard",
  props: {
    cardStyle: {},
    backCardStyle: {}, 
    shadow: {
      
      type: String,
      validator(val) {
        
        if (shadowArr.includes(val)) return true;
        return false;
      },
    },
    isHoverUp: Boolean, 
    zoomCard: Boolean,
  },
  mounted() {
   
  },
};
</script>

<style lang="less" scoped>
.card-box {
  // background-color: #fff; 
  color: #333;
  perspective: 1000;
  transform-style: preserve-3d;
  transition: all 0.4s;
}

.card-box-zoom:hover {
  transform: scale(1.08);
}

.card-content {
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.75s;
  transform-style: preserve-3d;
}

.front-side {
  box-sizing: border-box;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  transition: 0.3s;
}

.hover:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.isHoverUp:hover {
  transform: translateY(-3px);
}

.always {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.frontReverse, 
.backReverse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-sizing: border-box;
  padding: 18px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.frontReverse {
  z-index: 2;
}
.backReverse {
  transform: rotateY(-180deg); 
}
.card-reverse:hover .card-content {
  transform: rotateY(180deg);
}
</style>