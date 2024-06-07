<template>
  <div>
    <h5>表格内右键</h5>
    <br />
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      @row-contextmenu="rightclick"
    >
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="home" label="家乡"> </el-table-column>
      <el-table-column prop="hobby" label="爱好"> </el-table-column>
    </el-table>
    <br />
    <br />
    <br />
    <div class="normalDom" @contextmenu.prevent="onContextmenu">区域内右键</div>
    <my-right-menu
      :class-index="1"
      :rightclickInfo="rightclickInfo"
      @copy="copy"
      @look="look"
      @edit="edit"
      @delete="deleteFn"
      @refresh="refresh"
    ></my-right-menu>
  </div>
</template>

<script>
export default {
  name: "myRightMenuName",
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "鸡",
          age: 500,
          home: "山洞",
          hobby: "桃子",
        },
        {
          id: "2",
          name: "猫",
          age: 88,
          home: "庄高",
          hobby: "肉包子",
        },
        {
          id: "3",
          name: "喷菇",
          age: 500,
          home: "天河",
          hobby: "游泳",
        },
        {
          id: "4",
          name: "莲花",
          age: 1000,
          home: "东土",
          hobby: "挑染",
        },
      ],
      rightclickInfo: {},
    };
  },
  methods: {
    rightclick(row, column, event) {
      this.rightclickInfo = {
        position: {
          x: event.clientX,
          y: event.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: { row, column, event },
            icoName: "el-icon-document-copy",
            btnName: "复制数据",
           
          },
          {
            fnName: "look",
            params: { row, column, event },
            icoName: "el-icon-view",
            btnName: "查看行数据",
          },
          {
            fnName: "edit",
            params: { row, column, event },
            icoName: "el-icon-edit",
            btnName: "编辑行数据",
          },
          {
            fnName: "delete",
            params: { row, column, event },
            icoName: "el-icon-delete",
            btnName: "删除行数据",
          },
          {
            fnName: "refresh",
            params: { row, column, event },
            icoName: "el-icon-refresh",
            btnName: "刷新页面",
          },
        ],
      };
      event.preventDefault(); 
    },
    copy(params) {
      console.log(
        "copy",
        params.row ? params.row[params.column.property] : params
      );
    },
    look(params) {
      console.log("look", params.row ? JSON.stringify(params.row) : params);
    },
    edit(params) {
      console.log("edit", params);
    },
    deleteFn(params) {
      console.log("deleteFn", params.row ? params.row.id : params);
    },
    refresh(params) {
      console.log("refresh 刷新页面啦");
    },
    onContextmenu(e) {
      this.rightclickInfo = {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        menulists: [
          {
            fnName: "copy",
            params: "代码修仙",
            icoName: "el-icon-star-on",
            btnName: "代码修仙",
          },
          {
            fnName: "look",
            params: "路漫漫",
            icoName: "el-icon-star-off",
            btnName: "路漫漫",
          },
        ],
      };
    },
  },
};
</script>

<style>
.normalDom {
  width: 240px;
  height: 240px;
  line-height: 240px;
  text-align: center;
  border: 6px dotted pink;
  font-family: "楷体", Courier, monospace;
  font-weight: 600;
}
</style>
