<template>
    <el-row>
        <el-row>
            <el-col :span="14" offset="5">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
        </el-row>

        <el-row style="margin-top: 20px;">
            <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext"/>
        </el-row>

        <el-row style="margin-top:30px;">
            <el-col align="center">
                <el-button type="warning" size="large" @click="createArticle" style="margin-right:20px;">创建</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        props: ["articleId"],
        data() {
            return {
                mdtext: "",
                title: ""
            };
        },
        mounted() {
            document.title = "创建"
            if(this.$route.query.from_id != undefined && this.$route.query.from_id > 0) {
                setTimeout(() => {
                    this.getArticleDetail(this.$route.query.from_id)
                }, 500)
            } else {
                let mdtext = localStorage.getItem("mdtext")
                if(mdtext != null && mdtext != "") {
                    this.mdtext = mdtext
                }
            }
        },
        methods: {
            setMdText(t) {
                this.mdtext = t;
                localStorage.setItem("mdtext", this.mdtext)
            },
            async createArticle() {
                if(this.title == "") {
                    this.$message("请赐个文章标题呀")
                    return
                }
                let res = await this.$api.createMd(this.title, this.mdtext);
                if (res.code == 0) {
                    localStorage.setItem("mdtext", "")
                    this.$message("创建成功")
                    this.$router.push("/markdown/detail/" + res.id);
                } else {
                    this.$message(res.message)
                }
            },
            async getArticleDetail(id) {
                let res = await this.$api.getMdDetail(id);
                this.setMdText(res.content);
                this.title = res.title;
                document.title = res.title;
            },
        }
    };
</script>