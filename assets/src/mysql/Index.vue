<template>
    <el-row id="app">
        <el-container>
            <el-header>
                <myheader />
            </el-header>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu
                    ></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">sgsgg</el-main>
            </el-container>
        </el-container>
    </el-row>
</template>
<script>
//components
import myheader from "@/components/EleHeader";
import slideMenu from "@/components/SlideMenu";

import moment from "moment";

export default {
    name: "Exp",
    data() {
        return {
            close: "64px",
            open: "210px",
            headerHeight: "60px",
            showSlideMenu: true,
        };
    },
    components: {
        myheader: myheader,
        slidemenu: slideMenu
    },
    methods: {
    }
};
</script>


