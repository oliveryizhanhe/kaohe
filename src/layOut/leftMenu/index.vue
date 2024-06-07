<template>
  <div>
    <logo v-if="isShowMenuIcon" :collapse="isCollapse"></logo>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :background-color="theme_bgColor"
      router
      :collapse="isCollapse"
      text-color="auto"
      active-text-color="auto"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-menu-item
        v-for="(item, index) in routeArr"
        :key="item.name"
        :index="item.path"
      >
        <i class="el-icon-eleme"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import routeArr from "@/router/routeArr.js";
import { mapState } from "vuex";
import { getThemeColor } from "@/utils";
import logo from "./logo/logo.vue";
export default {
  components: {
    logo,
  },
  data() {
    return {
      routeArr,
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.menu.isCollapse,
      theme_bgColor: (state) => state.menu.theme_bgColor, 
      isShowMenuIcon: (state) => state.menu.isShowMenuIcon, 
    }),
  },
  mounted() {
    this.$store.state.menu.theme_bgColor = getThemeColor();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu-item.is-active {
  background-color: #ccddee !important;
}
.el-menu-item:hover {
  background-color: #ccddee !important;
}
</style>