<template>
    <el-row>
        <el-row v-for="(list, k) in groupList">
            <el-divider :content-position="'left'"><strong style="font-size: 18px">{{k}}</strong></el-divider>
            <template v-for="(item, inx) in groupList[k]">
                <el-col :span="6" style="margin-bottom: 20px">
                     <el-avatar :size="40" shape="square" style="background: #718af5" @click="showEdit">
                        <b style="font-size: 20px;">{{item.title.substring(0,1).toUpperCase()}}</b>
                     </el-avatar>
                     <span style="vertical-align: top;display: inline-block;height: 40px;margin-left: 10px;padding-top: 10px">
                        <el-link :underline="true" :href="item.content" target="_blank" style="font-size: 15px;" > {{item.title}}</el-link>
                     </span>
                    
                </el-col>
            </template>
        </el-row>
    </el-row>
</template>

<script>
    import lodash from "lodash";
    export default {
        data() {
            return {
                mdList: [],
                groupList : {},
            };
        },
        methods: {
            async getUrlList() {
                this.groupList = {}
                let res = await this.$api.getUrlList("");
                this.mdList = res;
                this.$emit("updateSlieMenu")
                this.mdList.forEach(element => {
                    if(this.groupList[element.classify] == undefined) {
                        this.groupList[element.classify] = []
                    }
                    this.groupList[element.classify].push(element)
                });
                this.$forceUpdate()
            },
            showEdit(item) {
                alert(888)
            }
        }
    };
</script>