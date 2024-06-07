<template>
  <div>
    <button @click="expandTree = !expandTree">统一展开折叠</button>
    <br />
    <br />
    <button @click="treeData = []">清空数据（刷新恢复）</button>
    <br />
    <br />
    <button @click="changeIcon">更改图标</button>
    <br />
    <br />
    <div class="treeBox">
      <my-tree
        :treeData="treeData"
        :expandTree="expandTree"
        @fold="fold"
        @clickTree="clickTree"
        clickNameClose
        :iconName="iconName"
      ></my-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          name: "中国",
          eng: "China",
          children: [
            {
              name: "北京",
              eng: "Beijing",
            },
            {
              name: "上海",
              eng: "Shanghai",
              children: [
                {
                  name: "闵行区",
                  eng: "Minhang",
                },
                {
                  name: "静安区",
                  eng: "Jingan",
                },
              ],
            },
          ],
        },
        {
          name: "美国",
          eng: "American",
          children: [
            {
              name: "纽约",
              eng: "NewYork",
              children: [
                {
                  name: "曼哈顿区",
                  eng: "ManHattan",
                },
                {
                  name: "皇后区",
                  eng: "Queen",
                },
                {
                  name: "布鲁克林区",
                  eng: "Brooklyn",
                },
              ],
            },
            {
              name: "华盛顿",
              eng: "Washington",
            },
          ],
        },
      ],
      expandTree: true,
      iconName: "el-icon-arrow-right",
    };
  },
  methods: {
    fold(params, key) {
      console.log("fold", params, key);
    },
    clickTree(params) {
      console.log("clickTree", params);
    },
    changeIcon() {
      this.iconName =
        this.iconName == "el-icon-caret-right"
          ? "el-icon-right"
          : "el-icon-caret-right";
    },
  },
};
</script>

<style lang="less" scoped>
.treeBox {
  width: 240px;
  border: 1px solid pink;
  box-sizing: border-box;
  padding: 4px 0;
}
</style>