<template>
    <el-row>
        <el-row>
            <el-input v-model="title" placeholder="请输入内容"></el-input>
        </el-row>
        <el-divider></el-divider>
        <el-row style="margin-top: 20px;">
            <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext" />
        </el-row>

        <el-row style="margin-top:30px;">
            <el-col align="center">
                <el-button
                    type="warning"
                    size="large"
                    @click="updateArticle"
                    style="margin-right:20px;"
                >修改</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            mdtext: "",
            title: ""
        };
    },
    mounted() {
        this.id = this.$route.params["id"];
        this.getArticleDetail();
    },
    methods: {
        setMdText(t) {
            this.mdtext = t;
        },
        async getArticleDetail() {
            let res = await this.$api.getMdDetail(this.id);
            this.mdtext = res.content;
            this.title = res.title;
        },
        async updateArticle() {
            let res = await this.$api.updateMd(
                this.id,
                this.title,
                this.mdtext
            );
            if (res.code == 0) {
                this.$message("修改成功");
                this.$router.push("/markdown/detail/" + this.id);
                this.$emit("talk2SlieMenu", "create")
                //window.location.reload();
            } else {
                this.$message(res.message);
            }
        }
    }
};
</script>
