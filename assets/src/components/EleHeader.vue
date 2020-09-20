<template>
    <el-row>
        <el-menu mode="horizontal" background-color="#333333" text-color="#fff" active-text-color="#4c9fff"
            class="fix-menu">
            <el-menu-item @click="showBookmark()">书签</el-menu-item>

            <el-menu-item @click="jump('search')" style="margin-left: 40%;"><i class="el-icon-search"></i></el-menu-item>
            <el-menu-item @click="jump('create')">新建markdown</el-menu-item>
            <el-menu-item @click="showCreateDialog()">新增书签</el-menu-item>
            <el-menu-item @click="exit()">退出</el-menu-item>
        </el-menu>

        <el-dialog title="新增书签" :visible.sync="dialogVisible" width="60%" :close-on-click-modal="false">
            <CreateUrl ref="CreateUrl" @update="hideCreateDialog" />
        </el-dialog>
        <el-dialog  :visible.sync="showLink" width="70%" id="bookmark" :fullscreen="true" :close-on-click-modal="false">
            <el-row style="padding: 20px 100px">
                <UrlList ref="UrlList" />
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    import CreateUrl from "../markdown/CreateUrl"
    import UrlList from "../markdown/UrlList"
    export default {
        name: "myheader",
        data() {
            return {
                dialogVisible: false,
                showLink: false,
                drawerHeight : "600px",
            }
        },
        components: {
            CreateUrl, UrlList
        },
        mounted() {
            this.drawerHeight = (document.documentElement.clientHeight - 150) + 'px'
        },
        methods: {
            jump(type) {
                if (type == "create") {
                    this.$router.push({ path: "/markdown/create", query: this.$route.query })
                }
                if (type == "search") {
                    this.$router.push({ path: "/markdown/search"})
                }
            },
            showCreateDialog() {
                this.dialogVisible = true
                setTimeout(() => {
                    this.$refs.CreateUrl.setClassify(this.$route.query.classify)
                })
            },
            hideCreateDialog() {
                this.dialogVisible = false
                this.$emit("updateSlieMenu")
            },
            showBookmark() {
                this.showLink = true
                setTimeout(() => {
                    this.$refs.UrlList.getUrlList()
                })
            },
            exit() {
                localStorage.setItem("token" , "")
                window.location.reload()
            },
        }
    };
</script>
<style scoped>
    .fix-menu {
        position:fixed;
        width:100%;
        left:0;
        z-index:10;
        text-align:right;
        float:right;
        border-bottom:0px;
        padding-left: 15%;
        padding-right: 15%;
    }
</style>