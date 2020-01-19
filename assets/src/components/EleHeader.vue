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
        <el-menu-item index="index" style="float:right" @click="jump('index')">首页</el-menu-item>
    </el-menu>
</template>

<script>
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
           
        },
        showMyAccess() {
            this.$emit("showMyAccess");
        }
    }
};
</script>
