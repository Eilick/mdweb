<template>
  <el-row>
    <el-row>
      <el-col :span="22" :offset="1">
        <el-form :inline="true">
          <el-form-item label="标题">
            <el-input v-model="title" placeholder="请输入标题" size="small" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select
              v-model="classify"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章分类"
              size="small"
              style="width: 130px"
            >
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22" :offset="1">
        <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext" @ctrlSave="createArticle" />
      </el-col>
    </el-row>

    <el-row style="top:100px;right:20px;position:fixed;z-index:88888;">
      <el-button circle @click="createArticle" type="warning">
        <i class="el-icon-finished"></i>
      </el-button>
    </el-row>
  </el-row>
</template>

<script>
import moment from "moment";
export default {
  props: ["articleId"],
  data() {
    return {
      mdtext: "",
      title: "",
      classify: "普通",
      options: []
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    setClassify(c) {
      this.classify = c;
    },
    setMdText(t) {
      this.mdtext = t;
      localStorage.setItem("mdtext", this.mdtext);
    },
    cloneArticle(id, classify) {
      if (id > 0) {
        this.getArticleDetail(id);
      } else {
        this.classify = classify;
        this.title = moment().format("YYYY-MM-DD HH:mm");
        if (localStorage.getItem("mdtext") != null) {
          this.mdtext = localStorage.getItem("mdtext");
        }
      }
    },
    async getArticleDetail(id, single) {
      let res = await this.$api.getMdDetail(id);
      this.mdtext = res.content;
      this.title = res.title;
      this.classify = res.classify;
    },
    async createArticle() {
      if (this.title == "") {
        this.$message("请赐个文章标题呀");
        return;
      }
      let res = await this.$api.createMd(
        this.title,
        this.mdtext,
        this.classify
      );
      if (res.code == 0) {
        localStorage.setItem("mdtext", "");
        this.$message("创建成功");
        this.$emit("reloadList");
      } else {
        this.$message(res.message);
      }
    },
    async getClassify() {
      let res = await this.$api.getClassify();
      this.options = res;
    }
  }
};
</script>