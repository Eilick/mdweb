<template>
    <el-row id="app">
        <el-container>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu ref="Slide"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <router-view @talk2SlieMenu="talk2SlieMenu"/>
                </el-main>
            </el-container>
        </el-container>
        <el-row style="bottom:40px;position:fixed; right:30px;z-index:20000">
            <el-button  size="largr"  type="primary" round @click="jumpTo('/markdown/create')">
                <i class="el-icon-plus"></i>新建
            </el-button>
        </el-row>
    </el-row>
</template>
<script>
//components
import myheader from "@/components/EleHeader";
import slideMenu from "@/components/MdSlideMenu";

import moment from "moment";

export default {
    name: "Md",
    data() {
        return {
            close: "64px",
            open: "250px",
            headerHeight: "60px",
            showSlideMenu: true
        };
    },
    components: {
        myheader: myheader,
        slidemenu: slideMenu
    },
    mounted() {
        this.updadteMdList();
    },
    methods: {
        jumpTo(p) {
            this.$router.push(p);
        },
        updadteMdList() {
            this.$refs.Slide.getMdList()
        },
        talk2SlieMenu(action, obj) {
            if(action == "delete") {
                this.$refs.Slide.afterDelete(obj)
            }
        }

    }
};
</script>


