<template>
    <div>
        <div class="row text-center">
            <span class="h4">
                {{title}}
                <span style="display: inline-block; margin-left: 10px">
                    <a :href="'/page/article/edit?article_id='">
                        <span class="glyphicon glyphicon-pencil"></span>
                    </a>
                </span>
            </span>
        </div>

        <div class="row" style="margin-top: 20px;">
            <div class="col-md-10 col-md-offset-1">
                <mavon-editor
                    v-model="mdtext"
                    :defaultOpen="'preview'"
                    :subfield="false"
                    :toolbarsFlag="false"
                    :codeStyle="'code-idea'"
                />
            </div>
        </div>
        <el-button type="warning" size="large" @click="jumpEdit">修改</el-button>
        <el-popover placement="top" width="160" v-model="visible">
            <p>确定删除该文档么？？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteMd">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
        </el-popover>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mdtext : '',
                title : '',
                 visible: false,
            }
        },
        watch : {
            $route : function() {
                this.getArticleDetail(this.$route.params["id"]);
            }
        },
        mounted() {
            this.getArticleDetail(this.$route.params["id"]);
        },
        methods : {
            async getArticleDetail(id) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                document.title = res.title;
            },
            jumpEdit() {
                this.$router.push("/markdown/edit/" + this.$route.params["id"])
            },
            async deleteMd() {
                let res = await this.$api.deleteMd(this.$route.params["id"])
                if (res.code == 0) {
                    this.$message("删除成功")
                }
            }
        }
    }
</script>
