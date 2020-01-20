<template>
    <el-row id="app">
        <el-container>
            <el-header>
                <myheader />
            </el-header>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu @setSelectSql="setSelectSql"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
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
            open: "300px",
            headerHeight: "60px",
            showSlideMenu: true
        };
    },
    components: {
        myheader: myheader,
        slidemenu: slideMenu
    },
    methods: {
        setSelectSql(t) {
            let sql = `select * from ${t} limit 10;`;
            this.$refs.SearchBox.setSelectSql(sql);
        }
    }
};
</script>


