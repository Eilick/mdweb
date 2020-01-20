<template>
    <el-row>
        <div class="row" >
            <div class="col-md-6 col-md-offset-3">
                <div class="text-center">
                    <input type="text" class="form-control input-lg" placeholder="文章标题" v-model="title">
                </div>
            </div>
        </div>
        <div class="row text-center" style="margin-top: 20px;">
            <div class="col-md-10 col-md-offset-1">
                <markdown-editor @inputMarkdown="setMdText"/>
            </div>
        </div>

        <div class="row" style="padding-top: 30px; padding-bottom: 30px;">
            <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg" @click="createArticle">创建</button>
            </div>
        </div>
    </el-row>
</template>

<script>
    export default {
        props : ['articleId'],
        data() {
            return {
                mdtext : '',
                title : '',
            }
        },
        methods : {
            setMdText(t) {
                this.mdtext = t;
            },
            async createArticle() {
                let res = await this.$api.createMd(this.title, this.mdtext);
                alert('创建成功')
            }
        }
    }
</script>
