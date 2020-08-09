<template>
    <el-row id="app">
        <el-container>
            <el-header :height="headerHeight">
                <myheader></myheader>
            </el-header>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu :list="classifyList"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive" />
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive" />
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

    import moment from "moment";

    export default {
        name: "index",
        data() {
            return {
                close: "64px",
                open: "200px",
                headerHeight: "60px",
                showSlideMenu: true,
                classifyList: []
            };
        },
        components: {
            myheader: myheader,
            slidemenu: slideMenu
        },
        methods: {

            expand(flag) {
                this.$set(this, "showSlideMenu", flag);
            }, 
            async getClassify() {
                let res = await this.$api.getClassify();
                this.classifyList = res;
                if (
                    this.classifyList.indexOf(this.classify) < 0 &&
                    this.classifyList.length > 0 &&
                    this.classify != "trash"
                ) {
                    this.classify = this.classifyList[0];
                    this.handleTabClick();
                }
            },
            async getList() {
                
            }
        },

        mounted() {
           this.getClassify()
        }
    };
</script>