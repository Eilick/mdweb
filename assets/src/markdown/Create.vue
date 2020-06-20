<template>
    <el-row>
        <el-row>
            <el-col :span="10" :offset="7">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>

            <el-col :span="5" :offset="1">
                <el-select
                    v-model="classify"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章分类"
                >
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
            <el-col :span="22" :offset="1">
                <markdown-editor
                    @inputMarkdown="setMdText"
                    :initValue="mdtext"
                    @ctrlSave="createArticle"
                />
            </el-col>
        </el-row>

        <el-row style="top:40px;right:20px;position:fixed;z-index:88888;">
            <el-button circle @click="createArticle" type="warning">
                <i class="el-icon-finished"></i>
            </el-button>
        </el-row>
    </el-row>
</template>

<script>
import moment from "moment"
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
        document.title = "创建";
        this.getClassify();
        if (
            this.$route.query.from_id != undefined &&
            this.$route.query.from_id > 0
        ) {
            setTimeout(() => {
                this.getArticleDetail(this.$route.query.from_id);
            }, 500);
        } else {
            let mdtext = localStorage.getItem("mdtext");
            if (mdtext != null && mdtext != "") {
                this.mdtext = mdtext;
            }
            this.title = moment().format('YYYY-MM-DD HH:mm')
        }
        if (this.$route.query.classify != undefined) {
            this.classify = this.$route.query.classify;
        }
    },
    methods: {
        setMdText(t) {
            this.mdtext = t;
            localStorage.setItem("mdtext", this.mdtext);
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
                localStorage.setItem("msg1", res.id);
                this.$router.push("/markdown/detail/" + res.id);
            } else {
                this.$message(res.message);
            }
        },
        async getArticleDetail(id) {
            let res = await this.$api.getMdDetail(id);
            this.setMdText(res.content);
            this.title = res.title;
            document.title = res.title;
        },
        async getClassify() {
            let res = await this.$api.getClassify();
            this.options = res;
        }
    }
};
</script>