<template>
    <el-row>
        <h2>{{title}}</h2>
        <el-row style="margin-top: 20px;">
            <mavon-editor v-model="mdtext" :defaultOpen="'preview'" :subfield="false" :toolbarsFlag="false"
                :codeStyle="'code-idea'" id="pdfId" />
        </el-row>
        <el-row style="margin-top:30px;">
            <el-col align="center">
                <template v-if="!isTrash">
                    <el-button type="warning" @click="jumpEdit" style="margin-right:20px;">修改</el-button>
                </template>
                
                <el-popover placement="top" width="160" v-model="visible">
                    <p>确定删除该文档么？？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="deleteMd">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-right:20px;" v-if="isTrash">
                        完全删除</el-button>
                    <el-button slot="reference" type="danger" style="margin-right:20px;" v-else>
                        删除</el-button>
                </el-popover>
                <el-button type="primary" @click="savePdf" v-if="!isTrash">导出PDF</el-button>
                <el-button type="primary" @click="recoverMd" v-if="isTrash">恢复文档</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                mdtext: "",
                title: "",
                visible: false,
                isTrash: false,
            };
        },
        watch: {
            $route: function () {
                this.getArticleDetail(this.$route.params["id"]);
            }
        },
        mounted() {
            this.getArticleDetail(this.$route.params["id"]);
        },
        methods: {
            async getArticleDetail(id) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                document.title = res.title;
                this.isTrash = res.show_status < 0
            },
            jumpEdit() {
                this.$router.push("/markdown/edit/" + this.$route.params["id"]);
            },
            async deleteMd() {
                let res = await this.$api.deleteMd(this.$route.params["id"]);
                if (res.code == 0) {
                    this.$message("删除成功");
                    if(this.isTrash) {
                        this.$router.push("/markdown/trash_list");
                    } else {
                        this.$emit("talk2SlieMenu", "delete", this.$route.params["id"]);
                    }
                    this.visible = false
                    
                }
            },
            async recoverMd() {
                let res = await this.$api.recoverMd(this.$route.params["id"]);
                if (res.code == 0) {
                    this.$message("恢复成功");
                    this.getArticleDetail(this.$route.params["id"])
                    this.$emit("talk2SlieMenu", "create");                    
                }
            },
            savePdf() {
                window.open("/#/markdown/detail/" + this.$route.params["id"] + "?print=1", "print")
            }
        }
    }
</script>