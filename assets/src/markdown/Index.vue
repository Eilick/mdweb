<template>
    <el-row id="app">
        <el-container>
            <el-header :height="headerHeight">
                <myheader  @updateSlieMenu="getClassify"></myheader>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <slidemenu  ref="SlideMenu"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" @updateSlieMenu="getClassify"/>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"  @updateSlieMenu="getClassify" />
                </el-main>
            </el-container>
        </el-container>
    </el-row>
</template>
<script>
    //components
    import myheader from "@/components/EleHeader";
    import slideMenu from "@/components/SlideMenu";

    import "@/assets/css/index.css";
    export default {
        name: "index",
        data() {
            return {
                headerHeight: "60px",
            };
        },
        components: {
            myheader: myheader,
            slidemenu: slideMenu
        },
        methods: {
            async getClassify() {
                let res = await this.$api.getClassify("md");
                this.$refs.SlideMenu.setMenu(res)
            },
        },

        mounted() {
            this.getClassify()
        }
    };
</script>