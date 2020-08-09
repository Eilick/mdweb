<template>
    <el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="12" :offset="6">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>

        </el-row>
        <el-row style="margin-bottom: 20px;">
            <el-radio-group v-model="classify" size="small">
                <template v-for="item in options">
                    <el-radio :label="item"></el-radio>
                </template>
            </el-radio-group>
            <el-popover placement="right-end" width="250" v-model="visible">
                <el-row :gutter="10">
                    <el-col :span="17">
                        <el-input v-model="title" placeholder="请输入分类" size="mini"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button @click="createArticle" type="primary" size="mini">确认</el-button>
                    </el-col>
                </el-row>
                <el-button slot="reference" icon="el-icon-plus" size="mini" style="margin-left: 40px;" type="info">添加分类
                </el-button>
            </el-popover>

        </el-row>
        <div id="vditor"></div>


        <el-row style="margin-top:20px;">
            <el-col align="center">
                <el-button @click="createArticle" type="primary">
                    创建
                </el-button>
            </el-col>

        </el-row>
    </el-row>
</template>

<script>
    import moment from "moment";
    import Vditor from 'vditor'
    import "vditor/src/assets/scss/index.scss"
    export default {
        props: ["articleId"],
        data() {
            return {
                mdtext: "",
                title: "",
                classify: "普通",
                options: [],
                contentEditor: null,
            };
        },
        mounted() {
            this.getClassify();
            var that = this
            this.contentEditor = new Vditor('vditor', {
                toolbarConfig: {
                    pin: true,
                },
                cache: {
                    enable: false,
                },
                after: () => {
                    this.contentEditor.setValue('hello, Vditor + Vue!')
                },
                upload: {
                    fieldName: "file",
                    url: "http://127.0.0.1:8888/markdown/upload_image",//文件上传路径 
                    success: function (textarea, msg) {//textarea 
                        //将返回的信息传为json对象 
                        console.log(msg, textarea)
                        msg = JSON.parse(msg)
                        if (msg.code === 0) {//请求成功 
                            console.log(that.contentEditor)
                            that.contentEditor.tip("SUccess", 100)
                            let content = '![' + msg.file + '](http://127.0.0.1:8888/image/' + msg.file + ')'
                            //插入上传文件后的markdown代码 
                            that.contentEditor.insertValue(content, true)

                        } else {//请求失败 
                            this.$message("上传失败")
                        }
                    }
                },
            })
        },
        methods: {
            setClassify(c) {
                this.classify = c;
            },
            setMdText(t) {
                this.mdtext = t;
                localStorage.setItem("mdtext", this.mdtext);
            },
            cloneArticle(id, classify) {
                if (id > 0) {
                    this.getArticleDetail(id);
                } else {
                    this.classify = classify;
                    this.title = moment().format("YYYY-MM-DD HH:mm");
                    if (localStorage.getItem("mdtext") != null) {
                        this.mdtext = localStorage.getItem("mdtext");
                    }
                }
            },
            async getArticleDetail(id, single) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                this.classify = res.classify;
            },
            async createArticle() {
                if (this.title == "") {
                    this.$message("请赐个文章标题呀");
                    return;
                }
                let res = await this.$api.createMd(
                    this.title,
                    this.contentEditor.getValue(),
                    this.classify,

                );
                if (res.code == 0) {
                    localStorage.setItem("mdtext", "");
                    this.$message("创建成功");
                    this.$router.push("/markdown/list?classify=" + this.classify)
                } else {
                    this.$message(res.message);
                }
            },
            async getClassify() {
                let res = await this.$api.getClassify();
                this.options = res;
            }
        }
    };
</script>