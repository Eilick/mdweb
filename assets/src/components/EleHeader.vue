<template>
    <el-menu :default-active="contentType" mode="horizontal" background-color="#485065" text-color="#fff"
        active-text-color="#4c9fff"
        style="position:fixed;width:100%;left:0;z-index:10;text-align:right;float:right;border-bottom:0px;padding-left: 5%;padding-right: 5%;"
        ref="menubar">

        <el-menu-item>
            <img src="../assets/image/logo.jpg" style="width:40px;padding-top:10px"/>
        </el-menu-item>
        <el-menu-item @click="jump('create')">新建</el-menu-item>

    </el-menu>
</template>

<script>
    export default {
        name: "myheader",        
        methods: {
            jump(type) {
                if (type == "create") {
                   this.$router.push("/markdown/create")
                }
            },
        }
    };
</script>