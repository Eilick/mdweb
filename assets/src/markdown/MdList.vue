<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <el-tabs :tab-position="'top'" v-model="classify" @tab-click="handleTabClick">
                <template v-for="c in classifyList">
                    <el-tab-pane :label="c" :name="c" :key="c"></el-tab-pane>
                </template>
                <el-tab-pane name="trash">
                    <span slot="label">
                        <i class="el-icon-delete"></i>已删除文档
                    </span>
                </el-tab-pane>

                <el-timeline>
                    <template v-for="(item, i) in mdList">
                        <el-timeline-item
                            :timestamp="item.create_at.substring(6,16)"
                            placement="top"
                            :key="i"
                        >
                            <el-card>
                                <el-row style="padding-top:5px">
                                    <el-col :span="16">
                                        <span
                                            @click="displayArticle(item)"
                                            style="cursor:pointer;font-size:16px;font-weight:bold;text-decoration: none;color:#CC9966;display:inline-block;"
                                        >{{item.title || "无"}}</span>
                                        <el-tag
                                            type="info"
                                            effect="dark"
                                            size="mini"
                                            style="margin-left:10px"
                                        >{{ item.classify }}</el-tag>
                                    </el-col>
                                    <el-col :span="8" align="right">
                                        <el-button
                                            type="text"
                                            size="medium"
                                            icon="el-icon-s-unfold"
                                            @click="toMoveMd(item.id, item.classify)"
                                            v-if="classify != 'trash'"
                                        >分类</el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-copy-document"
                                            @click="cloneMd(item.id)"
                                        >复制</el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-s-promotion"
                                            @click="savePdf(item.id)"
                                        >pdf</el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-edit"
                                            @click="jumpEdit(item.id)"
                                            v-if="classify != 'trash'"
                                        >修改</el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-edit"
                                            @click="jumpEdit(item.id)"
                                            v-if="classify == 'trash'"
                                        >恢复</el-button>
                                        <el-button
                                            type="text"
                                            icon="el-icon-delete"
                                            @click="deleteArticle(item)"
                                        >删除</el-button>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-timeline-item>
                    </template>
                </el-timeline>
            </el-tabs>
        </el-col>

        <el-col :span="2" :offset="1" style="padding-top:40px" :style="createBtnStyle">
            <el-button size="medium" type="primary" @click="toJumpCreate">新建</el-button>
        </el-col>

        <el-dialog title="移动到" :visible.sync="showMove" width="30%">
            <el-select
                v-model="classifyVal"
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章分类"
                size="small"
            >
                <el-option v-for="item in classifyList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button size="mini" type="info" style="margin-left:10px" @click="moveMd">确认</el-button>
        </el-dialog>

        <el-dialog
            :visible.sync="showArticle"
            width="60%"
            top="5vh"
            ref="articleDetail"
            @close="handleClose"
        >
            <Detail ref="Detail" @reloadList="reloadList" />
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
            createBtnStyle: {},

            title: "",
            showArticle: false
        };
    },
    components: {
        Detail
    },
    mounted() {
        document.title = "文档列表";
        this.getClassify();
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("storage", () => {
            this.getMdList()
        }, false)

        if(this.$route.query.classify != undefined) {
            this.classify = this.$route.query.classify
            this.handleTabClick();
        }
    },
    methods: {
        handleTabClick() {
            if (this.classify == "trash") {
                this.getTrashMdList();
            } else {
                this.getMdList();
            }
            this.$router.push({path : '/',query: {
                classify : this.classify,
            }})
        },
        async getTrashMdList() {
            let res = await this.$api.getMdList("trash");
            this.mdList = res;
        },
        async getMdList() {
            let res = await this.$api.getMdList("", this.classify);
            this.mdList = res;
        },
        async getClassify() {
            let res = await this.$api.getClassify();
            this.classifyList = res;
            if (this.classify == "" && this.classifyList.length > 0) {
                this.classify = this.classifyList[0];
                this.this.handleTabClick();
            }
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
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            this.createBtnStyle = {
                transform: "translateY(" + scrollTop + "px)"
            };
        },
        handleClose() {
            this.$refs.articleDetail.$el.scrollTop = 0;
        },
        displayArticle(article) {
            this.showArticle = true;
            setTimeout(() => {
                this.$refs.Detail.initArticle(article.id);
            }, 10);
        },
        reloadList() {
            this.showArticle = false;
            this.handleTabClick();
        },
        toJumpCreate() {
            let url = "/#/markdown/create";
            if (this.classify != "trash") {
                url = url + "?classify=" + this.classify;
            }
            window.open(url, "_blank");
        },
        cloneMd(id, c) {
            let routeData = this.$router.resolve(
                "/markdown/create?from_id=" + id + "&classify=" + this.classify
            );
            window.open(routeData.href, "_blank");
        },
        savePdf(id) {
            window.open("/#/markdown/detail/" + id + "?print=1", "_blank");
        },
        jumpEdit(id) {
            let routeData = this.$router.resolve("/markdown/edit/" + id);
            window.open(routeData.href, "_blank");
        },
        deleteArticle(article) {
            console.log(article)
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
                this.handleTabClick();
            }
        }
    }
};
</script>