<template>
    <el-row>
        <h2>文档上传的图片列表</h2>

        <el-row style="margin-top: 20px;" :gutter="12">
            <template v-for="item in list">
                <el-col :span="8" style="margin-bottom: 10px;">
                    <el-card style="height: 400px;">
                        <p slot="header">上传于：{{item.create_at}}</p>
                        <a :href="item.url" target="_blank">
                        <el-image :src=" item.url" :fit="fits"></el-image>
                        </a>
                    </el-card>
                </el-col>
            </template>
        </el-row>
    </el-row>
</template>

<script>
    import lodash from "lodash"
    export default {
        data() {
            return {
                list: [],
                fits: "fill"
            };
        },
        mounted() {
            this.getImageList();
        },
        methods: {
            async getImageList(id) {
                let res = await this.$api.getImageList();
                this.list = lodash.orderBy(res.data, "create_at").reverse()
            },
        }
    }
</script>