<template>
    <el-row style="margin-top:20px;">
        <el-col :span="20" :offset="2">
            <template v-for="(item, i) in mdList" style="margin-bottom:10px;">
                <el-card :key="i"  style="margin-bottom:10px;">
                    <el-row>
                        <el-col :span="12" style="padding:10px">
                            <span @click="displayArticle(item)"
                                style="cursor:pointer;font-size:16px;font-weight:bold;text-decoration: none;color:#CC9966;line-height:20px">{{item.title || "无"}}</span>
                        </el-col>
                        <el-col :span="12" align="right">
                            <el-button type="text" icon="el-icon-s-unfold" @click="toMoveMd(item.id, item.classify)"
                                v-if="classify != 'trash'">分类</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="jumpEdit(item.id)"
                                v-if="classify != 'trash'">修改</el-button>

                            <el-button type="text" icon="el-icon-copy-document" @click="toJumpCreate(item.id)">复制
                            </el-button>
                            <el-button type="text" icon="el-icon-s-promotion" @click="savePdf(item.id)">pdf
                            </el-button>
                            <el-button type="text" icon="el-icon-edit" @click="recoverMd(item.id)"
                                v-if="classify == 'trash'">恢复</el-button>
                            <el-button type="text" icon="el-icon-delete" @click="deleteArticle(item)">删除</el-button>
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

        <el-dialog :visible.sync="showArticle" width="70%" top="5vh"
            custom-class="idialog">
            <Detail ref="Detail" />
        </el-dialog>
    </el-row>
</template>

<script>
    import lodash from "lodash";
    import Detail from "./Detail";
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

                title: "",
                showArticle: false,
                showCreate: false,
                showEdit: false
            };
        },
        components: {
            Detail,
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
            },
            toMoveMd(mdId, clas) {
                this.showMove = true;
                this.classifyVal = clas;
                this.moveId = mdId;
            },
            async moveMd() {
                let res = await this.$api.moveMd(this.moveId, this.classifyVal);
                if (res.code == 0) {
                    this.showMove = false;
                    this.getMdList();
                    this.getClassify();
                } else {
                    this.$message(res.message);
                }
            },
            displayArticle(article) {
                this.showArticle = true;
                setTimeout(() => {
                    this.$refs.Detail.initArticle(article.id);
                }, 10);
            },

            savePdf(id) {
                window.open("/#/markdown/detail/" + id + "?print=1", "_blank");
            },

            jumpEdit(id) {
                this.$router.push('/markdown/edit/' + id)
            },
            showSingle(id) {
                let routeData = this.$router.resolve("/markdown/detail/" + id);
                window.open(routeData.href, "_blank");
            },
            deleteArticle(article) {
                let msg = "确认将该文章放入回收站嘛";
                if (this.classify == "trash") {
                    msg = "确认彻底删除该文章?";
                }
                this.$confirm(msg, "删除提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.deleteMd(article.id);
                });
            },
            async deleteMd(id) {
                let res = await this.$api.deleteMd(id);
                if (res.code == 0) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                        duration: 1000
                    });
                    this.reloadPage();
                }
            },
            async recoverMd(id) {
                let res = await this.$api.recoverMd(id);
                if (res.code == 0) {
                    this.$message({
                        message: "恢复成功",
                        type: "success",
                        duration: 1000
                    });
                    this.reloadPage();
                }
            }
        }
    };
</script>