<template>
  <div class="foldItem">
    
    <div class="foldItemHeader" @click="handleHeaderClick">
      <i
        v-if="!hiddenArrow"
        class="el-icon-arrow-right"
        :class="{ rotate90deg: isOpen }"
      ></i>
      {{ title }}
    </div>
   
    <transition-height class="transitionHeight" :show="isOpen">
      <div class="foldItemBody">
        <slot></slot>
      </div>
    </transition-height>
  </div>
</template>

<script>

import transitionHeight from "@/components/myUtils/transitionHeight/index.vue";
export default {
  name: "myFoldItem",
  components: {
    transitionHeight,
  },
  props: {
    title: String,
    name: String, 
    
    hiddenArrow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      
      isOpen: this.$parent.openArr.includes(this.name),
    };
  },
  methods: {
    
    handleHeaderClick() {
      this.isOpen = !this.isOpen; 
      this.$parent.updateVModel(this.name, this.isOpen, this); 
    },
  },
};
</script>

<style lang="less" scoped>
.foldItem {
  width: 100%;
  height: auto; 
  .foldItemHeader {
    box-sizing: border-box;
    padding-left: 8px;
    min-height: 50px;
    display: flex;
    align-items: center;
    background-color: #fafafa;
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    
    i {
      transform: rotate(0deg);
      transition: all 0.24s;
      margin-right: 8px;
    }
    .rotate90deg {
      transform: rotate(90deg);
      transition: all 0.24s;
    }
  }
  .foldItemBody {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 12px 12px 12px 8px;
    border-bottom: 1px solid #e9e9e9;
  }
}

.foldItem:last-child .foldItemHeader {
  border-bottom: none !important;
}
.foldItem:last-child .transitionHeight .foldItemBody {
  border-top: 1px solid #e9e9e9;
  border-bottom: none !important;
}
</style>