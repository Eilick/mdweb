<template>
    <el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="18" :offset="3">
                <el-select v-model="classify" filterable allow-create default-first-option placeholder="请选择分类"
                    size="small" style="width: 100%;">
                    <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
            <el-col :span="18" :offset="3">
                <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-col>
        </el-row>

        <el-row style="margin-bottom: 20px;">
            <el-col :span="18" :offset="3">
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
                visible: false,
                title: "",
                classify: "",
                options: [],
                addClassify: "",
            };
        },
        mounted() {
            // this.getClassify();
        },
        methods: {
            setClassify(c) {
                if (c != undefined) {
                    this.classify = c
                }
                this.mdtext = ""
                this.title = ""
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
                    if (this.classify == "" && this.options.length > 0) {
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