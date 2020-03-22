<template>
    <el-row>
        <el-row>
            <el-input v-model="title" placeholder="请输入内容"></el-input>
        </el-row>
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
            title: "",
            timer : null
        };
    },
    watch : {
        title : function(old, ne) {
            if(old == "" || ne == "") {
                return
            }
            this.autoSave()
        }
    },
    mounted() {
        this.id = this.$route.params["id"];
        this.getArticleDetail();
    },
    methods: {
        setMdText(t) {
            if (t != this.mdtext) {
                this.mdtext = t;
                this.autoSave()
            }
        },
        autoSave() {
            if(this.timer != null) {
                clearTimeout(this.timer)
            } 
            this.timer = setTimeout(() => {
                this.updateArticle()
            }, 3000)
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
                this.$notify({
                    message: '自动保存成功',
                });
                //this.$router.push("/markdown/detail/" + this.id);
                this.$emit("talk2SlieMenu", "create")
                //window.location.reload();
            } else {
                this.$message(res.message);
            }
        }
    }
};
</script>
