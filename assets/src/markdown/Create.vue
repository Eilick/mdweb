<template>
    <el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="12" :offset="6">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>

        </el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col align="center">
                <el-radio-group v-model="classify" size="small">
                    <template v-for="item in options">
                        <el-radio :label="item"></el-radio>
                    </template>
                </el-radio-group>
                <el-popover placement="right-end" width="250" v-model="visible">
                    <el-row :gutter="10">
                        <el-col :span="17">
                            <el-input v-model="addClassify" placeholder="请输入分类" size="mini"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button @click="createClassify" type="primary" size="mini">确认</el-button>
                        </el-col>
                    </el-row>
                    <el-button slot="reference" icon="el-icon-plus" size="mini" style="margin-left: 40px;" type="info">
                        添加分类
                    </el-button>
                </el-popover>
            </el-col>
        </el-row>
        <markdown ref="MD" @inputValue="setMdText"></markdown>


        <el-row style="margin-top:20px;">
            <el-col align="center">
                <el-button @click="createArticle" type="primary" size="small">
                    创建
                </el-button>
            </el-col>

        </el-row>
    </el-row>
</template>

<script>
    import moment from "moment";
    export default {
        props: ["articleId"],
        data() {
            return {
                mdtext: "",
                visible : false,
                title: "",
                classify: "普通",
                options: [],
                addClassify : "",
            };
        },
        mounted() {
            this.getClassify();
            if(this.$route.query.from_id > 0) {
                this.cloneArticle(this.$route.query.from_id)
            }
            if(this.$route.query.classify != undefined) {
                this.classify = this.$route.query.classify
            }
        },
        methods: {
            setClassify(c) {
                this.classify = c;
            },
            setMdText(t) {
                this.mdtext = t;
                localStorage.setItem("mdtext", this.mdtext);
            },
            async cloneArticle(id) {
                let res = await this.$api.getMdDetail(id);
                this.mdtext = res.content;
                this.title = res.title;
                this.classify = res.classify;
                this.$refs.MD.setValue(this.mdtext)
            },
            async createArticle() {
                if (this.title == "") {
                    this.$message("请赐个文章标题呀");
                    return;
                }
                let res = await this.$api.createMd(
                    this.title,
                    this.mdtext,
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
            },
            createClassify() {
                this.options.push(this.addClassify)
                this.classify = this.addClassify
                this.addClassify = ""
                this.visible = false
            }
        }
    };
</script>