<template>
    <el-row class="edit">
        <el-row style="margin-bottom: 20px;">
            <el-col :span="12" :offset="6">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
        </el-row>

        <markdown ref="MD"></markdown>

        <el-row style="margin-top:70px;">
            <el-col align="center">
                <el-button @click="updateArticle" type="primary" size="mini">保存</el-button>
                <el-button @click="saveArticle" type="success" size="mini">保存并退出</el-button>
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
                editDist: 0,
                contentEditor: null,
            };
        },
        watch: {
            title: function (old, ne) {
                if (old == "" || ne == "") {
                    return;
                }
                this.editAt = this.getTs();
            },
            mdtext: function (old, ne) {
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
        mounted() {
            this.id = this.$route.params.id
            this.getArticleDetail();
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
                this.getArticleDetail();
            },
            async getArticleDetail() {
                let res = await this.$api.getMdDetail(this.id);
                this.mdtext = res.content;
                this.title = res.title;
                document.title = this.title;
                this.$refs.MD.setValue(this.mdtext)
            },
            async updateArticle() {
                this.editDist = 0;
                let res = await this.$api.updateMd(this.id, this.title, this.$refs.MD.getValue());
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
                let res = await this.$api.updateMd(this.id, this.title, this.$refs.MD.getValue());
                if (res.code == 0) {
                    this.editDist = 0;
                    this.$notify({
                        title: "保存成功",
                        type: "success",
                        duration: 500,
                        position: "bottom-right",
                        showClose: false
                    });
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