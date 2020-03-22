<template>
    <el-row id="app">
        <el-container>
            <el-container>
                <el-aside width="230px" v-if="!print">
                    <slidemenu ref="Slide"></slidemenu>
                </el-aside>
                <el-main style="margin-bottom: 200px;">
                    <router-view @talk2SlieMenu="talk2SlieMenu"/>
                </el-main>
            </el-container>
        </el-container>
        <el-row style="top:20px;position:fixed; right:30px;z-index:20000">
            <el-button  size="mini"  type="primary" round @click="jumpTo('/markdown/create')">
               新建
            </el-button>
            <el-button  size="mini"  type="primary" round @click="jumpTo('/markdown/images')">
                上传图片
            </el-button>
            <el-button  size="mini"  type="danger" round @click="jumpTo('/markdown/trash_list')">
                回收站
            </el-button>
        </el-row>
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


