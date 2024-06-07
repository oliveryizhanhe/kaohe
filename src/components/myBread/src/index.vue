<template>
  <div class="breadWrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myBread",
  props: {
    elementIconClassDivide: {
      type: String,
      default: "",
    },
    
    customDivide: {
      type: String,
      default: "/", 
    },
  },
  
  provide() {
    return {
      fatherInstance: this, 
    };
  },
};
</script>

<style lang="less" scoped>
.breadWrap {
  font-size: 14px;
  
  /deep/ .breadItem:first-child .breadItemWords {
    font-weight: 700;
  }
  
  /deep/ .breadItem:last-child .breadItemDivide {
    display: none;
  }
}
</style>