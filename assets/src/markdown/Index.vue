<template>
    <el-row id="app">
        <el-container>
            <el-container>
                <el-aside width="230px" v-if="!print">
                    <slidemenu ref="Slide"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;padding-left: 20px;overflow: scroll;">
                    <router-view @talk2SlieMenu="talk2SlieMenu"/>
                </el-main>
            </el-container>
        </el-container>
        <!-- <el-row style="bottom:40px;position:fixed; right:30px;z-index:20000">
            <el-button  size="largr"  type="primary" round @click="jumpTo('/markdown/create')">
                <i class="el-icon-plus"></i>新建
            </el-button>
        </el-row> -->
    </el-row>
</template>
<script>
import slideMenu from "@/components/MdSlideMenu";

import moment from "moment";

export default {
    name: "Md",
    data() {
        return {
            print : false,
        }
    },
    components: {
        slidemenu: slideMenu
    },
    mounted() {
        
        if(this.$route.query.print == 1) {
            this.print = true
            window.print()
        } else {
            this.updadteMdList();
        }
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
            } else if(action == "create") {
                this.updadteMdList()
            }
        }

    }
};
</script>


