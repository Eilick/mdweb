<template>
    <el-row>
        <el-menu mode="horizontal" background-color="#333333" text-color="#fff" active-text-color="#4c9fff"
            class="fix-menu">
            <el-menu-item @click="showBookmark()">书签</el-menu-item>
            <el-menu-item @click="jump('create')" style="margin-left: 50%;"><i class="el-icon-edit"></i>新建markdown</el-menu-item>
            <el-menu-item @click="showCreateDialog()">新增书签</el-menu-item>
        </el-menu>

        <el-dialog title="新增书签" :visible.sync="dialogVisible" width="60%">
            <CreateUrl ref="CreateUrl" @update="hideCreateDialog" />
        </el-dialog>
        <el-dialog title="书签" :visible.sync="showLink" width="65%" id="bookmark">
            <UrlList ref="UrlList" />
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
            }
        },
        components: {
            CreateUrl, UrlList
        },
        methods: {
            jump(type) {
                if (type == "create") {
                    this.$router.push({ path: "/markdown/create", query: this.$route.query })
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
            }
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