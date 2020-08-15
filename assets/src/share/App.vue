<template>
    <el-row>
        <el-row style="margin-top:30px;margin-bottom:3px;">
            <el-col align="center">
                <strong style="font-size: 25px;">{{title}}</strong>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;margin-bottom: 200px;">
            <el-col :span="18" :offset="3">
                <div id="detail"></div>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    import VditorPreview from 'vditor/dist/method.min'

    export default {
        data() {
            return {
                title: "",
            };
        },
        mounted() {
            this.getArticleDetail(this.get("code"));
        },
        methods: {
            get(name) {
                if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
                    return decodeURIComponent(name[1]);
                }
                return ""
            },
            async getArticleDetail(code) {
                let res = await this.$api.getShareMd(code);
                if (res.code != 0 && res.code < 0) {
                    document.title = "链接已失效"
                    VditorPreview.preview(document.querySelector("#detail"), "链接已失效")
                } else {
                    document.title = res.title;
                    this.title = res.title
                    VditorPreview.preview(document.querySelector("#detail"), res.content)
                }


            }
        }
    };
</script>