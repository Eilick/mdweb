<template>
    <el-row style="margin-top:20px;">
        <el-col :span="20" :offset="2">
            <strong>{{classify}}</strong>
            <el-divider></el-divider>
            <template v-for="(item, i) in mdList" style="margin-bottom:10px;">
                <el-card :key="i" :body-style="{padding : '5px'}" style="margin-bottom: 5px;">
                    <el-row :gutter="20">
                        <el-col :span="2" style="padding:10px" align="center">
                            <el-avatar shape="square" :size="40" :fit="'fill'" :icon="item.content_type == 'md' ? 'el-icon-document' : 'el-icon-link'"></el-avatar>
                        </el-col>
                        
                        <el-col :span="15" style="padding:20px">
                            <span @click="showSingle(item)" v-if="item.content_type == 'md'"
                                style="cursor:pointer;font-size:16px;font-weight:bold;text-decoration: none;color:#666666;line-height:20px">{{item.title || "无"}}</span>
                            <span @click="showSingle(item)" v-if="item.content_type == 'url'"
                                style="cursor:pointer;font-size:16px;font-weight:bold;text-decoration: none;color:#718af5;;line-height:20px">{{item.title || "无"}}</span>
                        </el-col>
                        <el-col :span="6" align="right"style="padding:10px">
                            <el-button type="text" icon="el-icon-s-unfold" @click="toMoveMd(item.id, item.classify)"
                                v-if="classify != 'trash'">分类</el-button>
                            <el-button type="text" icon="el-icon-copy-document" @click="cloneArticle(item.id)">复制
                            </el-button>
                            <el-button type="text" icon="el-icon-s-promotion" @click="share(item.id)">分享
                            </el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </template>
        </el-col>

        <el-dialog title="移动到" :visible.sync="showMove" width="30%">
            <el-select v-model="classifyVal" filterable allow-create default-first-option placeholder="请选择文章分类"
                size="small">
                <el-option v-for="item in classifyList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button size="mini" type="info" style="margin-left:10px" @click="moveMd">确认</el-button>
        </el-dialog>
    </el-row>
</template>

<script>
    import lodash from "lodash";
    export default {
        data() {
            return {
                list: [],
                mdList: [],
                classify: "",
                classifyList: [],
                showMove: false,
                classifyVal: "",
                moveId: "",

            };
        },
        mounted() {
            document.title = "文档列表";
            if (this.$route.query.classify != undefined) {
                this.classify = this.$route.query.classify
                this.getMdList()
            }
        },
        watch: {
            $route: function () {
                if (this.$route.query.classify != undefined) {
                    this.classify = this.$route.query.classify
                    this.getMdList()
                }
            }
        },
        methods: {
            async getMdList() {
                let res = await this.$api.getMdList("", this.classify);
                this.mdList = res;
                this.$emit("updateSlieMenu")
            },
            toMoveMd(mdId, clas) {

                this.showMove = true;
                this.classifyVal = clas;
                this.moveId = mdId;
                this.getClassify();
            },
            async moveMd() {
                let res = await this.$api.moveMd(this.moveId, this.classifyVal);
                if (res.code == 0) {
                    this.showMove = false;
                    this.getMdList();
                   
                } else {
                    this.$message(res.message);
                }
            },

            showSingle(item) {
                if(item.content_type == "md") {
                    this.$router.push("/markdown/detail/" + item.id);
                } else {
                    this.jumpUrl(item.id)
                }
            },
            async jumpUrl(id) {
                let res = await this.$api.getMdDetail(id);
                window.open(res.content)
            },
            async share(id) {
                let res = await this.$api.getShareUrl(id)
                if(res.code == 0) {
                    window.open("/share?code=" + res.token)
                }
            },
            cloneArticle(id) {
                this.$router.push({
                    path : "/markdown/create",
                    query : {
                        from_id : id,
                        classify : this.classify,
                    }
                });
            },

            async recoverMd(id) {
                let res = await this.$api.recoverMd(id);
                if (res.code == 0) {
                    this.$message({
                        message: "恢复成功",
                        type: "success",
                        duration: 1000
                    });
                    this.getMdList();
                }
            },
            async getClassify() {
                let res = await this.$api.getClassify();
                this.classifyList =res
            },
        }
    };
</script>
