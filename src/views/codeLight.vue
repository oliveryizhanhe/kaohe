<template>
  <div class="wrap">
    <button @click="changeData">换一批数据</button>
    <button @click="initData">初始数据</button>
    <div v-highlight v-if="!isRender">
      <pre>
        <code>{{vvv}}</code>
      </pre>
    </div>
  </div>
</template>

<script>
const jsonData = `{"code":0,"msg":"成功","data":[{"id":87,"name":"徐穗珍","age":26,"home":"韩国","remark":"退团1","is_delete_status":1},{"id":86,"name":"赵美延","age":26,"home":"韩国","remark":"兔兔","is_delete_status":1},{"id":84,"name":"叶舒华","age":3,"home":"中国","remark":"mt刷","is_delete_status":1},{"id":83,"name":"宋雨琦","age":25,"home":"中国","remark":"狗哦狗","is_delete_status":1}]}`;
export default {
  name: "codeLightName",
  data() {
    return {
      vvv: JSON.parse(jsonData),
      isRender: false,
    };
  },
  methods: {
    changeData() {
      this.$showDialog({
        text: "数据切换中...",
      });
      this.isRender = true;
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          this.$hideDialog();
          this.isRender = false;
          this.vvv = json;
        });
    },
    initData() {
      this.isRender = true;
      setTimeout(() => {
        this.vvv = JSON.parse(jsonData);
        this.isRender = false;
      }, 240);
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
}
</style>
