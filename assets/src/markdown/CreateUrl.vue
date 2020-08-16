<template>
    <el-row>
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
                    <el-button slot="reference" size="small" style="margin-left: 40px;" type="text">
                        添加分类
                    </el-button>
                </el-popover>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="16" :offset="4">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
            <el-col :span="16" :offset="4">
                <el-input v-model="mdtext" placeholder="请输入URL" type="textarea" rows="6"></el-input>
            </el-col>
        </el-row>



        <el-row style="margin-top:20px;">
            <el-col align="center">
                <el-button @click="createUrl" type="primary" size="small">
                    创建
                </el-button>
            </el-col>

        </el-row>
    </el-row>
</template>

<script>
    import moment from "moment";
    export default {
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
           // this.getClassify();
        },
        methods: {
            setClassify(c) {
                //this.classify = c
                this.getClassify()
            },
            async createUrl() {
                if (this.title == "") {
                    this.$message("请赐个链接标题呀");
                    return;
                }
                let res = await this.$api.createMd(
                    this.title,
                    this.mdtext,
                    this.classify,
                    "url"
                );
                if (res.code == 0) {
                    this.$message("创建成功");
                    this.$emit("update")
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