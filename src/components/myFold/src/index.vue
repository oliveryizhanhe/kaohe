<template>
  <div class="myFoldWrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myFold",
  props: {
    
    accordion: {
      type: Boolean,
      default: false, 
    },
    
    value: {
      type: Array, 
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      
      openArr: this.value, 
    };
  },
  mounted() {
   
    if (this.accordion & (this.value.length > 1)) {
      console.error("手风琴模式下，绑定的数组最多一项");
    }
  },
  watch: {
    
    value(value) {
      this.openArr = value;
    },
  },
  methods: {
    updateVModel(name, isOpen, vNode) {
      
      if (this.accordion) {
        
        isOpen ? this.closeOther(name) : null;
        this.openArr = [name]; 
      }
     
      else {
        let i = this.openArr.indexOf(name);
       
        i > -1 ? this.openArr.splice(i, 1) : this.openArr.push(name);
      }
      
      this.$emit("input", this.openArr); 
      this.$emit("change", name, isOpen, vNode); 
    },
    closeOther(name) {
      this.$children.forEach((item) => {
       
        if (item.name != name) {
          item.isOpen = false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myFoldWrap {
  border: 1px solid #e9e9e9;
}
</style>