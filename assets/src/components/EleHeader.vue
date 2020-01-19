<template>
    <el-menu
        :default-active="contentType"
        mode="horizontal"
        background-color="#323f49"
        text-color="#fff"
        active-text-color="#e6a23c"
        style="position:fixed;width:100%;left:0;z-index:10;text-align:right;float:right;border-bottom:0px"
        ref="menubar"
        :style="{'padding-left':(contentType == 'index'?'15%':''),'padding-right':(contentType == 'index'?'15%':'')}"
    >
        <el-menu-item style="padding:0px">
            <span @click="jump('exp')">
                <img
                    alt="Faraday"
                    src="../assets/image/faraday-logo-exp.png"
                    height="40"
                    width="160"
                    v-show="contentType == 'exp'"
                />
            </span>
            <span @click="jump('insights')">
                <img
                    alt="Faraday"
                    src="../assets/image/faraday-logo-insights.png"
                    height="40"
                    width="160"
                    v-show="contentType == 'insights'"
                />
            </span>
            <span @click="jump('index')">
                <img
                    alt="Faraday"
                    src="../assets/image/faraday-logo.png"
                    height="40"
                    width="160"
                    v-show="contentType == 'index'"
                />
            </span>
        </el-menu-item>
        <el-submenu index="me" style="float:right">
            <template slot="title">
                <i class="el-icon-s-custom"></i>{{userName}}
            </template>
            <el-menu-item
                index="my_access"
                v-if="contentType=='exp' && userType <= 10"
                @click="showMyAccess"
            >我的权限</el-menu-item>
            <el-menu-item
                index="root"
                v-if="contentType=='exp' && userType == 10"
                @click="jump('root')"
            >超级管理员</el-menu-item>
             <el-menu-item
                index="admin"
                v-if="contentType=='insights' && userType == 10"
                @click="jump('admin')"
            >管理员中心</el-menu-item>
            <el-menu-item index="logout" @click="jump('logout')">退出</el-menu-item>
        </el-submenu>
        <el-menu-item index="test" style="float:right" @click="jump('test')">沙箱</el-menu-item>
        <el-menu-item index="wiki" style="float:right" @click="jump('wiki')">wiki</el-menu-item>
        <el-menu-item index="insights" style="float:right" @click="jump('insights')">精益洞察</el-menu-item>
        <el-menu-item index="exp" style="float:right" @click="jump('exp')">实验平台</el-menu-item>
        <!-- <el-menu-item index="qingl" style="float:right" @click="jump('qingl')">策略调控</el-menu-item> -->
        <el-menu-item index="index" style="float:right" @click="jump('index')">首页</el-menu-item>
    </el-menu>
</template>

<script>
const LinkConf = {
    "exp-dev": "/exp.html",
    "exp-online": "/experiment#/",
    "insights-dev": "/insights.html#/insights/index",
    "insights-online": "/insight#/insights/index",
    "qingl-dev": "/control.html#/service/list/system",
    "qingl-online": "/qingl#/service/list/system",
};
export default {
    name: "myheader",
    props: ["userName", "contentType", "userType"],
    data() {
        return {
            userAccessList: ""
        };
    },
    computed: {
        env: function() {
            if (
                window.location.host.indexOf("localhost") > -1 ||
                window.location.host.indexOf("127.0.0.1") > -1
            ) {
                return "dev";
            }
            return "online";
        }
    },
    mounted() {
        window.onresize = () => {
            this.$emit(
                "setHeaderHeight",
                this.$refs.menubar.$el.clientHeight + "px"
            );
        };
        this.$emit(
                "setHeaderHeight",
                this.$refs.menubar.$el.clientHeight + "px"
            );
    },
    methods: {
        jump(type) {
            if (type == "exp" || type == "insights" || type == "qingl") {
                window.location.href = LinkConf[type + "-" + this.env];
                return;
            }
            if (type == "index") {
                window.location.href = "/";
            } else if (type == "wiki") {
                window.open("http://faraday.biz.weibo.com/wiki", "_blank");
            } else if (type == "test") {
                window.open("http://10.13.2.98", "_blank");
            } else if (type == "root") {
                this.$router.push({ path: "/user/super_tool" });
            }else if (type == "admin") {
                this.$router.push({ path: "/insights/add_access" });
            } else if (type == "logout") {
                window.location.href =
                    "http://faraday.biz.weibo.com/go/user/logout";
            }
        },
        showMyAccess() {
            this.$emit("showMyAccess");
        }
    }
};
</script>
