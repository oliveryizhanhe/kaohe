<template>
  <div>
    <h3>指令方式加载中...</h3>
    <br />
    <button @click="loadFn">点一下</button>
    <br />
    <br />
    <el-table v-load="loading" border :data="tableData" style="width: 80%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="home" label="专辑"></el-table-column>
      <el-table-column prop="like" label="连冠"></el-table-column>
    </el-table>
    <br />
    <div class="box" v-load="loading">111</div>
    <br />
    <div class="box" v-load="loading2">222</div>
    <br />
    <h3>函数调用加载中...</h3>
    <br />
    <button @click="loadFn2">再点一下</button>
  </div>
</template>

<script>
export default {
  name: "myLoadName",
  data() {
    return {
      loading: true,
      loading2: {
        value: true,
        icon: "el-icon-eleme", 
        text: "客官稍等哦...",
        color: "red", 
        bgColor: "#baf",
      },
      tableData: [
        {
          name: "super lady",
          age: 500,
          home: "2",
          like: "9",
        },
        {
          name: "nxde",
          age: 88,
          home: "i love",
          like: "11",
        },
        {
          name: "fete",
          age: 1000,
          home: "2",
          like: "top",
        },
      ],
    };
  },
  methods: {
    loadFn() {
      this.loading = !this.loading;
      this.loading2.value = !this.loading2.value;
    },
    loadFn2() {
      this.$showDialog({
        text: "浏览器在加载中哇...",
      });
      setTimeout(() => {
        this.$hideDialog();
      }, 2000);
    },
  },
};
</script>

<style lang='less' scoped>
.box {
  width: 160px;
  height: 80px;
  border: 2px solid #666;
  box-sizing: border-box;
}
</style>