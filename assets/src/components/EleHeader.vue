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
    const LinkConf = {
        "create-dev": "/#/markdown/create",
        "create-online": "/#/",
    };
    export default {
        name: "myheader",
        props: ["userName", "contentType", "userType"],
        
        computed: {
            env: function () {
                if (
                    window.location.host.indexOf("localhost") > -1 ||
                    window.location.host.indexOf("127.0.0.1") > -1 ||  window.location.host.indexOf(":8080")  > -1
                ) {
                    return "dev";
                }
                return "online";
            }
        },
        methods: {
            jump(type) {
                if (type == "create") {
                    window.location.href = LinkConf[type + "-" + this.env];
                    return;
                }
                if (type == "wiki") {
                    window.open("http://docs.realsee.tech/")
                    return false
                } else if (type == "logout") {
                    window.location.href =
                        "/user/logout";
                }
            },
        }
    };
</script>