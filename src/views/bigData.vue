<template>
  <div class="bigDataBox">
    <my-tabs v-model="activeName">
      <my-tab-content label="定时器和请求动画帧" name="aaa">
        <div v-if="activeName == 'aaa'">
          <el-button
            style="margin-bottom: 12px"
            size="small"
            type="primary"
            :loading="loading"
            @click="plan"
            >点击请求加载</el-button
          >
          <el-table
            height="300"
            :data="arr"
            border
            style="width: 80%"
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
      </my-tab-content>
      <my-tab-content label="触底加载" name="bbb">
        <bottom-load v-if="activeName == 'bbb'" />
      </my-tab-content>
      <my-tab-content label="虚拟列表" name="ccc">
        <virtual-list v-if="activeName == 'ccc'" />
      </my-tab-content>
      <my-tab-content label="虚拟表格（vxe-table）" name="ddd">
        <virtual-table v-if="activeName == 'ddd'" />
      </my-tab-content>
    </my-tabs>
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
import bottomLoad from "../otherComponents/bottomLoad";
import virtualList from "../otherComponents/virtualList";
import virtualTable from "../otherComponents/virtualTable";
export default {
  name: "bigDataName",
  components: {
    bottomLoad,
    virtualList,
    virtualTable,
  },
  data() {
    return {
      activeName: "aaa",
      arr: [],
      loading: false,
    };
  },
  methods: {
   
    async plan() {
      this.loading = true;
      const res = await axios.get("http://localhost:10000/bigData");
      this.loading = false;
      let twoDArr = averageFn(res.data.data);
      const use2DArrItem = (page) => {
        if (page > twoDArr.length - 1) {
          console.log("每一项都获取完了");
          return;
        }
        requestAnimationFrame(() => {
          this.arr = [...this.arr, ...twoDArr[page]];
          page = page + 1;
          use2DArrItem(page);
        });
      };
      use2DArrItem(0);
    },
  },
};
</script>

<style lang="less" scoped>
.bigDataBox {
  box-sizing: border-box;
  padding-right: 240px;
}
</style>
