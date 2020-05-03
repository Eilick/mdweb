<template>
  <el-row id="app">
    <el-container>
      <el-header v-if="!print">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/markdown/create">
            <i class="el-icon-edit"></i>新建markdown
          </el-menu-item>
          <el-menu-item index="/markdown/list">
            <i class="el-icon-document"></i>文档列表
          </el-menu-item>
          <el-menu-item index="/markdown/trash_list">
            <i class="el-icon-delete"></i>回收站
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="margin-bottom: 200px;">
        <router-view />
      </el-main>
    </el-container>
  </el-row>
</template>
<script>
import moment from "moment";

export default {
  name: "Md",
  data() {
    return {
      activeMenu : "/markdown/list",
      print: false
    };
  },
  mounted() {
    if (this.$route.query.print == 1) {
      this.print = true;
      window.print();
    }
  }
};
</script>
<style media="print">
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>

