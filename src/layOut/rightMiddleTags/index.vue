<template>
  <div
    v-show="isShowTags"
    data-simplebar
    data-simplebar-auto-hide="true"
    class="rightMiddleTags"
    id="rightMiddleTags"
  >
    <simplebar>
      <div class="tagsBox">
        <my-tag
          class="selfClass"
          sizeType="medium"
          type="info"
          @click="handleClick({ path: '/' })"
          :type="$route.path === '/' ? 'success' : 'info'"
          >首页</my-tag
        >
        <my-tag
          @contextmenu.native.prevent="
            (e) => {
              onContextmenu(e, item);
            }
          "
          class="selfClass"
          style="margin-right: 12px; cursor: pointer"
          v-for="(item, index) in visitedViews"
          :key="item.name"
          sizeType="medium"
          @click="handleClick(item)"
          @close="handleClose(item)"
          closable
          :type="item.name == $route.name ? 'success' : 'info'"
          >{{ item.title }}</my-tag
        >
      </div>
      <my-right-menu
        :class-index="0"
        :rightclickInfo="rightclickInfo"
        @closeCurrent="closeCurrent"
        @closeOther="closeOther"
        @closeAll="closeAll"
      ></my-right-menu>
    </simplebar>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { mapState } from "vuex";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";
export default {
  components: {
    simplebar,
  },
  data() {
    return {
      rightclickInfo: {}, 
    };
  },
  computed: {
    ...mapState({
      visitedViews: (state) => state.tags.visitedViews,
      isShowTags: (state) => state.tags.isShowTags,
    }),
  },
  watch: {
    $route(newRoute, oldRoute) {
      this.addTags(newRoute, oldRoute);
    },
  },
  mounted() {
    // this.columnDropInit();
  },
  methods: {
    // 普通dom右键
    onContextmenu(e, item) {
      // console.log("e", e, item);
      this.rightclickInfo = {
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        menulists: [
          {
            fnName: "closeCurrent",
            params: item,
            icoName: "el-icon-error",
            btnName: "关闭当前",
          },
          {
            fnName: "closeOther",
            params: item,
            icoName: "el-icon-circle-close",
            btnName: "关闭其他",
          },
          {
            fnName: "closeAll",
            params: item,
            icoName: "el-icon-close",
            btnName: "全部关闭",
          },
        ],
      };
    },
    closeCurrent(params) {
      this.handleClose(params);
    },
    closeOther(params) {
      this.$store.dispatch("tags/delete_otherview", { name: params.name });
    },
    closeAll(params) {
      this.$store.dispatch("tags/delete_allview");
    },
    addTags(newRoute, oldRoute) {
      if (newRoute.name) {
        this.$store.dispatch("tags/add_view", newRoute);
      }
    },
    handleClick(item) {
      this.$router.push({
        path: item.path,
      });
    },
    handleClose(item) {
      let isCurrent = item.name == this.$route.name; 
      this.$store.dispatch("tags/delete_view", { name: item.name, isCurrent });
    },
    columnDropInit() {
      var wrap = document.getElementById("rightMiddleTags");
      var rules = {
        animation: 500, 
        onEnd: function (event) {
          var arr = sortable.toArray();
        },
      };
      var sortable = Sortable.create(wrap, rules);
    },
  },
};
</script>

<style lang='less' scoped>
.rightMiddleTags {
  width: 100%;
  background-color: var(--theme_bgColor);
  box-sizing: border-box;
  padding: 0 12px;
  overflow-x: auto;
  position: relative;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .tagsBox {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    .selfClass {
      margin-right: 12px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .selfClass:hover {
      color: #67c23a;
    }
    .selfClass:active {
      color: #67c23a;
    }
  }
  /deep/ .simplebar-scrollbar::before {
    background-color: #cde !important;
  }
}
</style>