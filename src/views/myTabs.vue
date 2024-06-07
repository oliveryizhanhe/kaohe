<template>
  <div>
    <my-tabs v-model="activeName" @tabClick="tabClick">
      <my-tab-content label="大喷菇" name="sunwukong"
        >女娃</my-tab-content
      >
      <my-tab-content label="鸡鸡" name="zhubajie">爱意随风其起内容</my-tab-content>
      <my-tab-content label="莲花" name="shaheshang"
        >立威</my-tab-content
      >
      <my-tab-content label="猫猫" name="tangseng">twice</my-tab-content>
      <my-tab-content label="狗狗" name="bailongma"
        >txt</my-tab-content
      >
    </my-tabs>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <hr />
    <my-tabs v-model="activeName2" :before-leave="beforeLeave">
      <my-tab-content label="武松" name="wusong">武松内容</my-tab-content>
      <my-tab-content label="宋江" name="songjiang">松江内容</my-tab-content>
      <my-tab-content label="林冲" name="linchong">林冲内容</my-tab-content>
      <my-tab-content disabled label="吴用" name="wuyong"
        >吴用内容</my-tab-content
      >
    </my-tabs>
  </div>
</template>

<script>
export default {
  name:"myTabsName",
  data() {
    return {
      activeName: "sunwukong",
      activeName2: "wusong",
    };
  },
  methods: {
    tabClick(tabItem) {
      console.log("外层点击", tabItem);
    },
    beforeLeave(newTabName, oldTabName) {
      console.log("外层", newTabName, oldTabName);
      
      var p = new Promise((resolve, reject) => {
        this.$confirm(`确认由${oldTabName}切换到${newTabName}`, "tab change", {
          confirmButtonText: "确认切换",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resolve(true); 
          })
          .catch((err) => {
            reject(false); 
          });
      }).catch((reason) => {
        console.log("reason", reason);
      });
      return p;
    },
  },
};
</script>

<style lang="less" scoped>
</style>