<template>
    <div>
        <div class="row" >
            <div class="col-md-6 col-md-offset-3">
                <div class="text-center">
                    <input type="text" class="form-control input-lg" placeholder="文章标题" v-model="title">
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col-md-10 col-md-offset-1">
                <markdown-editor @inputMarkdown="setMdText" :initValue="mdtext"/>
            </div>
        </div>

        <div class="row" style="padding-top: 30px; padding-bottom: 30px;">
            <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg" @click="updateArticle">修改</button>
                <button type="button" class="btn btn-danger btn-lg" @click="deleteArticle">删除</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id : "",
                mdtext : '',
                title : '',
            }
        },
        mounted() {
            this.id = this.$route.params["id"]
            this.getArticleDetail();
        },
        methods : {
            setMdText(t) {
                this.mdtext = t;
            },
            async getArticleDetail() {
                let res = await this.$api.getMdDetail(this.id);
                this.mdtext = res.content;
                this.title = res.title;
            },
            async updateArticle() {
                let res = await this.$api.updateMd(this.id, this.title, this.mdtext);
                alert('更新成功');
            },
            async deleteArticle() {

                if(!confirm('删除该文章')) {
                    return;
                }
                let res = await this.$api.deleteMd(this.articleId);
                alert('删除成功')
                window.location.href='/page/article/list';
            }
        }
    }
</script>
