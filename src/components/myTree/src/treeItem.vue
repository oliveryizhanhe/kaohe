<template>
  <div class="treeNodeItem">
    <div class="iconAndName" tabindex="-1" @click="clickTree">
      <i
        v-if="item.children"
        @click.stop="clickIconFold"
        :class="[
          'treeNodeItemIcon',
          iconName ? iconName : 'el-icon-caret-right',
          isFold ? 'iconLeft' : 'iconDown',
        ]"
      ></i>
      <span
        :class="['treeNodeItemName', item.children ? '' : 'noChildrenIcon']"
        >{{ item.name }}</span
      >
    </div>
    <div
      class="childrenTreeNode"
      :style="{
        display: isFold ? 'none' : 'block',
      }"
    >
      <template v-if="item.children">
        <tree-item
          v-for="(ite, ind) in item.children"
          :key="ind"
          :item="ite"
          :expandTree="expandTree"
          :iconName="iconName"
          :clickNameClose="clickNameClose"
          v-on="$listeners"
          v-bind="$attrs"
        ></tree-item>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeItem",
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    expandTree: Boolean, 
    iconName: String, 
    clickNameClose: Boolean, 
  },
  watch: {
    expandTree(newVal) {
      this.isFold = !newVal; 
    },
  },
  data() {
    return {
      isFold: true,
    };
  },
  mounted() {
    this.isFold = !this.expandTree; 
  },
  methods: {
    clickIconFold() {
      this.isFold = !this.isFold;
      this.$emit("fold", this.item, this.isFold ? "折叠咯" : "展开啦");
    },
    clickTree() {
      if (this.clickNameClose) {
        this.clickIconFold();
      }
      this.$emit("clickTree", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.treeNodeItem {
  width: 100%;
  height: auto;
  padding-left: 12px;
  .iconAndName {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    box-sizing: border-box;
    .treeNodeItemIcon {
      margin-right: 4px;
    }
    .iconDown {
      transform: rotate(90deg);
      transition: all 0.3s;
    }
    .iconLeft {
      transition: all 0.3s;
    }
    .treeNodeItemName {
      color: #666;
      word-break: keep-all; 
    }
    .noChildrenIcon {
      margin-left: 20px;
    }
  }
  .iconAndName:hover {
    background-color: #f5f7fa;
  }
  .iconAndName:focus {
    background-color: #f5f7fa;
  }
}
</style>