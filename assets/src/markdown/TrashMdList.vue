<template>
  <el-row>
    <el-row>
      <el-col :span="16" offset="4">
        <template v-for="item in mdList">
          <el-card style="margin-top:10px;">
            <el-row>
              <el-col :span="21">
                <b @click="jumpMd(item.id)" style="cursor:pointer ">{{item.title}}</b>
              </el-col>
              <el-col :span="3">{{item.create_at.substring(6,16)}}</el-col>
            </el-row>
          </el-card>
        </template>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {
      mdList: []
    };
  },
  mounted() {
    document.title = "回收站";
    this.getTrashMdList();
  },
  methods: {
    async getTrashMdList() {
      let res = await this.$api.getMdList("trash");
      this.mdList = res;
    },
    jumpMd(id) {
      this.$router.push("/markdown/detail/" + id);
    }
  }
};
</script>