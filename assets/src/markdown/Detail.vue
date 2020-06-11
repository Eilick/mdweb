<template>
    <el-row>
        <el-row style="margin-top:10px;margin-bottom:5px;">
            <el-col align="center">
                <h2>{{title}}</h2>
            </el-col>
        </el-row>
        <el-row style="margin-top: 30px;">
            <el-col :span="22" :offset="1">
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
        <el-row style="top:20px;right:20px;position:fixed;z-index:88888" v-if="showHome">
            <el-button @click="jumpHome" circle>
                <i class="el-icon-s-home"></i>
            </el-button>
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
            classify : '',
            isTrash: false,
            print: false,
            showHome : false,
        };
    },
    mounted() {
        if (this.$route.params.id != undefined) {
            this.id = this.$route.params["id"];
            this.getArticleDetail(this.id, true);
            this.showHome = true
        }
    },
    methods: {
        initArticle(id) {
            this.id = id;
            this.getArticleDetail(id);
        },
        jumpHome() {
            this.$router.push({path : '/', query : {
                classify : this.classify
            }})
        },
        async getArticleDetail(id, single) {
            let res = await this.$api.getMdDetail(id);
            this.mdtext = res.content;
            this.title = res.title;
            if (single == true) {
                document.title = this.title;
            }
            this.classify = res.classify

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