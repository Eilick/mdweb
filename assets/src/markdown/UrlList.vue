<template>
    <el-row>
        <el-row v-for="(list, k) in groupList">
            <el-divider :content-position="'left'"><strong>{{k}}</strong></el-divider>
            <template v-for="(item, inx) in groupList[k]">
                <el-col :span="6" style="margin-bottom:20px;">
                    <el-link :underline="true" :href="item.content" target="_blank" icon="el-icon-link" style="font-size: 15px;"> {{item.title}}</el-link>
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
        }
    };
</script>