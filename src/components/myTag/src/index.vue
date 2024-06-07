<script>
const typeArr = ["primary", "success", "info", "warning", "danger"];
const sizeType = ["big", "medium", "small"]; 
export default {
  name: "myTag",
  props: {
    closable: Boolean,
    color: String,
    bgColor: String,
    borderColor: String,
    
    type: {
      type: String,
      validator(val) {
        return typeArr.includes(val); 
      },
    },
  
    sizeType: {
      type: String,
      validator(val) {
        return sizeType.includes(val); 
      },
    },
  },
  methods: {
    handleClose(event) {
  
      event.stopPropagation();
      this.$emit("close", event);
    },
    handleClick(event) {
      this.$emit("click", event);
    },
  },
 
  render(h) {
    
    const classArr = ["my-tag", this.type, this.sizeType];

    const tagEl = (
      <span
        class={classArr}
        style={{
          backgroundColor: this.bgColor,
          color: this.color,
          borderColor: this.borderColor,
        }}
        on-click={this.handleClick}
      >
        {}
        {this.$slots.default}
        {}
        {this.closable ? (
          <span class="close-tag" on-click={this.handleClose}>
            x
          </span>
        ) : null}
      </span>
    );
   
    return <transition name="el-fade-in">{tagEl}</transition>;
  
  },
};
</script>
<style scoped>

.my-tag {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 8px;
  color: #252525;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  height: auto;
  line-height: 20px;
  
}

.close-tag {
  position: relative;
  margin-left: 5px;
  cursor: pointer;
  display: inline-block;
  transform: translateY(-6%);
}

.primary {
  color: #409eff;
  border: 1px solid #d9ecff;
  background-color: #ecf5ff;
}
.success {
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.info {
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.warning {
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.danger {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.big {
  padding: 4px 10px;
}
.medium {
  padding: 2px 10px;
}
</style>