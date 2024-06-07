<template>
  <div class="cell">
    <el-input
      ref="elInputRef"
      size="mini"
      v-model.trim="cellValue"
      @blur="blurFn"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    cellValue: {
      type: String | Number,
      default: "",
    },
    saveRowData: Function, 
    cellDom: Node, 
    row: Object, 
    property: String, 
    validateFn: Function,
    validateMessage: String,
  },
  mounted() {
    this.$refs.elInputRef.focus();
  },
  methods: {
    blurFn() {
      this.saveRowData({
        cellValue: this.cellValue,
        cellDom: this.cellDom,
        row: this.row,
        property: this.property,
        isPassValidate: this.validateFn(this.cellValue),
        validateMessage: this.validateMessage,
      });
    },
  },
};
</script>

<style>
.cell {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 8px;
}
</style>