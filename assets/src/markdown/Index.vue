<template>
    <el-row id="app">
        <el-container>
            <el-header>
                <myheader />
            </el-header>
            <el-container>
                <el-aside :width="showSlideMenu ? open : close">
                    <slidemenu ref="Slide"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
        <el-row style="bottom:40px;position:fixed; right:30px;">
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
        setSelectSql(t) {
            let sql = `select * from ${t} limit 10;`;
            this.$refs.SearchBox.setSelectSql(sql);
        },
        jumpTo(p) {
            this.$router.push(p);
        },
        updadteMdList() {
            this.$refs.Slide.getMdList()
        }

    }
};
</script>


