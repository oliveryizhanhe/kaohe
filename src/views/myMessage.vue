<template>
  <div>
    <button class="info-btn" @click="showMessage1">信息弹出</button>
    <button class="success-btn" @click="showMessage2">成功弹出</button>
    <button class="warning-btn" @click="showMessage3">警告弹出</button>
    <button class="error-btn" @click="showMessage4">错误弹出</button>
    <button class="close-btn" @click="showMessage5">弹出5秒关闭</button>
    <button class="center-btn" @click="showMessage6">文字居中哦</button>
    <button class="import-btn" @click="showMessage7">引入使用</button>
    <el-input style="width: 180px" size="mini" v-model="kkk"></el-input>
  </div>
</template>

<script>
import { MyMessage } from "@/components/index.js";
export default {
  data() {
    return {
      kkk: "切换数据还在",
    };
  },
  name: "myMessageName",
  methods: {
    showMessage1() {
      this.$myMessage({
        message: "信息弹出",
        type: "info",
      });
    },
    showMessage2() {
      this.$myMessage({
        message: "成功弹出",
        type: "success",
      });
    },
    showMessage3() {
      this.$myMessage({
        message: "警告弹出",
        type: "warning",
      });
    },
    showMessage4() {
      this.$myMessage({
        message: "错误弹出",
        type: "error",
      });
    },
    showMessage5() {
      this.$myMessage({
        message: "弹出5秒关闭",
      });
    },
    showMessage6() {
      this.$myMessage({
        message: "文字居中哦",
        center: true,
      });
    },
    showMessage7() {
      console.log(MyMessage);
      MyMessage({
        message: "引入使用",
        type: "success",
      });
    },
  },
};
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
}
button {
  margin-bottom: 12px;
  width: 96px;
  padding: 10px;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
}
.info-btn {
  background-color: #2196f3;
}
.success-btn {
  background-color: #4caf50;
}
.warning-btn {
  background-color: #ff9800;
}
.error-btn {
  background-color: #f44336;
}
.close-btn {
  background-color: #607d8b;
}
.center-btn {
  background-color: #9c27b0;
}
.import-btn {
  background-color: #00bcd4;
}
</style>
