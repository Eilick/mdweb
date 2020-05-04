<template>
  <el-row id="app">
    <el-main style="margin-bottom: 200px;">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </el-main>
  </el-row>
</template>
<script>
import moment from "moment";

export default {
  name: "Md",
  data() {
    return {
      print: false
    };
  },
  mounted() {
    if (this.$route.query.print == 1) {
      this.print = true;
      window.print();
    }
  },
};
</script>
<style media="print">
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>

