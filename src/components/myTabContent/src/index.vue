<template>
  <div class="my-tab-content-item" v-show="isActiveToShowContent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "myTabContent",
  props: {
    label: String,
    name: String, 
    disabled: {
      
      type: Boolean,
      default: false, 
    },
  },
  computed: {
    
    isActiveToShowContent() {
      let activeName = this.$parent.value; 
      let currentName = this.name; 
    
      return activeName === currentName;
    },
  },
};
</script>

<style>
.my-tab-content-item {
  padding: 12px;
}
</style>