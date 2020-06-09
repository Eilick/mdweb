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
                                <!-- <router-link
                                    target="_blank"
                                    :to="{path:'/markdown/detail/' + item.id}"
                                    style="cursor:pointer;font-size:17px;font-weight:bold;text-decoration: none;color:#CC9966"
                                >{{item.title || "无"}}</router-link> -->
                                <span @click="displayArticle(item)">{{item.title || "无"}}</span>
                                <el-tag
                                    type="info"
                                    effect="dark"
                                    size="mini"
                                    style="margin-left:10px"
                                >{{ item.classify }}</el-tag>
                                <el-button
                                    style="float: right; padding: 3px 0"
                                    type="text"
                                    icon="el-icon-s-unfold"
                                    @click="toMoveMd(item.id, item.classify)"
                                    v-if="classify != 'trash'"
                                ></el-button>
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

        <el-dialog :visible.sync="showArticle" width="60%" top="5vh">
           <Detail ref="Detail" />
        </el-dialog>
    </el-row>
</template>

<script>
import lodash from "lodash";
import Detail from "./Detail2"
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

            title : "",
            showArticle : false
        };
    },
    components : {
        Detail
    },
    mounted() {
        document.title = "文档列表";
        this.getClassify();
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleTabClick() {
            if (this.classify == "trash") {
                this.getTrashMdList();
            } else {
                this.getMdList();
            }
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
            if (this.classify == "0" && this.classifyList.length > 0) {
                this.classify = this.classifyList[0];
                this.getMdList();
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
        displayArticle(article) {
            this.showArticle = true
            setTimeout(() => {
                this.$refs.Detail.initArticle(article.id)
            }, 10)
            
        },
        toJumpCreate() {
            let url = "/#/markdown/create";
            if (this.classify != "trash") {
                url = url + "?classify=" + this.classify;
            }
            window.open(url, "_blank");
        }
    }
};
</script>