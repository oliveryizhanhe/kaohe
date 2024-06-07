<template>
  <div class="my-tab-nav-item-box">
    <div
      :class="[
        'my-tab-nav-item',
        tabItem.name === activeName ? 'highLight' : '',
        tabItem.disabled ? 'isForbiddenItem' : '',
      ]"
      v-for="(tabItem, index) in tabItemArr"
      :key="index"
      @click="changeActiveName(tabItem)"
    >
      {{ tabItem.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: "myTabNav",
  props: {
   
    tabItemArr: {
      type: Array,
      default: [],
    },
    
    activeName: {
      type: String,
      default: "",
    },
    
    onTabClick: {
      type: Function,
    },
  },
  methods: {
    changeActiveName(tabItem) {
    
      if (tabItem.name === this.activeName) {
        return;
      }
     
      if (tabItem.disabled) {
        return;
      }
      this.onTabClick(tabItem);
    },
  },
};
</script>
<style lang="less" scoped>
.my-tab-nav-item-box {
  width: 100%;
  border-bottom: 1px solid #e9e9e9;
  .my-tab-nav-item {
    
    display: inline-block;
  
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    margin: 0 12px;
    cursor: pointer;
  }
  .my-tab-nav-item:not(.isForbiddenItem):hover {
    color: #409eff;
  }

  .highLight {
    color: #409eff;
    border-bottom: 1px solid #409eff;
  }
  
  .isForbiddenItem {
    cursor: not-allowed;
    color: #aaa;
  }
}
</style>
