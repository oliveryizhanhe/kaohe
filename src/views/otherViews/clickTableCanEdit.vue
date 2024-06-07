<template>
  <div id="app">
    <el-table
      @cell-dblclick="dblclick"
      :cell-class-name="cellClassName"
      height="480"
      :data="tableData"
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄" width="180">
      </el-table-column>
      <el-table-column align="center" prop="home" label="家乡">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
function nameMaxLength6(str) {
  return str.length <= 6;
}
function ageMaxValue1000(str) {
  return Number(str) <= 1000;
}
function noValidate(params) {
  return true;
}

import extendComponents from "../../otherComponents/clickTableCanEdit/data";
export default {
  name: "clickTableCanEditName",
  data() {
    return {
      tableData: [
        {
          name: "宋雨琦",
          age: 22,
          home: "中国",
        },
        {
          name: "金米妮",
          age: 24,
          home: "泰国",
        },
        {
          name: "田小娟",
          age: 25,
          home: "韩国",
        },
      ],
      oldCellValue: null,
      columnAddValidate: {
        name: {
          validateFn: nameMaxLength6,
          validateMessage: "名字最大不能超过6个字符",
        },
        age: {
          validateFn: ageMaxValue1000,
          validateMessage: "注意！年龄是数字类型，且最大不能超过1000岁",
        },
        home: {
          validateFn: noValidate,
        },
      },
    };
  },
  methods: {
    cellClassName({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
    },
    dblclick(row, column, cell, event) {
      console.log("column", column);
      if (column.label == "序号") {
        this.$message({
          type: "warning",
          message: "序号列不允许编辑",
        });
        return;
      }
      this.oldCellValue = row[column.property];
      let cellValue = row[column.property];
      new extendComponents.inputC({
        propsData: {
          cellValue: cellValue,
          saveRowData: this.saveRowData, 
          cellDom: cell, 
          row: row, 
          property: column.property, 
          
          validateFn: this.columnAddValidate[column.property].validateFn,
          validateMessage:
            this.columnAddValidate[column.property].validateMessage,
        },
      }).$mount(cell.children[0]); 
    },
    saveRowData(params) {
      if (!params.isPassValidate) {
        this.$message({
          type: "warning",
          message: params.validateMessage,
        });
        params.row[params.property] = this.oldCellValue; 
        params.cellValue = this.oldCellValue; 
        this.recoverCell(params); 
      }
      else {
        setTimeout(() => {
          this.$set(this.tableData, params.row.index, params.row); 
          console.log("发请求更新数据啦");
        }, 300);
        params.row[params.property] = params.cellValue; 
        params.cellValue = params.cellValue; 
        this.recoverCell(params); 
      }
    },
    recoverCell(params) {
      new extendComponents.spanC({
        propsData: {
          cellValue: params.cellValue,
        },
      }).$mount(params.cellDom.children[0]);
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>