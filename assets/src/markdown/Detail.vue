<template>
    <el-row>
        <el-row style="margin-top:10px;margin-bottom:5px;">
            <el-col align="center">
                <h2>{{title}}</h2>
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col>
                <mavon-editor
                    v-model="mdtext"
                    :defaultOpen="'preview'"
                    :subfield="false"
                    :toolbarsFlag="false"
                    :codeStyle="'obsidian'"
                    id="pdfId"
                    :boxShadow="false"
                />
            </el-col>
        </el-row>
        <el-row style="margin-top:30px;" v-if="!print">
            <el-col align="center">
                <el-button type="primary" @click="recoverMd" v-if="isTrash">恢复文档</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            id: 0,
            mdtext: "",
            title: "",
            isTrash: false,
            print: false
        };
    },
    mounted() {
        if (this.$route.params.id != undefined) {
            this.id = this.$route.params["id"]
            this.getArticleDetail(this.id, true);
        }
    },
    methods: {
        initArticle(id) {
            this.id = id;
            this.getArticleDetail(id);
        },
        async getArticleDetail(id, single) {
            let res = await this.$api.getMdDetail(id);
            this.mdtext = res.content;
            this.title = res.title;
            if(single == true) {
                document.title = this.title
            }
            
            this.isTrash = res.show_status < 0;
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
        }
    }
};
</script>