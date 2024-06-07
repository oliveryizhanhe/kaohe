<template>
  <div class="myWrap">
    <h2>拖拽插件sortablejs</h2>
    <br />
    <h5>普通拖拽</h5>
    <br>
    <div id="wrapBox">
      <div data-id="1工商银行">工商银行</div>
      <div data-id="2建设银行">建设银行</div>
      <div data-id="3中国银行">中国银行</div>
      <div data-id="4农业银行">农业银行</div>
      <div data-id="5交通银行">交通银行</div>
    </div>
    <br />
    <h5>表格拖拽</h5>
    <br />
    <el-table
      :data="tableBody"
      border
      row-key="id"
      :header-cell-style="{
        height: '48px',
        background: '#FAFAFA',
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '14px',
      }"
    >
      <el-table-column type="selection" width="48" fixed></el-table-column>
      <el-table-column label="序号" type="index" width="50" fixed>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="item.index"
        :prop="item.prop"
        :label="item.label"
      >
      </el-table-column>
    </el-table>
    <br />
    <h3>表头数据</h3>
    <pre>{{ tableHeader }}</pre>
    <br />
    <h3>表体数据</h3>
    <pre>{{ tableBody }}</pre>
    <br />
  </div>
</template>
<script>
import Sortable from "sortablejs";
export default {
  name: "dragName",
  data() {
    return {
      tableHeader: [
        {
          label: "id",
          prop: "id",
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "家乡",
          prop: "home",
        },
        {
          label: "爱好",
          prop: "hobby",
        },
      ],
      tableBody: [
        {
          id: "1",
          name: "tomboy",
          age: 500,
          home: "i never die ",
          hobby: "9",
        },
        {
          id: "2",
          name: "queencard",
          age: 88,
          home: "i feel",
          hobby: "13",
        },
        {
          id: "3",
          name: "superlady",
          age: 1000,
          home: "2",
          hobby: "10",
        },
        {
          id: "4",
          name: "nxde",
          age: 99999,
          home: "i love",
          hobby: "11",
        },
      ],
    };
  },
  mounted() {
    this.columnDropInit();
    this.rowDropInit();
    this.priorityPay();
  },
  methods: {
    columnDropInit() {
      const wrapperColumn = document.querySelector(
        ".el-table__header-wrapper tr"
      );
      this.sortable = Sortable.create(wrapperColumn, {
        animation: 500,
        delay: 0,
        onEnd: (event) => {
          console.log(
            "拖拽完成以后发现表头数据并没有改变，所以需要我们手动更新表头数据",
            this.tableHeader
          );
          console.log(
            "根据旧索引和新索引去更新，其实就是交换位置",
            event.oldIndex,
            event.newIndex
          );

          let tempHableHeader = [...this.tableHeader]; 
          let temp; 
          temp = tempHableHeader[event.oldIndex - 2];
          tempHableHeader[event.oldIndex - 2] =
            tempHableHeader[event.newIndex - 2];
          tempHableHeader[event.newIndex - 2] = temp;
          this.tableHeader = [];
          this.$nextTick(() => {
            this.tableHeader = tempHableHeader;
          });
        },
      });
    },
    rowDropInit() {
      const wrapperRow = document.querySelector(
        ".el-table__body-wrapper tbody"
      );
      const that = this; 
      Sortable.create(wrapperRow, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = that.tableBody.splice(oldIndex, 1)[0];
          that.tableBody.splice(newIndex, 0, currRow);
        },
      });
    },
    priorityPay() {
      var wrap = document.getElementById("wrapBox");
      var rules = {
        animation: 500, 
        onEnd: function (event) {
          console.log("参数是拖动事件对象", event);
          var arr = sortable.toArray();
          console.log("位置排序", arr);
        },
      };
      var sortable = Sortable.create(wrap, rules);
    },
  },
};
</script>
<style lang='less' scoped>
.myWrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  padding-bottom: 24px;
  /deep/ .el-table {
    .el-table__header-wrapper {
      tr {
        th {
          // 设置拖动样式，好看一些
          cursor: move;
        }
      }
    }
  }
}

h5 {
  color: #666;
}

#wrapBox {
  width: 360px;
  height: auto;
}

#wrapBox div {
  padding: 8px;
  background-color: #fdfdfd;
  border: solid 1px #eee;
  margin-bottom: 10px;
  cursor: move;
  font-size: 13px;
}
#wrapBox div:active {
  background-color: #eee;
}
</style>