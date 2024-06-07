<template>
  <div
    class="virtualListWrap"
    ref="virtualListWrap"
    @scroll="handleScroll"
    :style="{ height: itemHeight * count + 'px' }"
  >
    <div
      class="placeholderDom"
      :style="{ height: allListData.length * itemHeight + 'px' }"
    ></div>
    <div class="contentList" :style="{ top: topVal }">
      <div
        v-for="(item, index) in showListData"
        :key="index"
        class="itemClass"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="loadingBox" v-show="loading">
      <i class="el-icon-loading"></i>
      &nbsp;&nbsp;<span>loading...</span>
    </div>
  </div>
</template>
<script>
function throttle(fn, wait) {
  var pre = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  };
}
import axios from "axios";
export default {
  data() {
    return {
      allListData: [], 
      itemHeight: 40,
      count: 10, 
      start: 0, 
      end: 10, 
      topVal: 0, 
      loading: false,
    };
  },
  computed: {
    showListData: function () {
      return this.allListData.slice(this.start, this.end);
    },
  },
  async created() {
    this.loading = true;
    const res = await axios.get("http://localhost:8888/bigData");
    this.allListData = res.data.data;
    this.loading = false;
  },
  methods: {
    handleScroll() {
      throttle(this.s(), 500);
    },
    s() {
      const scrollTop = this.$refs.virtualListWrap.scrollTop;
      this.start = Math.floor(scrollTop / this.itemHeight);
      this.end = this.start + this.count;
      this.topVal = this.$refs.virtualListWrap.scrollTop + "px";
    },
  },
};
</script>
<style scoped lang="less">
.virtualListWrap {
  box-sizing: border-box;
  width: 240px;
  border: solid 1px #000000;
  overflow-y: auto;
  position: relative;
  .contentList {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    .itemClass {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .itemClass:nth-child(even) {
      background: #c7edcc;
    }
    .itemClass:nth-child(odd) {
      background: pink;
    }
  }
  .loadingBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.64);
    color: green;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
