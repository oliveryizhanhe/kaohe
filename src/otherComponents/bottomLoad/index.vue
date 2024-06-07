<template>
  <div class="box">
    <el-table
      v-el-table-infinite-scroll="load"
      height="480"
      :data="tableData"
      border
      style="width: 80%"
      v-loading="loading"
      element-loading-text="数据量太大啦，给老子等到起..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.5)"
      :header-cell-style="{
        height: '24px',
        lineHeight: '24px',
        color: '#606266',
        background: '#F5F5F5',
        fontWeight: 'bold',
      }"
    >
      <el-table-column type="index" label="序"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="value" label="对应值"></el-table-column>
    </el-table>
  </div>
</template>

<script>
function averageFn(arr) {
  let i = 0;
  let result = [];
  while (i < arr.length) {
    result.push(arr.slice(i, i + 10));
    i = i + 10; 
  }
  return result;
}
import axios from "axios";
export default {
  data() {
    return {
      allTableData: [],
      tableData: [],
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    const res = await axios.get("http://localhost:10000/bigData");
    this.allTableData = averageFn(res.data.data);
    this.loading = false;
    this.load();
  },
  methods: {
    async load() {
      console.log("自动多次执行之，首次执行会根据高度去计算要执行几次合适");
      if (this.allTableData.length == 0) {
        console.log("没数据啦");
        return;
      }
      let arr = this.allTableData[0];
      this.tableData = this.tableData.concat(arr);
      this.allTableData.shift();
    },
  },
};
</script>
