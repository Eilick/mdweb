<template>
    <el-row>
        <el-row>
            <el-col :span="12">
                <el-input v-model="title" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext" />
        </el-row>

        <el-row style="margin-top:30px;">
            <el-col align="center">
                <el-button type="warning" size="large" @click="saveArticle" style="margin-right:20px;">保存并退出</el-button>
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
                timer: null,
                saveAt: 0,
                editAt: 0,
            };
        },
        watch: {
            title: function (old, ne) {
                if (old == "" || ne == "") {
                    return
                }
                this.editAt = this.getTs()
            },
            mdtext: function (old, ne) {
                if (old == "" || ne == "") {
                    return
                }
                if(Math.abs(ne.length - old.length) > 20 ) {
                    this.updateArticle()
                } else {
                    this.editAt = this.getTs()
                }
                
            },
        },
        mounted() {
            this.id = this.$route.params["id"];
            this.getArticleDetail();
        },
        destroyed() {
            if (this.timer != null) {
                clearInterval(this.timer)
            }
        },
        methods: {
            getTs() {
                return new Date().getTime() / 1000
            },
            setMdText(t) {
                if (t != this.mdtext) {
                    this.mdtext = t;
                }
            },
            autoSave() {
                this.timer = setInterval(() => {
                    if (this.saveAt < this.editAt) {
                        this.updateArticle()
                    }
                }, 8000)
            },
            async getArticleDetail() {
                let res = await this.$api.getMdDetail(this.id);
                this.mdtext = res.content;
                this.title = res.title;
                this.autoSave();
            },
            async updateArticle() {
                let res = await this.$api.updateMd(
                    this.id,
                    this.title,
                    this.mdtext
                );
                if (res.code == 0) {
                    this.$notify({
                        title: '自动保存成功',
                        duration: 1000,
                        position: 'bottom-right',
                        showClose: false,
                    });
                    this.saveAt = this.getTs()
                    this.$emit("talk2SlieMenu", "create")
                } else {
                    this.$message(res.message);
                }
            },
            async saveArticle() {
                let res = await this.$api.updateMd(
                    this.id,
                    this.title,
                    this.mdtext
                );
                if (res.code == 0) {
                    this.$emit("talk2SlieMenu", "create")
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        duration : 1000
                    });
                    this.$router.push("/markdown/detail/" + this.id);
                } else {
                    this.$message({
                        message: res.message,
                        type: 'danger',
                        duration : 1000
                    });
                }
            }
        }
    };
</script>