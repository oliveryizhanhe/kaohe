<template>
  <div class="my-tree-wrap">
    <div v-if="treeData.length > 0">
      <tree-item
        v-for="(item, index) in treeData"
        :key="index"
        :item="item"
        :expandTree="expandTree"
        :iconName="iconName"
        :clickNameClose="clickNameClose"
        v-on="$listeners"
        v-bind="$attrs"
      >
      </tree-item>
    </div>
    <span class="noData" v-else>暂无数据</span>
  </div>
</template>

<script>
import treeItem from "./treeItem.vue";
export default {
  name: "myTree",
  components: { treeItem },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    expandTree: Boolean,
    iconName: String, 
    clickNameClose: Boolean,
  },
};
</script>

<style lang="less" scoped>
.my-tree-wrap {
  width: 100%;
  .noData {
    color: #666;
    font-size: 14px;
  }
}
.my-tree-wrap > .treeNodeItem {
  padding: 0; 
}
</style>