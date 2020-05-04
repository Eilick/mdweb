<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-tabs :tab-position="'top'" v-model="classify" @tab-click="handleTabClick">
        <el-tab-pane label="全部" name="全部"></el-tab-pane>
        <template v-for="c in classifyList">
          <el-tab-pane :label="c" :name="c"></el-tab-pane>
        </template>
        <el-tab-pane name="trash">
          <span slot="label">
            <i class="el-icon-delete"></i>已删除文档
          </span>
        </el-tab-pane>

        <el-timeline>
          <template v-for="(item, i) in mdList">
            <el-timeline-item :timestamp="item.create_at.substring(6,16)" placement="top" :key="i">
              <el-card>
                <router-link
                  target="_blank"
                  :to="{path:'/markdown/detail/' + item.id}"
                  style="cursor:pointer;font-size:17px;font-weight:bold;text-decoration: none;color:#CC9966"
                >{{item.title || "无"}}</router-link>
                <el-tag
                  type="info"
                  effect="dark"
                  size="mini"
                  style="margin-left:10px"
                >{{ item.classify }}</el-tag>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-s-unfold"
                  @click="toMoveMd(item.id, item.classify)"
                  v-if="classify != 'trash'"
                ></el-button>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>
      </el-tabs>
    </el-col>
    <el-dialog title="移动到" :visible.sync="showMove" width="30%">
      <el-select
        v-model="classifyVal"
        filterable
        allow-create
        default-first-option
        placeholder="请选择文章分类"
        size="small"
      >
        <el-option v-for="item in classifyList" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-button size="mini" type="info" style="margin-left:10px" @click="moveMd">确认</el-button>
    </el-dialog>
    <el-row style="bottom:243px;position:fixed; right:30px;z-index:2000">
      <router-link target="_blank" :to="{path:'/markdown/create'}">
        <el-button size="medium" type="primary">新建</el-button>
      </router-link>
    </el-row>
  </el-row>
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {
      list: [],
      mdList: [],
      classify: "全部",
      classifyList: [],
      showMove: false,
      classifyVal: "",
      moveId: ""
    };
  },
  mounted() {
    document.title = "文档列表";
    this.getMdList();
    this.getClassify();
  },
  methods: {
    handleTabClick() {
      if (this.classify == "trash") {
        this.getTrashMdList();
      } else {
        this.getMdList();
      }
    },
    async getTrashMdList() {
      let res = await this.$api.getMdList("trash");
      this.mdList = res;
    },
    async getMdList() {
      let res = await this.$api.getMdList("", this.classify);
      this.mdList = res;
    },
    async getClassify() {
      let res = await this.$api.getClassify();
      this.classifyList = res;
    },
    toMoveMd(mdId, clas) {
      this.showMove = true;
      this.classifyVal = clas;
      this.moveId = mdId;
    },
    async moveMd() {
      let res = await this.$api.moveMd(this.moveId, this.classifyVal);
      if (res.code == 0) {
        this.showMove = false;
        this.getMdList();
        this.getClassify();
      } else {
        this.$message(res.message)
      }
    }
  }
};
</script>