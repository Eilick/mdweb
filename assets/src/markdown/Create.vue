<template>
    <el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="12" :offset="4">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
             <el-col :span="3" :offset="1">
                <el-select v-model="classify" filterable allow-create default-first-option placeholder="请选择文章分类"
                    >
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
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
                classify: "",
                options: [],
                addClassify : "",
            };
        },
        mounted() {
            this.getClassify();
            if(this.$route.query.from_id > 0) {
                this.cloneArticle(this.$route.query.from_id)
            } else {
                this.title = moment().format("YYYY-MM-DD") + "记录"
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
                    "md"
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
                if (this.$route.query.classify == undefined || this.$route.query.from_id == undefined) {
                    if(this.classify == "" && this.options.length > 0  ) {
                        this.classify = this.options[0]
                    }
                }
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