<template>
    <el-row>
        <el-row style="margin-top:10px;margin-bottom:5px;">
            <el-col align="center">
                <h2>
                    {{title}}
                    <template v-if="isTrash">
                        <small style="font-size:5px">- 该文已删除</small>
                    </template>
                    <span style="display: inline-block;margin-left: 30px;">
                        <template v-if="!isTrash && !print">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                circle
                                @click="jumpEdit"
                            ></el-button>
                        </template>
                        <el-popover placement="top" width="200" v-model="visible" v-if="!print">
                            <p v-if="!isTrash">确认将该文章放入回收站嘛?</p>
                            <p v-if="isTrash">确认彻底删除该文章?</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="deleteMd">确定</el-button>
                            </div>
                            <el-button
                                slot="reference"
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                circle
                                style="margin-left: 10px"
                            ></el-button>
                        </el-popover>
                    </span>
                </h2>
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col>
                <mavon-editor
                    v-model="mdtext"
                    :defaultOpen="'preview'"
                    :subfield="false"
                    :toolbarsFlag="false"
                    :codeStyle="'androidstudio'"
                    id="pdfId"
                />
            </el-col>
        </el-row>
        <el-row style="margin-top:30px;" v-if="!print">
            <el-col align="center">
                <el-button type="primary" @click="savePdf" v-if="!isTrash">导出PDF</el-button>
                <el-button type="primary" @click="cloneMd">克隆</el-button>
                <el-button type="primary" @click="recoverMd" v-if="isTrash">恢复文档</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            id : 0,
            mdtext: "",
            title: "",
            visible: false,
            isTrash: false,
        };
    },
    methods: {
        initArticle(id) {
            this.id = 0;
            this.getArticleDetail(id)
        },
        async getArticleDetail(id) {
            let res = await this.$api.getMdDetail(id);
            this.mdtext = res.content;
            this.title = res.title;
            this.isTrash = res.show_status < 0;
        },
        jumpEdit() {
            this.$router.push("/markdown/edit/" + this.$route.params["id"]);
        },
        async deleteMd() {
            let res = await this.$api.deleteMd(this.$route.params["id"]);
            if (res.code == 0) {
                this.$message({
                    message: "删除成功",
                    type: "success",
                    duration: 1000
                });
                this.$router.push("/markdown/list");
                this.visible = false;
            }
        },
        async recoverMd() {
            let res = await this.$api.recoverMd(this.$route.params["id"]);
            if (res.code == 0) {
                this.$message({
                    message: "恢复成功",
                    type: "success",
                    duration: 1000
                });
                this.getArticleDetail(this.$route.params["id"]);
            }
        },
        savePdf() {
            window.open(
                "/#/markdown/detail/" + this.$route.params["id"] + "?print=1",
                "_blank"
            );
        },
        cloneMd() {
            this.$router.push(
                "/markdown/create?from_id=" + this.$route.params["id"]
            );
        }
    }
};
</script>