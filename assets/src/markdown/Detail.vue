<template>
    <el-row>
        <el-row style="margin-top:10px;margin-bottom:5px;">
            <el-col align="center">
                <strong style="font-size: 20px;">{{title}}</strong>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;">
            <el-col :span="22" :offset="1">
                <div id="detail"></div>
            </el-col>
        </el-row>

        <el-row style="margin-top:20px">
            <el-divider></el-divider>
            <el-col align="center">
                <el-button @click="editArticle" type="warning" size="mini" style="margin-right: 20px;">修改</el-button>

                <el-popover placement="top" width="200" v-model="visible">
                    <p>你确定要将该文件删除???</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteMd">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                </el-popover>
            </el-col>

        </el-row>
    </el-row>
</template>

<script>
    import VditorPreview from 'vditor/dist/method.min'

    export default {
        data() {
            return {
                id: 0,
                mdtext: "",
                title: "",
                classify: "",
                isTrash: false,
                visible: false,
            };
        },
        mounted() {
            if (this.$route.params.id != undefined) {
                this.id = this.$route.params["id"];
                this.getArticleDetail(this.id, true);
                this.showHome = true;
            }
        },
        methods: {
            async deleteMd() {
                let res = await this.$api.deleteMd(this.id);
                if (res.code == 0) {
                    this.visible = false
                    this.$message({
                        message: "删除成功",
                        type: "success",
                        duration: 1000
                    });
                    this.$router.push({
                        path : "/markdown/list",
                        query : {
                            classify : this.classify
                        }
                    })
                }
            },
            async getArticleDetail(id, single) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                if (single == true) {
                    document.title = this.title;
                }
                VditorPreview.preview(document.querySelector("#detail"), this.mdtext)
                this.classify = res.classify;

                this.isTrash = res.show_status < 0;
            },
            editArticle() {
                this.$router.push("/markdown/edit/" + this.id)
            }
        }
    };
</script>