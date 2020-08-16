<template>
    <el-row>
        <template v-for="(item, inx) in mdList">
            <el-col :span="7" :offset="1" style="margin-bottom:20px;height:30px">
                <el-link :underline="true" :href="item.content" target="_blank" icon="el-icon-link" style="font-size: 17px;">{{item.classify}} - {{item.title}}</el-link>
            </el-col>
        </template>
    </el-row>
</template>

<script>
    import lodash from "lodash";
    export default {
        data() {
            return {
                mdList: [],
            };
        },
        methods: {
            async getUrlList() {
                let res = await this.$api.getUrlList("");
                this.mdList = res;
                this.$emit("updateSlieMenu")
            },
        }
    };
</script>
<style scoped>
    .title {
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
    }

    .title:hover {
        color: rebeccapurple;
    }

    .title-md {
        color: #666666;
    }

    .title-url {
        color: #718af5;
    }
</style>