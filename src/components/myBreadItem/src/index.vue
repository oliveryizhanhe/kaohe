<template>
  <div class="breadItem">
  
    <span ref="link" :class="['breadItemWords', to ? 'isLink' : '']">
      <slot></slot>
    </span>
   /
    <i
      v-if="elementIconClassDivide"
      class="breadItemDivide"
      :class="elementIconClassDivide"
    ></i>
    
    <span v-else class="breadItemDivide">{{ customDivide }}</span>
  </div>
</template>

<script>
export default {
  name: "myBreadItem",
  inject: ["fatherInstance"], 
  props: {
    
    to: {},
    
    replace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      elementIconClassDivide: "", 
      customDivide: "||", 
    };
  },
  mounted() {
    
    this.elementIconClassDivide = this.fatherInstance.elementIconClassDivide;
    this.customDivide = this.fatherInstance.customDivide;
   
    const link = this.$refs.link;
 
    link.addEventListener("click", (_) => {
      
      if (!this.to) return;
     
      this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);
    });
  },
};
</script>

<style lang="less" scoped>
.breadItem {
  display: inline-block;
  .breadItemWords {
    font-weight: 400;
  }
  .isLink {
    font-weight: 700;
  }
  .isLink:hover {
    color: #409eff;
    cursor: pointer;
  }
  .breadItemDivide {
    margin: 0 8px;
    color: #999;
  }
}
</style>