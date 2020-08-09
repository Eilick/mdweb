<template>
  <el-row class="edit">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form :inline="true">
          <el-form-item label="标题">
            <el-input v-model="title" placeholder="请输入标题" size="small" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext" @ctrlSave="updateArticle" />
      </el-col>
    </el-row>
    <el-row style="top:50px;right:20px;position:fixed;z-index:88888;">
      <el-button circle @click="updateArticle" type="primary">
        <i class="el-icon-refresh"></i>
      </el-button>
    </el-row>
    <el-row style="top:120px;right:20px;position:fixed;z-index:88888;">
      <el-button circle @click="saveArticle" type="warning">
        <i class="el-icon-finished"></i>
      </el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      mdtext: "",
      title: "",
      timer: null,
      saveAt: 0,
      editAt: 0,
      editDist: 0
    };
  },
  watch: {
    title: function(old, ne) {
      if (old == "" || ne == "") {
        return;
      }
      this.editAt = this.getTs();
    },
    mdtext: function(old, ne) {
      if (old == "" || ne == "") {
        return;
      }
      this.editDist += Math.abs(ne.length - old.length);
      if (this.editDist > 30) {
        this.updateArticle();
      }
    }
  },
  destroyed() {
    if (this.editDist > 0) {
      this.updateArticle();
    }
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getTs() {
      return new Date().getTime() / 1000;
    },
    setMdText(t) {
      if (t != this.mdtext) {
        this.mdtext = t;
      }
    },
    autoSave() {
      this.timer = setInterval(() => {
        if (this.saveAt < this.editAt) {
          this.updateArticle();
        }
      }, 5000);
    },
    initArticle(id) {
      this.id = id;
      this.getArticleDetail(id);
    },
    async getArticleDetail() {
      let res = await this.$api.getMdDetail(this.id);
      this.mdtext = res.content;
      this.title = res.title;
      document.title = this.title;
    },
    async updateArticle() {
      this.editDist = 0;
      let res = await this.$api.updateMd(this.id, this.title, this.mdtext);
      if (res.code == 0) {
        this.$notify({
          title: "保存成功",
          duration: 1000,
          position: "bottom-right",
          showClose: false
        });
        this.saveAt = this.getTs();
      } else {
        this.$message(res.message);
      }
    },
    async saveArticle() {
      this.editDist = 0;
      this.timer = null
      let res = await this.$api.updateMd(this.id, this.title, this.mdtext);
      if (res.code == 0) {
        this.editDist = 0;
        this.$notify({
          title: "保存成功",
          type: "success",
          duration: 500,
          position: "bottom-right",
          showClose: false
        });
        this.$emit("reloadList");
      } else {
        this.$notify({
          title: res.message,
          type: "danger",
          duration: 500
        });
      }
    }
  }
};
</script>