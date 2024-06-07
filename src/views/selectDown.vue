<template>
  <div class="box">
    <el-select v-model="value" filterable :popper-append-to-body="false" v-down="loadmore" clearable>
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      options: [],
      value: '',
      pageIndex: 1,
      pageSize: 20
    };
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    async getOptions() {
      let { data } = await axios.get(url)
      if (data.length == 0) return this.$message('没数据了')
      this.options = [
        ...this.options,
        ...data
      ]
    },
    loadmore() {
      this.pageIndex = this.pageIndex + 1
      this.getOptions()
    },
  },
};
</script>