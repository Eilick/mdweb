<template>
    <el-row style="margin-top:20px;">
        <el-col :span="20" :offset="2">
            <el-row><strong>{{classify}}</strong></el-row>
            <el-table :data="mdList" stripe size="medium" style="width:100%;">
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <svg t="1597557946874" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2538" width="40" height="40"
                            v-if="scope.row.content_type == 'md'" style="padding-top: 10px;">
                            <path
                                d="M895.318 192H128.682C93.008 192 64 220.968 64 256.616v510.698C64 802.986 93.008 832 128.682 832h766.636C930.992 832 960 802.986 960 767.312V256.616C960 220.968 930.992 192 895.318 192zM568.046 704H455.95V512l-84.08 107.756L287.826 512v192H175.738V320h112.088l84.044 135.96L455.95 320h112.096v384z m167.314 0L596.09 512h84V320h112.086v192h84.054L735.324 704h0.036z"
                                p-id="2539"></path>
                        </svg>
                        <svg t="1597558139651" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3967" width="30" height="30"
                            v-if="scope.row.content_type == 'url'" style="padding-top: 10px;">
                            <path
                                d="M1010.036364 288.581818L735.418182 13.963636c-13.963636-13.963636-37.236364-13.963636-51.2 0l-279.272727 274.618182c-13.963636 13.963636-13.963636 37.236364 0 51.2l111.70909 111.709091-69.818181 69.818182-111.709091-111.709091c-13.963636-13.963636-37.236364-13.963636-51.2 0L9.309091 684.218182c-13.963636 13.963636-13.963636 37.236364 0 51.2l274.618182 274.618182c4.654545 9.309091 13.963636 13.963636 23.272727 13.963636s18.618182-4.654545 23.272727-9.309091l274.618182-274.618182c4.654545-4.654545 9.309091-13.963636 9.309091-23.272727s-4.654545-18.618182-9.309091-23.272727l-111.709091-111.709091 69.818182-69.818182 111.709091 111.709091c4.654545 4.654545 13.963636 9.309091 23.272727 9.309091s18.618182-4.654545 23.272727-9.309091l274.618182-274.618182c4.654545-4.654545 9.309091-13.963636 9.309091-23.272727 13.963636-23.272727 9.309091-32.581818 4.654546-37.236364z m-474.763637 423.563637l-228.072727 228.072727-228.072727-228.072727 228.072727-228.072728 88.436364 88.436364-111.709091 111.709091 51.2 51.2 111.709091-111.709091 88.436363 88.436364z m172.218182-172.218182l-88.436364-88.436364 111.709091-111.709091-51.2-51.2-111.709091 111.709091-88.436363-88.436364 228.072727-228.072727 228.072727 228.072727-228.072727 228.072728z"
                                p-id="3968"></path>
                        </svg>
                    </template>
                </el-table-column>
                <el-table-column prop="title" width="180">
                    <template slot-scope="scope">
                        <span @click="showSingle(scope.row)" class="title"
                            :class="'title-' + scope.row.content_type">{{scope.row.title || "无"}}</span>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="edit(scope.row.id)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-s-unfold"
                            @click="toMoveMd(scope.row.id, scope.row.classify)">分类</el-button>
                        <el-button type="text" icon="el-icon-copy-document" @click="cloneArticle(scope.row.id)">复制
                        </el-button>
                        <el-button type="text" icon="el-icon-s-promotion" @click="share(scope.row.id)">分享
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <el-dialog title="移动到" :visible.sync="showMove" width="40%">
            <el-select v-model="classifyVal" filterable allow-create default-first-option placeholder="请选择文章分类"
                size="small">
                <el-option v-for="item in classifyList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
            <el-button size="mini" type="info" style="margin-left:20px" @click="moveMd">确认</el-button>
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
                if (item.content_type == "md") {
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
                if (res.code == 0) {
                    window.open("/share?code=" + res.token)
                }
            },
            edit(id) {
                this.$router.push("/markdown/edit/" + id)
            },
            cloneArticle(id) {
                this.$router.push({
                    path: "/markdown/create",
                    query: {
                        from_id: id,
                        classify: this.classify,
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
                this.classifyList = res
            },
        }
    };
</script>
<style scoped>
    .title {
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
    }

    .title:hover {
        color: rebeccapurple;
    }

    .title-md {
        color: #666666;
    }

    .title-url {
        color: #718af5;
    }
</style>