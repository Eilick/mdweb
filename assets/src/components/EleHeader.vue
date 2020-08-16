<template>
    <el-row>
        <el-menu mode="horizontal" background-color="#333333" text-color="#fff" active-text-color="#4c9fff"
            style="position:fixed;width:100%;left:0;z-index:10;text-align:right;float:right;border-bottom:0px;padding-left: 15%;padding-right: 15%;"
            ref="menubar">

            <!--<el-menu-item>
            <img src="../assets/image/logo.jpg" style="width:40px;padding-top:10px"/>
        </el-menu-item> -->
            <el-menu-item @click="jump('create')"><i class="el-icon-edit"></i>新建MD</el-menu-item>
            <el-menu-item @click="showCreateDialog()">新建URL</el-menu-item>


        </el-menu>
        <el-dialog title="创建链接" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <CreateUrl ref="CreateUrl" @update="hideCreateDialog" />
        </el-dialog>
    </el-row>
</template>

<script>
    import CreateUrl from "../markdown/CreateUrl"
    export default {
        name: "myheader",
        data() {
            return {
                dialogVisible : false
            }
        },
        components : {
            CreateUrl,
        },
        methods: {
            jump(type) {
                if (type == "create") {
                    this.$router.push({ path: "/markdown/create", query: this.$route.query })
                }
            },
            showCreateDialog() {
                this.dialogVisible = true
                if(this.dialogVisible ) {
                    setTimeout(() => {
                        this.$refs.CreateUrl.getClassify()
                    })
                }
            },
            hideCreateDialog() {
                this.dialogVisible = false
            },
        }
    };
</script>