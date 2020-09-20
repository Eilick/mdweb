<template>
    <el-row style="margin-top:20px;">

        <el-row style="margin-top:5vh;">
            <el-col :span="12" :offset="3">
                <el-input v-model="keyword" @keyup.enter.native="getMdList" placeholder="请输入关键字查找"></el-input>
            </el-col>
             <el-col :span="4" :offset="1">
                <el-button type="primary" @click="getMdList">搜索</el-button>
             </el-col>

        </el-row>
        <el-row style="margin-top:5vh;" v-if="searched">
            <el-col :span="18" :offset="3">
                没有想要的搜索结果，去 <el-button type="primary" size="small" @click="baidu">百度一下，马上知道</el-button>，去搜<el-button type="warning" size="small" @click="wiki">http://wiki.lianjia.com</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:1px;" v-if="mdList.length > 0">
            <el-col :span="18" :offset="3">
                <el-table :data="mdList" stripe size="medium" style="width:100%;" >
                    <el-table-column width="100">
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
                    <el-table-column prop="title">
                        <template slot-scope="scope">
                            <span @click="showSingle(scope.row)" class="title"
                                :class="'title-' + scope.row.content_type">{{scope.row.title || "无"}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="edit(scope.row.id)">编辑
                        </el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        
    </el-row>
</template>

<script>
    import lodash from "lodash";
    export default {
        data() {
            return {
                keyword : "",
                mdList: [],
                searched : false,

            };
        },

        methods: {
            async getMdList() {
                let res = await this.$api.searchMdList(this.keyword);
                this.searched = true
                this.mdList = res;
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
            baidu() {
                window.open("https://www.baidu.com/s?wd=" + this.keyword)
            },
            wiki() {
                window.open("http://wiki.lianjia.com/dosearchsite.action?cql=siteSearch+~+\"" + this.keyword + "\"&queryString=" + this.keyword)
            }, 
            edit(id) {
                this.$router.push("/markdown/edit/" + id)
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
