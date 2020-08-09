<template>
  <el-row style="margin-top:20px;">
    <el-col :span="18" :offset="2">
      <el-tabs :tab-position="'left'" v-model="classify" @tab-click="handleTabClick">
        <template v-for="c in classifyList">
          <el-tab-pane :label="c" :name="c" :key="c"></el-tab-pane>
        </template>
        <el-tab-pane name="trash">
          <span slot="label">
            <i class="el-icon-delete"></i>回收站
          </span>
        </el-tab-pane>
        <template v-for="(item, i) in mdList" style="margin-bottom:10px;">
          <el-card :key="i" :body-style="{paddingTop : '5px', paddingBottom : '5px'}" style="margin-bottom:10px;">
            <el-row>
              <el-col :span="12" style="padding:10px">
                <span
                  @click="displayArticle(item)"
                  style="cursor:pointer;font-size:16px;font-weight:bold;text-decoration: none;color:#CC9966;line-height:20px"
                >{{item.title || "无"}}</span>
                <el-tag
                  type="info"
                  effect="dark"
                  size="mini"
                  style="margin-left:10px"
                >{{ item.classify }}</el-tag>
              </el-col>
              <el-col :span="12" align="right">
                <el-button
                  type="text"
                  icon="el-icon-s-unfold"
                  @click="toMoveMd(item.id, item.classify)"
                  v-if="classify != 'trash'"
                >分类</el-button>
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="jumpEdit(item.id)"
                  v-if="classify != 'trash'"
                >修改</el-button>

                <el-button
                  type="text"
                  icon="el-icon-copy-document"
                  @click="toJumpCreate(item.id)"
                >复制</el-button>
                <el-button type="text" icon="el-icon-s-promotion" @click="savePdf(item.id)">pdf</el-button>
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="recoverMd(item.id)"
                  v-if="classify == 'trash'"
                >恢复</el-button>
                <el-button type="text" icon="el-icon-delete" @click="deleteArticle(item)">删除</el-button>
              </el-col>
            </el-row>
          </el-card>
        </template>
      </el-tabs>
    </el-col>
    <el-col :span="2" v-if="classify != 'trash'" :offset="1">
      <el-button @click="toJumpCreate(0)" type="primary" size="mini" circle>
        <i class="el-icon-plus"></i>
      </el-button>
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

    <el-dialog :visible.sync="showArticle" :close-on-click-modal="false" width="70%" top="5vh" custom-class="idialog">
        <Detail ref="Detail" @reloadList="reloadList" @jumpEdit="jumpEditFromDetail"/>       
    </el-dialog>

    <el-dialog :visible.sync="showCreate" :close-on-click-modal="false" width="70%" top="5vh" custom-class="idialog">
        <Create ref="Create" @reloadList="reloadList" />
    </el-dialog>

    <el-dialog :visible.sync="showEdit"  :close-on-click-modal="false" width="70%" top="5vh" custom-class="idialog">
        <Edit ref="Edit" @reloadList="reloadList" />
    </el-dialog>
  </el-row>
</template>

<script>
import lodash from "lodash";
import Detail from "./Detail";
import Create from "./Create";
import Edit from "./Edit";
export default {
  data() {
    return {
      list: [],
      mdList: [],
      classify: "",
      classifyList: [],
      showMove: false,
      classifyVal: "",
      moveId: "",
      createBtnStyle: {},

      title: "",
      showArticle: false,
      showCreate: false,
      showEdit: false
    };
  },
  components: {
    Detail,
    Create,
    Edit
  },
  mounted() {
    document.title = "文档列表";
    this.getClassify();
    window.addEventListener(
      "storage",
      () => {
        this.getClassify();
        this.getMdList();
      },
      false
    );

    if (this.$route.query.classify != undefined) {
      this.classify = this.$route.query.classify;
      this.handleTabClick();
    }
  },
  methods: {
    handleTabClick() {
      if (this.classify == "trash") {
        this.getTrashMdList();
      } else {
        this.getMdList();
      }
      this.$router.push({
        path: "/",
        query: {
          classify: this.classify
        }
      });
    },
    reloadPage() {
      if (this.classify == "trash") {
        this.getTrashMdList();
      } else {
        this.getMdList();
      }
      this.$router.push({
        path: "/",
        query: {
          classify: this.classify
        }
      });
      this.getClassify();
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
      if (
        this.classifyList.indexOf(this.classify) < 0 &&
        this.classifyList.length > 0 &&
        this.classify != "trash"
      ) {
        this.classify = this.classifyList[0];
        this.handleTabClick();
      }
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
        this.$message(res.message);
      }
    },
    displayArticle(article) {
      this.showArticle = true;
      setTimeout(() => {
        this.$refs.Detail.initArticle(article.id);
      }, 10);
    },
    reloadList() {
      this.showArticle = false;
      this.showCreate = false;
      this.showEdit = false;
      this.handleTabClick();
    },
    toJumpCreate(id) {
      this.showCreate = true;
      setTimeout(() => {
        this.$refs.Create.cloneArticle(id, this.classify);
      }, 0);
    },
    savePdf(id) {
      window.open("/#/markdown/detail/" + id + "?print=1", "_blank");
    },
    jumpEditFromDetail(id) {
        this.reloadList()
        this.jumpEdit(id)
    },
    jumpEdit(id) {
      this.showEdit = true;
      setTimeout(() => {
        this.$refs.Edit.initArticle(id);
      }, 0);
    },
    showSingle(id) {
      let routeData = this.$router.resolve("/markdown/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    deleteArticle(article) {
      let msg = "确认将该文章放入回收站嘛";
      if (this.classify == "trash") {
        msg = "确认彻底删除该文章?";
      }
      this.$confirm(msg, "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteMd(article.id);
      });
    },
    async deleteMd(id) {
      let res = await this.$api.deleteMd(id);
      if (res.code == 0) {
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 1000
        });
        this.reloadPage();
      }
    },
    async recoverMd(id) {
      let res = await this.$api.recoverMd(id);
      if (res.code == 0) {
        this.$message({
          message: "恢复成功",
          type: "success",
          duration: 1000
        });
        this.reloadPage();
      }
    }
  }
};
</script>
<style>
  .idialog .el-dialog__body{
    padding: 0;
  }
</style>